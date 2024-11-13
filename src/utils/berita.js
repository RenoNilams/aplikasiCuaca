const express = require('express');
const path = require('path');
const app = express();

const request = require('postman-request');

const getBerita = (callback) => {
    const apiKey = '607155d82114ff07b5b9800b4dbd2bc1'; // Ganti dengan API key Anda
    const url = 'http://api.mediastack.com/v1/news?access_key=607155d82114ff07b5b9800b4dbd2bc1&countries=id&limit=5';


    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Tidak dapat menghubungi layanan berita!', undefined);
        } else if (body.error) {
            callback('Gagal mengambil berita. Silakan cek API Key atau endpoint.', undefined);
        } else {
            callback(undefined,  
                'Penulis:' + response.body.data.author + '.' +
                'Judul:' + response.body.data.title + '.' +
                'Deskripsi' + response.body.data.description + '.'
);
        }
    });
};

module.exports = getBerita;