class BaseService {
    constructor(model, populate) {
        this.model = model;
        this.populate = populate;
    }

    #getFinalQuery(query, { populate, select, session }) {
        if (populate || this.populate) {
            query.populate(populate || this.populate);
        }

        if (select) {
            query.select(select);
        }

        if (session) {
            query.session(session);
        }

        return query;
    }

    fetchAll(query, populate, select, session) {
        const dbQuery = this.model.find(query || {});

        const finalQuery = this.#getFinalQuery(dbQuery, {
            populate,
            select,
            session,
        });

        return finalQuery.exec();
    }

    fetchOneById(id, populate, select, session) {
        const dbQuery = this.model.findById(id);

        const finalQuery = this.#getFinalQuery(dbQuery, {
            populate,
            select,
            session,
        });

        return finalQuery.exec();
    }

    fetchOneByQuery(query, populate, select, session) {
        const dbQuery = this.model.findOne(query);

        const finalQuery = this.#getFinalQuery(dbQuery, {
            populate,
            select,
            session,
        });

        return finalQuery.exec();
    }

    create(item, session) {
        const createdData = session ? [item] : item;

        return session
            ? this.model.create(createdData, { session })
            : this.model.create(createdData);
    }

    updateById(id, item, session) {
        const dbQuery = this.model.findByIdAndUpdate(id, item, { new: true });

        const finalQuery = this.#getFinalQuery(dbQuery, {
            session,
        });

        return finalQuery.exec();
    }

    updateByQuery(query, item, session) {
        const dbQuery = this.model.findOneAndUpdate(query, item, { new: true });

        const finalQuery = this.#getFinalQuery(dbQuery, {
            session,
        });

        return finalQuery.exec();
    }

    deleteById(id, session) {
        const dbQuery = this.model.findByIdAndDelete(id);

        const finalQuery = this.#getFinalQuery(dbQuery, {
            session,
        });

        return finalQuery.exec();
    }

    deleteByQuery(query, session) {
        const dbQuery = this.model.findOneAndDelete(query);

        const finalQuery = this.#getFinalQuery(dbQuery, {
            session,
        });

        return finalQuery.exec();
    }

    deleteAll(where, session) {
        const dbQuery = this.model.deleteMany(where || {});

        const finalQuery = this.#getFinalQuery(dbQuery, {
            session,
        });

        return finalQuery.exec();
    }
}

module.exports = BaseService;
