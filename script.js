const productNameInput = document.getElementById("product-name");
const productPriceInput = document.getElementById("product-price");
const addProductButton = document.getElementById("add-product");
const cart = document.getElementById("cart");
const totalPriceSpan = document.getElementById("total-price");
const errorMessage = document.getElementById("error-message");

function calculateTotal() {
    let total = 0;
    const cartItems = document.querySelectorAll(".cart-item");

    cartItems.forEach((item) => {
        const price = Number(item.dataset.price);
        const quantity = Number(
            item.querySelector(".quantity-input").value
        );

        total += price * quantity;
    });

    totalPriceSpan.textContent = total.toFixed(2);
}

function removeItem(event) {
    const item = event.target.closest(".cart-item");

    item.remove();
    calculateTotal();
}

function updateQuantity(event) {
    const quantityInput = event.target;

    if (Number(quantityInput.value) < 1) {
        quantityInput.value = 1;
    }

    calculateTotal();
}

function createCartItem(productName, productPrice) {
    const listItem = document.createElement("li");
    const productDetails = document.createElement("span");
    const quantityLabel = document.createElement("label");
    const quantityInput = document.createElement("input");
    const removeButton = document.createElement("button");

    listItem.classList.add("cart-item");
    listItem.dataset.price = productPrice;

    productDetails.textContent =
        `${productName} - $${productPrice.toFixed(2)} each`;

    quantityLabel.textContent = "Qty: ";

    quantityInput.type = "number";
    quantityInput.value = 1;
    quantityInput.min = 1;
    quantityInput.classList.add("quantity-input");

    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-button");

    quantityInput.addEventListener("change", updateQuantity);
    removeButton.addEventListener("click", removeItem);

    quantityLabel.appendChild(quantityInput);

    listItem.append(
        productDetails,
        quantityLabel,
        removeButton
    );

    return listItem;
}

function addProduct() {
    const productName = productNameInput.value.trim();
    const productPrice = Number(productPriceInput.value);

    errorMessage.textContent = "";

    if (!productName) {
        errorMessage.textContent = "Please enter a service name.";
        return;
    }

    if (!productPriceInput.value || productPrice <= 0) {
        errorMessage.textContent =
            "Please enter a valid price greater than $0.";
        return;
    }

    const cartItem = createCartItem(productName, productPrice);

    cart.appendChild(cartItem);

    productNameInput.value = "";
    productPriceInput.value = "";

    calculateTotal();
}

addProductButton.addEventListener("click", addProduct);
