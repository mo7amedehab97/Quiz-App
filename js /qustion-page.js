 
  function getQustion(){
    fetch("../json /qustion.json")
    .then(response => response.json())
    .then(json => console.log(json))
    .catch((error) => {
      console.error('Error:', error);
    });
    
    }
    getQustion()