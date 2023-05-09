let cartData = JSON.parse(localStorage.getItem("productsAdd")) || [];

//search functionality
// let searchquery = document.getElementById("searchquery");
// let searchbtn = document.getElementById("searchbtn");
//cursor pointer css using js
// searchbtn.addEventListener("mouseover",()=>{
//     searchbtn.style.cursor="pointer";
// })
//cursor pointer css end
// searchbtn.addEventListener("click",()=>{
//     localStorage.setItem("searchValue",searchquery.value)
//     window.location.href="menu.html";
// })
// let signout = document.getElementById("signoutButton");

// let loginUserToken = JSON.parse(localStorage.getItem("loginUser")) || false;
// console.log(loginUserToken, "loginUserToken");
// let login_name = JSON.parse(localStorage.getItem("login_name")) || [];
// if (loginUserToken == true) {
//   console.log("yes");
//   signout.innerText = "Hi,  " + login_name + "                   Sign Out";
//   signout.style.fontSize = "13px";
//   signout.style.fontWeight = "bolder";
//   signout.style.marginTop = "-300000px";
//   signout.style.marginLeft = "400px";
//   signout.style.color = "black";

//   signout.style.cursor = "pointer";
//   // signout.addEventListener("click", () => {
//   //   loginUserToken = false;
//   //   login_name = "";
//   // });
// }
// console.log(signout.innerText);
// signout.addEventListener("click", () => {
//   loginUserToken = false;
//   login_name = "";
//   cartData = [];
//   localStorage.setItem("cart", JSON.stringify(cartData));
//   localStorage.setItem("loginUser", JSON.stringify(loginUserToken));
//   localStorage.setItem("login_name", JSON.stringify(login_name));
//   localStorage.setItem("productsAdd", JSON.stringify(cartData));
//   window.location.href = "index.html";
// });
