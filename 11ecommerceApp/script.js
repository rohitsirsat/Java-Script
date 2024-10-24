// document.addEventListener("DOMContentLoaded", () => {
//   const products = [
//     { id: 1, name: "Product 1", price: 29.99 },
//     { id: 2, name: "Product 2", price: 19.99 },
//     { id: 3, name: "Product 3", price: 59.999 },
//   ];

//   const cart = [];

//   const productList = document.getElementById("product-list");
//   const cartItems = document.getElementById("cart-items");
//   const emptyCartMessage = document.getElementById("empty-cart");
//   const cartTotalMessage = document.getElementById("cart-total");
//   const totalPriceDisplay = document.getElementById("total-price");
//   const checkOutBtn = document.getElementById("checkout-btn");

//   products.forEach((product) => {
//     const productDiv = document.createElement("div");
//     productDiv.classList.add("product");
//     productDiv.innerHTML = `
//       <span>${product.name} - $${product.price.toFixed(2)}</span>
//       <button data-id="${product.id}">Add to cart</button>
//       `;

//     productList.appendChild(productDiv);
//   });

//   productList.addEventListener("click", (e) => {
//     if (e.target.tagName === "BUTTON") {
//       const productId = parseInt(e.target.getAttribute("data-id"));
//       const product = products.find((p) => p.id === productId);
//       addToCart(product);
//     }
//   });

//   function addToCart(product) {
//     cart.push(product);
//     // save cart in local storage
//     localStorage.setItem("cart", JSON.stringify(cart));
//     renderCart();
//   }

//   if (JSON.parse(localStorage.getItem("cart")).length > 0) {
//     renderCart();
//   } else {
//     emptyCartMessage.classList.remove("hidden");
//     cartTotalMessage.classList.add("hidden");
//   }

//   function renderCart() {
//     const prevItem = JSON.parse(
//       localStorage.getItem("cart", JSON.stringify(cart))
//     );
//     console.log(prevItem);

//     cartItems.innerText = "";
//     let totalPrice = 0;

//     if (prevItem.length > 0) {
//       // emptyCartMessage.classList.add("hidden");
//       cartTotalMessage.classList.remove("hidden");

//       prevItem.forEach((item, index) => {
//         totalPrice += item.price;
//         const cartItem = document.createElement("div");
//         cartItem.innerHTML = `
//           ${item.name} - $${item.price.toFixed(2)}
//           `;

//         cartItems.appendChild(cartItem);
//         // set the item in local storage
//         // localStorage.setItem(`product-${index}`, JSON.stringify(item));
//         totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;

//         const removeBtn = document.createElement("button");
//         removeBtn.classList.add("removeItem-btn");
//         removeBtn.innerHTML = "Remove";
//         cartItem.appendChild(removeBtn);
//         removeBtn.addEventListener("click", () => {
//           cart.splice(index, 1);

//           // remove item from local storage

//           prevItem.splice(index, 1);
//           localStorage.setItem("cart", JSON.stringify(prevItem));

//           renderCart();
//         });
//       });
//     } else {
//       emptyCartMessage.classList.remove("hidden");
//       totalPriceDisplay.textContent = `$0.00`;
//     }
//   }

//   checkOutBtn.addEventListener("click", () => {
//     cart.length = 0;
//     alert("Checkout successfully");
//     renderCart();
//   });
// });

// slightly modified (optmized) code
document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.99 },
  ];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  // Helper to get the cart from localStorage
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  // Helper to save the cart to localStorage
  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Render the product list dynamically
  function renderProducts() {
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to cart</button>
      `;
      productList.appendChild(productDiv);
      if (productList.length === 0) {
        emptyCartMessage.classList.remove("hidden");
        // cartTotalMessage.classList.remove("hidden");
      }
    });
  }

  // Add product to cart and save it to localStorage
  function addToCart(product) {
    const cart = getCart();
    cart.push(product);
    saveCart(cart);
    renderCart();
  }

  // Render the cart from localStorage
  function renderCart() {
    const cart = getCart();
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");

      cart.forEach((item, index) => {
        totalPrice += item.price;

        const cartItem = document.createElement("div");
        cartItem.innerHTML = `${item.name} - $${item.price.toFixed(2)}`;
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("removeItem-btn");
        removeBtn.innerHTML = "Remove";

        cartItem.appendChild(removeBtn);
        cartItems.appendChild(cartItem);

        // Remove button handler
        removeBtn.addEventListener("click", () => {
          removeFromCart(index);
        });
      });

      totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
      totalPriceDisplay.textContent = `$0.00`;
    }
  }

  // Remove item from cart
  function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
  }

  // Handle checkout
  checkOutBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    alert("Checkout successful");
    renderCart();
  });

  // Event delegation for adding products to cart
  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      if (product) addToCart(product);
    }
  });

  // Initial setup
  renderProducts();
  renderCart();
});
