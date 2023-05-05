const url = `https://63c77a71e52516043f3eaecd.mockapi.io/`;
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function () {
  sidebar.classList.toggle("active");
  if (sidebar.classList.contains("active")) {
    sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
  } else sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
};

let Admin_data = JSON.parse(localStorage.getItem("admin_data"));
// displayCards(Admin_data);

document.querySelector("#admin_name").innerText =
  localStorage.getItem("admin_name");

// displayCards();
countData();

function displayCards() {
  let data = JSON.parse(localStorage.getItem("admin_data"));
  let admin_details = document.querySelector(".sales-details");
  document.querySelector("#admin_name").innerText =
    localStorage.getItem("admin_name");
  // document.querySelector("#img_nav").setAttribute("src", data.usertype);
  admin_details.innerHTML = "";

  let div = document.createElement("div");

  let img = document.createElement("img");
  // img.setAttribute("src", data.usertype);
  img.style.width = "30%";
  img.style.borderRadius = "20px";
  let div1 = document.createElement("div");

  let Name = document.createElement("h4");
  Name.innerText = "Name:- " + data.firstname + " " + data.lastname;
  let email = document.createElement("p");
  email.innerText = "Email:- " + data.email;
  let mobNo = document.createElement("p");
  mobNo.innerText = "Mobile No.:- " + data.mobile;
  div1.append(Name, email, mobNo);
  div.append(img, div1);
  document.querySelector(".sales-details").append(div);
}

async function countData() {
  try {
    let api_data = await fetch(`${url}beverage`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // .headers.get( "X-Total-Count" )
    let data = await api_data.json();
    document.getElementById("totalApicount").innerText = data.length;
    document.getElementById("NewlyAdd").innerText =
      localStorage.getItem("count") || 0;
    document.getElementById("TotalEdited").innerText =
      localStorage.getItem("editcount") || 0;
    document.getElementById("TotalDelete").innerText =
      localStorage.getItem("deletecount") || 0;
  } catch (error) {}
}

// userDetailss();
// function userDetailss() {
//   let admin = JSON.parse(localStorage.getItem("admin"));
//   let cont = document.getElementById("admin_name");
//   let cont2 = document.getElementById("img-admin");

//   cont2.innerHTML = `<img src="${admin.image}">`;
//   cont.innerHTML = `${admin.name}`;
// }

// document.getElementsByClassName("log_out")[0].addEventListener("click", () => {
//   localStorage.clear("admin-signed");
//   localStorage.clear("admin");
// });

let admin_name = document.getElementById("admin_name");
let login_name = JSON.parse(localStorage.getItem("login_name")) || [];
admin_name.innerText = login_name;
console.log(login_name);
//top bar dashboard numbers of new added, deleted, and edited
let noOfProductAdded =
  JSON.parse(localStorage.getItem("noOfProductAddedcount")) || 0;
let noOfProductEdited =
  JSON.parse(localStorage.getItem("noOfProductEditedcount")) || 0;
let noOfProductDeleted =
  JSON.parse(localStorage.getItem("noOfProductDeletedcount")) || 0;
console.log(noOfProductAdded);
console.log(noOfProductEdited);
console.log(noOfProductDeleted);
let NewlyAdd = document.getElementById("NewlyAdd");
let TotalEdited = document.getElementById("TotalEdited");
let TotalDelete = document.getElementById("TotalDelete");
NewlyAdd.innerText = noOfProductAdded;
TotalEdited.innerText = noOfProductEdited;
TotalDelete.innerText = noOfProductDeleted;
