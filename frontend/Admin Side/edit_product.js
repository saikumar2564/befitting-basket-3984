const url = `https://63c77a71e52516043f3eaecd.mockapi.io/`;
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function () {
  sidebar.classList.toggle("active");
  if (sidebar.classList.contains("active")) {
    sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
  } else sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
};
let noOfProductEdited =
  JSON.parse(localStorage.getItem("noOfProductEditedcount")) || 1;
async function fetch_product() {
  console.log("fetched");
  let req = await fetch(`${url}beverage`);
  let res = await req.json();
  let product_details = document.querySelector(".sales-details");
  let productData = res;
  console.log(productData);
  product_details.innerHTML = productData
    .map((el) => {
      return `<div class="card">
        <div class="img"><img src="${el.image1}" ></div>
        <div>
        <p><span class="name">Product ID:- </span><span class="ans-id">${el.id}</span></p>
            <p><span class="name">Name:- </span><span class="ans-name">${el.name}</span></p>
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

///adding the products

let editId = document.getElementById("addId");
let editImage1 = document.getElementById("editImage1");
let editImage2 = document.getElementById("editImage2");
let editName = document.getElementById("editName");
let editBrand = document.getElementById("editBrand");
let editGender = document.getElementById("editGender");
let editSize = document.getElementById("editSize");
let editPrice = document.getElementById("editPrice");
let addProductForm = document.querySelector("form");

async function editProduct() {
  try {
    let obj = {
      id: editId.value,
      image1: editImage1.value,
      image2: editImage2.value,
      name: editName.value,
      brand: editBrand.value,
      gender: editGender.value,
      size: editSize.value,
      price: editPrice.value,
    };

    let register_request = await fetch(`${url}beverage/${editId.value}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    console.log(register_request);
    noOfProductEdited++;
    localStorage.setItem(
      "noOfProductEditedcount",
      JSON.stringify(noOfProductEdited)
    );
  } catch (error) {
    console.log(error);
  }
}

addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  editProduct();
  alert("Product is updated in inventory");
  //fetch_product();
  location.reload();
});
let admin_name = document.getElementById("admin_name");
let login_name = JSON.parse(localStorage.getItem("login_name")) || [];
admin_name.innerText = login_name;
console.log(login_name);
