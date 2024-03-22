const buttonSend = document.querySelector('.button1'); // Ambil tombol Submit
const nameInput = document.querySelector('.name'); // Ambil input nama
const productInput = document.querySelector('.name1'); // Ambil input produk
const commentInput = document.querySelector('.testimonials-display'); // Ambil input komentar
const reviewFrame = document.querySelector('.review-f-r-a-m-e'); // Ambil elemen tempat review card ditampilkan

// Fungsi untuk menambahkan review card baru ke dalam HTML
function addReviewCard(name, product, comment) {
    // Buat elemen div untuk review card baru
    const newReviewCard = document.createElement('div');
    newReviewCard.classList.add('review-card');

    // Isi konten dari review card baru
    newReviewCard.innerHTML = `
        <div class="top-block">
            <div class="left-side">
                <h3 class="title">${product}</h3>
                <div class="stars">
                    <b class="apr-text1">⭐</b>
                    <b class="apr-text2">⭐</b>
                    <b class="apr-text3">⭐</b>
                    <b class="apr-text4">⭐</b>
                    <b class="apr-text5">⭐</b>
                </div>
            </div>
            <div class="right-side">
                <div class="apr">${getDate()}</div>
                <div class="nickname">${name}</div>
            </div>
        </div>
        <h3 class="review">${comment}</h3>
    `;

    // Tambahkan review card baru ke dalam reviewFrame
    reviewFrame.appendChild(newReviewCard);
}

// Tambahkan event listener pada tombol Submit
buttonSend.addEventListener('click', function(event) {
    // Hindari perilaku default dari tombol submit
    event.preventDefault();

    // Ambil nilai dari input
    const name = nameInput.value.trim();
    const product = productInput.value.trim();
    const comment = commentInput.value.trim();

    // Periksa apakah input tidak kosong
    if (name !== '' && product !== '' && comment !== '') {
        // Tambahkan review card baru ke dalam HTML
        addReviewCard(name, product, comment);

        // Reset nilai input setelah submit
        nameInput.value = '';
        productInput.value = '';
        commentInput.value = '';

        // Simpan komentar ke dalam local storage
        saveReviewToLocalStorage(name, product, comment);
    } else {
        // Tampilkan pesan kesalahan jika ada input yang kosong
        alert('Please fill in all fields.');
    }
});

// Fungsi untuk menyimpan review card ke dalam local storage
function saveReviewToLocalStorage(name, product, comment) {
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push({ name, product, comment });
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

// Fungsi untuk mendapatkan tanggal dalam format "DD MMM"
function getDate() {
    const date = new Date();
    const options = { day: "numeric", month: "short" };
    return date.toLocaleDateString("en-US", options);
}

// Load review card dari local storage saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.forEach(review => {
        addReviewCard(review.name, review.product, review.comment);
    });
});
