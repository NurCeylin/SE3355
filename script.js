// Hamburger menüsü için toggle
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.menu').classList.toggle('open');
});

// Quick Links için API'den veri çekme ve ekleme
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

// Elektronik Fırsatlar için API'den veri çekme ve otomatik slider oluşturma
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

        // İlk ürün görünür yapalım
        showProduct(currentProductIndex);

        // 3 saniyede bir ürün değiştir
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

// Main Slider (Mock API'den veri çekerek)
let currentSlide = 0;
let slides = [];

const sliderApiUrl = 'https://run.mocky.io/v3/628ba558-328a-477f-a982-0e9d0252bfe8';

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

document.addEventListener('DOMContentLoaded', () => {
    createSliderFromAPI();

    // Sana Özel Öneriler - API'den veri çekme
    fetch("https://run.mocky.io/v3/b9cc2fb8-28a7-4d9b-8eda-c7a5e2c38ad0")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("special-recommendations");
            data.slice(0, 5).forEach(product => {
                const col = document.createElement("div");
                col.className = "col-6 col-md-4 col-lg-3 mb-4";

                col.innerHTML = `
                    <div class="card h-100 shadow-sm border-0">
                      <img src="${product.image}" class="card-img-top img-fluid p-3" alt="${product.name}" style="height: 200px; object-fit: contain;">
                      <div class="card-body">
                        <h6 class="card-title">${product.name}</h6>
                        <p class="card-text fw-bold text-danger">${product.price} TL</p>
                        <p class="card-text text-warning mb-0">⭐ ${product.rating}</p>
                      </div>
                    </div>
                `;

                container.appendChild(col);
            });
        })
        .catch(error => {
            console.error("Sana özel öneriler verisi çekilemedi:", error);
        });
});
