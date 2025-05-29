let slideIndex = [1, 1];
let slideId = ['mySlides', 'mySlides2']
showSlides(1, 0);
showSlides(1, 1)

function plusSlides(n, idx) {
  showSlides(slideIndex[idx] += n, idx);
}

function showSlides(n, idx) {
  let i;
  let x = document.getElementsByClassName(slideId[idx]);

  if (n > x.length) {
    slideIndex[idx] = 1;
  }
    
  if (n < 1) {
    slideIndex[idx] = x.length;
  }

  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }

  let newIdx = slideIndex[idx] - 1;
  let slide = x[newIdx];
  slide.style.display = "block";
}