let URL = `https://tame-rose-betta-boot.cyclic.app`;
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function () {
  sidebar.classList.toggle("active");
  if (sidebar.classList.contains("active")) {
    sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
  } else sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
};

async function fetch_product() {
  let req = await fetch(`${URL}/products`);
  let res = await req.json();
  let product_details = document.querySelector(".sales-details");
  let productData = res;
  console.log(productData);
  product_details.innerHTML = productData
    .map((el) => {
      return `<div class="card">
        <div class="img"><img src="${el.image1}" ></div>
        <div>
        <p><span class="name">Product ID:- </span><span class="ans-id">${
          el._id || el.id
        }</span></p>
            <p><span class="name">Name:- </span><span class="ans-name">${
              el.name
            }</span></p>
            <p><span class="name">Brand:- </span> ${el.brand}</p>
            <p><span class="name">Gender:- </span> ${el.gender}</p>
            <p><span class="name">Size:- </span>${el.size}</p>
            <p><span class="name">Price:- </span>₹${el.price}</p>
        </div>
    </div>`;
    })
    .join("");
}
fetch_product();
let noOfProductAdded =
  JSON.parse(localStorage.getItem("noOfProductAddedcount")) || 1;

//console.log(addProductForm);

///adding the products

let addImage1 = document.getElementById("addImage1");
let addImage2 = document.getElementById("addImage2");
let addName = document.getElementById("addName");
let addBrand = document.getElementById("addBrand");
let addGender = document.getElementById("addGender");
let addSize = document.getElementById("addSize");
let addPrice = document.getElementById("addPrice");
let addProductForm = document.querySelector("form");

async function addProduct() {
  try {
    let obj = {
      image1: addImage1.value,
      image2: addImage2.value,
      name: addName.value,
      brand: addBrand.value,
      gender: addGender.value,
      size: addSize.value,
      price: addPrice.value,
    };

    let register_request = await fetch(`${URL}/products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    console.log(register_request);
    noOfProductAdded++;
    localStorage.setItem(
      "noOfProductAddedcount",
      JSON.stringify(noOfProductAdded)
    );
    console.log(noOfProductAdded);
  } catch (error) {
    console.log(error);
  }
}

addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addProduct();
  alert("Product is added to inventory");
  //fetch_product();
  location.reload();
});
let admin_name = document.getElementById("admin_name");
let login_name = JSON.parse(localStorage.getItem("login_name")) || [];
admin_name.innerText = login_name;
console.log(login_name);
