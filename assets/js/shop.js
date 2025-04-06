// JavaScript for the shop page

document.addEventListener("DOMContentLoaded", () => {
  // Mobile filters functionality
  const mobileFilterBtn = document.getElementById("mobile-filter-btn")
  const mobileFiltersDrawer = document.getElementById("mobile-filters-drawer")
  const mobileFiltersClose = document.getElementById("mobile-filters-close")
  const mobileFiltersContent = document.getElementById("mobile-filters-content")
  const filtersSidebar = document.getElementById("filters-sidebar")

  if (mobileFilterBtn && mobileFiltersDrawer && mobileFiltersClose && mobileFiltersContent && filtersSidebar) {
    // Clone desktop filters to mobile drawer
    mobileFiltersContent.innerHTML = filtersSidebar.innerHTML

    // Open mobile filters
    mobileFilterBtn.addEventListener("click", () => {
      mobileFiltersDrawer.classList.add("active")
    })

    // Close mobile filters
    mobileFiltersClose.addEventListener("click", () => {
      mobileFiltersDrawer.classList.remove("active")
    })
  }

  // Sort functionality
  const sortSelect = document.getElementById("sort-select")
  const productsGrid = document.querySelector(".products-grid")

  if (sortSelect && productsGrid) {
    sortSelect.addEventListener("change", function () {
      const sortValue = this.value
      const productCards = Array.from(productsGrid.querySelectorAll(".product-card"))

      // Sort products based on selected option
      productCards.sort((a, b) => {
        const priceA = Number.parseFloat(a.querySelector(".product-price").textContent.replace("$", ""))
        const priceB = Number.parseFloat(b.querySelector(".product-price").textContent.replace("$", ""))

        if (sortValue === "price-low") {
          return priceA - priceB
        } else if (sortValue === "price-high") {
          return priceB - priceA
        }

        // For 'featured' and 'newest', maintain original order
        return 0
      })

      // Re-append sorted products
      productCards.forEach((card) => {
        productsGrid.appendChild(card)
      })
    })
  }

  // Filter functionality
  const filterCheckboxes = document.querySelectorAll(".checkbox")

  if (filterCheckboxes.length > 0 && productsGrid) {
    filterCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", applyFilters)
    })

    function applyFilters() {
      const productCards = Array.from(productsGrid.querySelectorAll(".product-card"))

      // Get selected filters
      const selectedTypes = Array.from(
        document.querySelectorAll('[id^="filter-wipes"], [id^="filter-soap"], [id^="filter-accessories"]'),
      )
        .filter((cb) => cb.checked)
        .map((cb) => cb.id.replace("filter-", ""))

      const selectedPrices = Array.from(
        document.querySelectorAll('[id^="filter-under-20"], [id^="filter-20-50"], [id^="filter-over-50"]'),
      )
        .filter((cb) => cb.checked)
        .map((cb) => cb.id.replace("filter-", ""))

      const selectedScents = Array.from(
        document.querySelectorAll(
          '[id^="filter-unscented"], [id^="filter-lavender"], [id^="filter-eucalyptus"], [id^="filter-citrus"]',
        ),
      )
        .filter((cb) => cb.checked)
        .map((cb) => cb.id.replace("filter-", ""))

      // Apply filters
      productCards.forEach((card) => {
        const title = card.querySelector(".product-title").textContent.toLowerCase()
        const price = Number.parseFloat(card.querySelector(".product-price").textContent.replace("$", ""))
        const description = card.querySelector(".product-description").textContent.toLowerCase()

        let showCard = true

        // Filter by product type
        if (selectedTypes.length > 0) {
          const matchesType = selectedTypes.some((type) => {
            if (type === "wipes") return title.includes("wipe")
            if (type === "soap") return title.includes("soap")
            if (type === "accessories") return !title.includes("wipe") && !title.includes("soap")
            return false
          })

          if (!matchesType) showCard = false
        }

        // Filter by price
        if (selectedPrices.length > 0 && showCard) {
          const matchesPrice = selectedPrices.some((priceRange) => {
            if (priceRange === "under-20") return price < 20
            if (priceRange === "20-50") return price >= 20 && price <= 50
            if (priceRange === "over-50") return price > 50
            return false
          })

          if (!matchesPrice) showCard = false
        }

        // Filter by scent
        if (selectedScents.length > 0 && showCard) {
          const matchesScent = selectedScents.some((scent) => {
            return title.includes(scent) || description.includes(scent)
          })

          if (!matchesScent) showCard = false
        }

        // Show or hide card
        card.style.display = showCard ? "block" : "none"
      })
    }

    // Reset filters
    const resetButtons = document.querySelectorAll(".btn-full")
    resetButtons.forEach((button) => {
      if (button.textContent.includes("Reset")) {
        button.addEventListener("click", () => {
          filterCheckboxes.forEach((checkbox) => {
            checkbox.checked = false
          })

          const productCards = productsGrid.querySelectorAll(".product-card")
          productCards.forEach((card) => {
            card.style.display = "block"
          })
        })
      }
    })
  }
})

