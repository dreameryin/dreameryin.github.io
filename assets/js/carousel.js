/*
 * 首页焦点图轮播：默认展示最近 3 篇 featured 文章，自动切换，
 * 鼠标悬停显示左右箭头并暂停自动轮播，圆点可点击跳转到对应文章。
 */
(function () {

  var root = document.getElementById("fcarousel");
  if (root === null) {
    return;
  }

  var slides = root.querySelectorAll(".fcarousel-slide");
  var dots = root.querySelectorAll(".fcarousel-dot");
  var captionLink = document.getElementById("fcarousel-caption-link");

  // 只有一张图时：隐藏箭头和圆点，不做轮播
  if (slides.length <= 1) {
    var arrows = root.querySelectorAll(".fcarousel-arrow");
    var dotsBox = root.querySelector(".fcarousel-dots");
    for (var hideIndex = 0; hideIndex < arrows.length; hideIndex++) {
      arrows[hideIndex].style.display = "none";
    }
    if (dotsBox !== null) {
      dotsBox.style.display = "none";
    }
    return;
  }

  var currentIndex = 0;
  var autoTimer = null;
  var AUTO_INTERVAL = 4000;

  function showSlide(targetIndex) {
    slides[currentIndex].classList.remove("active");
    dots[currentIndex].classList.remove("active");
    currentIndex = targetIndex;
    slides[currentIndex].classList.add("active");
    dots[currentIndex].classList.add("active");
    // 同步更新图片下方的文章标题
    if (captionLink !== null) {
      var activeSlide = slides[currentIndex];
      captionLink.textContent = activeSlide.getAttribute("data-title");
      captionLink.setAttribute("href", activeSlide.getAttribute("href"));
    }
  }

  function showNext() {
    showSlide((currentIndex + 1) % slides.length);
  }

  function showPrev() {
    showSlide((currentIndex - 1 + slides.length) % slides.length);
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(showNext, AUTO_INTERVAL);
  }

  function stopAuto() {
    if (autoTimer !== null) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  root.querySelector(".fcarousel-arrow.next").addEventListener("click", function () {
    showNext();
    startAuto();
  });

  root.querySelector(".fcarousel-arrow.prev").addEventListener("click", function () {
    showPrev();
    startAuto();
  });

  for (var dotIndex = 0; dotIndex < dots.length; dotIndex++) {
    (function (boundIndex) {
      dots[boundIndex].addEventListener("click", function () {
        showSlide(boundIndex);
        startAuto();
      });
    })(dotIndex);
  }

  // 悬停暂停轮播，移出恢复
  root.addEventListener("mouseenter", stopAuto);
  root.addEventListener("mouseleave", startAuto);

  startAuto();

})();
