const productNameInput = document.getElementById("product-name");
const productPriceInput = document.getElementById("product-price");
const addProductButton = document.getElementById("add-product");
const cart = document.getElementById("cart");
const totalPriceSpan = document.getElementById("total-price");
const errorMessage = document.getElementById("error-message");

function calculateTotal() {
  let totalPrice = 0;

  const cartItems = document.querySelectorAll(".cart-item");

  cartItems.forEach(function (item) {
    const price = Number(item.dataset.price);
    const quantityInput = item.querySelector(".quantity-input");
    const quantity = Number(quantityInput.value);

    totalPrice += price * quantity;
  });

  totalPriceSpan.textContent = totalPrice.toFixed(2);
}

function removeItem(event) {
  const item = event.target.closest(".cart-item");

  item.remove();

  calculateTotal();
}

function updateQuantity(event) {
  const quantityInput = event.target;
  let quantity = Number(quantityInput.value);

  if (quantity < 1) {
    quantityInput.value = 1;
  }

  calculateTotal();
}

function createCartItem(productName, productPrice) {
  const listItem = document.createElement("li");

  listItem.classList.add("cart-item");
  listItem.dataset.price = productPrice;

  const productDetails = document.createElement("span");

  productDetails.textContent =
    `${productName} - $${productPrice.toFixed(2)} each`;

  const quantityLabel = document.createElement("label");

  quantityLabel.textContent = "Qty: ";

  const quantityInput = document.createElement("input");

  quantityInput.type = "number";
  quantityInput.value = 1;
  quantityInput.min = 1;

  quantityInput.classList.add("quantity-input");

  quantityInput.addEventListener(
    "change",
    updateQuantity
  );

  quantityLabel.appendChild(quantityInput);

  const removeButton = document.createElement("button");

  removeButton.textContent = "Remove";

  removeButton.classList.add("remove-button");

  removeButton.addEventListener(
    "click",
    removeItem
  );

  listItem.appendChild(productDetails);
  listItem.appendChild(quantityLabel);
  listItem.appendChild(removeButton);

  return listItem;
}

function addProduct() {
  const productName = productNameInput.value.trim();
  const productPrice = Number(productPriceInput.value);

  errorMessage.textContent = "";

  if (productName === "") {
    errorMessage.textContent =
      "Please enter a product name.";

    return;
  }

  if (
    productPriceInput.value === "" ||
    productPrice <= 0
  ) {
    errorMessage.textContent =
      "Please enter a valid price greater than $0.";

    return;
  }

  const cartItem =
    createCartItem(productName, productPrice);

  cart.appendChild(cartItem);

  productNameInput.value = "";
  productPriceInput.value = "";

  calculateTotal();
}

addProductButton.addEventListener(
  "click",
  addProduct
);
