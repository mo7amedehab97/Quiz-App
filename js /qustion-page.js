 let qustionQount = document.querySelector(".count span");
 let parentSpanContainer = document.querySelector(".bullets .spans")
//  fetch the local json api file 
  function getQustion(){
    fetch("../json /qustion.json")
    .then(response => response.json())
    .then(data => {
      createBullet(data.length)
    } )
    .catch((error) => {
      console.error('Error:', error);
    });
    }

    getQustion()
    function createBullet(num){
      qustionQount.textContent =num;
      for (let i =0; i<num;i++){
     
      // crate span & append it to parant spans
      let theBullet = document.createElement("span");
      parentSpanContainer.appendChild(theBullet)
      // add class on  to current qustion
        if (i === 0){
          theBullet.className = "on"
        }
      }
    }