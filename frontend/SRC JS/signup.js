let registerUserform = document.querySelector("form");

let cartData = JSON.parse(localStorage.getItem("productsAdd")) || [];

// register
let registerUserFirstname = document.getElementById("firstName");
let registerUserLastname = document.getElementById("lastName");
let registerUserEmail = document.getElementById("email");
let registerUserPassword = document.getElementById("password");
let registerUserbirthDay = document.getElementById("birthDay");
let registerUserphoneNo = document.getElementById("phoneNo");

registerUserform.addEventListener("submit", (e) => {
  e.preventDefault();

  if (registerUserFirstname.value == "") {
    window.location.href = "#firstName";
  } else if (registerUserLastname.value == "") {
    window.location.href = "#lastName";
  } else if (registerUserEmail.value == "") {
    window.location.href = "#email";
  } else if (registerUserPassword.value == "") {
    window.location.href = "#password";
  } else if (registerUserbirthDay.value == "") {
    window.location.href = "#birthDay";
  } else if (registerUserphoneNo.value == "") {
    window.location.href = "#phoneNo";
  } else {
    registerUser();
  }
});

async function registerUser() {
  try {
    let obj = {
      firstName: registerUserFirstname.value,
      lastName: registerUserLastname.value,
      email: registerUserEmail.value,
      phoneNo: registerUserphoneNo.value,
      password: registerUserPassword.value,
      birthday: registerUserbirthDay.value,
    };

    let register_request = await fetch(
      `https://63c77a71e52516043f3eaecd.mockapi.io/Dominos`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }
    );
    console.log(register_request);
    alert("Account created successfully");
    window.location.href = "login.html";
  } catch (error) {
    console.log(error);
  }
}
let signout = document.getElementById("signoutButton");
let loginUserToken = JSON.parse(localStorage.getItem("loginUser")) || false;
console.log("loginUserToken", loginUserToken);
let login_name = JSON.parse(localStorage.getItem("login_name")) || [];
if (loginUserToken == true) {
  console.log("yes");
  signout.innerText = "Sign Out";
  signout.style.fontSize = "13px";
  signout.style.marginBottom = "-20px";
  signout.style.marginTop = "-10px";
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
