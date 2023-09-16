const dbConn = require('./src/db/dbConn');

dbConn();

class DBoperations {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const newDoc = await this.model.create(data);
            return newDoc;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async read(query) {
        try {
            const docs = await this.model.find(query);
            return docs;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update(query, data) {
        try {
            const updatedDoc = await this.model.findOneAndUpdate(query, data, { new: true });
            return updatedDoc;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async delete(query) {
        try {
            const deletedDoc = await this.model.findOneAndDelete(query);
            return deletedDoc;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

const dbOperations = new DBoperations(model);

module.exports = dbOperations;
