let total = document.getElementById("total");
let count = document.getElementById("count");
let bagitemcount = document.getElementById("itemcounts");
let amt = document.getElementById("amount");
let inp = document.getElementById("inp");
let apply = document.getElementById("app");
let empty = document.getElementById("empty");

let coupon = document.getElementById("coupon");

let myCart = JSON.parse(localStorage.getItem("product")) || {};
let cartData = JSON.parse(localStorage.getItem("productsAdd")) || [];

let sum = 0,
  s = 0,
  sum1 = 0;

display(cartData);
function display(data) {
  empty.innerHTML = "";
  data.forEach((element) => {
    let box = document.createElement("div");
    let products = document.createElement("div");
    let productDetails = document.createElement("div");
    let productAmount = document.createElement("div");
    let btn = document.createElement("div");

    let img = document.createElement("img");
    img.setAttribute("src", element.image1);

    let brand = document.createElement("h5");
    brand.innerText = element.brand;

    let gender = document.createElement("h5");
    gender.innerText = element.gender;

    let name = document.createElement("h4");
    name.innerText = element.name;

    let price = document.createElement("h4");
    price.innerText = `₹${element.price}`;

    let quantity = document.createElement("span");
    quantity.innerText = element.quantity;

    let Increment = document.createElement("button");
    let Decrement = document.createElement("button");

    Increment.textContent = "+";
    Decrement.textContent = "-";

    let remove = document.createElement("button");
    remove.innerText = "x";
    // ------------------Remove------------------------

    remove.addEventListener("click", () => {
      cartData = cartData.filter((ele) => {
        return ele.id !== element.id;
      });
      localStorage.setItem("productsAdd", JSON.stringify(cartData));
      display(cartData);
    });

    Increment.addEventListener("click", () => {
      element = element.quantity++;
      localStorage.setItem("productsAdd", JSON.stringify(cartData));
      display(cartData);
    });

    Decrement.addEventListener("click", () => {
      if (element.quantity > 1) {
        element = element.quantity--;
        localStorage.setItem("productsAdd", JSON.stringify(cartData));
        display(cartData);
      }
    });
    let br = document.createElement("hr");
    btn.append(remove);
    products.append(img);
    productDetails.append(name, brand, gender);
    productAmount.append(price, Decrement, quantity, Increment);
    box.append(products, productDetails, productAmount, btn);
    empty.append(box, br);
  });

  sum = 0;
  s = 0;
  sum1 = 0;
  for (let i = 0; i < cartData.length; i++) {
    sum += cartData[i].price * cartData[i].quantity;
    s += cartData[i].quantity;
  }
  sum1 = sum + 0;
  count.textContent = s;
  bagitemcount.textContent = s;
  //product count adding to localstorage
  localStorage.setItem("productcounts", s);
  //product count added to localstorage
  total.textContent = sum;
  // console.log(sum1)

  amt.textContent = sum1;
  localStorage.setItem("totalprice", sum1);
}
apply.addEventListener("click", () => {
  inpVal = inp.value;
  if (inpVal == "masai20") {
    sum1 = Math.floor(sum1 * 0.8);
    amt.textContent = sum1;
    localStorage.setItem("totalprice", sum1);
    coupon.innerText = "Applied";
    coupon.style.fontSize = "30px";
    coupon.style.color = "rgb(235, 19, 55)";
  } else {
    alert("Not a valid Coupon");
    amt.textContent = sum1;
  }
});
let signout = document.getElementById("signoutButton");
let loginUserToken = JSON.parse(localStorage.getItem("loginUser")) || false;
let login_name = JSON.parse(localStorage.getItem("login_name")) || [];
if (loginUserToken == true) {
  console.log("yes");
  signout.innerText = " Sign Out";
  signout.style.fontSize = "13px";
  signout.style.fontWeight = "bolder";
  signout.style.cursor = "pointer";
  // signout.addEventListener("click", () => {
  //   loginUserToken = false;
  //   login_name = "";
  // });
}

signout.addEventListener("click", () => {
  loginUserToken = false;
  login_name = "";
  cartData = [];
  localStorage.setItem("cart", JSON.stringify(cartData));
  localStorage.setItem("loginUser", JSON.stringify(loginUserToken));
  localStorage.setItem("login_name", JSON.stringify(login_name));
  localStorage.setItem("productsAdd", JSON.stringify(cartData));
  window.location.href = "index.html";
});
