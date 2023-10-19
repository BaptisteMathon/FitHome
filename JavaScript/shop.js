const URL = "http://localhost:3000/products";
fetch(URL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      let newDiv = document.createElement("div");
      // newDiv.href = "shop.html"
      newDiv.id = "Products";

      let newProduct = document.createElement("p");
      newProduct.innerText = data[i]["name_product"];
      newProduct.className = "left-product";
      let newPrice = document.createElement("p");
      newPrice.innerText = data[i]["price"] + "€";
      newPrice.className = "right-price";
      let newImg = document.createElement("img");
      newImg.src = data[i]["img"];
      let newButton = document.createElement("button");
      newButton.innerText = "Add to card";
      newButton.className = "AddCard";
      newButton.id = `AddCard${i}`;
      newButton.setAttribute(
        "onclick",
        `AddCard("${data[i]["name_product"]}", "${data[i]["img"]}", "${data[i]["price"]}", "${data[i]["stripe_price_id"]}")`
      );

      newDiv.append(newImg);
      newDiv.append(newProduct);
      newDiv.append(newPrice);

      fetch("http://localhost:3000/Card").then(function(response2){
            return response2.json();
        }).then(function(data2){
            console.log(data2)
            let count = 0
            for(let j = 0; j < data2.length; j++){
                if(data2[j]["products"] == data[i]["name_product"]){
                    count = 1
                }
            }
            if(count == 0){
                newDiv.append(newButton)
            }
        })

      document.getElementById("our-products").append(newDiv);

      console.log(newDiv);
    }
  });

  function AddCard(name, img, price, stripe) {
    fetch("http://localhost:3000/Card", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: 0,
        products: name,
        quantity: 1,
        img: img,
        price: parseInt(price),
        stripe_price_id: stripe
      }),
    })
      .then(function (response) {})
      .then(function (data) {
        // location.reload()
      });
  }
