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
};
