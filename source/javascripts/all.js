window.onload = function() {
  addMenuHandlers();
  addHowItWorksHandlers();
  addBenefitHandlers();
  addSlideHandlers();
  addFlexSlideHandlers();
};

function addMenuHandlers(){
  var menus = [].slice.call(document.querySelectorAll(".menu .toggle"));
  menus.forEach(function(menu){
    menu.addEventListener('click', menuHandler);
  });
}

function menuHandler(event) {
  event.preventDefault();
  if(document.body.classList.contains('menu-show')){
    document.querySelector("li.toggle img").src = '/images/menu.svg';
    document.body.classList.remove('menu-show');
  } else {
    document.querySelector("li.toggle img").src = '/images/menu-close.svg';
    document.body.classList.add('menu-show');
  }
}

function addBenefitHandlers(){
  var items = [].slice.call(document.querySelectorAll('.mod-benefits a'));
  items.forEach(addBenefitHandler);
  items.forEach(addClickHandler);
}

function addHowItWorksHandlers(){
  var items = [].slice.call(document.querySelectorAll('.mod-howitworks a'));
  items.forEach(addHowItWorksHandler);
  items.forEach(addClickHandler);
}

function addClickHandler(item){
  item.addEventListener('click', function(event) {
    event.preventDefault();
    [].slice.call(item.parentNode.children).forEach(function(e) {
      if(!e.children[0]){
        return;
      }
      e.children[0].classList.remove('active');
      e.children[0].children[2].classList.remove('opened');
      e.children[0].children[2].classList.add('closed');
    });
    if(item.children[0]){
      item.children[0].classList.add('active');
      item.children[0].children[2].classList.remove('closed');
      item.children[0].children[2].classList.add('opened');
    }
  });
}

function addBenefitHandler(item){
  item.addEventListener('click', function(event) {
    event.preventDefault();
    var big_list = document.querySelector('.mod-benefits .list.big');
    big_list.innerHTML = item.nextSibling.innerHTML;
    var list = document.querySelector('.mod-benefits .list.visible');
    list.classList.remove('visible');
    item.nextSibling.classList.add('visible');
  });
}

function addHowItWorksHandler(item){
  item.addEventListener('click', function(event) {
    event.preventDefault();
    var url = item.getAttribute('data-image');
    if(!url){
      console.log('No image attribute.');
      return;
    }
    var bg_img = "url(" + url + ")";
    var image = document.querySelector('.mod-howitworks .img');
    image.style["background-image"] = bg_img;
  });
}

function addSlideHandlers(){
  var previous = document.querySelector('.controlls .previous');
  var next = document.querySelector('.controlls .next');
  if (!previous || !next) {
    return;
  }

  next.addEventListener('click', function(event) {
    event.preventDefault();
    var step = document.querySelector(".mod-wayofworking .steps .step.active");
    if(step.nextSibling) {
      step.classList.remove('active');
      step.nextSibling.classList.add('active');
      var ind = document.querySelector(".indicator .current");
      ind.innerHTML = parseInt(ind.innerHTML) + 1
    }
  });

  previous.addEventListener('click', function(event) {
    event.preventDefault();
    var step = document.querySelector(".mod-wayofworking .steps .step.active");
    if(step.previousSibling) {
      step.classList.remove('active');
      step.previousSibling.classList.add('active');
      var ind = document.querySelector(".indicator .current");
      ind.innerHTML = parseInt(ind.innerHTML) - 1
    }
  });

  setInterval(function(){ slideAnimation(); }, 3000);
}

function next(el, seats) {
  var next = el.nextSibling;
  if(next) {
    return next
  } else {
    return seats[0]
  }
}

function previous(el, seats) {
  var next = el.previousSibling;
  if(next) {
    return next
  } else {
    return seats[seats.length - 1]
  }
}

function slideAnimation(){
  var carousel = document.querySelector(".carousel");
  var seats = document.querySelectorAll('.carousel .container');
  var el = document.querySelector('.carousel .is-ref');
  if(!carousel || !seats || !el){
    return;
  }
  el.classList.remove('is-ref');
  var new_seat = next(el, seats);
  new_seat.classList.add('is-ref');
  new_seat.style.order = 1;
  for (i = 2; i <= seats.length; i++) {
    new_seat = next(new_seat, seats);
    new_seat.style.order = i;
  }
  carousel.classList.remove('is-set');
  setTimeout(function(){ carousel.classList.add('is-set'); }, 50);
}

function addFlexSlideHandlers(){
  var next = document.querySelector('.flexslider .next')
  next.addEventListener('click', function(event) {
    event.preventDefault();
    flexSlideAnimation('next');
  });
  var next = document.querySelector('.flexslider .previous')
  next.addEventListener('click', function(event) {
    event.preventDefault();
    flexSlideAnimation('previous');
  });
}

function flexSlideAnimation(direction){
  var carousel = document.querySelector(".flexslider .slides");
  var seats = document.querySelectorAll('.flexslider .slide');
  var el = document.querySelector('.flexslider .is-ref');
  el.classList.remove('is-ref');
  if(direction == 'next' ) {
    var new_seat = next(el, seats);
    carousel.classList.remove('is-reversing');
  } else {
    var new_seat = previous(el, seats);
    carousel.classList.add('is-reversing');
  }
  new_seat.classList.add('is-ref');
  new_seat.style.order = 1;
  for (i = 2; i <= seats.length; i++) {
    new_seat = next(new_seat, seats);
    new_seat.style.order = i;
  }
  carousel.classList.remove('is-set');
  setTimeout(function(){ carousel.classList.add('is-set'); }, 50);
}
