//  get the element to the js using dom to manipulating them 
 let qustionQount = document.querySelector(".count span");
 let parentSpanContainer = document.querySelector(".bullets .spans");
 let quizArea = document.querySelector(".quiz-area");
 let answersArea = document.querySelector(".answer-area")

//  set options 
let currentIndex = 0;

//  fetch the local json api file 
  function getQustion(){
    fetch("../json /qustion.json")
    .then(response => response.json())
    .then(data => {

      // the data lenght and pass it to cratebullet func 
      let qustionlength= data.length;
      createBullet(qustionlength)
      
      // add qustion data 
      addQustionData(data[currentIndex],qustionlength)
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

    function addQustionData(obj, count){
      // create the structure for the qustions and set the qustion 

      let qustionTitle = document.createElement("h2");
      qustionTitle.textContent= obj.qustion

      // appernd h2 to it's container in html
      quizArea.appendChild(qustionTitle);

      // create structure for answers 
      for (let i=1;i<=4;i++){

        // create parent div for the answers
        let mainDiv = document.createElement("div");

        // add class answer to the main div to apply the existing styling 
        mainDiv.className = 'answer';

        // create readio inp and set all atrributes to it 
        let readioInp = document.createElement("input");
        readioInp.name = "Qustion"
        readioInp.type = "radio";
        readioInp.id = `${i}`
        readioInp.dataset.answer = obj[`${i}`];

        // create the labels 
        let theLabel = document.createElement("label");

        // add attribuetes for label
        theLabel.htmlFor = `${i}`;
        theLabel.textContent = obj[`${i}`];
        
        // add the inp + label to the main div 
        mainDiv.appendChild(readioInp);
        mainDiv.appendChild(theLabel);

        // add the main div to the answers area 
        answersArea.appendChild(mainDiv);
      }
    }