const URL = "http://localhost:3000/products";
fetch(URL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      if (i <= 5) {
        let newDiv = document.createElement("a");
        newDiv.href = "shop.html";
        newDiv.id = "Products";

        let newProduct = document.createElement("p");
        newProduct.innerText = data[i]["name_product"];
        newProduct.className = "left-product";
        let newPrice = document.createElement("p");
        newPrice.innerText = data[i]["price"] + "€";
        newPrice.className = "right-price";
        let newImg = document.createElement("img");
        newImg.src = data[i]["img"];

        newDiv.append(newImg);
        newDiv.append(newProduct);
        newDiv.append(newPrice);

        document.getElementById("latest-products").append(newDiv);

        console.log(newDiv);
      }
    }
  });
