let list = document.getElementById('list');
let quantity = document.getElementById('numbers');
let selectedProducts = [];
let numbers = 0;

if (localStorage.getItem('products')){
    selectedProducts = JSON.parse(localStorage.getItem('products'));
}

function getProducts(e) {
    fetch('data.json').then(response => response.json())
        .then(products => {
            let html = ``;
            products.data.forEach(element => {
                html += makeProductCard(element)
            });
            list.innerHTML = html;

            const cart = document.querySelectorAll('#cart');
            addToCart(cart);
        })
}


function makeProductCard(rest) {
    return `
    <div class="card" style="width: 15rem;">
        <img class="card-img-top" src=${rest.image} alt="Card image cap">
        <div class="card-body" id=${rest.id}>
             <h5 class="card-title">$${rest.price}</h5>
             <p class="card-text">${rest.title}</p>
             <a href="#" class="btn btn-primary" id='cart'>Add to cart</a>
         </div>
    </div>
    `
}

function addToCart(element) {
    element.forEach(e => {
        e.addEventListener('click', (event) => {
            let id = event.target.parentElement.id;
            let isAvailable = checkingIsAvailable(selectedProducts, id);

            if (!isAvailable) {
                selectedProducts.push(id);
                numbers = numbers + 1;
            } else {
                return;
            }
            console.log(selectedProducts);
            console.log(numbers);
            addToLocalStorage(selectedProducts);
        })
    })

}

function checkingIsAvailable( array, target) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === target) return true;
    }
    return false;
}

function addToLocalStorage(array) {
    localStorage.setItem('products', JSON.stringify(array));
}



getProducts();