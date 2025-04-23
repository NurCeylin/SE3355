document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.menu').classList.toggle('open');
});

// Quick Links için API
const quickLinksApiUrl = 'https://run.mocky.io/v3/5bd9dc23-22d8-4eb2-aec9-34ce6ef3629a';
fetch(quickLinksApiUrl)
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('quick-links-container');
        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'quick-card';

            card.innerHTML = `
                <a href="${item.link}" target="_blank">
                    <img src="${item.imageUrl}" alt="${item.title}">
                </a>
            `;
            container.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Quick Links verileri çekilemedi:', error);
    });

// Elektronik Fırsatlar için API
let currentProductIndex = 0;
let productCards = [];

const electronicsApiUrl = 'https://run.mocky.io/v3/ed0a4d2b-dd24-49b4-9a27-c3e1b7fde49f';

fetch(electronicsApiUrl)
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('electronics-deals-container');
        data.forEach(item => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img class="product-image" src="${item.imageUrl}" alt="${item.title}">
                <h3 class="product-title">${item.title}</h3>
                <p class="product-price">${item.price}</p>
            `;
            container.appendChild(productCard);
            productCards.push(productCard);
        });

        showProduct(currentProductIndex);

        setInterval(() => {
            currentProductIndex = (currentProductIndex + 1) % productCards.length;
            showProduct(currentProductIndex);
        }, 3000);
    })
    .catch(error => {
        console.error('Elektronik fırsatlar verileri çekilemedi:', error);
    });

function showProduct(index) {
    productCards.forEach(card => {
        card.classList.remove('visible');
    });
    productCards[index].classList.add('visible');
}

// Main Slider için API
let currentSlide = 0;
let slides = [];

const sliderApiUrl = 'https://run.mocky.io/v3/b9bffda4-2235-4033-b0d4-218b41c4b624';

function createSliderFromAPI() {
    fetch(sliderApiUrl)
        .then(response => response.json())
        .then(data => {
            slides = data;
            const sliderContainer = document.querySelector('.slider-container');

            slides.forEach(item => {
                const slide = document.createElement('div');
                slide.className = 'slide';
                slide.style.backgroundImage = `url('${item.imageUrl}')`;
                slide.style.backgroundSize = 'cover';
                slide.style.backgroundPosition = 'center';
                
          
                const slideContent = document.createElement('div');
                slideContent.className = 'slide-content';
                slideContent.innerHTML = `
                    <h2>${item.title}</h2>
                    <p>Sınırlı süre için geçerli fırsatları kaçırma!</p>
                `;
                
                slide.appendChild(slideContent);
                sliderContainer.appendChild(slide);
            });

            showSlide(currentSlide);
          
        })
        .catch(error => {
            console.error('Slider verileri çekilemedi:', error);
        });
}

function showSlide(index) {
    const sliderContainer = document.querySelector('.slider-container');
    const slideWidth = sliderContainer.querySelector('.slide')?.clientWidth || 600;
    sliderContainer.style.transform = `translateX(-${index * slideWidth}px)`;

    const pagination = document.getElementById('slider-pagination');
    if (pagination && slides.length > 0) {
        pagination.textContent = `${index + 1}/${slides.length}`;
    }
}

function nextSlide() {
    if (slides.length === 0) return;
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    if (slides.length === 0) return;
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);

// Sana Özel Öneriler için API
document.addEventListener('DOMContentLoaded', () => {
    createSliderFromAPI();
    
    fetch("https://run.mocky.io/v3/b9cc2fb8-28a7-4d9b-8eda-c7a5e2c38ad0")
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("recommendations-container");

        data.forEach(product => {
        
            const ratingStars = Array(5).fill('').map((_, i) => {
                return i < Math.floor(product.rating) ? '★' : '☆';
            }).join('');
            
            const card = document.createElement("div");
            card.classList.add("special-card");
            card.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.title}">
                <h3>${product.title}</h3>
                <div class="price">${product.price} TL</div>
                <div class="rating">
                    <span class="stars">${ratingStars}</span>
                </div>
            `;
            container.appendChild(card);
        });
    })
    .catch(err => console.error("Veri çekme hatası:", err));


    if (window.innerWidth <= 768) {
        const menuItems = document.querySelectorAll('.menu > li');
        menuItems.forEach(item => {
            if (item.querySelector('.submenu')) {
                item.addEventListener('click', function(e) {
                    if (e.target === this || e.target === this.querySelector('a')) {
                        e.preventDefault();
                        this.classList.toggle('active');
                    }
                });
            }
        });
    }
});
