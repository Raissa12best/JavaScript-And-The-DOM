/*function changeAllArticleColors(){
    const articles=document.querySelectorAll('#products');
    for(let article of articles){
        article.classList.add('sale');


    }
}
changeAllArticleColors();or call the function from the window load event:
window.addEventListener('load', function() {
  changeAllArticleColors()
})
function attachBuyEvents(){
    
const buttons=document.querySelectorAll('.buy');
buttons.forEach(function(button){
button.addEventListener('click' ,function(evt){
    
    console.log('BUY');
    console.log(evt.target);


});
    });
}
attachBuyEvents();*/

document.addEventListener('DOMContentLoaded', function() {
    function attachBuyEvents() {
        const buttons = document.querySelectorAll('.buy');
        const cartBody = document.querySelector('#cart');
        const cartTableBody = document.createElement('tbody');
        cartBody.querySelector('table').appendChild(cartTableBody);
        let cart = {};

        function cartTotalUpdated() {
            let total = 0;
            for (let id in cart) total += cart[id].total;
            
        }

        function addToCart(dataId, h2, price, quantity) {
            const totalPrice = price * quantity;
            if (cart[dataId]) {
                cart[dataId].quantity += quantity;
                cart[dataId].total += totalPrice;
            } else {
                cart[dataId] = {
                    name: h2,
                    price: price,
                    quantity: quantity,
                    total: totalPrice
                };
            }

            const row = document.createElement('tr');
            const tdId = document.createElement('td');
            const tdName = document.createElement('td');
            const tdQty = document.createElement('td');
            const tdPrice = document.createElement('td');
            const tdTotal = document.createElement('td');
            const tdDelete = document.createElement('td');
            const deleteLink = document.createElement('a');

            tdId.textContent = dataId;
            tdName.textContent = h2;
            tdQty.textContent = quantity;
            tdPrice.textContent = price;
            tdTotal.textContent = totalPrice;
            deleteLink.href = '#';
            deleteLink.textContent = 'Delete';
            tdDelete.appendChild(deleteLink);

            row.appendChild(tdId);
            row.appendChild(tdName);
            row.appendChild(tdQty);
            row.appendChild(tdPrice);
            row.appendChild(tdTotal);
            row.appendChild(tdDelete);

            cartTableBody.appendChild(row);

            deleteLink.addEventListener('click', function(evt) {
                evt.preventDefault();
                delete cart[dataId];
                row.remove();
                cartTotalUpdated();
            });

            cartTotalUpdated();
        }

        buttons.forEach(function(button) {
            button.addEventListener('click', function(evt) {
                const article = evt.target.closest('article');
                article.classList.toggle('sale');
                const dataId = article.getAttribute('data-id');
                const name = article.querySelector('h2')?.textContent;
                const price = parseInt(article.querySelector('.price')?.textContent);
                const quantity = parseInt(article.querySelector('.quantity')?.value);
                if (!dataId || !name || isNaN(price) || isNaN(quantity)) {
                    console.error('Invalid article data:', { dataId, name, price, quantity });
                    return;
                }
                addToCart(dataId, name, price, quantity);
            });
        });
    }
    attachBuyEvents();
});