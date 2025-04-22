// Hamburger Menüsü Toggle
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.menu').classList.toggle('open');
});

// Quick Links API'den veri çekme
const quickLinksUrl = 'https://run.mocky.io/v3/5bd9dc23-22d8-4eb2-aec9-34ce6ef3629a';

fetch(quickLinksUrl)
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('quick-links-container');

    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'quick-card';

      card.innerHTML = `
        <a href="${item.link}" target="_blank" style="text-decoration: none;">
          <img src="${item.imageUrl}" alt="${item.title}">
        </a>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Quick Links verileri çekilemedi:', error);
  });

// Main Slider API'den veri çekme
const sliderUrl = 'https://run.mocky.io/v3/080aef8e-ad51-4368-a52f-20b0e8f28b64';
const sliderContainer = document.getElementById('slider-container');
let sliderImages = [];
let currentIndex = 0;

fetch(sliderUrl)
  .then(response => response.json())
  .then(data => {
    sliderImages = data;
    updateSlider();
  })
  .catch(error => {
    console.error('Slider verileri çekilemedi:', error);
  });

function updateSlider() {
    sliderContainer.innerHTML = '';

    sliderImages.forEach((item, index) => {
        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.title;
        if (index !== currentIndex) {
            img.style.display = 'none';
        }
        sliderContainer.appendChild(img);
    });
}

document.getElementById('prevBtn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + sliderImages.length) % sliderImages.length;
    showSlide();
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % sliderImages.length;
    showSlide();
});

function showSlide() {
    const images = sliderContainer.querySelectorAll('img');
    images.forEach((img, idx) => {
        img.style.display = idx === currentIndex ? 'block' : 'none';
    });
}
