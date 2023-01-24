const cloud = document.querySelector('.cloud');

function Rand(min, max) {
  return Math.random() * (max - min) + min;
}

function move() {
  cloud.style.left = Rand(15, 85) + '%';
  cloud.style.top = Rand(10, 85) + '%';
}

function moveToSide() {
  //Calculate position by [0 - 100]
  const topPos = cloud.offsetTop / self.innerHeight * 100;
  const leftPos = cloud.offsetLeft / self.innerWidth * 100;

  //move to side
  if (leftPos > 50) {
    //checking Horizental edge area
    if (leftPos > 90) {
      //move to Vertical Side Area
      topPos < 50 ? cloud.style.top = Rand(-30, -5) + '%' :
        cloud.style.top = Rand(95, 100) + '%';
    } else { cloud.style.left = Rand(95, 100) + '%'; }
  } else {
    //checking Horizental edge area
    if (leftPos < 5) {
      //checking Horizental edge area
      topPos < 50 ? cloud.style.top = Rand(-30, -5) + '%' :
        cloud.style.top = Rand(95, 100) + '%';
    }
    //move to Side Area [left] if not in edge area
    cloud.style.left = Rand(-30, -5) + '%';
  }
}

//moved to the edge when 'mouseover'
cloud.addEventListener('mouseover', moveToSide);
//move to random position every 5s for nuisance
setInterval(move, 5000);


