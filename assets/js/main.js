// Main JavaScript file for NatureBuff website

document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Mobile navigation toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  const mobileNav = document.getElementById('mobile-nav');
  
  if (mobileMenuToggle && mobileMenuClose && mobileNav) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileNav.classList.add('active');
    });
    \
    mobileMenuClose.addEventListener('click\', function() {n() {
      mobileNav.classList.remove('active');
    });
  }

// Load header and footer
const headerPlaceholder = document.getElementById("header-placeholder")
const footerPlaceholder = document.getElementById("footer-placeholder")

if (headerPlaceholder) {
  fetch("/layout/header.html")
    .then((response) => response.text())
    .then((data) => {
      headerPlaceholder.innerHTML = data
      initializeHeader()
    })
}

if (footerPlaceholder) {
  fetch("/layout/footer.html")
    .then((response) => response.text())
    .then((data) => {
      footerPlaceholder.innerHTML = data
    })
}

// Initialize hero carousel if it exists
const heroCarousel = document.getElementById("hero-carousel")
if (heroCarousel) {
  initializeHeroCarousel()
}
})

// Initialize header functionality after it's loaded
function initializeHeader() {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const mobileMenuClose = document.querySelector(".mobile-menu-close")
  const mobileNav = document.getElementById("mobile-nav")

  if (mobileMenuToggle && mobileMenuClose && mobileNav) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileNav.classList.add("active")
    })

    mobileMenuClose.addEventListener("click", () => {
      mobileNav.classList.remove("active")
    })
  }
}

// Hero carousel functionality
function initializeHeroCarousel() {
  const heroCarousel = document.getElementById("hero-carousel")
  const heroImages = [
    {
      src: "/assets/images/heroimage.png",
      alt: "Mountain landscape with turquoise alpine lake surrounded by steep slopes",
    },
    {
      src: "/assets/images/placeholder.svg",
      alt: "Person hiking in nature with sustainable hygiene products",
    },
    {
      src: "/assets/images/placeholder.svg",
      alt: "Close-up of biodegradable bamboo wipes in natural setting",
    },
    {
      src: "/assets/images/placeholder.svg",
      alt: "Natural soap bars with herbs and essential oils",
    },
  ]

  // Create carousel HTML
  let carouselHTML = ""
  heroImages.forEach((image, index) => {
    carouselHTML += `
      <div class="hero-slide ${index === 0 ? "active" : ""}">
        <img src="${image.src}" alt="${image.alt}" class="hero-image">
      </div>
    `
  })

  // Add overlay
  carouselHTML += '<div class="hero-overlay"></div>'

  // Add navigation controls
  carouselHTML += `
    <div class="carousel-controls">
      <button class="carousel-control prev" id="hero-prev">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button class="carousel-control next" id="hero-next">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
    <div class="carousel-indicators">
      ${heroImages
        .map(
          (_, index) => `
        <button class="carousel-indicator ${index === 0 ? "active" : ""}" data-index="${index}"></button>
      `,
        )
        .join("")}
    </div>
  `

  heroCarousel.innerHTML = carouselHTML

  // Set up carousel functionality
  const slides = heroCarousel.querySelectorAll(".hero-slide")
  const indicators = heroCarousel.querySelectorAll(".carousel-indicator")
  const prevButton = heroCarousel.querySelector("#hero-prev")
  const nextButton = heroCarousel.querySelector("#hero-next")
  let currentIndex = 0
  let interval

  function goToSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"))
    indicators.forEach((indicator) => indicator.classList.remove("active"))

    slides[index].classList.add("active")
    indicators[index].classList.add("active")
    currentIndex = index
  }

  function nextSlide() {
    const newIndex = (currentIndex + 1) % slides.length
    goToSlide(newIndex)
  }

  function prevSlide() {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length
    goToSlide(newIndex)
  }

  // Add event listeners
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      prevSlide()
      resetInterval()
    })
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      nextSlide()
      resetInterval()
    })
  }

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      goToSlide(index)
      resetInterval()
    })
  })

  // Auto-rotate slides
  function startInterval() {
    interval = setInterval(nextSlide, 5000)
  }

  function resetInterval() {
    clearInterval(interval)
    startInterval()
  }

  startInterval()
}

