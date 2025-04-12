// Daftar produk contoh
const products = [
    { id: 1, name: "Top Up Free Fire", price: 10000, image: "https://example.com/free-fire.jpg" },
    { id: 2, name: "Top Up Mobile Legends", price: 20000, image: "https://example.com/mobile-legends.jpg" },
    { id: 3, name: "Top Up PUBG", price: 30000, image: "https://example.com/pubg.jpg" },
];

// Menampilkan produk di halaman utama
const productList = document.getElementById('product-list');
const orderButton = document.getElementById('order-button');
const gameSelect = document.getElementById('game-select');
const gameImage = document.getElementById('game-image');
const orderMessage = document.getElementById('order-message');
const loginForm = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');
const adminSection = document.getElementById('admin-section');
const orderList = document.getElementById('order-list');

let orders = [];

// Inisialisasi produk
function initProducts() {
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Harga: Rp${product.price}</p>
            <button onclick="orderProduct(${product.id})">Pesan</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Menangani pemesanan
orderButton.addEventListener('click', function() {
    const userId = document.getElementById('user-id').value;
    const diamondAmount = document.getElementById('diamond-amount').value;
    const paymentMethod = document.getElementById('payment-method').value;
    const selectedGame = gameSelect.value;

    if (userId && diamondAmount) {
        const order = {
            game: selectedGame,
            userId,
            diamondAmount,
            paymentMethod,
            status: 'Pending'
        };
        orders.push(order);
        orderMessage.innerHTML = `Pesanan berhasil!<br>Game: ${selectedGame}<br>ID Pengguna: ${userId}<br>Nominal Diamond: ${diamondAmount}<br>Metode Pembayaran: ${paymentMethod}`;
        displayOrders();
    } else {
        orderMessage.innerText = "Silakan lengkapi semua informasi!";
    }
});

// Menampilkan gambar game berdasarkan pilihan
gameSelect.addEventListener('change', function() {
    const selectedGame = products.find(product => product.name.includes(gameSelect.value));
    if (selectedGame) {
        gameImage.src = selectedGame.image;
        gameImage.style.display = 'block';
    } else {
        gameImage.src = '';
        gameImage.style.display = 'none';
    }
});

// Login Admin
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form dari pengiriman default
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Cek kredensial (contoh sederhana)
    if (username === "uzikotaro" && password === "ikan") {
        loginMessage.innerText = "Login berhasil!";
        adminSection.style.display = 'block';
        displayOrders();
    } else {
        loginMessage.innerText = "Username atau password salah!";
    }
});

// Menampilkan daftar pesanan untuk admin
function displayOrders() {
    orderList.innerHTML = ''; // Kosongkan daftar sebelumnya
    orders.forEach((order, index) => {
        const orderDiv = document.createElement('div');
        orderDiv.innerHTML = `
            <p>Pesanan ${index + 1}: ${order.game}, ID: ${order.userId}, Diamond: ${order.diamondAmount}, Pembayaran: ${order.paymentMethod}, Status: ${order.status}</p>
            <button onclick="confirmOrder(${index})">Konfirmasi</button>
        `;
        orderList.appendChild(orderDiv);
    });
}

// Konfirmasi pesanan
function confirmOrder(index) {
    orders[index].status = 'Confirmed';
    displayOrders();
}

// Inisialisasi produk saat halaman dimuat
initProducts();