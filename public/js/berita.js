console.log('Client side javascript file diproses')

const pesanSatu = document.querySelector('#pesan-1') 


fetch('/berita').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            pesanSatu.textContent = data.error; // Tampilkan error jika ada
        } else {
            pesanSatu.textContent = data.berita; // Tampilkan berita
        }
    });
});
