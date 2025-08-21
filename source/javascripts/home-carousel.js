const homeSlideshowContainer = document.querySelector('.splide.home-slideshow');
if (homeSlideshowContainer) {
  function initSplide() {
    const slideCount = homeSlideshowContainer.querySelectorAll('.splide__slide').length;
    
    // Add class to differentiate single vs multiple slides
    if (slideCount === 1) {
      homeSlideshowContainer.classList.add('home-slideshow--single');
    } else {
      homeSlideshowContainer.classList.add('home-slideshow--multiple');
    }
    
    var splide = new Splide( '.splide.home-slideshow', {
      arrows: true,
      pagination: true,
      type: themeOptions.homepageSlideshowTransition,
      rewind: true,
      autoplay: themeOptions.homepageSlideshowAutoplay,
      interval: themeOptions.homepageSlideshowSpeed,
      speed: 1500,
      keyboard: true
    } );
    splide.mount();
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSplide);
  } else {
    initSplide();
  }
}