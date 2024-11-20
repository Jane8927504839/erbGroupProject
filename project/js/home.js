const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

productContainers.forEach((item, i) => {
    let containerDimenstions = item.getBoundingClientRect();
    let containerWidth = containerDimenstions.width;

    if (nxtBtn[i]) {
        nxtBtn[i].addEventListener('click', () => {
            item.scrollLeft += containerWidth;
        })
    }

    if (preBtn[i]) {
        preBtn[i].addEventListener('click', () => {
            item.scrollLeft -= containerWidth;
        })
    }
})

async function getBestSeller() {
    const response = await axios.get('https://fakestoreapi.com/products');
    const bestSellingDataSet = response.data;
    const bestSellingContainer = document.querySelector('.best-selling')
    bestSellingDataSet.forEach(bestSelling => {
        const linkContainer = document.createElement('a');
        linkContainer.setAttribute('href', `https://fakestoreapi.com/products/${bestSelling.id}`);
        let title = bestSelling.title;
        let img = bestSelling.image;
        let price = bestSelling.price;
        let desc = bestSelling.description;

        linkContainer.innerHTML =  `<div class="product-card">
                <div class="product-image">
                    <img src="${img}" class="product-thumb" alt="">
                    <button class="card-btn">add to whislist</button>
                </div>
                <div class="product-info">
                    <h2 class="product-title">${title}</h2>
                    <p class="product-short-des">${desc}</p>
                    <span class="price">$${price}</span>
                </div>
            </div>`;
        bestSellingContainer.appendChild(linkContainer);
    });
}

async function getShirts() {
    const response = await axios.get('https://fakestoreapi.com/products');
    const shirtsDataSet = response.data;
    const shirtsContainer = document.querySelector('.shirts')
    shirtsDataSet.forEach(shirts => {
        const linkContainer = document.createElement('a');
        linkContainer.setAttribute('href', `https://fakestoreapi.com/products/${shirts.id}`);
        let title = shirts.title;
        let img = shirts.image;
        let price = shirts.price;
        let desc = shirts.description;

        linkContainer.innerHTML =  `<div class="product-card">
                <div class="product-image">
                    <img src="${img}" class="product-thumb" alt="">
                    <button class="card-btn">add to whislist</button>
                </div>
                <div class="product-info">
                    <h2 class="product-title">${title}</h2>
                    <p class="product-short-des">${desc}</p>
                    <span class="price">$${price}</span>
                </div>
            </div>`;
        shirtsContainer.appendChild(linkContainer);
    });
}

async function getShoes() {
    const response = await axios.get('https://fakestoreapi.com/products');
    const shoesDataSet = response.data;
    const shoesContainer = document.querySelector('.shoes')
    shoesDataSet.forEach(shoes => {
        const linkContainer = document.createElement('a');
        linkContainer.setAttribute('href', `https://fakestoreapi.com/products/${shoes.id}`);
        let title = shoes.title;
        let img = shoes.image;
        let price = shoes.price;
        let desc = shoes.description;

        linkContainer.innerHTML =  `<div class="product-card">
                <div class="product-image">
                    <img src="${img}" class="product-thumb" alt="">
                    <button class="card-btn">add to whislist</button>
                </div>
                <div class="product-info">
                    <h2 class="product-title">${title}</h2>
                    <p class="product-short-des">${desc}</p>
                    <span class="price">$${price}</span>
                </div>
            </div>`;
        shoesContainer.appendChild(linkContainer);
    });
}

getBestSeller();
getShirts();
getShoes();