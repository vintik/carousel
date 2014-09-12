(function () {
  var CACHE_SIZE = 10;

  var carousel = {
    currentId: 0,
    offset: -Math.floor(CACHE_SIZE/2),
    middle: Math.floor(CACHE_SIZE/2),
    imgs: [],

    initialize: function () {
      // Pre-populate the cache
      for (var i = this.offset; i < (CACHE_SIZE + this.offset); i++) {
        if (i < 0) {
          this.imgs.push(null);
          continue;
        }
        img = createImg(i);
        this.imgs.push(img);
      }
    },

    showNext: function (e) {
      e.preventDefault()

      this.currentId++;
      this.offset++;

      this.imgs.shift();
      this.imgs.push(createImg(this.offset + CACHE_SIZE));

      showImg(this.imgs[this.middle]);
    },

    showPrev: function (e) {
      e.preventDefault()

      if (this.currentId == 0) {
        return false;
      }

      this.currentId--;
      this.offset--;

      this.imgs.pop();
      this.imgs.unshift(createImg(this.offset));

      showImg(this.imgs[this.middle]);
    }

  };

  window.onload = function () {
    var nextBtn = document.getElementsByClassName('next-btn')[0],
        prevBtn = document.getElementsByClassName('prev-btn')[0];

    carousel.initialize();


    nextBtn.addEventListener('click', carousel.showNext, false);
    prevBtn.addEventListener('click', carousel.showPrev, false);
  }

  function onPrevClick(e) {
    e.preventDefault();

    carousel.showPrev();
  }

  function onNextClick(e) {
    e.preventDefault();

    carousel.showNext();
  }

  function buildNewImgSrc(index) {
    return "http://robohash.org/" + index + ".png";
  }

  function createImg(index) {
    var img = document.createElement('img'),
        src = buildNewImgSrc(index);

    img.setAttribute('src', src);
    return img;
  }

  function showImg(newImg) {
    var el = document.getElementById('img-container');
    el.innerHTML = "";
    el.appendChild(newImg);
  }

}());