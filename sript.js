
const cart = [];
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartOverlay = document.getElementById("cartOverlay");

window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader").classList.add("hide");
    }, 1200);
});

document.querySelectorAll(".add-cart").forEach(button => {
    button.addEventListener("click", () => {
        const name = button.dataset.name;
        const price = Number(button.dataset.price);
        const existing = cart.find(item => item.name === name);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCart();
        button.textContent = "✓";
        setTimeout(() => button.textContent = "+", 700);
    });
});

function updateCart() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div>
                <h4>${item.name} × ${item.quantity}</h4>
                <p>$${item.price * item.quantity}</p>
            </div>
            <button class="remove-item" onclick="removeItem(${index})">✕</button>
        </div>
    `).join("");

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = "$" + total.toLocaleString();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

document.getElementById("cartButton").addEventListener("click", () => {
    cartOverlay.classList.add("show");
});

document.getElementById("closeCart").addEventListener("click", () => {
    cartOverlay.classList.remove("show");
});

cartOverlay.addEventListener("click", event => {
    if (event.target === cartOverlay) {
        cartOverlay.classList.remove("show");
    }
});

document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".filter.active").classList.remove("active");
        button.classList.add("active");

        const category = button.dataset.filter;

        document.querySelectorAll(".product-card").forEach(card => {
            card.style.display = category === "all" || card.dataset.category === category ? "block" : "none";
        });
    });
});

document.getElementById("newsletterForm").addEventListener("submit", event => {
    event.preventDefault();
    const email = event.target.querySelector("input").value;
    alert("Thank you for subscribing: " + email);
    event.target.reset();
});

document.getElementById("checkout").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Thank you for choosing VELOCITY! Your total is " + cartTotal.textContent);
});
