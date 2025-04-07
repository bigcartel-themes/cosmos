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
  if (isHomePage) {
    const heroButton = document.querySelector(".home-hero-button");
    if (heroButton) {
      heroButton.addEventListener("click", function (event) {
        if (themeOptions.heroButtonBehavior === "scroll") {
          event.preventDefault();
          const targetElement = document.querySelector("#main");
          if (targetElement) {
            smoothScroll(targetElement, 1000, -250);
          }
        }
      });
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
