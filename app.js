//ref: https://www.carbonatethis.com/hosting-a-serverless-hapi-17-api-with-aws-lambda/
//ref: https://hapi.dev/api/?v=21.1.0

const { transformRequest, transformResponse } = require('hapi-lambda');
const {si, pantsu} = require('nyaapi')
const Hapi = require('@hapi/hapi');

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
                    return data;
                })
                .catch((err) => {
                    return err;
                })
            } else {
                return h.response(null).code(401)
            }
            return h.response(obj).code(200);
        }
    }
    );

    return server;
};


exports.handler = async(event) => {
  const ser = await init();
  const request = transformRequest(event);
  const response = await ser.inject(request);
  return transformResponse(response);
}
