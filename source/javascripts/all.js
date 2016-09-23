window.onload = function() {
  document.querySelector(".menu li.toggle").addEventListener('click',
    function(event) {
      event.preventDefault();
      if(document.body.classList.contains('menu-show')){
        document.querySelector("li.toggle img").src = 'images/menu.svg';
        document.body.classList.remove('menu-show');
      } else {
        document.querySelector("li.toggle img").src = 'images/menu-close.svg';
        document.body.classList.add('menu-show');
      }
    });

  var benefits = [].slice.call(document.querySelectorAll('.mod-benefits a'));
  benefits.forEach(addClickHandler);

  addSlideHandlers();
};

var texts = {
  leaplines: [ 'bork', 'bork', 'bork', 'bork', 'bork' ],
  employee:  [ 'foo', 'bar', 'baz', 'boa', 'bay']
}

function addClickHandler(item){
  item.addEventListener('click', function(event) {
    event.preventDefault();
    [].slice.call(item.parentNode.children).forEach(function(e) {
      e.children[0].classList.remove('active');
      e.children[0].children[2].classList.remove('opened');
      e.children[0].children[2].classList.add('closed');
    });
    item.children[0].classList.add('active');
    item.children[0].children[2].classList.remove('closed');
    item.children[0].children[2].classList.add('opened');

    var topic = item.getAttribute('data-item');
    var lists = document.querySelectorAll('.mod-benefits .list ul');
    [].slice.call(lists).forEach(function(list) {
      [].slice.call(list.children).forEach(function(e, i) {
        e.innerHTML = texts[topic][i];
      });
    });
    var list = document.querySelector('.mod-benefits .list');
    item.parentNode.insertBefore(list, item.nextSibling)
  });
}

function addSlideHandlers(){
  var previous = document.querySelector('.controlls .previous');
  var next = document.querySelector('.controlls .next');

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

function slideAnimation(){
  var carousel = document.querySelector(".carousel");
  var seats = document.querySelectorAll('.carousel .container');
  var el = document.querySelector('.is-ref');
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
