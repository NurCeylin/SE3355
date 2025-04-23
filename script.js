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
let electronicsProducts = [];
let currentProductIndex = 0;

const electronicsApiUrl = 'https://run.mocky.io/v3/ed0a4d2b-dd24-49b4-9a27-c3e1b7fde49f';
const container = document.getElementById('electronics-deals-container');

fetch(electronicsApiUrl)
    .then(response => response.json())
    .then(data => {
        electronicsProducts = data;

        electronicsProducts.forEach(item => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            productCard.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Fiyat: ${item.price}</p>
            `;

            container.appendChild(productCard);
        });

        startProductSlider();
    })
    .catch(error => {
        console.error('Elektronik fırsatlar verileri çekilemedi:', error);
    });

function startProductSlider() {
    setInterval(() => {
        currentProductIndex = (currentProductIndex + 1) % electronicsProducts.length;
        const slideWidth = container.clientWidth;
        container.style.transform = `translateX(-${currentProductIndex * slideWidth}px)`;
    }, 3000);
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

// Sayfa yüklendiğinde slider'ı başlat
document.addEventListener('DOMContentLoaded', createSliderFromAPI);
