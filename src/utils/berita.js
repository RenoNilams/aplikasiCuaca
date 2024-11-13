const request = require('postman-request');

const getBerita = (callback) => {
    const apiKey = '607155d82114ff07b5b9800b4dbd2bc1'; 
    const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}&countries=id&limit=5`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Tidak dapat menghubungi layanan berita!', undefined);
        } else if (response.body.error) {
            callback('Error dari API berita: ' + response.body.error.message, undefined);
        } else {
            const beritaArray = response.body.data.map((data) => ({
                author: data.author || 'Tidak diketahui',
                title: data.title,
                description: data.description || 'Tidak ada deskripsi'
            }));
            callback(undefined, beritaArray);
        }
    });
};

module.exports = getBerita;