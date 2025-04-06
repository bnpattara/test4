// JavaScript for the product page

document.addEventListener("DOMContentLoaded", () => {
  // Product gallery functionality
  const mainImage = document.getElementById("product-main-image")
  const thumbnails = document.querySelectorAll(".thumbnail-item")
  const prevButton = document.getElementById("gallery-prev")
  const nextButton = document.getElementById("gallery-next")
  const zoomButton = document.getElementById("gallery-zoom")

  if (mainImage && thumbnails.length > 0) {
    let currentIndex = 0
    const images = Array.from(thumbnails).map((thumb) => ({
      src: thumb.querySelector("img").src,
      alt: thumb.querySelector("img").alt,
    }))

    // Change main image when thumbnail is clicked
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => {
        setActiveImage(index)
      })
    })

    // Previous image button
    if (prevButton) {
      prevButton.addEventListener("click", () => {
        const newIndex = (currentIndex - 1 + images.length) % images.length
        setActiveImage(newIndex)
      })
    }

    // Next image button
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        const newIndex = (currentIndex + 1) % images.length
        setActiveImage(newIndex)
      })
    }

    // Zoom functionality
    if (zoomButton) {
      zoomButton.addEventListener("click", () => {
        const modal = document.createElement("div")
        modal.className = "image-zoom-modal"
        modal.innerHTML = `
          <div class="zoom-modal-content">
            <button class="zoom-close-btn">×</button>
            <img src="${images[currentIndex].src}" alt="${images[currentIndex].alt}" class="zoom-image">
          </div>
        `

        document.body.appendChild(modal)

        // Add styles for the modal
        const style = document.createElement("style")
        style.textContent = `
          .image-zoom-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }
          .zoom-modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
          }
          .zoom-image {
            max-width: 100%;
            max-height: 90vh;
            object-fit: contain;
          }
          .zoom-close-btn {
            position: absolute;
            top: -40px;
            right: 0;
            background: transparent;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
          }
        `
        document.head.appendChild(style)

        // Close modal when clicking close button or outside the image
        const closeBtn = modal.querySelector(".zoom-close-btn")
        closeBtn.addEventListener("click", () => {
          document.body.removeChild(modal)
        })

        modal.addEventListener("click", (e) => {
          if (e.target === modal) {
            document.body.removeChild(modal)
          }
        })
      })
    }

    function setActiveImage(index) {
      currentIndex = index
      mainImage.src = images[index].src
      mainImage.alt = images[index].alt

      thumbnails.forEach((thumb, i) => {
        if (i === index) {
          thumb.classList.add("active")
        } else {
          thumb.classList.remove("active")
        }
      })
    }
  }

  // Product tabs functionality
  const tabButtons = document.querySelectorAll(".tab-button")
  const tabContents = document.querySelectorAll(".tab-content")

  if (tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab")

        // Deactivate all tabs
        tabButtons.forEach((btn) => btn.classList.remove("active"))
        tabContents.forEach((content) => content.classList.remove("active"))

        // Activate selected tab
        this.classList.add("active")
        document.getElementById(`${tabId}-tab`).classList.add("active")
      })
    })
  }

  // Quantity selector functionality
  const decreaseBtn = document.getElementById("decrease-quantity")
  const increaseBtn = document.getElementById("increase-quantity")
  const quantityInput = document.getElementById("quantity")

  if (decreaseBtn && increaseBtn && quantityInput) {
    decreaseBtn.addEventListener("click", () => {
      const currentValue = Number.parseInt(quantityInput.value)
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1
      }
    })

    increaseBtn.addEventListener("click", () => {
      const currentValue = Number.parseInt(quantityInput.value)
      quantityInput.value = currentValue + 1
    })

    quantityInput.addEventListener("change", function () {
      if (this.value < 1) {
        this.value = 1
      }
    })
  }

  // Product options selection
  const optionButtons = document.querySelectorAll(".option-button")

  if (optionButtons.length > 0) {
    optionButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Find all buttons in the same option group
        const optionGroup = this.closest(".option-buttons")
        const buttons = optionGroup.querySelectorAll(".option-button")

        // Remove selected class from all buttons in group
        buttons.forEach((btn) => btn.classList.remove("selected"))

        // Add selected class to clicked button
        this.classList.add("selected")
      })
    })
  }

  // Related products carousel
  const relatedProductsCarousel = document.getElementById("related-products-carousel")
  const relatedPrevBtn = document.getElementById("related-prev")
  const relatedNextBtn = document.getElementById("related-next")

  if (relatedProductsCarousel) {
    // Sample related products data
    const relatedProducts = [
      {
        title: "Buff Wipes - Travel Pack",
        description: "10-pack for on-the-go",
        price: "$8.99",
        image: "/assets/images/placeholder.svg",
      },
      {
        title: "Eucalyptus Soap Bar",
        description: "Refreshing natural soap",
        price: "$9.99",
        image: "/assets/images/placeholder.svg",
      },
      {
        title: "Bamboo Travel Case",
        description: "For soap bars and wipes",
        price: "$14.99",
        image: "/assets/images/placeholder.svg",
      },
      {
        title: "Buff Wipes - Family Pack",
        description: "60-pack for extended use",
        price: "$24.99",
        image: "/assets/images/placeholder.svg",
      },
    ]

    // Generate HTML for related products
    let productsHTML = ""
    relatedProducts.forEach((product) => {
      productsHTML += `
        <div class="product-card">
          <div class="product-image-container">
            <img src="${product.image}" alt="${product.title}" class="product-image">
          </div>
          <div class="product-details">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-purchase">
              <span class="product-price">${product.price}</span>
              <button class="btn btn-sm btn-primary">Add to Cart</button>
            </div>
          </div>
        </div>
      `
    })

    relatedProductsCarousel.innerHTML = productsHTML

    // Carousel navigation for smaller screens
    if (relatedPrevBtn && relatedNextBtn) {
      const scrollAmount = 0
      const scrollStep = 300

      relatedNextBtn.addEventListener("click", () => {
        relatedProductsCarousel.scrollBy({
          left: scrollStep,
          behavior: "smooth",
        })
      })

      relatedPrevBtn.addEventListener("click", () => {
        relatedProductsCarousel.scrollBy({
          left: -scrollStep,
          behavior: "smooth",
        })
      })
    }
  }
})

