//ref: https://www.carbonatethis.com/hosting-a-serverless-hapi-17-api-with-aws-lambda/
//ref: https://hapi.dev/api/?v=21.1.0
//ref: https://github.com/Kylart/Nyaapi

// enum Category {
//     '1_0' = 'ANIME',
//     '1_1' = 'ANIME_AMV',
//     '1_2' = 'ANIME_ENGLISH',
//     '1_3' = 'ANIME_NON_ENGLISH',
//     '1_4' = 'ANIME_RAW',
//     '2_0' = 'AUDIO',
//     '2_1' = 'AUDIO_LOSSLESS',
//     '2_2' = 'AUDIO_LOSSY',
//     '3_0' = 'LITERATURE',
//     '3_1' = 'LITERATURE_ENGLISH',
//     '3_2' = 'LITERATURE_NON_ENGLISH',
//     '3_3' = 'LITERATURE_RAW',
//     '4_0' = 'LIVE_ACTION',
//     '4_1' = 'LIVE_ACTION_ENGLISH',
//     '4_2' = 'LIVE_ACTION_IDOL_PV',
//     '4_3' = 'LIVE_ACTION_NON_ENGLISH',
//     '4_4' = 'LIVE_ACTION_RAW',
//     '5_0' = 'PICTURES',
//     '5_1' = 'PICTURES_GRAPHICS',
//     '5_2' = 'PICTURES_PHOTOS',
//     '6_0' = 'SOFTWARE',
//     '6_1' = 'SOFTWARE_APPS',
//     '6_2' = 'SOFTWARE_GAMES',
// }

const { transformRequest, transformResponse } = require('hapi-lambda');
const {si, pantsu} = require('nyaapi')
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


    return server;
};


exports.handler = async(event) => {
  const ser = await init();
  const request = transformRequest(event);
  const response = await ser.inject(request);
  return transformResponse(response);
}
