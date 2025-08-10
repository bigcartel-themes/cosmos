const homeSlideshowContainer = document.querySelector('.splide.home-slideshow');
if (homeSlideshowContainer) {
  function initSplide() {
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