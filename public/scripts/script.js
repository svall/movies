'use strict';
console.log('JS linked');

document.addEventListener("DOMContentLoaded", function(event) {
  console.log('DOM loaded');
  // (() => {
    function getRatings() {
      fetch(`/api/movies/ratings`)
      .then(r => r.json())
      .then((ratings) => {
        console.log(ratings);
        ratings.forEach(function(x) {
          const p = document.createElement("p");
          p.className = "pRating";
          p.innerText = x.title;
          document.body.appendChild(p);
        })
      })
    }
   getRatings();
  // })
});
