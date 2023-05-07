let productdata = JSON.parse(localStorage.getItem("product")) || {};
let cartData = JSON.parse(localStorage.getItem("productsAdd")) || [];
let loginUserToken = localStorage.getItem("token") || false;
console.log("loginUserToken:", loginUserToken);
let container = document.getElementById("product-container");
let login_name = JSON.parse(localStorage.getItem("login_name")) || [];
console.log(productdata);

//cart item count start
let productcounts = localStorage.getItem("productcounts") || 0;
// let itemcounts = document.getElementById("itemcounts");
// itemcounts.textContent = productcounts;
//cart item count code end

container.innerHTML = ` <div id="roll">
<p>Shoes / ${productdata.gender} / Sneakers and Athletic Shoes / Lifestyle and Fashion Sneakers</p>
</div>
<div id="container1">
<div id="cont">
<img src="${productdata.image1}" alt="">
<img src="${productdata.image2}" class="img-top" alt="">
</div>
<div id="box">
<h1>${productdata.name}</h1>
<h4 id="gender">${productdata.gender}</h4>
<h2 id="price">₹${productdata.price}</h2>
<h2 id="brand">${productdata.brand}</h2>
<h3 id="size">Size:</h3>

<div class="btn">
<button class="one active">5</button>
<button class="one">6</button>
<button class="one">7</button>
<button class="one">8</button>
<button class="one">9</button>
<button class="one">10</button>
<button class="one">11</button>
<button class="one">12</button>
</div>

<h3>color:black/white</h3>
<h4>Width:</h4>
<button>Medium</button>


<h3>Size Chart</h3>
 <input type="radio">
 <span style="color:grey;">Store Pickup - FREE</span>
 <h5>Find a Store for pickup options</h5><br>
<input type="radio">
<span style="color:grey;">Ship to Address</span>
<h5>Receive in 4-7 business days with standard</h5>

<button id="btn">ADD TO CART</button>

<h5><span style="color:rgb(235, 19, 55);">Enjoy 10% OFF Today*</span> on your first purchase with the <br>
 FAMOUSLY YOU REWARDS® Credit Card at time of <br>
 account opening.Learn More</h5>
 </div>
 </div>
<div id="cool">
    <h3>ITEM DETAILS</h3>
    <p>Style #40087</p>
    <p> Stand tall in cool style with the Women's Madden Girl Vaultt Wedge sandal.</p>
    <ul type="circle">
        <li>EVA upper in a wedge sandal style with an open toe</li> <br>
        <li>Buckled ankle strap closure</li> <br>
        <li> Multi strap detail</li> <br>
        <li>Smooth lining with a padded footbed</li> <br>
        <li>Durable rubber outsole with a 3.5" wedge heel</li>
    </ul>

</div>`;

let btn = document.getElementById("btn");
btn.addEventListener("click", function () {
  // addTocart(el);
  let clickcount = 0;
  clickcount++;

  if (loginUserToken == false) {
    alert("Please Log in First");
  } else {
    if (duplicate(productdata) == false) {
      //products count
      if (productcounts == 0) {
        itemcounts.textContent = clickcount;
        localStorage.setItem("productcounts", clickcount);
      } else {
        productcounts = localStorage.getItem("productcounts") || 0;
        productcounts = Number(productcounts) + clickcount;
        itemcounts.textContent = productcounts;
        localStorage.setItem("productcounts", productcounts);
      }
      //products count end

      cartData.push({ ...productdata, quantity: 1 });

      console.log(cartData);
      console.log("cartData");
      console.log(cartData.quantity);
      localStorage.setItem("productsAdd", JSON.stringify(cartData));
      //   cartadding.innerText = "Product Added To Cart";
      alert("Product Successfully added to Cart");
      console.log("login", JSON_flag_signin);
    } else if (duplicate(productdata) == true) {
      //product count
      productcounts = localStorage.getItem("productcounts") || 0;
      productcounts = Number(productcounts) + clickcount;
      console.log(productcounts);
      itemcounts.textContent = productcounts;
      localStorage.setItem("productcounts", productcounts);
      //product count end

      cartData.forEach((element) => {
        if (element.id == productdata.id) {
          element.quantity++;

          console.log(element);
          localStorage.setItem("productsAdd", JSON.stringify(cartData));
        }
      });
      alert("Product Successfully added to Cart");
    }

    //window.location.href = "cart.html";
  }
});
function duplicate(product) {
  for (let i = 0; i < cartData.length; i++) {
    if (cartData[i].id == product.id) {
      return true;
    }
  }

  return false;
}

var header = document.getElementsByClassName("btn");
var btns = document.getElementsByClassName("one");
console.log(btns);
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

////login/signout option on navbar

/////signout/log in button

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
  signout.style.marginTop = "-28px";
  signout.style.marginLeft = "280px";
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


// Abhinav- Review part
let userid=localStorage.getItem('userID')||false;

function checklogin() {
  if (!loginUserToken) {
    window.location.href = './login.html';
    return;
  }
}

let form = document.querySelector('.container form')
const basicurl = 'http://localhost:8000'
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let title = form.rvtitle.value;
  let description = form.rvdes.value;
  let rating = +form.rating.value;
  let payload = { title, rating, description }
  console.log(payload);
  sendReview(payload);
})

async function sendReview(payload) {
  console.log(payload);
  let response = await fetch(`${basicurl}/products/comment/${productdata.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': loginUserToken
    },
    body: JSON.stringify(payload)
  })
  if(response.ok){
    history.back();
    getallcomments();
  }
  let result = await response.json();
  console.log(result);
  
}

getallcomments();
async function getallcomments() {
  let response = await fetch(`${basicurl}/products/comments/${productdata.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': loginUserToken
    }
  })
  let result = await response.json();
  console.log(result.comments);
  appendReviews(result.comments)
}

function appendReviews(data) {
  console.log('append', data);
  let parent = document.getElementById('userreviews');
  parent.innerHTML = '';
  parent.innerHTML = data.map(el =>
    `<div class="reviewcard">
    <p>${el.name}</p> 
    ${
      (() => {
      let stars = '';
      for (let i = 0; i < 5; i++) {
        if (i < el.rating) {
          stars += `<span class="fa fa-star checked"></span>`;
        }
        else {
          stars += `<span class="fa fa-star"></span>`;
        }
      }
      return stars;
    })()
    }

    <span>${el.title}</span>
    <p> ${el.description} </p> 
    <span>${el.date.split('').slice(0,10).join('')}</span> <br>
    ${userid==el.userID?`<button data-id='${el._id}'>Delete</button>`:''}   
    </div>
    `
    ).join('')
    // ${userid==el.userID?`<button onclick="deleteComment('${userid}','${el._id}')">Delete</button>`:''}   

let delbtn=document.querySelector('.reviewcard>button');
delbtn.addEventListener('click',async(e)=>{
  console.log(e.target.dataset.id);
  let response = await fetch(`${basicurl}/products/comments/${e.target.dataset.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': loginUserToken
    }
  })
  let result = await response.json();
  if(response.ok){
    alert(result.msg)
    e.target.parentNode.remove();
  }

})

}

async function getallstars() {
  let response = await fetch(`${basicurl}/products/stars/${productdata.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': loginUserToken
    }
  })
  let result = await response.json();
  console.log(result);
  let sum=0;
  for (let i in result){
    sum+=+result[i];
  }
  for (let i in result){
    document.getElementById(`myprg${result[i]}`)=
  }
}

getallstars();

// function deleteComment(userid,commentid) {
//   console.log(userid,commentid);
  
// }
