let signout = document.getElementById("signoutButton");
let loginUserToken = JSON.parse(localStorage.getItem("loginUser")) || false;
console.log("loginUserToken", loginUserToken);
let login_name = JSON.parse(localStorage.getItem("login_name")) || [];
if (loginUserToken == true) {
  console.log("yes");
  signout.innerText = "Hi,  " + login_name + "                   Sign Out";
  signout.style.fontSize = "13px";
  signout.style.fontWeight = "bolder";
  signout.style.cursor = "pointer";
  // signout.addEventListener("click", () => {
  //   loginUserToken = false;
  //   login_name = "";
  // });
}
let productcounts = localStorage.getItem("productcounts") || 0;
let itemcounts = document.getElementById("itemcounts");
itemcounts.textContent = productcounts;
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
