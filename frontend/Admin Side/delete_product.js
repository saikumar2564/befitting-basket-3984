let URL = `https://tame-rose-betta-boot.cyclic.app`;
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function () {
  sidebar.classList.toggle("active");
  if (sidebar.classList.contains("active")) {
    sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
  } else sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
};
let noOfProductDeleted =
  JSON.parse(localStorage.getItem("noOfProductDeletedcount")) || 0;

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

///adding the products

let deleteId = document.getElementById("deleteId");

let addProductForm = document.querySelector("form");

async function deleteProduct() {
  try {
    let register_request = await fetch(
      `${URL}/products/delete/${deleteId.value}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(register_request);
    noOfProductDeleted++;
    localStorage.setItem(
      "noOfProductDeletedcount",
      JSON.stringify(noOfProductDeleted)
    );
    console.log(noOfProductDeleted);
  } catch (error) {
    console.log(error);
  }
}
console.log(noOfProductDeleted);
addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  deleteProduct();
  alert("Product is deleted from inventory");
  console.log("deee");
  //fetch_product();
  location.reload();
});
let admin_name = document.getElementById("admin_name");
let login_name = JSON.parse(localStorage.getItem("login_name")) || [];
admin_name.innerText = login_name;
console.log(login_name);
