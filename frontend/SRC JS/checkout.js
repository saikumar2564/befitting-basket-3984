let products = JSON.parse(localStorage.getItem("productsAdd")) || [];

let totalprices = localStorage.getItem("totalprice") || "";
let productcounts = localStorage.getItem("productcounts") || 0;

let loginUserToken = JSON.parse(localStorage.getItem("loginUser")) || false;
console.log("loginUserToken:", loginUserToken);
let login_name = JSON.parse(localStorage.getItem("login_name")) || [];
// order summery variables
let totalprice = document.getElementById("totalprice");

let bagcount = document.getElementById("itemcounts");
bagcount.textContent = productcounts;
let estimatedtotal = document.getElementById("estimatedtotal");
let productcard = document.getElementById("summeryproduct");
let zipdoller = document.getElementById("zipdoller");

// product append
appendproduct(products);
function appendproduct(data) {
  let card = `
   ${data
     .map((item) =>
       getcards(item.image1, item.name, item.size, item.price, item.quantity)
     )
     .join("")}
   `;
  productcard.innerHTML = card;
}

function getcards(image, name, size, price, quantity) {
  /* 
   let amount=JSON.parse(localStorage.getItem("discount"))
    // totalp+=price*quantity;
    totalprice.textContent="₹"+amount;
    estimatedtotal.textContent="₹"+amount;
    */

  totalprice.textContent = "₹" + totalprices;
  estimatedtotal.textContent = "₹" + totalprices;

  let cards = `<div class="products">
    <div id="image">
        <img src="${image}" alt="" id="img">
        <p id="style">Style #38326</p>
    </div>
    <div id="info">
     <p id="title">${name}</p>
     <p id="shoesize">Size: ${size}.0</p>
     <p>Width: Medium</p>
     <p>Color: Brown/Red/Gum</p>
     <p id="priceofshoe">₹${price}</p>
     <p class="promo">BOGO 1st pair only</p>
     <p class="promo">Excluded from Promo</p>
    </div>
</div>
<hr>`;
  return cards;
}
//order summary variable end

// form data catching
let email = document.getElementById("email");
let fname = document.getElementById("firstname");
let lname = document.getElementById("lastname");
let streetadrs = document.getElementById("streedadds");
let optionaladrs = document.getElementById("opt");
let city = document.getElementById("city");
let state = document.getElementById("state");
let zipcode = document.getElementById("zipcode");
let phone = document.getElementById("phonenumber");
let submitbtn = document.getElementById("submitbtn");
let cardholdername = document.getElementById("cardholdername");
let cardnumber = document.getElementById("cardnumber");
let expirydate = document.getElementById("expirydate");
let cvv = document.getElementById("cvv");
submitbtn.addEventListener("click", () => {
  let obj = {
    email: email.value,
    fname: fname.value,
    lname: lname.value,
    streetadrs: streetadrs.value,
    optionaladrs: optionaladrs.value,
    city: city.value,
    state: state.value,
    zipcode: zipcode.value,
    phone: phone.value,
  };
  let carddetails = {
    holdername: cardholdername.value,
    cardnumber: cardnumber.value,
    expirydate: expirydate.value,
    cvv: cvv.value,
  };
  if (loginUserToken != true) {
    alert("You are not logged in");
    onclick = "window.location.href='login.html';";
    return;
  }
  if (email.value == "") {
    window.location.href = "#contact";
    email.style.border = "2px solid red";
  } else if (fname.value == "") {
    window.location.href = "#myaddress";
    fname.style.border = "2px solid red";
  } else if (lname.value == "") {
    window.location.href = "#myaddress";
    lname.style.border = "2px solid red";
  } else if (streetadrs.value == "") {
    window.location.href = "#myaddress";
    streetadrs.style.border = "2px solid red";
  } else if (city.value == "") {
    window.location.href = "#myaddress";
    city.style.border = "2px solid red";
  } else if (state.value == "state") {
    window.location.href = "#myaddress";
    state.style.border = "2px solid red";
  } else if (zipcode.value == "") {
    window.location.href = "#myaddress";
    zipcode.style.border = "2px solid red";
  } else if (phone.value == "") {
    window.location.href = "#myaddress";
    phone.style.border = "2px solid red";
  } else if (cardholdername.value == "") {
    window.location.href = "#paymentcard";
    cardholdername.style.border = "2px solid red";
  } else if (cardnumber.value == "") {
    window.location.href = "#paymentcard";
    cardnumber.style.border = "2px solid red";
  } else if (expirydate.value == "") {
    window.location.href = "#paymentcard";
    expirydate.style.border = "2px solid red";
  } else if (cvv.value == "") {
    window.location.href = "#paymentcard";
    cvv.style.border = "2px solid red";
  } else {
    console.log(obj);
    console.log(carddetails);
    storingdatainorderapi();
  }
});

// getting data for order page
function storingdatainorderapi() {
  let obj = {};
  obj.firstName = fname.value;
  obj.lastName = lname.value;
  obj.Address =
    streetadrs.value +
    "," +
    city.value +
    "," +
    state.value +
    "," +
    zipcode.value;
  obj.phoneNo = phone.value;
  obj.orderValue = totalprices;
  obj.products = products;
  fetch(`https://63c687494ebaa8028547befe.mockapi.io/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("orders data");
      console.log(data);
      window.location.assign("finalpage.html");
    });
}

//closing of form data

// back to cart data link adding here using js because in html link are showing in blue color and I can't do text decoration none there.../

let backtocarttop = document.getElementById("topback");
backtocarttop.addEventListener("click", () => {
  window.location.assign("cart.html");
});
let backtocartbottom = document.getElementById("backtocart");
backtocartbottom.addEventListener("click", () => {
  window.location.assign("cart.html");
});
