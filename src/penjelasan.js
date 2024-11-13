const express = require('express') 

const app = express() 

//ini halaman/page bantuan 

app.get('', (req, res) => { 
    res.send('<h1> Selamat datang di halaman utama gaiss</h1>') 
}) 

app.get('/penjelasan/', (req, res) => {
    res.render('penjelasan', {
        judul: 'Penjelasan Aplikasi Cek Cuaca',
        nama: 'Reno Nilam Sari',
        penjelasan: 'Ini adalah aplikasi cek cuaca.'
    });
});

app.listen(5000, () => { 
    console.log('Server berjalan pada port 5000.') 
}) 

const path = require('path')

const direktoriPublic =path.join(__dirname, '../public')

app.use(express.static(direktoriPublic))