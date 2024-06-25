
    function toggleSearchBar() {
        var searchBar = document.getElementById('searchBar');
        searchBar.classList.toggle('active');
    }

    function searchInPage() {
        var searchText = document.getElementById('searchInput').value.trim().toLowerCase();
        var pagesToSearch = [
            { url: 'bawal.html', keywords: ['fantacy', 'bawal', 'printed bawal', 'printed', 'seroja', 'purnama', 'juwita', 'anggun', 'mayang', 'puspita', 'ayu', 'teja raia', 'citra'] },
            { url: 'shawl.html', keywords: ['magis', 'shawl', 'magika', 'mula', 'belle', 'nyala', 'dewi'] },
            { url: 'service.html', keywords: ['wish card', 'wish', 'card'] }
        ];

        var found = false;

        // Loop through pages to search
        pagesToSearch.forEach(function(page) {
            if (page.keywords.includes(searchText)) {
                window.location.href = page.url; // Navigate to the page if keyword matches
                found = true;
            }
        });

        if (!found) {
            alert('No matching results found.');
        }
    }

/*slideshow*/
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slide");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 4000); // Change image every 4 seconds
}

function changeSlide(n) {
    slideIndex += n - 1;
    showSlides();
}

/*change image*/
let currentIndex = 0;

function changeImage(element, newSrc) {
    element.querySelector('img').src = newSrc;
}

function restoreImage(element, originalSrc) {
    element.querySelector('img').src = originalSrc;
}

/*login*/
function login(event) {
    event.preventDefault(); // Prevent the default form submission

    // Your login logic here
    // For demonstration, let's assume the login is successful
    var isLoggedIn = true;

    if (isLoggedIn) {
        // Redirect to the home page
        window.location.href = "index.html";
    }
}
function handleFormSubmit(event) {
    event.preventDefault();
    // Perform form validation and submission logic here

    // Redirect to the login page after successful account creation
    window.location.href = 'login.html';
}
document.getElementById('loginForm').addEventListener('submit'), function(event) {
    event.preventDefault();
    
}

// Clear the email input field on page load
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.querySelector('input[name="email"]');
    if (emailInput) {
        emailInput.value = ''; // Clear the email input field
    }
});

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get user input values
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    // Retrieve user data from localStorage
    const savedEmail = localStorage.getItem('userEmail');
    const savedPassword = localStorage.getItem('userPassword');

    // Check if the entered credentials match the stored data
    if (email === savedEmail && password === savedPassword) {
        alert('Login successful! Redirecting to homepage...');
        // Redirect to the homepage after successful login
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password. Please try again.');
        // Reset the form fields
        loginForm.reset();
    }
});


/*sign up*/
const togglePassword = document.getElementById('togglePassword');
const password = document.getElementById('password');

togglePassword.addEventListener('click', function () {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const confirmPassword = document.getElementById('confirmPassword');

toggleConfirmPassword.addEventListener('click', function () {
    const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPassword.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

const createAccountForm = document.getElementById('createAccountForm');

createAccountForm.addEventListener('submit', function (event) {
event.preventDefault();

// Get user input values
const firstName = document.querySelector('input[name="first-name"]').value;
const lastName = document.querySelector('input[name="last-name"]').value;
const email = document.querySelector('input[name="email"]').value;
const password = document.querySelector('input[name="password"]').value;

// Check if the email already exists in localStorage
const existingEmail = localStorage.getItem('userEmail');

if (existingEmail && existingEmail === email) {
    alert('An account with this email already exists. Please use a different email.');
    return; // Stop the account creation process
}

// Save user data to localStorage
localStorage.setItem('userFirstName', firstName);
localStorage.setItem('userLastName', lastName);
localStorage.setItem('userEmail', email);
localStorage.setItem('userPassword', password);

alert('Account created successfully!');
createAccountForm.reset();

// Redirect to the login page
window.location.href = 'login.html';
});

//checkout
let cart = [];

function addToCart(itemName, itemPrice) {
    const item = { name: itemName, price: itemPrice };
    cart.push(item);
    updateCartCount();
    updateCartPopup();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

function updateCartPopup() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = 'No items in cart.';
        cartItems.appendChild(emptyMessage);
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `${item.name} - RM${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remove</button>`;
            cartItems.appendChild(cartItem);
        });
    }
}

function toggleCartPopup() {
    const cartPopup = document.getElementById('cart-popup');
    if (cartPopup.style.display === 'none' || cartPopup.style.display === '') {
        cartPopup.style.display = 'block';
    } else {
        cartPopup.style.display = 'none';
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    updateCartPopup();
}

document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;
    
    const confirmationMessage = document.getElementById('confirmation-message');
    confirmationMessage.textContent = `Thank you for your purchase, ${name}! Your order has been placed.`;
    
    // Optionally, you can clear the cart and form after successful checkout
    cart = [];
    updateCartCount();
    updateCartPopup();
    document.getElementById('checkout-form').reset();
});

//account
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // For simplicity, we store email and a placeholder for username
            // In real applications, validate and fetch the user from a server
            const username = email.split('@')[0];  // Just an example, extract username from email

            // Save user info to localStorage
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);

            // Add more user details if available
            const address = '1234 Example St, City, Country';  // Placeholder for address
            const phone = '+1234567890';  // Placeholder for phone number
            localStorage.setItem('address', address);
            localStorage.setItem('phone', phone);

            // Redirect to account.html
            window.location.href = 'account.html';
        });
    } else {
        // If on account.html, display the stored user info
        const usernameDisplay = document.getElementById('usernameDisplay');
        const emailDisplay = document.getElementById('emailDisplay');
        const addressDisplay = document.getElementById('addressDisplay');
        const phoneDisplay = document.getElementById('phoneDisplay');

        const username = localStorage.getItem('username');
        const email = localStorage.getItem('email');
        const address = localStorage.getItem('address');
        const phone = localStorage.getItem('phone');

        if (username && email) {
            usernameDisplay.textContent = `Username: ${username}`;
            emailDisplay.textContent = `Email: ${email}`;
        } else {
            usernameDisplay.textContent = 'No user information available.';
            emailDisplay.textContent = '';
        }

        if (address) {
            addressDisplay.textContent = `Address: ${address}`;
        } else {
            addressDisplay.textContent = '';
        }

        if (phone) {
            phoneDisplay.textContent = `Phone: ${phone}`;
        } else {
            phoneDisplay.textContent = '';
        }
    }
});

function logout() {
    // Clear localStorage and redirect to login.html
    localStorage.clear();
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    if (signupForm) {
        signupForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const address = document.getElementById('address').value;
            const phone = document.getElementById('phone').value;

            // Save user info to localStorage
            const user = {
                username,
                email,
                password,
                address,
                phone
            };
            localStorage.setItem(email, JSON.stringify(user));

            // Redirect to login.html
            window.location.href = 'login.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Retrieve user info from localStorage
            const user = JSON.parse(localStorage.getItem(email));

            if (user && user.password === password) {
                // Save session info to localStorage
                localStorage.setItem('loggedInUser', email);

                // Redirect to account.html
                window.location.href = 'account.html';
            } else {
                alert('Invalid email or password, or user does not exist.');
            }
        });
    } else {
        // If on account.html, display the stored user info
        const email = localStorage.getItem('loggedInUser');
        const user = JSON.parse(localStorage.getItem(email));

        const usernameDisplay = document.getElementById('usernameDisplay');
        const emailDisplay = document.getElementById('emailDisplay');
        const addressDisplay = document.getElementById('addressDisplay');
        const phoneDisplay = document.getElementById('phoneDisplay');

        if (user) {
            usernameDisplay.textContent = `Username: ${user.username}`;
            emailDisplay.textContent = `Email: ${user.email}`;
            addressDisplay.textContent = `Address: ${user.address}`;
            phoneDisplay.textContent = `Phone: ${user.phone}`;
        } else {
            usernameDisplay.textContent = 'No user information available.';
            emailDisplay.textContent = '';
            addressDisplay.textContent = '';
            phoneDisplay.textContent = '';
        }
    }
});

function logout() {
    // Clear session info from localStorage and redirect to login.html
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
}

// Function to toggle card details based on payment method selection
function togglePaymentDetails() {
    var paymentMethod = document.getElementById("payment-method").value;
    var cardDetails = document.getElementById("card-details");
    var expiryCvc = document.getElementById("expiry-cvc");

    if (paymentMethod === "card") {
        cardDetails.style.display = "block";
        expiryCvc.style.display = "block";
    } else {
        cardDetails.style.display = "none";
        expiryCvc.style.display = "none";
    }
}
        
        function togglePaymentDetails() {
            var paymentMethod = document.getElementById('payment-method').value;
            var cardDetails = document.getElementById('card-details');
            var expiryCVC = document.getElementById('expiry-cvc');
        
            if (paymentMethod === 'card') {
                cardDetails.style.display = 'block';
                expiryCVC.style.display = 'flex'; // Menunjukkan kedua input pada div
            } else {
                cardDetails.style.display = 'none';
                expiryCVC.style.display = 'none';
            }
        }


        