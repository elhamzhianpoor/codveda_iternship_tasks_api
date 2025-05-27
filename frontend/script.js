const baseUrl = 'http://localhost:3000';
document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(products => {
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${baseUrl}${product.image}" alt="${product.title}" class="product-image"/>
                <div class ="product-tiltle">${product.title}</div>
                <div class ="product-description">${product.description}</div>
                <div class ="product-price">$${product.price}</div>
                <div class ="product-category"> ${product.category}</div>
                 `;
            productList.appendChild(card);
        });
    })
     .catch(error => {
        console.error('Error fetching products:', error);
        productList.innerHTML = '<p>Error fetching products. Please try again later.</p>';
    });
});

