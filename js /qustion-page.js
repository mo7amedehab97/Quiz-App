//  get the element to the js using dom to manipulating them 
 let qustionQount = document.querySelector(".count span");
 let countSec = document.querySelector(".count");
 let usernameSec = document.querySelector(".user-name");

 let parentSpanContainer = document.querySelector(".bullets .spans");
 let quizArea = document.querySelector(".quiz-area");
 let answersArea = document.querySelector(".answer-area")
let submitBtn = document.querySelector(".submit-btn");
let bulletSec = document.querySelector(".bullets");
let resultContainer = document.querySelector(".result")
let useNameElement =document.querySelector(".user-name span")
let quizInfoSec = document.querySelector(".quiz-info")
let returnBtn = document.querySelector(".return-btn")
//  set options 
let currentIndex = 0;
let rightAnswerCount = 0 ;
let userName = localStorage.getItem("userName");

useNameElement.textContent = userName;

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

      //  click on submit btn 
      submitBtn.addEventListener("click",()=>{
   


        // get the right answer
        let rightAnswer = data[currentIndex].correct;

        // increase the current answer 
        currentIndex++
        
        // check the answer 
        checkAnswers(rightAnswer, qustionlength)

        //  empty the previous qustion 
        quizArea.textContent="";
        answersArea.textContent="";

        // add qustion data function 
        addQustionData(data[currentIndex],qustionlength)

        // handele bullets class
        handleBullets();
        
        // show result 
        showResult(qustionlength);

      })
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
    if(currentIndex < count){
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
    }

    function checkAnswers(rAnswer, count){
      let answers = document.getElementsByName("Qustion");
      let theChosenAnswer;

      for (let i=0; i<answers.length; i++){
        if(answers[i].checked){
          theChosenAnswer = answers[i].dataset.answer
        }
      }
      if(rAnswer === theChosenAnswer){
        rightAnswerCount++;
       
      }
    }

    function handleBullets(){
      let bulletSpans = document.querySelectorAll(".bullets .spans span");
      let arrOfSpans = Array.from(bulletSpans)
      // console.log(arrOfSpans)
      arrOfSpans.forEach((span, index)=>{
        if(currentIndex === index){
          span.className ="on"
        }
        else{
          span.className = "off"
        }

      })
    }

    function showResult(count){
      let theResult;


      if(currentIndex === count){

        // clear qustion area to show the result 
        quizArea.remove();
        answersArea.remove();
        submitBtn.remove();
        bulletSec.remove();
        countSec.remove();
        usernameSec.remove()
        quizInfoSec.remove();

        returnBtn.style.display = "flex"
        
        // the result 

        if(rightAnswerCount > (count /2) && rightAnswerCount < count){
             theResult = `<span class="good"> good result ${userName}</span>, ${rightAnswerCount} from ${count} is good`
        }
        else if(rightAnswerCount === count){
          theResult = `<span class="perfect"> perfect result ${userName}</span>, ${rightAnswerCount} from ${count} is amazing man`
        }
        else{
           theResult = `<span class="bad"> bad result ${userName}</span>, ${rightAnswerCount} from ${count} is sucks keep learning bro`
        }
        resultContainer.innerHTML =theResult;

      }

      console.log(rightAnswerCount ,count)

    }
    
    //  handle the back home btn 
    returnBtn.addEventListener("click", ()=>{
      window.location="../index.html"
      returnBtn.style.display = "none"
    })