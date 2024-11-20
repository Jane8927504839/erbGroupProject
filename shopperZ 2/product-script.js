const sliderMainImage = document.getElementById("product-main-image");
const sliderImageList = document.getElementsByClassName("image-list");
console.log(sliderImageList);

sliderImageList[0].onclick = function(){
    sliderMainImage.src = sliderImageList[0].src;
    console.log(sliderMainImage.src);
};

sliderImageList[1].onclick = function(){
    sliderMainImage.src = sliderImageList[1].src;
    console.log(sliderMainImage.src);
};

sliderImageList[2].onclick = function(){
    sliderMainImage.src = sliderImageList[2].src;
    console.log(sliderMainImage.src);
};

sliderImageList[3].onclick = function(){
    sliderMainImage.src = sliderImageList[3].src;
    console.log(sliderMainImage.src);
};

async function getProduct() {
    const response = await axios.get('https://fakestoreapi.com/products');
    const productDataSet = response.data;
    const productContainer = document.querySelector('.container')
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