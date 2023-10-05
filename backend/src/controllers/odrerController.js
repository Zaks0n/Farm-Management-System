const OrderItem = require('../models/orderItemModel');
const Orders = require('../models/orderModel2');
const Customer = require('../models/customerModel');
const stripe = require('stripe')('k_test_51NrggvLNDIH31JA3LDzGPqadCwFujB0a52rG1jP15CS10BhhuoKkymRhBH7twIy8AzXYutX6yiLKkSwRu419bXyD005MXOgwVy:');

class OrdersController {
    // this for admin
    static async getOrders(request, response) {
        try {
            const orders = await Orders.find({}).populate('customer', 'fullName').populate('orderitems');
            return response.status(200).json({
                message: 'All orders',
                data: orders
            });
        } catch (error) {
            return response.status(500).json({
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    }
    // this for admin
    static async getOrder(request, response) {
        try {
            const order = await Orders.findById(request.params.id)
                .populate('customer', 'fullName')
            // .populate({
            //     path: 'orderitems',
            //     populate: {
            //         path: 'product',
            //         populate: 'category'
            //     }
            // });
            return response.status(200).json({
                message: 'Order',
                data: order
            });
        } catch (error) {
            return response.status(500).json({
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    }

    static async createOrder(request, response) {
        try {
            const orderItemsIds = Promise.all(request.body.orderItems.map(async (orderItem) => {
                let newOrderItem = new OrderItem({
                    quantity: orderItem.quantity,
                    product: orderItem.product
                });
                newOrderItem = await newOrderItem.save();
                return newOrderItem._id;
            }));
            const orderItemsIdsResolved = await orderItemsIds;
            const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId) => {
                const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
                const totalPrice = orderItem.product.price * orderItem.quantity;
                return totalPrice;
            }));
            const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
            const order = new Orders({
                orderItems: orderItemsIdsResolved,
                shippingAddress1: request.body.shippingAddress1,
                shippingAddress2: request.body.shippingAddress2,
                city: request.body.city,
                phone: request.body.phone,
                totalPrice: totalPrice,
                customer: request.id._id
            });
            const createdOrder = await order.save();
            return response.status(201).json({
                message: 'Order Created',
                data: createdOrder
            });
        } catch (error) {
            return response.status(500).json({
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    }
    // this for admin
    static async updateOrder(request, response) {
        try {
            const order = await Orders.findByIdAndUpdate(
                request.params.id,
                {
                    status: request.body.status
                },
                { new: true }
            );
            return response.status(200).json({
                message: 'Order Updated',
                data: order
            });
        } catch (error) {
            return response.status(500).json({
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    }

    static async deleteOrder(request, response) {
        try {
            const order = await Orders.findByIdAndDelete(request.params.id);
            return response.status(200).json({
                message: 'Order Deleted',
                data: order
            });
        } catch (error) {
            return response.status(500).json({
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    }
    // this for customer
    static async getCustOrders(request, response) {
        try {
            const custOrders = await Orders.find({ customer: request.params.id })
                .populate({
                    path: 'orderitems',
                    populate: {
                        path: 'product',
                        populate: 'category'
                    }
                });
            return response.status(200).json({
                message: 'Customer Orders',
                data: custOrders
            });
        } catch (error) {
            return response.status(500).json({
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    }

    // create customer for stripe

    static async customerPayment(request, response) {
        try {
            const customer = await stripe.customers.create({
                email: request.id.email,
            });
            const updatedCustomer = await Customer.findByIdAndUpdate(request.id._id, { stripeCustomerId: customer.id }, { new: true });
            if (!updatedCustomer) {
                return response.status(500).json({ message: 'Customer could not be updated' });
            }
            return response.status(200).json({ message: 'Customer created', data: customer });
        } catch (error) {
            return response.status(500).json({ message: 'Something went wrong', error: error.message });
        }
    }

    // customer card payment

    static async createPaymentMethod(request, response) {
        try {
            const paymentMethod = await stripe.paymentMethods.create({
                type: 'card',
                card: {
                    number: request.body.cardNumber,
                    exp_month: request.body.expMonth,
                    exp_year: request.body.expYear,
                    cvc: request.body.cvc
                }
            });
            return response.status(200).json({ message: 'Payment method created', data: paymentMethod });
        } catch (error) {
            return response.status(500).json({ message: 'Something went wrong', error: error.message });
        }
    }

    // attach payment method to customer

    static async attachPaymentMethod(request, response) {
        try {
            const paymentMethod = await stripe.paymentMethods.attach(
                request.body.paymentMethodId,
                { customer: request.id.stripeCustomerId }
            );
            return response.status(200).json({ message: 'Payment method attached', data: paymentMethod });
        } catch (error) {
            return response.status(500).json({ message: 'Something went wrong', error: error.message });
        }
    }

    // create payment intent

    static async createPaymentIntent(request, response) {
        try {
            const order = await Orders.findById(request.params.orderId);
            if (!order) {
                return response.status(404).json({ message: 'Order not found' });
            }
            const user = await Customer.findById(order.customer);
            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }
            const paymentIntent = await stripe.paymentIntents.create({
                amount: order.totalPrice * 100,
                currency: 'usd',
                payment_method_types: ['card'],
                customer: user.stripeCustomerId
            });
            return response.status(200).json({ clientSecret: paymentIntent.client_secret });
        } catch (error) {
            return response.status(500).json({ message: 'Something went wrong', error: error.message });
        }
    }

    // confirm payment intent

    static async confirmPaymentIntent(request, response) {
        try {
            const paymentIntent = await stripe.paymentIntents.confirm(
                request.body.paymentIntentId
            );
            return response.status(200).json({ message: 'Payment intent confirmed', data: paymentIntent });
        } catch (error) {
            return response.status(500).json({ message: 'Something went wrong', error: error.message });
        }
    }

}

module.exports = OrdersController;