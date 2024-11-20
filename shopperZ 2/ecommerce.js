const close = document.querySelector(".close");
const open = document.querySelector(".ham");
const menu = document.querySelector(".menu");
close.addEventListener("click", () => {
  menu.style.visibility = "hidden";
});
open.addEventListener("click", () => {
  menu.style.visibility = "visible";
});

async function getProduct() {
  const response = await axios.get('https://fakestoreapi.com/products');
  const productDataSet = response.data;
  const productContainer = document.querySelector('.container')
  console.log('getProduct', productDataSet)
  productDataSet.forEach((product, i) => {
      const linkContainer = document.createElement('a');
      linkContainer.setAttribute('href', `https://fakestoreapi.com/products/${product.id}`);
      let title = product.title;
      let img = product.image;
      let price = product.price;
      let desc = product.description;

      linkContainer.innerHTML =  `
          <div class="items">
            <a class="item" href="product-details.html">
              <div class="img img${(i % 3) + 1}"><img src="${img}" alt=""></div>
              <div class="name">${title}</div>
              <div class="price">$${price}</div>
              <div class="info">${desc}</div>
            </a>
          </div>`;
      productContainer.appendChild(linkContainer);
  });
}

getProduct();