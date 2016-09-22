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
    });
    item.children[0].classList.add('active');

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
}
