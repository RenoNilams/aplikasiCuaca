const request = require('postman-request');


    const url = 'http://api.mediastack.com/v1/news?access_key=607155d82114ff07b5b9800b4dbd2bc1';
        
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Tidak dapat terkoneksi ke layanan', undefined);
        } else if (!response.body.data || response.body.data.length === 0) {
            callback('Tidak dapat menemukan berita. Lakukan pencarian yang lain', undefined);
        } else {
            callback(undefined,
                'Penulis:' + response.body.data.author + '.' +
                'Judul:' + response.body.data.title + '.' +
                'Deskripsi' + response.body.data.description + '.'
            );
        }
    });

module.exports = berita;