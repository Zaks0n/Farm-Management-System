const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'sandbox.smtp.mailtrap.io',
        port: process.env.SMTP_PORT || 2525,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER || 'a4977d681e8bea', // generated ethereal user
            pass: process.env.SMTP_PASS || '0d661866097184', // generated ethereal password
        },
    });

    const mailOptions = {
        from: 'Faramer Sys <admin@farmersys.com>', // sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        text: options.message, // plain text body
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;