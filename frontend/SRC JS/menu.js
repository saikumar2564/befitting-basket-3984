let productdata = JSON.parse(localStorage.getItem("product")) || null;
let cartData = JSON.parse(localStorage.getItem("productsAdd")) || [];

//cart item count start
let productcounts = localStorage.getItem("productcounts") || 0;
let itemcounts = document.getElementById("itemcounts");
itemcounts.textContent = productcounts;
//cart item count code end

////login/signout option on navbar
let loginUserToken = JSON.parse(localStorage.getItem("loginUser")) || false;
console.log("loginUserToken:", loginUserToken);

/////signout/log in button

let login_name = JSON.parse(localStorage.getItem("login_name")) || [];
console.log(login_name);

//let loginButton = document.getElementById("loginButton");
//let signout = document.getElementById("signoutButton");
let signout = document.getElementById("loginlogout");
// if (loginUserToken == true) {
//   console.log(login_name);
//   console.log("done");
//   loginButton.innerText = "Hi,  " + login_name;
// }

if (loginUserToken == true) {
  console.log("yes");
  signout.innerText = "Hi,  " + login_name + "                   Sign Out";
  signout.style.fontSize = "13px";
  signout.style.fontWeight = "bolder";
  signout.style.cursor = "pointer";
  signout.style.marginTop = "-30px";
  signout.style.marginLeft = "400px";
  // signout.addEventListener("click", () => {
  //   loginUserToken = false;
  //   login_name = "";
  // });
}

/*let loginButton = document.getElementById("loginButton");
let signout = document.getElementById("signoutButton");
loginandlogoutnames();
function loginandlogoutnames(){
  if (loginUserToken == true) {
    //console.log(login_name);
    loginButton.innerText = "Hi,  " + login_name;
  }
  
  if (loginUserToken == true) {
    signout.innerText = "Sign Out";
    loginButton.style.fontSize = "14px";
    signout.addEventListener("click", () => {
      console.log("clicked on signout")
      loginUserToken = false;
      login_name = "";
    });
  }
}
let loginlogout=document.getElementById("loginlogout")*/

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

let alldata = [];
let fetcheddata = [];

//search functionality
let query = localStorage.getItem("searchValue") || "";
let queriedData = [];
fetch(`https://63c77a71e52516043f3eaecd.mockapi.io/beverage?search=${query}`)
  .then((res) => res.json())
  .then((data) => {
    queriedData = data;
  });
window.addEventListener("load", () => {
  fetchdata(1);
});
//search functionality

//filter variables start
let filterby = document.getElementById("filterby");
let checkbrand = document.querySelectorAll(".checkbrand");
let size = document.querySelectorAll(".btn");
let price = document.querySelectorAll(".price");
//filter variables end
let url = `https://63c77a71e52516043f3eaecd.mockapi.io/beverage`;
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    alldata = data;
    //console.log(alldata);
  });

let procount = document.getElementById("procount");

let totaldatacount = null;

function fetchdata(pageNumber) {
  fetch(
    `https://63c77a71e52516043f3eaecd.mockapi.io/beverage?page=${pageNumber}&limit=16`
  )
    .then((res) => {
      showpages(65, 16);
      return res.json();
    })
    .then((data) => {
      fetcheddata = data;
      totaldatacount = alldata.length;
      procount.textContent = `${data[0].id}-${data[data.length - 1].id} of ${
        alldata.length - 1
      } products`;
      if (query !== "") {
        displaydata(queriedData);
        localStorage.setItem("searchValue", "");
        let pages = document.getElementById("paginationstart");
        pages.style.display = "none";
      } else displaydata(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

let products = document.getElementById("products");
function displaydata(data) {
  let count = data.length;
  products.innerHTML = "";

  //product append

  data.map((item, index) => {
    let div1 = document.createElement("div");
    let divheart = document.createElement("div");
    divheart.setAttribute("id", "heart");
    let heartimg = document.createElement("img");
    heartimg.src =
      "https://cdn-icons-png.flaticon.com/512/14/14949.png?w=740&t=st=1676993626~exp=1676994226~hmac=27ebdcbb39c748208d4449aaa3f26253fae641221cbcee5eb68deea33ebae884";
    divheart.append(heartimg);
    let cardimg = document.createElement("div");
    cardimg.setAttribute("id", "img1");
    let cardimage1 = document.createElement("img");
    cardimage1.setAttribute("class", "firstimage");
    cardimage1.src = item.image1;
    cardimage1.addEventListener("mouseover", () => {
      cardimage1.src = item.image2;
    });
    cardimage1.addEventListener("mouseout", () => {
      cardimage1.src = item.image1;
    });
    cardimg.append(cardimage1);
    let proinfo = document.createElement("div");
    proinfo.setAttribute("id", "proinfo");
    let h2 = document.createElement("h2");
    h2.textContent = "SALE";
    let h3 = document.createElement("h3");
    h3.textContent = item.brand;
    let protitle = document.createElement("p");
    protitle.setAttribute("id", "protitle");
    protitle.setAttribute("class", "producttitle");
    protitle.textContent = item.name;
    protitle.addEventListener("click", () => {
      productdata = item;
      localStorage.setItem("product", JSON.stringify(productdata));
      console.log(productdata);
      window.location.assign("/frontend/product.html");
    });

    let prices = document.createElement("div");
    prices.setAttribute("id", "prices");
    let price1 = document.createElement("p");
    price1.setAttribute("id", "price1");
    price1.textContent = "₹" + item.price + ".99";
    prices.append(price1);
    let rating = document.createElement("div");
    rating.setAttribute("id", "rating");
    let star1 = document.createElement("i");
    star1.setAttribute("class", "fa-solid fa-star");
    let star2 = document.createElement("i");
    star2.setAttribute("class", "fa-solid fa-star");
    let star3 = document.createElement("i");
    star3.setAttribute("class", "fa-solid fa-star");
    let star4 = document.createElement("i");
    star4.setAttribute("class", "fa-solid fa-star");
    let star5 = document.createElement("i");
    star5.setAttribute("class", "fa-regular fa-star-half-stroke");
    rating.append(star1, star2, star3, star4, star5);
    let coupon = document.createElement("p");
    coupon.textContent = "Coupon Excluded";
    proinfo.append(h2, h3, protitle, prices, rating);
    div1.append(divheart, cardimg, proinfo, coupon);
    products.append(div1);
  });

  //product append end
}

let pages = document.getElementById("pages");

let brandchkbox = document.getElementById("brdchk");
let brandplus = document.getElementById("brandplus");
let flag = false;
brandplus.addEventListener("click", () => {
  flag = !flag;
  if (flag == true) {
    brandplus.textContent = "_";
    brandplus.style.marginBottom = "30px";
    brandchkbox.style.display = "block";
  } else if (flag == false) {
    brandplus.textContent = "+";
    brandplus.style.marginBottom = "0px";
    brandchkbox.style.display = "none";
  }
});

let pricecheckbox = document.getElementById("prcchk");
let priceplus = document.getElementById("priceplus");
priceplus.addEventListener("click", () => {
  flag = !flag;
  if (flag == true) {
    priceplus.textContent = "_";
    priceplus.style.marginBottom = "30px";
    pricecheckbox.style.display = "block";
  } else if (flag == false) {
    priceplus.textContent = "+";
    priceplus.style.marginBottom = "0px";
    pricecheckbox.style.display = "none";
  }
});

function pagebtn(text, pageNumber) {
  return `<button class="pagebtn" data-page-number="${pageNumber}">${text}</button>&nbsp;&nbsp;`;
}

function showpages(total, limit) {
  let allpages = 5;
  let pagedata = [];
  for (let i = 1; i < allpages; i++) {
    pagedata.push(pagebtn(i, i));
  }
  pages.innerHTML = `${pagedata.map((item) => item).join(" ")}`;
  let allbtn = document.querySelectorAll(".pagebtn");
  for (let btn of allbtn) {
    btn.addEventListener("click", (e) => {
      let pageNumber = e.target.dataset["pageNumber"];
      fetchdata(pageNumber);
    });
  }
}

//apply filter from here

filterby.addEventListener("change", () => {
  if (filterby.value == "high") {
    let newdata = alldata.sort((a, b) => {
      return b.price - a.price;
    });
    displaydata(newdata);
  } else if (filterby.value == "low") {
    let newdata = alldata.sort((a, b) => {
      return a.price - b.price;
    });
    displaydata(newdata);
  } else if (filterby.value == "top") {
    let newdata = alldata.sort((a, b) => {
      return a.size - b.size;
    });
    displaydata(newdata);
  } else if (filterby.value == "newest") {
    let newdata = alldata.sort((a, b) => {
      return b.size - a.size;
    });
    displaydata(newdata);
  } else {
    displaydata(alldata);
  }
});

//filter by brand
function checkbrandfilter() {
  for (let i = 0; i < checkbrand.length; i++) {
    checkbrand[i].addEventListener("click", () => {
      if (checkbrand[i].checked == true) {
        let newdata = alldata.filter((item) => {
          return item.brand == checkbrand[i].value;
        });
        displaydata(newdata);
      } else displaydata(alldata);
    });
  }
}
checkbrandfilter();
//filter by brand end
//filter by size start
let sizes = document.querySelectorAll(".buttons");
function filterbysize() {
  for (let i = 0; i < sizes.length; i++) {
    sizes[i].addEventListener("click", () => {
      let newdata = alldata.filter((item) => {
        return item.size == sizes[i].value;
      });
      displaydata(newdata);
    });
  }
}
filterbysize();
//filter by size end
//filter by price start
function filterbyprice() {
  for (let i = 0; i < price.length; i++) {
    price[i].addEventListener("click", () => {
      if (price[i].checked == true) {
        if (price[i].value == 500) {
          let newdata = alldata.filter((item) => {
            return item.price <= 500;
          });
          displaydata(newdata);
        } else if (price[i].value == 1000) {
          let newdata = alldata.filter((item) => {
            if (item.price > 500 && item.price <= 1000) {
              return item;
            }
          });
          displaydata(newdata);
        } else if (price[i].value == 1500) {
          let newdata = alldata.filter((item) => {
            if (item.price > 1000 && item.price <= 1500) {
              return item;
            }
          });
          displaydata(newdata);
        } else if (price[i].value == 2000) {
          let newdata = alldata.filter((item) => {
            return item.price > 1500;
          });
          displaydata(newdata);
        }
      } else displaydata(alldata);
    });
  }
}
filterbyprice();
//filter by price end

//end filter code

//page loader code

document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector("#spinner").style.visibility = "visible";
  } else {
    document.querySelector("#spinner").style.display = "none";
    document.querySelector("body").style.visibility = "visible";
  }
};

//search functionality
let searchquery = document.getElementById("searchquery");
let searchbtn = document.getElementById("searchbtn");
//cursor pointer css using js
searchbtn.addEventListener("mouseover", () => {
  searchbtn.style.cursor = "pointer";
});
//cursor pointer css end
searchbtn.addEventListener("click", () => {
  fetch(
    `https://63c77a71e52516043f3eaecd.mockapi.io/beverage?search=${searchquery.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      displaydata(data);
    });
  let pages = document.getElementById("paginationstart");
  pages.style.display = "none";
});
//search functionality end
