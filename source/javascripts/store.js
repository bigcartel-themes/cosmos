"use strict";

document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.remove("preloader");
  let contactFields = document.querySelectorAll(".contact-form input, .contact-form textarea");
  contactFields.forEach(function (contactField) {
    contactField.removeAttribute("tabindex");
  });
  const numShades = 5;

  let cssProperties = [];

  for (const themeColor in themeColors) {
    const hexValue = themeColors[themeColor];
    var hsl = tinycolor(hexValue).toHsl();
    for (var i = numShades - 1; i >= 0; i -= 1) {
      hsl.l = (i + 0.5) / numShades;
      cssProperties.push(`--${camelCaseToDash(themeColor)}-${((i * 100) / 1000) * 200}: ${tinycolor(hsl).toRgbString()};`);
    }
    numColor = tinycolor(hexValue).toRgb();
    cssProperties.push(`--${camelCaseToDash(themeColor)}-rgb: ${numColor["r"]}, ${numColor["g"]}, ${numColor["b"]};`);
  }

  const headTag = document.getElementsByTagName("head")[0];
  const styleTag = document.createElement("style");

  styleTag.innerHTML = `
    :root {
      ${cssProperties.join("\n")}
    }
  `;
  headTag.appendChild(styleTag);
});

window.addEventListener("load", () => {
  document.body.classList.remove("transition-preloader");
  setDocHeight();
});
window.addEventListener("resize", () => {
  setDocHeight();
});

function setDocHeight() {
  win_height = window.innerHeight;
  document.documentElement.style.setProperty("--vh", win_height / 100 + "px");
}

document.addEventListener('DOMContentLoaded', () => {
  const isHomePage = document.body.getAttribute('data-bc-page-type') === 'home';
  const heroButtonLink = themeOptions.heroButtonLink && themeOptions.heroButtonLink.trim() !== '' ? themeOptions.heroButtonLink : null;
  const heroImageLink = themeOptions.heroImageLink && themeOptions.heroImageLink.trim() !== '' ? themeOptions.heroImageLink : null;
  const heroButtonBehavior = themeOptions.heroButtonBehavior;
  if (isHomePage) {
    const heroButton = document.querySelector(".home-hero-button");
    if (heroButton) {
      heroButton.addEventListener("click", function (event) {
        if (heroButtonBehavior === "scroll") {
          event.preventDefault();
          const targetElement = document.querySelector("#main");
          if (targetElement) {
            smoothScroll(targetElement, 1000, -250);
          }
        } else if (heroButtonBehavior === "navigate") {
          // Use external link detection for proper tab behavior
          if (isExternalLink(event.target.href)) {
            event.preventDefault();
            event.stopPropagation();
            window.open(event.target.href, '_blank', 'noopener,noreferrer');
          }
          // Let internal links use template's href naturally
        }
      });
    }

    // Add clickable functionality to hero/slideshow when no button is present
    // and a URL is configured (button behavior only applies when button exists)
    if (!heroButton && heroImageLink) {
      const heroArea = document.querySelector(".home-hero");
      const slideshow = document.querySelector(".home-slideshow");
      
      if (slideshow) {
        // For slideshow, only make the slides clickable, not the entire hero area
        // This prevents interfering with splide navigation controls
        const slides = slideshow.querySelectorAll('.splide__slide');
        slides.forEach(slide => {
          slide.classList.add("hero-clickable");
          slide.setAttribute("role", "button");
          slide.setAttribute("aria-label", "Navigate to " + heroImageLink);
        });
        
        // Use event delegation: single listener on slideshow container
        slideshow.addEventListener("click", function(event) {
          const clickedSlide = event.target.closest('.splide__slide');
          if (clickedSlide && !event.target.closest('.splide__arrow, .splide__pagination')) {
            // Don't interfere with splide controls - only handle clicks on slide content
            event.preventDefault();
            event.stopPropagation();
            if (isExternalLink(heroImageLink)) {
              window.open(heroImageLink, '_blank', 'noopener,noreferrer');
            } else {
              window.location.href = heroImageLink;
            }
          }
        });
      } else if (heroArea) {
        // For single hero image, make the whole area clickable
        heroArea.classList.add("hero-clickable");
        heroArea.setAttribute("role", "button");
        heroArea.setAttribute("aria-label", "Navigate to " + heroImageLink);
        heroArea.addEventListener("click", function(event) {
          if (isExternalLink(heroImageLink)) {
            window.open(heroImageLink, '_blank', 'noopener,noreferrer');
          } else {
            window.location.href = heroImageLink;
          }
        });
      }
    }

    const featuredCategoriesContainerSelector = '.featured-categories';
    const featuredCategoriesContainer = document.querySelector(featuredCategoriesContainerSelector);
    const categoryCollagesEnabled = featuredCategoriesContainer?.dataset.categoryCollagesEnabled === 'true';

    if (categoryCollagesEnabled) {
      setupCategoryCollages({ 
        collage: { 
          width: 700, 
        height: 700 
        } 
      });
    }
  }
});

// Hybrid announcement pause: hover on desktop, tap-to-toggle on mobile, focus for keyboard
document.addEventListener('DOMContentLoaded', () => {
  const announcement = document.querySelector('.announcement-message--scrolling');

  if (!announcement) return;

  const scrollContent = announcement.querySelector('.announcement-message__scroll-content');
  const firstText = announcement.querySelector('.announcement-message__text');

  // Calculate exact scroll distance for seamless looping
  function updateScrollDistance() {
    if (scrollContent && firstText) {
      // Get the width of one text block including its spacing
      const textWidth = firstText.offsetWidth;

      // Set CSS variable with exact pixel distance to scroll
      // This ensures perfectly seamless looping regardless of content length
      scrollContent.style.setProperty('--scroll-distance', `-${textWidth}px`);
    }
  }

  // Initial calculation
  updateScrollDistance();

  // Recalculate on resize (debounced to avoid performance issues)
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateScrollDistance, 150);
  });

  // Add tap-to-toggle for all devices (primarily for touch devices)
  // Desktop users can still use hover (handled by CSS), but click also works as backup
  let isPaused = false;

  announcement.addEventListener('click', (e) => {
    // Don't toggle if user clicked a link - let the link work normally
    if (e.target.closest('a')) return;

    // Toggle pause state
    isPaused = !isPaused;
    announcement.classList.toggle('is-paused', isPaused);
  });
});
