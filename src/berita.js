const express = require('express') 

const app = express() 

//ini halaman/page utama 

app.get('', (req, res) => { 
    res.send('<h1> Selamat datang di halaman utama info Cuaca</h1>') 
}) 

//ini halaman berita
app.get('/berita', (req, res) => {
    res.send({
       judul: 'Berita Terkini',
       nama: 'Reno Nilam Sari',
       penjelasan: 'Berikut adalah cuplikan berita dan kabar terkini',
       berita: berita
   });
});


app.listen(5000, () => { 
    console.log('Server berjalan pada port 5000.') 
}) 

const path = require('path')

const direktoriPublic =path.join(__dirname, '../public')

app.use(express.static(direktoriPublic))