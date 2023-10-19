document.addEventListener("DOMContentLoaded", async () => {
  const productId = getProductIdFromQuery();
  if (productId) {
    try {
      const product = await fetchProductData(productId);
      updateProductDetails(product);

      const addToCartButton = document.getElementById("add-to-cart-btn");
      addToCartButton.addEventListener("click", () => {
        const quantity = parseInt(
          document.getElementById("product-quantity").value,
          10
        );

        if (quantity >= 1) {
          addToCart(product, quantity);
        } else {
          alert("Please enter a valid quantity.");
        }
      });
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  } else {
    console.error("No product ID found in the query parameter.");
  }
});

function getProductIdFromQuery() {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get("id");
}

async function fetchProductData(productId) {
  try {
    const response = await fetch(`http://localhost:5500/products/${productId}`);
    if (!response.ok) {
      throw new Error("Product not found");
    }
    const product = await response.json();
    return product;
  } catch (error) {
    throw error;
  }
}

function updateProductDetails(product) {
  document.getElementById("product-name").textContent = product.name_product;
  document.getElementById("product-price").textContent = `$ ${product.price}`;
  document.getElementById("product-description").textContent =
    product.description;
  document.getElementById("product-image").src = product.img;
  document.getElementById("product-image").alt = product.name_product;
}

async function addToCart(product, quantity = 1) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let productInCart = cart.find((item) => item.id === product.id);
  if (productInCart) {
    productInCart.quantity += quantity; // Add the specified quantity
  } else {
    productInCart = { ...product, quantity };
    cart.push(productInCart);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`Added ${quantity} ${quantity === 1 ? "item" : "items"} to cart`);
}
