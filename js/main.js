// Distortion Effect Slider
let spriteImages = document.querySelectorAll(".slide-item__image");
let spriteImagesSrc = [];
let texts = [];

for (let i = 0; i < spriteImages.length; i++) {
  let img = spriteImages[i];
  spriteImagesSrc.push(img.getAttribute("src"));
}

let initCanvasSlideshow = new CanvasSlideshow({
  wrapper: document.querySelector('.left'),
  navElement: document.querySelectorAll( '.scene-nav span' ),
  sprites: spriteImagesSrc,
  displacementImage: "../img/dmaps/clouds.jpg",
  autoPlay: false,
  displaceScale: [300, 300],
  fullScreen: true,
  wacky: true,
  centerSprites: false,
});

const menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', function () {
  menuToggle.classList.toggle('open');
});

const thumbsSwiper = new Swiper('.thumbs-swiper', {
  slidesPerView: 1,
  allowTouchMove: false,
  loop: true,
  speed: 500,
  spaceBetween: 100,
  freeMode: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  pagination: {
    el: '.bullets',
    bulletClass: 'bullet-container',
    bulletActiveClass: 'bullet-active',
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className}">
      <div class="number">0${index + 1}</div>
      <span class="bullet"></span>
    </span>`
    }
  },
  breakpoints: {
    300: {
      slidesPerView: 3,
      spaceBetween: 10,
      centeredSlides: true,
    },
    768: {
      slidesPerView: 1,
    }
  }
});

// Swiper Slider
const mainSwiper = new Swiper('.main-swiper', {
  navigation: {
    nextEl: '.scene-nav--next span',
    prevEl: '.scene-nav--prev span',
  },
  pagination: {
    el: '.bullets',
    bulletClass: 'bullet-container',
    bulletActiveClass: 'bullet-active',
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className}">
      <div class="number">0${index + 1}</div>
      <span class="bullet"></span>
    </span>`
    }
  },
  allowTouchMove: true,
  breakpoints: {
    1024: {
      allowTouchMove: false,
    }
  },
  loop: true,
  speed: 500,
  slidesPerView: 1,
  spaceBetween: 50,
  longSwipes: false,
  preventClicks: true,
  thumbs: {
    swiper: thumbsSwiper,
  }
});

const labelsMainSwiper = new Swiper('.labels-main-slide', {
  loop: true,
  slidesPerView: 1,
  allowTouchMove: true,
})

const navOverlay = document.querySelectorAll('.scene-nav .overlay');
mainSwiper.on('transitionStart', function () {
  navOverlay.forEach(function (o) {
    o.style.zIndex = '1';
  });
})
mainSwiper.on('transitionEnd', function () {
  navOverlay.forEach(function (o) {
    o.style.zIndex = '-1';
  });
})


mainSwiper.on('slideChange', function () {
  let index = mainSwiper.activeIndex - 1;  
  if (index > 3) {
    index = 0;
    initCanvasSlideshow.moveSlider(index);
  } else if (index < 0) {
    index = 3;
    initCanvasSlideshow.moveSlider(index);
  } else {
    initCanvasSlideshow.moveSlider(index);
  }
  if (window.innerWidth <= 600) {
  index = mainSwiper.activeIndex - 1;
  const thumbsSwiperWrapper = document.querySelector('.thumbs-swiper .swiper-wrapper');
  const thumbsSwiperitem = thumbsSwiperWrapper.querySelectorAll('.swiper-slide')[0];
  let itemSwiperWidth = thumbsSwiperitem.clientWidth + parseFloat(thumbsSwiperitem.style.marginRight);
    thumbsSwiperWrapper.style.transform = `translate3d(${(-itemSwiperWidth * 2) - (itemSwiperWidth * index)}px, 0px, 0px)`;
  }
})


document.querySelector('.bi-search').addEventListener('click', function () {
  document.querySelector('.mobile-search-overlay').style.transform = 'translateY(0%)';
})

document.querySelector('.mobile-search-overlay .bi-x-lg').addEventListener('click', function () {
  document.querySelector('.mobile-search-overlay').style.transform = 'translateY(-100%)';
})

VanillaTilt.init(document.querySelectorAll(".label"), {
  max: 20,
  speed: 400
});

const thumbPosts = document.querySelectorAll('.thumb-post');
thumbPosts.forEach(function (tp) {
  tp.addEventListener('click', function () {
    thumbPosts.forEach(function (t) {
      t.classList.remove('active');
    })
    tp.classList.add('active');
  })
})