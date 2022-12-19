const Category = {
    '1_0' : 'ANIME',
    '1_1' : 'ANIME_AMV',
    '1_2' : 'ANIME_ENGLISH',
    '1_3' : 'ANIME_NON_ENGLISH',
    '1_4' : 'ANIME_RAW',
    '2_0' : 'AUDIO',
    '2_1' : 'AUDIO_LOSSLESS',
    '2_2' : 'AUDIO_LOSSY',
    '3_0' : 'LITERATURE',
    '3_1' : 'LITERATURE_ENGLISH',
    '3_2' : 'LITERATURE_NON_ENGLISH',
    '3_3' : 'LITERATURE_RAW',
    '4_0' : 'LIVE_ACTION',
    '4_1' : 'LIVE_ACTION_ENGLISH',
    '4_2' : 'LIVE_ACTION_IDOL_PV',
    '4_3' : 'LIVE_ACTION_NON_ENGLISH',
    '4_4' : 'LIVE_ACTION_RAW',
    '5_0' : 'PICTURES',
    '5_1' : 'PICTURES_GRAPHICS',
    '5_2' : 'PICTURES_PHOTOS',
    '6_0' : 'SOFTWARE',
    '6_1' : 'SOFTWARE_APPS',
    '6_2' : 'SOFTWARE_GAMES',
};

function NyaaModel (
    id, 
    name,
    date,
    size,
    category,
    sub_category,
    magnet,
    download_url,
    seeders,
    leechers,
    completed_downloaded,
    status,
    url,
    hash) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.size = size;
    this.category = category;
    this.sub_category = sub_category;
    this.magnet = magnet;
    this.download_url = download_url;
    this.seeders = seeders;
    this.leechers = leechers;
    this.completed_downloaded = completed_downloaded;
    this.status = status;
    this.url = url;
    this.hash = hash;
}

function ListNyaaModel (data) {
    let result =  [];
    for(var  i = 0; i < data.length; i++) {
        let nyaa = new NyaaModel(
            data[i].id,
            data[i].name,
            data[i].date,
            data[i].filesize,
            findCategory(data[i].category),
            findSubCategory(data[i].sub_category),
            data[i].magnet,
            data[i].torrent,
            data[i].seeders,
            data[i].leechers,
            data[i].completed,
            data[i].status,
            createUrl(data[i].id),
            data[i].hash
        );
        result.push(nyaa);
    }
    return result = result;
}

function findCategory(categoryId) {
    return Category[categoryId];
}

function findSubCategory(subCatId) {
    return Category[subCatId];
}

function createUrl(nyaaId) {
    return "https://nyaa.si/view/" + nyaaId;
}




module.exports = {
    NyaaModel,
    ListNyaaModel
}