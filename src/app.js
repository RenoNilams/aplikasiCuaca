const path = require('path')
const express = require('express')
const hbs = require('hbs')
const port = process.env.PORT || 5000
const geocode = require('./utils/geocode')
const forecast = require('./utils/prediksiCuaca')
const app = expregitss()

// Mendefinisikan jalur/path untuk konfigurasi Express
const direktoriPublic = path.join(__dirname, '../public')
const direktoriViews = path.join(__dirname, '../templates/views')
const direktoriPartials = path.join(__dirname, '../templates/partials')

//Setup handlebars engine dan lokasi folder views
app.set('view engine', 'hbs')
app.set('views', direktoriViews)
hbs.registerPartials(direktoriPartials)  

//Setup direktori statis
app.use(express.static(direktoriPublic))

//ini halaman/page utama
app.get('', (req, res) => {
    res.render('index', {
        judul: 'Aplikasi Cek Cuaca',
        nama: 'Reno Nilam Sari'
    })
})

//ini halaman tentang saya
app.get('/tentang', (req, res) =>{
    res.render('tentang', {
        judul: 'Tentang Saya',
        nama: 'Reno Nilam Sari'
    })
})

//ini halaman info cuaca
app.get('/infoCuaca', (req, res) =>{
    if (!req.query.address) {
        return res.send({
            error:'Kamu harus memasukkan lokasi yang ingin dicari'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, dataPrediksi) => {
            if (error){
                return res.send({error})
            }
            res.send({
                prediksiCuaca: dataPrediksi,
                lokasi: location,
                address: req.query.address
            })
        })
    })
})



//ini halaman bantuan/FAQ
app.get('/bantuan', (req, res) =>{
    res.render('bantuan', {
        judul: 'Bantuan',
        nama: 'Reno Nilam Sari',
        teksBantuan: 'Ini adalah teks bantuan'
    })
})


app.listen(3000, () => {
    console.log('Server berjalan pada port 3000')
})