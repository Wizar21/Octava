document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const menuList = document.querySelector('.menu-list');

  menuToggle.addEventListener('click', () => {
    const isActive = menuList.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isActive);
  });
});


        const products = [
            {
                id: 1,
                name: "Электрогитара Fender",
                category: "guitars",
                description: "Профессиональная электрогитара с отличным звучанием. Подходит для студийной работы и живых выступлений.",
                price: "45 990 ₽",
                rating: 4.5,
                icon: "guitar",
                bgClass: "guitar-bg"
            },
            {
                id: 2,
                name: "Синтезатор Korg",
                category: "keyboards",
                description: "Цифровой синтезатор с 61 клавишей и более чем 800 тембрами.",
                price: "32 500 ₽",
                rating: 4,
                icon: "keyboard",
                bgClass: "keyboard-bg"
            },
            {
                id: 3,
                name: "Наушники Audio-Technica",
                category: "accessories",
                description: "Студийные мониторные наушники с точной передачей звука.",
                price: "12 300 ₽",
                rating: 5,
                icon: "headphones",
                bgClass: "headphones-bg"
            },
        ];
        const productsGrid = document.getElementById('products-grid');
        const categoryButtons = document.querySelectorAll('.category-btn');
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-btn');
        const productsCount = document.getElementById('products-count');

        
        let currentCategory = 'all';
        let currentSearchQuery = '';

       
        document.addEventListener('DOMContentLoaded', function() {
            renderProducts(products);
            
          
            categoryButtons.forEach(button => {
                button.addEventListener('click', function() {
                    
                    categoryButtons.forEach(btn => btn.classList.remove('active'));
                    
                    this.classList.add('active');
                    
                    
                    currentCategory = this.getAttribute('data-category');
                    
                    
                    filterProducts();
                });
            });
            
            searchButton.addEventListener('click', function() {
                currentSearchQuery = searchInput.value.toLowerCase();
                filterProducts();
            });
            
            searchInput.addEventListener('keyup', function(event) {
                if (event.key === 'Enter') {
                    currentSearchQuery = searchInput.value.toLowerCase();
                    filterProducts();
                }
            });
        });

        function renderProducts(productsToRender) {
            productsGrid.innerHTML = '';
            
            if (productsToRender.length === 0) {
                productsGrid.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <h3>Товары не найдены</h3>
                        <p>Попробуйте изменить параметры поиска или выбрать другую категорию</p>
                    </div>
                `;
                productsCount.textContent = '0';
                return;
            }
            
            productsToRender.forEach(product => {
                const ratingStars = getRatingStars(product.rating);
                
                const productElement = document.createElement('div');
                productElement.classList.add('card');
                productElement.setAttribute('data-category', product.category);
                productElement.setAttribute('data-name', product.name.toLowerCase());
                
                productElement.innerHTML = `
                    <div class="card-img ${product.bgClass}">
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${product.name}</h3>
                        <p class="card-desc">${product.description}</p>
                        <div class="rating">
                            ${ratingStars}
                        </div>
                        <div class="card-footer">
                            <div class="price">${product.price}</div>
                            <a href="prod.html"><button class="btn-cart"></i> Купить</button></a>
                        </div>
                    </div>
                `;
                
                productsGrid.appendChild(productElement);
            });
            
            productsCount.textContent = productsToRender.length;
        }

        function getRatingStars(rating) {
            let stars = '';
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 !== 0;
            
            for (let i = 0; i < fullStars; i++) {
                stars += '<i class="fas fa-star"></i>';
            }
            
            if (hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            }
            
            const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
            for (let i = 0; i < emptyStars; i++) {
                stars += '<i class="far fa-star"></i>';
            }
            
            return stars;
        }

        
        function filterProducts() {
            let filteredProducts = products;
            if (currentCategory !== 'all') {
                filteredProducts = filteredProducts.filter(product => product.category === currentCategory);
            }
            if (currentSearchQuery) {
                filteredProducts = filteredProducts.filter(product => 
                    product.name.toLowerCase().includes(currentSearchQuery) || 
                    product.description.toLowerCase().includes(currentSearchQuery)
                );
            }
            
            renderProducts(filteredProducts);
        }
