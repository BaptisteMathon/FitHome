const allproduct = document.getElementById("all-product");
allproduct.addEventListener("click", goToStripe);

const URL = "http://localhost:3000/Card";
fetch(URL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    let finalPrice = 0;
    for (let i = 0; i < data.length; i++) {
      let newTr = document.createElement("tr");

      let newTd1 = document.createElement("td");
      let newTd1Img = document.createElement("img");
      newTd1Img.src = data[i]["img"];
      newTd1Img.className = "imgShop";
      newTd1.append(newTd1Img);
      newTd1.className = "imgtd";
      let newTd2 = document.createElement("td");
      newTd2.innerText = data[i]["products"];
      let newTd3 = document.createElement("td");
      newTd3.innerHTML = data[i]["quantity"];
      let newTd4 = document.createElement("td");
      newTd4.innerText = data[i]["price"] * data[i]["quantity"];
      finalPrice += data[i]["price"] * data[i]["quantity"];
      let newTd5 = document.createElement("td");
      newTd5.innerHTML = `<button onclick="AddQuantity(${data[i]["id"]}, ${data[i]["quantity"]}, ${data[i]["price"]}, '${data[i]["products"]}', '${data[i]["img"]}', '${data[i]["stripe_price_id"]}')" class="buttonSC" style="padding: 0 3px")">+</button><img src="Img/del.png" alt="Delete" width="20px" style="cursor:pointer;" onclick="DeleteProd(${data[i]["id"]})"><button class="buttonSC" style="padding: 0 5px" onclick="LessQuantity(${data[i]["id"]}, ${data[i]["quantity"]}, ${data[i]["price"]}, '${data[i]["products"]}', '${data[i]["img"]}', '${data[i]["stripe_price_id"]}')">-</button>`;
      newTd5.style.display = "flex";
      newTd5.style.justifyContent = "center";
      newTd5.style.padding = "60px 5px";
      newTd5.style.backgroundColor = "grey";

      newTr.append(newTd1);
      newTr.append(newTd2);
      newTr.append(newTd3);
      newTr.append(newTd4);
      newTr.append(newTd5);

      if (i % 2 == 0) {
        newTr.style.backgroundColor = "#ff7f27";
      } else {
        newTr.style.backgroundColor = "#fda400a9";
      }
      document.getElementById("tbody").append(newTr);
    }
    document.getElementById("finalPrice").innerText = finalPrice + "€";
  });

function AddQuantity(id, q, price, product, img, stripe) {
  console.log("id: " + id);
  console.log("quantity" + q);

  fetch(URL + "/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
      products: product,
      quantity: q + 1,
      img: img,
      price: price,
      stripe_price_id: stripe,
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

function LessQuantity(id, q, price, product, img, stripe) {
  console.log("id: " + id);
  console.log("quantity" + q);

  if (q > 1) {
    fetch(URL + "/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        products: product,
        quantity: q - 1,
        img: img,
        price: price,
        stripe_price_id: stripe,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  }
}

function DeleteProd(id) {
  fetch(URL + "/" + id, {
    method: "DELETE",
  });
}

async function goToStripe() {
  // Get products from localstorage.
  const cart = getCartData();

  const body = cart.map((product) => {
    return {
      price: product.stripe_price_id,
      quantity: product.quantity,
    };
  });

  // Connect with payment service.
  console.log("Connecting with Payment Service...");
  fetch("http://localhost:4242/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      window.location.href = data.url;
    });
}

function getCartData() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
