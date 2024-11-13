const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 5000
const geocode = require('./utils/geocode')
const forecast = require('./utils/prediksiCuaca')
const getBerita = require('./utils/berita')

// Tentukan direktori untuk file statis dan views
const direktoriPublic = path.join(__dirname, '../public');
const direktoriViews = path.join(__dirname, '../templates/views')
app.set('views', direktoriViews);
const direktoriPartials = path.join(__dirname, '../templates/partials');

// Setup handlebars (hbs) dan lokasi folder views
app.set('view engine', 'hbs');
hbs.registerPartials(direktoriPartials);

// Middleware untuk melayani file statis
app.use(express.static(direktoriPublic));

// Halaman utama dengan template hbs
app.get('/', (req, res) => { 
    res.render('index', { 
        judul: 'Aplikasi Cek Cuaca', 
        nama: 'Reno Nilam Sari' 
    });
});

// Rute untuk info cuaca
app.get('/infoCuaca', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Kamu harus memasukan lokasi yang ingin dicari'
        });
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, dataPrediksi) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                prediksiCuaca: dataPrediksi,
                lokasi: location,
                address: req.query.address
            });
        });
    });
});

// Halaman bantuan
app.get('/bantuan/', (req, res) => {
    res.render('bantuan', {
        judul: 'Bantuan',
        nama: 'Reno Nilam Sari',
        teksBantuan: 'Ini adalah teks bantuan.'
    })
});

// Halaman tentang
app.get('/tentang/', (req, res) => {
    res.render('tentang', {
        judul: 'Tentang Saya',
        nama: 'Reno Nilam Sari'
    })
});

// Halaman penjelasan
app.get('/penjelasan/', (req, res) => {
    res.render('penjelasan', {
        judul: 'Penjelasan Aplikasi Cek Cuaca',
        nama: 'Reno Nilam Sari',
        penjelasan: 'Ini adalah aplikasi cek cuaca.'
    });
});

app.get('/berita', (req, res) => {
    getBerita((error, berita) => {
        if (error) {
            return res.render('berita', {
                judul: 'Berita Terkini',
                error: 'Gagal mengambil berita!',
                nama: 'Reno Nilam Sari',
                berita: []
            });
        }
        res.render('berita', {
            judul: 'Berita Terkini',
            nama: 'Reno Nilam Sari',
            berita // Kirim seluruh array
        });
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        judul: '404',
        nama: 'Reno Nilam Sari',
        pesanKesalahan: 'Artikel yang dicari tidak ditemukan.'
    });
});

// Jalankan server di port 3000
app.listen(port, () => { 
    console.log('Server berjalan pada port' + port);
});
