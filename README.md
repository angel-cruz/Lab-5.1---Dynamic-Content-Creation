
# Lab-5.1---Dynamic-Content-Creation
This lab focuses on modifying elements, creating and appending new elements, and updating content dynamically using JavaScript.

<img width="1484" height="623" alt="greencut-lawn-snapshot" src="https://github.com/user-attachments/assets/78d8d84d-5bf7-44b4-b576-24f8fea79793" />

## Reflection Questions

### 1. How did you dynamically create and append new elements to the DOM?

I used `document.createElement()` to create the different parts of each cart item, like the product name, quantity input, and remove button. After creating them, I used `append()` and `appendChild()` to add everything to the cart.

### 2. What steps did you take to ensure accurate updates to the total price?

I created a `calculateTotal()` function that goes through the items in the cart and calculates the total based on the price and quantity. I made sure to run this function whenever an item is added, removed, or the quantity is changed.

### 3. How did you handle invalid input for product name or price?

I added checks to make sure the user enters a product name and a price greater than zero. If something is missing or incorrect, an error message is shown instead of adding the item to the cart.

### 4. What challenges did you face when implementing the remove functionality?

The main challenge was making sure the correct item was removed and that the total changed afterward. I used `closest()` to find the cart item connected to the remove button, removed it, and then recalculated the total.
