const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
  // fetch('js/data.json')
    .then((response) => response.json())
    .then((data) => showProducts(data));
    // .then((data) => console.log(data[0].description));
};
 
loadProducts();

// show all product in UI 
const showProducts = (products) => {
const allProducts = products.map((pd) => pd);
for (const product of allProducts) {
    const image = product.image;
    const {rate,count}= product.rating
      
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
      <img class="product-image" src=${image}></img>
      </div>
      <h5>${product.title.slice(0,20)}</h5>
      <p>Category: ${product.category}</p>
      <h6>Total-Rating : ${product.rating.count} </h6>
      <h6>Average-rating: ${product.rating.rate}</h6>
      <h5>Price: $ ${product.price}</h5>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success me-2">Add to cart</button>
      <button id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};


let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
const element = document.getElementById(id).innerText;
const converted = parseFloat(element);
return converted;
};

// main price update function
const updatePrice = (id, value) => {
const convertedOldPrice = getInputValue(id);
const convertPrice = parseFloat(value);
const total = convertedOldPrice + convertPrice;
// console.log(total, typeof total)
//  document.getElementById(id).innerText = Math.round(total);
 document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 0) {
     setInnerText("delivery-charge", 20);
     setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 200) {
     setInnerText("delivery-charge", 30);
     setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
    const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
 // console.log(grandTotal)
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
