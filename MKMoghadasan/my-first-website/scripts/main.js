document.addEventListener('click',function() {
  if(!event.target.matches('.project img')) return;
  event.target.classList.toggle('active');
}, false);
