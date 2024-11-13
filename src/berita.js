const express = require('express');
const path = require('path');
const hbs = require('hbs'); // Pastikan hbs sudah diinstall dan digunakan

const getBerita = require('./utils/getBerita');
const app = express();

// Setup hbs engine dan lokasi views
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Route ke halaman berita
app.get('/berita', (req, res) => {
    getBerita((error, berita) => {
        if (error) {
            return res.render('berita', {
                judul: 'Berita Terkini',
                error: 'Gagal mengambil berita!',
                berita: []
            });
        }
        res.render('berita', {
            judul: 'Berita Terkini',
            berita
        });
    });
});

app.listen(3000, () => {
    console.log('Server berjalan pada port 3000');
});