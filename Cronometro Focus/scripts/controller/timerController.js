import  {Utilites}  from "./util.js";

export class TimerController{
    
    constructor(){

        this.util = new Utilites();        
    
        //Css
        this._modal = document.querySelector(".modal")
        //HtmlSelectors
        this._timer = document.querySelector("#timer");
        //Buttons
        this._startBtn = document.querySelector("#start");
        this._pauseBtn = document.querySelector("#stop");
        this._resetBtn = document.querySelector("#reset");
        this._configBtn = document.querySelector("#config");
        //Modal Buttons
        this._saveBtnModal = document.querySelector("#save");
        this._cancelBtnModal = document.querySelector("#cancel");
        this._inputModal = document.querySelector("#input");
        // Audio Source
        this._btnSound = document.querySelector("#btnSound");
        this._finishedTaks = document.querySelector("#zeroSound");

        //Variables
        this._countDownInterval = null;
        this._defaultTimer = 30;
        this._totalTimer = this._defaultTimer * 60 * 1000;
        
        this._formatteTime = this.util.formatTimer(this._totalTimer);
        this._timer.innerHTML = this._formatteTime;
        //Init
        this.initEvents();
    }

    get minutes(){return this._defaultTimer};
    get timer(){return this._timer};
    set timer(value){return this._timer.value = value};
    set minutes(value){return this._defaultTimer = value};
    

    initEvents(){   
        this._btnSound.src = 'audio/click.mp3'
        this._finishedTaks.src = 'audio/Alarm_Zero.mp3'
    
        this._startBtn.addEventListener("click", () => {
            this.start();
            this._btnSound.play();
        })
        this._pauseBtn.addEventListener("click", () =>{
            this.stop();
            this._btnSound.play();
        })

        this._configBtn.addEventListener("click", () => {
            this._modal.style.display = "block";
            this._btnSound.play();
        })

        this._resetBtn.addEventListener("click", () =>{
            this._totalTimer = this._defaultTimer * 60 * 1000;
            this._formatteTime = this.util.formatTimer(this._totalTimer);
            this.timer.innerHTML = this._formatteTime;
            this._btnSound.play();
        })

        this._saveBtnModal.addEventListener("click", (e) => {
            e.preventDefault();
            this.minutes = this._inputModal.value;   
            this._totalTimer = this._defaultTimer * 60 * 1000;                       
            this._formatteTime = this.util.formatTimer(this._totalTimer);
            this.timer.innerHTML = this._formatteTime;
            this._modal.style.display = "none";
            this._btnSound.play();
        })
        this.closeModal();
    }

    closeModal(){
        window.onclick = (e) => {
            if(e.target == this._modal && this._modal.style.display == 'block'){ //No Button
               this._modal.style.display = 'none';
            }
            if(e.target == this._cancelBtnModal){ //With Button
                this._modal.style.display = 'none';
                this._btnSound.play();
            }
        }
    }

    start(){        
        this._countDownInterval = setInterval(() => {        
            
            this._totalTimer -= 1000;        

            if(this._totalTimer == 0){
                clearInterval(this._countDownInterval);
            }

            this._formatteTime = this.util.formatTimer(this._totalTimer);
            this._timer.innerHTML = this._formatteTime;
            
            if(this._totalTimer == 0) {
                this._finishedTaks.play();
            }

        }, 1000);
    }

    stop(){
        clearInterval(this._countDownInterval);
    }
}