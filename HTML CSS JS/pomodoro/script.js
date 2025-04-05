const bells = new Audio("./bells.wav");
const startBtn = document.querySelector('.btn-start');
const session = document.querySelector('.minutes');
let myInterval;
let state = true;


const appTimer = () =>{
    console.log(state);
    
    const sessionAmount = Number.parseInt(session.textContent);

    if(state){
        state = false;
        console.log(state)
        let totalSeconds = sessionAmount * 60;

        const updateSeconds = ()=>{
            const minuteDiv = document.querySelector(".minutes");
            const secondDiv = document.querySelector(".seconds");

            totalSeconds--;

            let minutesLeft = Math.floor(totalSeconds/60);
            let secondsLeft = totalSeconds % 60;

            if(secondsLeft < 10){
                secondDiv.textContent = "0" + secondsLeft;
            }else{
                secondDiv.textContent = secondsLeft;
            }
            minuteDiv.textContent = `${minutesLeft}`;

            if(minutesLeft === 0 && secondsLeft === 0){
                bells.play();
                clearInterval(myInterval)
            }

        }
        myInterval = setInterval(updateSeconds,1000);
    }else{
        alert("Session has already Started");
    }
}


const Button =()=>{
    if(!state){
        startBtn.classList.toggle('clicked');
    }
    

    if(startBtn.classList.contains('clicked')){
        startBtn.textContent ="Started!";
    }else{
        startBtn.textContent = "Start";
    }    
}
// startBtn.addEventListener('click',appTimer());
startBtn.addEventListener('click',()=>{
    appTimer();
    Button();
    
});

