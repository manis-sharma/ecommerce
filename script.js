
        // Sample product data
        const products = [
            {
                id: 1,
                name: "Premium Wireless Headphones",
                description: "High-quality wireless headphones with noise cancellation",
                price: 199.99,
                category: "electronics",
                rating: 4.8,
                image: "🎧",
                badge: "Best Seller"
            },
            {
                id: 2,
                name: "Smart Fitness Watch",
                description: "Track your health and fitness with style",
                price: 299.99,
                category: "electronics",
                rating: 4.6,
                image: "⌚",
                badge: "New"
            },
            {
                id: 3,
                name: "Premium Cotton T-Shirt",
                description: "Comfortable and stylish everyday wear",
                price: 29.99,
                category: "clothing",
                rating: 4.4,
                image: "👕",
                badge: "Sale"
            },
            {
                id: 4,
                name: "JavaScript: The Definitive Guide",
                description: "Master the world's most popular programming language",
                price: 49.99,
                category: "books",
                rating: 4.9,
                image: "📚",
                badge: "Popular"
            },
            {
                id: 5,
                name: "Smart Home Speaker",
                description: "Voice-controlled smart speaker with premium sound",
                price: 149.99,
                category: "electronics",
                rating: 4.5,
                image: "🔊",
                badge: "Featured"
            },
            {
                id: 6,
                name: "Organic Plant Set",
                description: "Beautiful indoor plants to brighten your space",
                price: 39.99,
                category: "home",
                rating: 4.7,
                image: "🪴",
                badge: "Eco"
            },
            {
                id: 7,
                name: "Professional Camera",
                description: "Capture life's moments in stunning detail",
                price: 899.99,
                category: "electronics",
                rating: 4.8,
                image: "📸",
                badge: "Pro"
            },
            {
                id: 8,
                name: "Designer Sneakers",
                description: "Premium comfort meets contemporary style",
                price: 159.99,
                category: "clothing",
                rating: 4.3,
                image: "👟",
                badge: "Trending"
            }
        ];

        // Cart system (using in-memory storage)
        let cart = [];
        let filteredProducts = [...products];

        // DOM elements
        const themeToggle = document.getElementById('themeToggle');
        const cartBtn = document.getElementById('cartBtn');
        const cartOverlay = document.getElementById('cartOverlay');
        const cartSidebar = document.getElementById('cartSidebar');
        const cartClose = document.getElementById('cartClose');
        const cartCount = document.getElementById('cartCount');
        const cartItems = document.getElementById('cartItems');
        const cartFooter = document.getElementById('cartFooter');
        const cartTotal = document.getElementById('cartTotal');
        const productsGrid = document.getElementById('productsGrid');
        const searchInput = document.getElementById('searchInput');
        const categoryFilter = document.getElementById('categoryFilter');
        const priceFilter = document.getElementById('priceFilter');
        const ratingFilter = document.getElementById('ratingFilter');

        // Theme toggle
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });

        // Cart functions
        function updateCartUI() {
            cartCount.textContent = cart.length;
            
            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="empty-cart">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">🛒</div>
                        <h3>Your cart is empty</h3>
                        <p>Add some products to get started</p>
                    </div>
                `;
                cartFooter.style.display = 'none';
                return;
            }

            const total = cart.reduce((sum, item) => sum + item.price, 0);
            cartTotal.textContent = `$${total.toFixed(2)}`;
            cartFooter.style.display = 'block';

            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image" style="display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                        ${item.image}
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">$${item.price}</div>
                        <button onclick="removeFromCart(${item.id})" style="background: none; border: none; color: var(--danger-color); cursor: pointer; font-size: 0.875rem; margin-top: 0.5rem;">Remove</button>
                    </div>
                </div>
            `).join('');
        }

        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            if (product && !cart.find(item => item.id === productId)) {
                cart.push(product);
                updateCartUI();
                
                // Show success animation
                const btn = event.target;
                const originalText = btn.textContent;
                btn.textContent = '✓ Added';
                btn.style.background = 'var(--success-color)';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                }, 1500);
            }
        }

        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartUI();
        }

        // Cart sidebar toggle
        cartBtn.addEventListener('click', () => {
            cartOverlay.classList.add('active');
            cartSidebar.classList.add('active');
        });

        cartClose.addEventListener('click', closeCart);
        cartOverlay.addEventListener('click', (e) => {
            if (e.target === cartOverlay) closeCart();
        });

        function closeCart() {
            cartOverlay.classList.remove('active');
            cartSidebar.classList.remove('active');
        }

        // Product rendering
        function renderProducts(productsToRender = filteredProducts) {
            productsGrid.innerHTML = productsToRender.map(product => `
                <div class="product-card fade-in">
                    <div class="product-image">
                        <div class="product-badge">${product.badge}</div>
                        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 4rem; background: linear-gradient(135deg, #f8fafc, #e2e8f0);">
                            ${product.image}
                        </div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-price">${product.price}</div>
                        <div class="product-rating">
                            <div class="stars">
                                ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                            </div>
                            <span style="color: var(--text-muted); font-size: 0.875rem;">(${product.rating})</span>
                        </div>
                        <div class="product-actions">
                            <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})">
                                Add to Cart
                            </button>
                            <button class="btn btn-ghost btn-sm">
                                ❤️ Save
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Search functionality
        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase();
            const category = categoryFilter.value;
            const priceRange = priceFilter.value;
            const minRating = parseFloat(ratingFilter.value) || 0;

            filteredProducts = products.filter(product => {
                const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                                    product.description.toLowerCase().includes(searchTerm);
                const matchesCategory = !category || product.category === category;
                const matchesRating = product.rating >= minRating;
                
                let matchesPrice = true;
                if (priceRange) {
                    if (priceRange === '0-25') {
                        matchesPrice = product.price <= 25;
                    } else if (priceRange === '25-50') {
                        matchesPrice = product.price > 25 && product.price <= 50;
                    } else if (priceRange === '50-100') {
                        matchesPrice = product.price > 50 && product.price <= 100;
                    } else if (priceRange === '100+') {
                        matchesPrice = product.price > 100;
                    }
                }

                return matchesSearch && matchesCategory && matchesPrice && matchesRating;
            });

            renderProducts(filteredProducts);
        }

        // Event listeners for search and filters
        searchInput.addEventListener('input', performSearch);
        categoryFilter.addEventListener('change', performSearch);
        priceFilter.addEventListener('change', performSearch);
        ratingFilter.addEventListener('change', performSearch);

        // Initialize page
        document.addEventListener('DOMContentLoaded', () => {
            renderProducts();
            updateCartUI();
            
            // Add scroll animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // Observe all product cards
            setTimeout(() => {
                document.querySelectorAll('.product-card').forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    card.style.transition = 'all 0.6s ease';
                    observer.observe(card);
                });
            }, 100);
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeCart();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
        });

        // Add some interactive hover effects
        document.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('product-card')) {
                e.target.style.transform = 'translateY(-8px) scale(1.02)';
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.classList.contains('product-card')) {
                e.target.style.transform = 'translateY(0) scale(1)';
            }
        });

        // Smooth scrolling for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add loading states for buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-primary') && e.target.textContent.includes('Add to Cart')) {
                const btn = e.target;
                const originalHTML = btn.innerHTML;
                btn.innerHTML = '<div class="loading"></div> Adding...';
                btn.disabled = true;
                
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.disabled = false;
                }, 1000);
            }
        });

        // Add particle effect on hero section
        function createParticle() {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                pointer-events: none;
                animation: particleFloat 3s linear infinite;
            `;
            
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 3 + 's';
            
            const hero = document.querySelector('.hero');
            hero.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 3000);
        }

        // Add particle animation keyframes
        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(100vh) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-10px) translateX(${Math.random() * 100 - 50}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(particleStyle);

        // Create particles periodically
        setInterval(createParticle, 500);

        // Add ripple effect to buttons
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('btn')) {
                const btn = e.target;
                const ripple = document.createElement('span');
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255,255,255,0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                btn.style.position = 'relative';
                btn.style.overflow = 'hidden';
                btn.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });

        // Add ripple animation
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);

        // Performance optimization: Debounce search
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        // Replace immediate search with debounced version
        const debouncedSearch = debounce(performSearch, 300);
        searchInput.removeEventListener('input', performSearch);
        searchInput.addEventListener('input', debouncedSearch);
