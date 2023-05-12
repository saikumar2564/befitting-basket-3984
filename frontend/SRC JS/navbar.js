let signout = document.getElementById("signoutButton");
// URL = `https://tame-rose-betta-boot.cyclic.app`;
URL = `http://localhost:8000`;
loginUserToken = JSON.parse(localStorage.getItem("loginUserToken")) || false;
console.log("loginUserToken", loginUserToken);
login_name = JSON.parse(localStorage.getItem("login_name")) || [];
console.log("login name", login_name);
if (loginUserToken == true) {
  console.log("yes");
  signout.innerText = "Hi User,  " + "                   Sign Out";
  signout.style.fontSize = "13px";
  signout.style.fontWeight = "bolder";
  signout.style.cursor = "pointer";
  // signout.addEventListener("click", () => {
  //   loginUserToken = false;
  //   login_name = "";
  // });
}
productcounts = localStorage.getItem("productcounts") || 0;
itemcounts = document.getElementById("itemcounts");
itemcounts.textContent = productcounts;
signout.addEventListener("click", () => {
  // logoutUser();
  loginUserToken = false;
  login_name = "";
  cartData = [];
  localStorage.setItem("loginUserToken", JSON.stringify(loginUserToken));
  localStorage.setItem("login_name", JSON.stringify(login_name));

  localStorage.setItem("cart", JSON.stringify(cartData));
  localStorage.setItem("productsAdd", JSON.stringify(cartData));
  window.location.href = "index.html";
});

async function logoutUser() {
  // await fetch(`${URL}/cookie`)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     const cookieValue = data.cookieValue;
  //     // Do something with cookieValue
  //   });
  await fetch(`${URL}/users/logout`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      alert(JSON.stringify(res.msg));

      loginUserToken = false;
      localStorage.setItem("loginUser", []);
      login_name = "";
      localStorage.setItem("login_name", login_name);
      console.log(loginUserToken);
    })
    .catch((err) => {
      console.log(err);
    });
}
