// ==========================
// TASK 1: THE SCRIPT FOUNDATION & DATA STRUCTURE
// ==========================

// Product class for data structure - defines the blueprint for all product objects
class Product {
    constructor(id, name, price, image, description = "") {
        this.id = id;               // Unique identifier for each product
        this.name = name;           // Product name/title
        this.price = price;         // Product price in Philippine Pesos
        this.image = image;         // Path to product image file
        this.description = description; // Detailed product description (optional)
    }
}

const products = [
    new Product(1, "Elegant Dress", 350, "image/dress.jpg", "Elegant dress designed for formal events and special occasions. Made with premium fabric for ultimate comfort."),
    new Product(2, "Classic Coat", 150, "image/coat.jpg", "A formal classic coat perfect for professional occasions such as research defense, presentations, and business events. Designed with a sleek and polished look for a confident appearance."),
    new Product(3, "Stylish Blouse", 220, "image/product1.jpg", "Beautiful blouse perfect for office wear or casual outings. Lightweight and breathable fabric."),
    new Product(4, "Fashion Set", 420, "image/product2.jpg", "A collection of stylish and comfortable clothes for different occasions. Complete outfit package."),
    new Product(5, "Denim Jeans", 180, "image/product3.jpg", "Classic denim jeans for versatile styling and comfort. Perfect fit for any casual occasion."),
    new Product(6, "Polo Shirt", 195, "image/product4.jpg", "Classic polo shirt with a collar, perfect for smart casual looks. Breathable cotton material."),
    new Product(7, "Stylish Shirt", 250, "image/shirt.jpg", "Comfortable cotton shirt perfect for casual and everyday wear. Trendy design with modern fit."),
    new Product(8, "Black T-shirt", 150, "image/bado.jpg", "Simple and stylish black t-shirt that pairs well with any outfit. Essential wardrobe piece."),
    new Product(9, "T-Shirt", 150, "image/je.jpg", "Classic white t-shirt made from soft fabric for a clean and fresh look. Perfect for layering."),
    new Product(10, "Casual T-shirt", 150, "image/jn.jpg", "Casual t-shirt designed for comfort and daily use. Relaxed fit for maximum comfort."),
    new Product(11, "Casual Dress", 500, "image/jen.jpg", "Light and comfortable casual dress perfect for daily outings. Flowy design with beautiful pattern."),
    new Product(12, "Long Dress", 280, "image/nicole.jpg", "Long and flowing dress that gives a graceful and stylish appearance. Perfect for special occasions."),

    // ==========================
    // DISCOUNTED PRODUCTS (ADDED)
    // ==========================
    new Product(13, "Stylish Hoodie (Sale)", 450, "image/discount1.jpg", "Warm and comfy hoodie now on discount. Perfect for everyday wear."),
    new Product(14, "Denim Jeans (Sale)", 520, "image/discount2.jpg", "Trendy denim jeans on sale. Durable and stylish."),
    new Product(15, "Casual Jacket (Sale)", 600, "image/discount3.jpg", "Lightweight jacket perfect for cool weather. Discounted price."),
    new Product(16, "Polo Shirt (Sale)", 300, "image/discount4.jpg", "Simple and neat polo shirt now available at a lower price.")
];
// ==========================
// CART STATE MANAGEMENT
// ==========================

// Global cart array - stores items added by the user
// Each cart item includes: id, name, price, image, and quantity
let cart = [];

// Load cart from localStorage - retrieves previously saved cart data when page loads
function loadCart() {
    const savedCart = localStorage.getItem('cart'); // Get cart data from browser storage
    if (savedCart) {
        cart = JSON.parse(savedCart); // Convert JSON string back to JavaScript array
        renderCart(); // Update cart display with loaded items
        updateCheckoutSummary(); // Update checkout totals
    }
}

// Save cart to localStorage - persists cart data so it survives page refreshes
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart)); // Convert cart array to JSON string and store
}

// ==========================
// TASK 2: DYNAMIC PRODUCT RENDERING (products.html)
// ==========================

// Renders all products on the products page
function renderProducts() {
    const productContainer = document.querySelector('.product-container'); // Find the container element
    if (!productContainer) return; // Exit if container doesn't exist on current page

    productContainer.innerHTML = ''; // Clear existing content

    // Loop through each product in the products array
    products.forEach(product => {
        // Create article element for each product card
        const card = document.createElement('article');
        card.classList.add('product-card');
        card.setAttribute('data-product-id', product.id); // Store product ID for animations

        // Create and configure product image
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        img.onerror = function () {
            this.src = 'image/placeholder.jpg'; // Fallback image if original fails to load
            console.log(`Image not found: ${product.image}`);
        };

        // Create product name element
        const name = document.createElement('h3');
        name.textContent = product.name;

        // Create product price element
        const price = document.createElement('p');
        price.textContent = `₱${product.price}`;

        // Create "Add to Cart" button
        const addButton = document.createElement('button');
        addButton.textContent = 'Add to Cart';
        addButton.classList.add('add-to-cart-btn');
        addButton.setAttribute('data-id', product.id); // Store product ID for event handling

        // Create "View Details" link
        const viewLink = document.createElement('a');
        viewLink.href = `detail.html?id=${product.id}`; // Link to detail page with product ID
        viewLink.textContent = 'View Details';
        viewLink.classList.add('view-btn');

        // Assemble all elements into the card
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(price);
        card.appendChild(addButton);
        card.appendChild(viewLink);

        // Add the completed card to the container
        productContainer.appendChild(card);
    });
}

// ==========================
// FEATURED PRODUCTS (landing.html) - FIXED IMAGES
// ==========================

// Renders featured products on the landing/home page
function renderFeaturedProducts() {
    const productGrid = document.querySelector('.product-grid'); // Find the product grid container
    if (!productGrid) return; // Exit if not on landing page

    productGrid.innerHTML = ''; // Clear any existing content

    // Show first 4 products as featured items on the homepage
    const featuredProducts = products.slice(0, 4);

    // Loop through each featured product
    featuredProducts.forEach(product => {
        // Create container div for each product
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        // Create and configure product image
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        img.onerror = function () {
            this.src = 'image/placeholder.jpg'; // Fallback for missing images
        };

        // Create product name
        const name = document.createElement('h3');
        name.textContent = product.name;

        // Create product price
        const price = document.createElement('p');
        price.textContent = `₱${product.price}`;

        // Create truncated description (first 50 characters)
        const description = document.createElement('p');
        description.textContent = product.description.substring(0, 50) + '...';
        description.style.fontSize = '12px';
        description.style.color = '#666';

        // Create "Add to Cart" button
        const button = document.createElement('button');
        button.textContent = 'Add to Cart';
        button.classList.add('add-to-cart-btn');
        button.setAttribute('data-id', product.id);

        // Assemble all elements
        productDiv.appendChild(img);
        productDiv.appendChild(name);
        productDiv.appendChild(price);
        productDiv.appendChild(description);
        productDiv.appendChild(button);

        // Add to grid
        productGrid.appendChild(productDiv);
    });
}

// ==========================
// TASK 3: EVENT HANDLING & THE CART
// ==========================

// Adds a product to the shopping cart
function addToCart(productId, quantity = 1) {
    // Find the product in the products array
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) return; // Exit if product not found

    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        // If product exists, increase quantity
        existingItem.quantity += quantity;
    } else {
        // If new product, add to cart with quantity
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    // Save updated cart to localStorage
    saveCart();
    // Update the cart display
    renderCart();
    // Update checkout summary totals
    updateCheckoutSummary();
    // Show success notification
    showNotification(`${product.name} added to cart!`);

    // TASK 6: Add animation to product card for visual feedback
    const productCard = document.querySelector(`.product-card[data-product-id="${productId}"], .product[data-product-id="${productId}"]`);
    if (productCard) {
        productCard.classList.add('fade-in'); // Add animation class
        setTimeout(() => {
            productCard.classList.remove('fade-in'); // Remove after animation completes
        }, 500);
    }
}

// Updates quantity of a specific cart item
function updateQuantity(productId, newQuantity) {
    // Find the item in cart
    const item = cart.find(item => item.id === parseInt(productId));

    if (item) {
        newQuantity = parseInt(newQuantity); // Ensure numeric value

        if (newQuantity <= 0) {
            // Remove item if quantity is zero or negative
            cart = cart.filter(item => item.id !== parseInt(productId));
        } else {
            // Update quantity
            item.quantity = newQuantity;
        }

        // Save changes and update displays
        saveCart();
        renderCart();
        updateCheckoutSummary();
    }
}

// Removes an item from the cart completely
function removeFromCart(productId) {
    // Filter out the item to be removed
    cart = cart.filter(item => item.id !== parseInt(productId));
    // Save and update
    saveCart();
    renderCart();
    updateCheckoutSummary();
    showNotification('Item removed from cart');
}

// Renders all items in the cart on the cart page
function renderCart() {
    const cartContainer = document.querySelector('.cart-items');
    const subtotalElement = document.querySelector('.subtotal h2, .subtotal');
    const emptyCartMessage = document.querySelector('.empty-cart');
    const checkoutBtn = document.querySelector('.checkout-btn');

    if (!cartContainer) return; // Exit if not on cart page

    // Handle empty cart state
    if (cart.length === 0) {
        cartContainer.innerHTML = ''; // Clear container
        if (emptyCartMessage) emptyCartMessage.style.display = 'block'; // Show empty cart message
        if (subtotalElement) {
            // Reset subtotal to zero
            if (subtotalElement.tagName === 'H2') {
                subtotalElement.textContent = 'Subtotal: ₱0';
            } else {
                subtotalElement.innerHTML = '<h2>Subtotal: ₱0</h2>';
            }
        }
        if (checkoutBtn) checkoutBtn.style.opacity = '0.5'; // Disable checkout button visually
        return;
    }

    // Hide empty cart message if cart has items
    if (emptyCartMessage) emptyCartMessage.style.display = 'none';
    if (checkoutBtn) checkoutBtn.style.opacity = '1'; // Enable checkout button

    cartContainer.innerHTML = ''; // Clear container before rendering

    // Loop through each cart item
    cart.forEach(item => {
        // Create list item for each cart item
        const li = document.createElement('li');
        li.classList.add('cart-card');
        li.setAttribute('data-cart-id', item.id);

        // Product image
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        img.onerror = function () { this.src = 'image/placeholder.jpg'; };

        // Product info container
        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');

        // Product name
        const name = document.createElement('h3');
        name.textContent = item.name;

        // Product price
        const price = document.createElement('p');
        price.classList.add('price');
        price.textContent = `₱${item.price}`;

        productInfo.appendChild(name);
        productInfo.appendChild(price);

        // Quantity input field
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = item.quantity;
        quantityInput.min = '1';
        quantityInput.setAttribute('data-id', item.id);

        // Event listener for quantity changes
        quantityInput.addEventListener('change', (e) => {
            updateQuantity(item.id, e.target.value);
        });

        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.setAttribute('data-id', item.id);
        removeBtn.addEventListener('click', () => {
            removeFromCart(item.id);
        });

        // Assemble cart item
        li.appendChild(img);
        li.appendChild(productInfo);
        li.appendChild(quantityInput);
        li.appendChild(removeBtn);

        cartContainer.appendChild(li);
    });

    // Calculate subtotal (sum of price × quantity for all items)
    const subtotal = cart.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    // Update subtotal display
    if (subtotalElement) {
        if (subtotalElement.tagName === 'H2') {
            subtotalElement.textContent = `Subtotal: ₱${subtotal.toFixed(2)}`;
        } else {
            subtotalElement.innerHTML = `<h2>Subtotal: ₱${subtotal.toFixed(2)}</h2>`;
        }
    }
}

// Update checkout summary display (used on checkout page)
function updateCheckoutSummary() {
    // Calculate cart totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingFee = subtotal > 0 ? 60 : 0; // Flat shipping fee of ₱60 if cart not empty
    const total = subtotal + shippingFee;

    // Get all summary elements
    const itemCountSpan = document.getElementById('item-count');
    const subtotalSpan = document.getElementById('subtotal-amount');
    const shippingSpan = document.getElementById('shipping-fee');
    const totalSpan = document.getElementById('total-amount');

    // Update item count (total quantity of all items)
    if (itemCountSpan) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        itemCountSpan.textContent = totalItems;
    }
    // Update other summary fields
    if (subtotalSpan) subtotalSpan.textContent = `₱${subtotal.toFixed(2)}`;
    if (shippingSpan) shippingSpan.textContent = `₱${shippingFee.toFixed(2)}`;
    if (totalSpan) totalSpan.textContent = `₱${total.toFixed(2)}`;
}

// Displays temporary notification messages to the user
function showNotification(message) {
    // Create notification div
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 1000;
        animation: fadeInOut 3s ease-in-out;
        font-family: Arial, sans-serif;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;

    // Add animation keyframes if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateY(20px); }
                10% { opacity: 1; transform: translateY(0); }
                90% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
    }

    // Add notification to page
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ==========================
// TASK 4: FORM VALIDATION & SUBMISSION (checkout.html)
// ==========================

// Sets up checkout form validation and submission
function setupCheckoutForm() {
    const placeOrderBtn = document.getElementById('place-order-btn');
    if (!placeOrderBtn) return; // Exit if not on checkout page

    // Add click event listener to place order button
    placeOrderBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default button behavior
        validateAndSubmitForm(); // Validate and process form
    });

    // Inner function to validate all form fields
    function validateAndSubmitForm() {
        // Get all form input elements
        const nameInput = document.querySelector('input[name="name"]');
        const provinceInput = document.querySelector('input[name="province"]');
        const municipalityInput = document.querySelector('input[name="municipality"]');
        const streetInput = document.querySelector('input[name="street"]');
        const zipInput = document.querySelector('input[name="zip"]');

        // Remove any existing error messages and error styling
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

        let isValid = true; // Track overall form validity

        // Helper function to validate individual fields
        const validateField = (field, fieldName, pattern = null) => {
            if (!field || !field.value.trim()) {
                isValid = false; // Field is empty
                if (field) {
                    field.classList.add('error'); // Add error styling
                    const errorMsg = document.createElement('span');
                    errorMsg.textContent = `${fieldName} is required`;
                    errorMsg.classList.add('error-message');
                    field.parentNode.insertBefore(errorMsg, field.nextSibling);
                }
            } else if (pattern && !pattern.test(field.value.trim())) {
                isValid = false; // Field doesn't match required pattern
                field.classList.add('error');
                const errorMsg = document.createElement('span');
                errorMsg.textContent = `Please enter a valid ${fieldName.toLowerCase()}`;
                errorMsg.classList.add('error-message');
                field.parentNode.insertBefore(errorMsg, field.nextSibling);
            }
        };

        // Validate each required field
        validateField(nameInput, 'Full Name');
        validateField(provinceInput, 'Province');
        validateField(municipalityInput, 'Municipality');
        validateField(streetInput, 'Street Address');
        validateField(zipInput, 'Zip Code', /^\d{4,5}$/); // Zip code pattern: 4 or 5 digits

        // Check if payment method is selected
        const paymentSelected = document.querySelector('input[name="payment"]:checked');
        if (!paymentSelected) {
            isValid = false;
            const paymentSection = document.querySelector('.payment-method-section');
            if (paymentSection) {
                const errorMsg = document.createElement('span');
                errorMsg.textContent = 'Please select a payment method';
                errorMsg.classList.add('error-message');
                errorMsg.style.cssText = 'color: red; display: block; margin-top: 10px;';
                paymentSection.appendChild(errorMsg);
            }
        }

        // If all validations pass
        if (isValid) {
            // Check if cart is empty
            if (cart.length === 0) {
                alert('Your cart is empty! Please add items before checking out.');
                window.location.href = 'products.html';
                return;
            }

            // Calculate order totals
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shippingFee = 60;
            const total = subtotal + shippingFee;

            // Log order details for debugging/record
            console.log('Order Successful! Order Details:', {
                items: cart,
                subtotal: subtotal,
                shipping: shippingFee,
                total: total,
                customer: {
                    name: nameInput.value,
                    province: provinceInput.value,
                    municipality: municipalityInput.value,
                    street: streetInput.value,
                    zip: zipInput.value,
                    payment: paymentSelected.value
                }
            });

            // Show success message
            alert('Order placed successfully! Thank you for your purchase.');

            // Clear the cart after successful order
            cart = [];
            saveCart();

            // Redirect to landing page
            window.location.href = 'landing.html';
        } else {
            console.log('Form validation failed'); // Log validation failure
        }
    }
}

// ==========================
// TASK 5: USER ACCOUNT & ORDER HISTORY (account.html)
// ==========================

// Sets up user account page with order history
function setupUserAccount() {
    // Mock user data (in real app, this would come from a database/backend)
    const currentUser = {
        name: "Nicole",
        orderHistory: [
            { orderId: "#001", date: "2026-03-01", total: 250, items: ["Stylish Shirt"] },
            { orderId: "#002", date: "2026-02-28", total: 150, items: ["Trendy Pants"] },
            { orderId: "#003", date: "2026-02-25", total: 500, items: ["Casual Jacket"] }
        ]
    };

    // Update welcome message with user's name
    const headerH1 = document.querySelector('header h1');
    if (headerH1) {
        headerH1.textContent = `Welcome, ${currentUser.name}`;
    }

    // Get all order card elements
    const orderCards = document.querySelectorAll('.order-card');

    // Add click functionality to each order card
    orderCards.forEach((card, index) => {
        const summary = card.querySelector('summary');
        if (summary && currentUser.orderHistory[index]) {
            // Clone and replace summary to ensure clean event handling
            const newSummary = summary.cloneNode(true);
            summary.parentNode.replaceChild(newSummary, summary);

            // Add click event to show/hide order details
            newSummary.addEventListener('click', (e) => {
                // Prevent duplicate details from being added
                if (card.querySelector('.order-details')) return;

                const order = currentUser.orderHistory[index];
                const detailsDiv = document.createElement('div');
                detailsDiv.classList.add('order-details');
                detailsDiv.style.cssText = 'margin-top: 10px; padding-top: 10px; border-top: 1px solid #ddd;';

                // Create HTML for order details
                const itemsList = order.items.map(item => `<li>${item}</li>`).join('');

                detailsDiv.innerHTML = `
                    <p><strong>Order Date:</strong> ${order.date}</p>
                    <p><strong>Total:</strong> ₱${order.total}</p>
                    <p><strong>Items:</strong></p>
                    <ul>${itemsList}</ul>
                `;

                // Add details to card
                card.appendChild(detailsDiv);
            });
        }
    });
}

// ==========================
// REVIEW SECTION FUNCTIONALITY (detail.html)
// ==========================

// Sets up product review functionality on detail page
function setupReviewSection() {
    // Get all review-related DOM elements
    const ratingSlider = document.getElementById('rating');
    const ratingValue = document.getElementById('rating-value');
    const reviewForm = document.getElementById('review-form');
    const reviewText = document.getElementById('review-text');
    const reviewsContainer = document.getElementById('reviews-container');

    // Mock current user (in real app, would come from authentication)
    const currentUser = {
        name: "Lyndel Carpio"
    };

    // ========================================
    // 1. RATING SLIDER - Update number display
    // ========================================
    // Update rating value display when slider moves
    if (ratingSlider && ratingValue) {
        ratingSlider.addEventListener('input', function () {
            ratingValue.textContent = this.value; // Show current rating value
        });
    }

    // ========================================
    // 2. REVIEW FORM SUBMISSION
    // ========================================
    if (reviewForm) {
        reviewForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent page reload

            // Validate review text
            if (!reviewText.value.trim()) {
                alert('Please write a review first');
                return;
            }

            // Get rating value (default to 0 if slider not present)
            const rating = ratingSlider ? ratingSlider.value : 0;

            // Get current date for review timestamp
            const currentDate = new Date().toLocaleDateString();

            // Create new review element
            const newReview = document.createElement('div');
            newReview.className = 'review-item';

            // Create star rating display (★ for filled, ☆ for empty)
            const starRating = '★'.repeat(rating) + '☆'.repeat(5 - rating);

            // Add review content with HTML structure
            newReview.innerHTML = `
                <p><strong>${currentUser.name}</strong> <span style="color: #ffc107;">${starRating}</span></p>
                <p>"${reviewText.value.trim()}"</p>
                <small>Posted on: ${currentDate}</small>
                <hr>
            `;

            // Add new review to the reviews container
            if (reviewsContainer) {
                reviewsContainer.appendChild(newReview);
            }

            // Clear form fields
            reviewText.value = '';
            if (ratingSlider) ratingSlider.value = 0;
            if (ratingValue) ratingValue.textContent = '0';

            // Show success message
            alert('Thank you for your review!');
        });
    }
}

// ==========================
// TASK 6: INTERACTIVE FEEDBACK (ANIMATIONS)
// ==========================

// Sets up all animations and interactive feedback styles
function setupAnimations() {
    // Create a style element to hold all animation CSS
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        /* Notification fade in/out animation */
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(20px); }
            10% { opacity: 1; transform: translateY(0); }
            90% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-20px); }
        }
        
        /* General fade in animation for elements */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Class for fade-in animation */
        .fade-in {
            animation: fadeIn 0.5s ease-in-out;
        }
        
        /* Form error styling */
        .error {
            border: 2px solid red !important;
            background-color: #ffe6e6 !important;
        }
        
        .error-message {
            color: red;
            font-size: 12px;
            margin-top: 4px;
            display: block;
        }
        
        /* Remove button styling */
        .remove-btn {
            background: #e74c3c !important;
            margin-left: 10px;
            padding: 5px 10px !important;
            font-size: 12px !important;
            border: none;
            border-radius: 5px;
            color: white;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .remove-btn:hover {
            background: #c0392b !important;
            transform: scale(1.05);
        }
        
        /* Pulse animation for button clicks */
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .pulse {
            animation: pulse 0.5s ease-in-out;
        }
        
        /* Smooth transitions for interactive elements */
        .add-to-cart-btn, .hero-btn, .checkout-btn button, .view-btn, .btn {
            transition: all 0.3s ease;
        }
        
        /* Hover effects for buttons */
        .add-to-cart-btn:hover, .hero-btn:hover, .checkout-btn button:hover, .view-btn:hover, .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        /* Active/pressed effect */
        button:active {
            transform: scale(0.98);
        }
        
        /* Review section styles */
        .review-item {
            background: #f9f9f9;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 8px;
            animation: fadeIn 0.5s ease-in-out;
        }
        
        .review-item hr {
            margin-top: 10px;
            border: none;
            border-top: 1px solid #eee;
        }
        
        .review-form {
            margin-top: 20px;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        
        #rating {
            width: 200px;
            cursor: pointer;
        }
        
        #rating-value {
            font-weight: bold;
            color: #e67e22;
        }
        
        textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-family: inherit;
            resize: vertical;
        }
        
        #submit-review-btn {
            background: #e67e22;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: 0.3s;
        }
        
        #submit-review-btn:hover {
            background: #d35400;
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(styleSheet);
}

// ==========================
// EVENT DELEGATION
// ==========================

// Sets up event delegation for dynamically created elements
function setupEventDelegation() {
    // Use event delegation on the body to handle clicks on dynamically added buttons
    document.body.addEventListener('click', (event) => {
        // Check if clicked element is an "Add to Cart" button
        if (event.target.classList && event.target.classList.contains('add-to-cart-btn')) {
            const productId = event.target.getAttribute('data-id'); // Get product ID
            addToCart(productId); // Add item to cart
        }
    });
}

// ==========================
// PRODUCT DETAIL PAGE (detail.html)
// ==========================

// Loads and displays product details on the detail page
function loadProductDetail() {
    // Get product ID from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Only execute if on detail.html and product ID exists
    if (productId && window.location.pathname.includes('detail.html')) {
        const product = products.find(p => p.id === parseInt(productId));

        if (product) {
            // Update product title
            const h1 = document.querySelector('.product-info h1');
            if (h1) h1.textContent = product.name;

            // Update product image
            const productImg = document.querySelector('.product-wrapper img');
            if (productImg) {
                productImg.src = product.image;
                productImg.alt = product.name;
                productImg.onerror = function () { this.src = 'image/placeholder.jpg'; };
            }

            // Update product price
            const priceElement = document.querySelector('.product-info .price');
            if (priceElement) priceElement.textContent = `₱${product.price}`;

            // Update product description
            const descriptionElement = document.querySelector('.product-info .description');
            if (descriptionElement) descriptionElement.textContent = product.description;

            // Update product specifications table
            const specTable = document.querySelector('.specs table');
            if (specTable) {
                // Add product-specific specifications
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <th>Product ID</th>
                    <td>${product.id}</td>
                `;
                specTable.appendChild(newRow);
            }

            // Setup Add to Cart functionality for detail page
            const addToCartBtn = document.querySelector('.btn');
            const quantityInput = document.querySelector('.options input[type="number"]');
            const colorSelect = document.querySelector('.options select:first-of-type');
            const sizeSelect = document.querySelector('.options select:last-of-type');

            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

                    // Get selected options for feedback
                    const color = colorSelect ? colorSelect.value : 'Default';
                    const size = sizeSelect ? sizeSelect.value : 'Default';

                    // Add to cart with selected quantity
                    addToCart(product.id, quantity);
                    // Show detailed notification
                    showNotification(`${product.name} (${color}, ${size}) added to cart!`);
                });
            }
        }
    }
}

// ==========================
// SIGNUP FORM VALIDATION
// ==========================

// Sets up signup form validation
function setupSignupForm() {
    const signupForm = document.getElementById('signup-form');
    if (!signupForm) return; // Exit if not on signup page

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent form submission

        // Get form fields
        const fullname = document.getElementById('fullname');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirm = document.getElementById('confirm');

        let isValid = true; // Track validity

        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

        // Helper to show field-specific errors
        const showFieldError = (field, message) => {
            const errorMsg = document.createElement('span');
            errorMsg.textContent = message;
            errorMsg.classList.add('error-message');
            field.parentNode.insertBefore(errorMsg, field.nextSibling);
        };

        // Validate full name
        if (!fullname.value.trim()) {
            isValid = false;
            fullname.classList.add('error');
            showFieldError(fullname, 'Full name is required');
        }

        // Validate email format
        if (!email.value.trim()) {
            isValid = false;
            email.classList.add('error');
            showFieldError(email, 'Email is required');
        } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
            isValid = false;
            email.classList.add('error');
            showFieldError(email, 'Please enter a valid email address');
        }

        // Validate password length
        if (!password.value.trim()) {
            isValid = false;
            password.classList.add('error');
            showFieldError(password, 'Password is required');
        } else if (password.value.length < 6) {
            isValid = false;
            password.classList.add('error');
            showFieldError(password, 'Password must be at least 6 characters');
        }

        // Validate password confirmation
        if (!confirm.value.trim()) {
            isValid = false;
            confirm.classList.add('error');
            showFieldError(confirm, 'Please confirm your password');
        } else if (password.value !== confirm.value) {
            isValid = false;
            confirm.classList.add('error');
            showFieldError(confirm, 'Passwords do not match');
        }

        if (isValid) {
            alert('Account created successfully!');
            window.location.href = 'account.html';
        }
    });
}
// ==========================
// FILTER FUNCTIONALITY
// ==========================

// Sets up product filtering by price (low-to-high or high-to-low)
function setupFilters() {
    // Get the radio buttons for price filtering options
    const lowToHighRadio = document.querySelector('input[value="low-to-high"]');  // Sort by ascending price
    const highToLowRadio = document.querySelector('input[value="high-to-low"]');  // Sort by descending price

    // Inner function that performs the filtering and re-renders products
    const filterProducts = () => {
        // Create a copy of the original products array (spread operator)
        // This ensures we don't modify the original products array
        let filteredProducts = [...products];

        // Apply sorting based on which radio button is selected
        if (lowToHighRadio && lowToHighRadio.checked) {
            // Sort by price ascending (lowest to highest)
            // a.price - b.price gives negative if a is cheaper, positive if a is more expensive
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (highToLowRadio && highToLowRadio.checked) {
            // Sort by price descending (highest to lowest)
            // b.price - a.price gives negative if b is cheaper, positive if b is more expensive
            filteredProducts.sort((a, b) => b.price - a.price);
        }

        // Get the container where products will be displayed
        const productContainer = document.querySelector('.product-container');
        if (!productContainer) return; // Exit if not on products page

        // Clear the current product display
        productContainer.innerHTML = '';

        // Loop through each filtered product and create HTML elements
        filteredProducts.forEach(product => {
            // Create article element for each product card
            const card = document.createElement('article');
            card.classList.add('product-card');
            card.setAttribute('data-product-id', product.id); // Store ID for animations

            // Create and configure product image
            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;
            img.onerror = function () { this.src = 'image/placeholder.jpg'; }; // Fallback for missing images

            // Create product name heading
            const name = document.createElement('h3');
            name.textContent = product.name;

            // Create product price paragraph
            const price = document.createElement('p');
            price.textContent = `₱${product.price}`;

            // Create "Add to Cart" button
            const addButton = document.createElement('button');
            addButton.textContent = 'Add to Cart';
            addButton.classList.add('add-to-cart-btn');
            addButton.setAttribute('data-id', product.id); // Store product ID for cart

            // Create "View Details" link
            const viewLink = document.createElement('a');
            viewLink.href = `detail.html?id=${product.id}`; // Link to detail page with product ID
            viewLink.textContent = 'View Details';
            viewLink.classList.add('view-btn');

            // Assemble all elements into the card
            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(price);
            card.appendChild(addButton);
            card.appendChild(viewLink);

            // Add the completed card to the product container
            productContainer.appendChild(card);
        });
    };

    // Add event listeners to radio buttons - filter when selection changes
    if (lowToHighRadio) lowToHighRadio.addEventListener('change', filterProducts);
    if (highToLowRadio) highToLowRadio.addEventListener('change', filterProducts);
}

// ==========================
// INITIALIZATION
// ==========================

// Event listener that runs when the DOM is fully loaded
// This ensures all HTML elements exist before we try to manipulate them
document.addEventListener('DOMContentLoaded', () => {
    // Load cart data from localStorage (preserves cart across page reloads)
    loadCart();

    // Setup all animations and interactive styles
    setupAnimations();

    // Render all products on the products page
    renderProducts();

    // Setup price filtering functionality on products page
    setupFilters();

    // Render featured products on landing/home page
    renderFeaturedProducts();

    // Setup event delegation for dynamically created buttons (like Add to Cart)
    setupEventDelegation();

    // Setup checkout form validation and submission on checkout page
    setupCheckoutForm();

    // Setup user account page with order history functionality
    setupUserAccount();

    // Load and display product details on detail page (if on that page)
    loadProductDetail();

    // Setup signup form validation on signup page
    setupSignupForm();

    // Initialize review section functionality on product detail page
    setupReviewSection();

    // Update checkout summary totals (subtotal, shipping, total)
    // This runs on all pages but only updates if elements exist
    updateCheckoutSummary();

    // Check if we're on a page with cart items (cart page)
    // If so, render the cart contents
    if (document.querySelector('.cart-items')) {
        renderCart();
    }
});