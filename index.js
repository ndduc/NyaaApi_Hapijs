'use strict';
const {si, pantsu} = require('nyaapi')
const {sukebei} = require('nyaapi-sukebei')
const Hapi = require('@hapi/hapi');
const NyaaModel = require('./src/model/index');
const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Nyaa Api with Hapi';
        }
    });

    server.route({
        method: 'GET',
        path: '/sukebei/search-flex',
        handler: async (request, h) => {
            let obj;
            let q = request.query.q;
            let cat = request.query.cat;
            if (q) {
                obj = await sukebei.search({
                    term: q,        
                    category: cat,  // category
                    filter: 0,
                    // n: 1 // number of record return from search
                })
                .then((data) => {
                    let nyaaLists = NyaaModel.ListNyaaModel(data);
                    return nyaaLists;
                })
                .catch((err) => {
                    console.log(err);
                    return err;
                })
            } else {
                return h.response(null).code(401)
            }
            return h.response(obj).code(200);
        }
    });

    server.route({
        method: 'GET',
        path: '/nyaa/search',
        handler: async (request, h) => {
            let obj;
            let q = request.query.q;
            if (q) {
                obj = await si.search({
                    term: q,        
                    category: "1_2",
                    filter: 0,
                    // n: 1 // number of record return from search
                })
                .then((data) => {
                    let nyaaLists = NyaaModel.ListNyaaModel(data);
                    return nyaaLists;
                })
                .catch((err) => {
                    console.log(err);
                    return err;
                })
            } else {
                return h.response(null).code(401)
            }
            return h.response(obj).code(200);
        }
    });

    server.route({
        method: 'GET',
        path: '/nyaa/search-flex',
        handler: async (request, h) => {
            let obj;
            let q = request.query.q;
            let cat = request.query.cat;
            if (q) {
                obj = await si.search({
                    term: q,        
                    category: cat,  // category
                    filter: 0,
                    // n: 1 // number of record return from search
                })
                .then((data) => {
                    let nyaaLists = NyaaModel.ListNyaaModel(data);
                    return nyaaLists;
                })
                .catch((err) => {
                    console.log(err);
                    return err;
                })
            } else {
                return h.response(null).code(401)
            }
            return h.response(obj).code(200);
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();