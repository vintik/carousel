(function () {

  window.onload = function () {
    var nextBtn = document.getElementsByClassName('next-btn')[0],
        prevBtn = document.getElementsByClassName('prev-btn')[0];

    var carousel = new Carousel();

    nextBtn.addEventListener('click', carousel.next.bind(carousel), false);
    prevBtn.addEventListener('click', carousel.prev.bind(carousel), false);
  };


  function Carousel() {
    this.cache = new Cache();

    this.position = 0;
    this.cache.move(0);
    // this.show(); Already shown by HTML

    this.timer = setInterval(function() {
      this.cache.prefetch(this.position);
    }.bind(this), 200);
  }

  Carousel.prototype.next = function (e) {
    e.preventDefault()

    this.position++;
    this.cache.move(this.position);
    this.show();
  };

  Carousel.prototype.prev = function (e) {
    e.preventDefault()

    if (!this.position) {
      return false;
    }

    this.position--;
    this.cache.move(this.position);
    this.show();
  };

  Carousel.prototype.show = function () {
    var el = document.getElementById('img-container');
    el.innerHTML = "";
    el.appendChild(this.cache.images[this.position]);
  };


  function Cache() {
    this.start = 0;
    this.size = 10;
    this.length = 0;
    this._halfSize = Math.floor(this.size/2);
    this.images = {};
  }

  Cache.prototype.move = function (position) {
    var start, s, e;

    if (position < this._halfSize) {
      start = 0;
    } else {
      start = position - this._halfSize;
    }

    s = Math.max(this.start, start),
    e = Math.min(this.start, start) + this.size;

    for (var key in this.images) {
      var i = parseInt(key, 10);

      if (i < s || i >= e) {
        delete this.images[key];
        this.length--;
      }
    }

    this.fetch(position);
    this.start = start;
  };

  Cache.prototype.prefetch = function (position) {
    var i = 0;

    if (this.length === this.size) {
      return;
    }

    while (true) {
      var p = position - i;
      if (p >= 0 && !this.images[p]) {
        this.fetch(p);
        return;
      }

      p = position + i;
      if (!this.images[p]) {
        this.fetch(p);
        return;
      }

      i++;
    }
  };


  Cache.prototype.fetch = function (position) {
    var img = document.createElement('img');

    if (this.images[position]) {
      return;
    }

    img.setAttribute('src',
      "http://robohash.org/" + position + ".png");

    this.length++;
    this.images[position] = img;
  };

}());