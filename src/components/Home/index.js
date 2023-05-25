import { Component } from 'react';

import "./index.css"

let uniqueId

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {isPopupTrue : false , currentSentence : "" , username : props.username , minutes : this.props.minutes*60 , intervelStartTime : this.props.minutes*60 , allLetters : 0 , typeInputFeild : "" , isInputFelidError : false , wrongLettersCount : 0 , Wpm : 0 , Accuracy : "0%"}
    }
    
    
    

    randomFunction = () =>{
        const {lettersList} = this.props
            const lengthOfList = lettersList.length-1
            
            let string = "";
            for (let i = 0; i < 2 ; i++){
                const randomNo = Math.ceil(Math.random()*lengthOfList)
                string += lettersList[randomNo] + " "
            }
            const conviteList = string.trim(" ").split(" ")
            const multipleValues = [...conviteList , ...conviteList , ...conviteList].join(" ")
            this.setState({currentSentence : multipleValues})
            
            
        
    }

    componentDidMount(){
        // this.timerFunction()
        this.randomFunction()
        
    }

    calcullateWPMAndAccurancy = () =>{
        const {allLetters , wrongLettersCount , typeInputFeild} = this.state
        const totalLtetters = allLetters + typeInputFeild.length
        let Accuracy = Math.ceil((totalLtetters/ (totalLtetters+wrongLettersCount))*100)
        let Wpm = Math.ceil(((totalLtetters+wrongLettersCount)/5)/this.props.minutes)
        this.setState({isPopupTrue : true , Wpm , Accuracy})
    }


    timerFunction = () =>{
        console.log("sai")
        uniqueId = setInterval(()=>{
            const {minutes , typeInputFeild} = this.state
            if (minutes !== 0){
                this.setState((privews) => ({minutes : privews.minutes-1}))
            }
            else{
                clearInterval(uniqueId)
                this.calcullateWPMAndAccurancy()
            }
            
        } , 1000)
    }

    clicktryBtn = () =>{
        this.setState({isPopupTrue : false})
        const {clickTryAgain} = this.props
        clickTryAgain()
    }

    onKeyUpEvent = (e) =>{
        const {typeInputFeild , currentSentence} = this.state
        const inputLength = typeInputFeild.length
        // console.log(currentSentence.slice(inputLength-1 , inputLength))
        if (currentSentence.slice(inputLength-1 , inputLength) !== e.key){
            if(e.key !== "Backspace"){
                this.setState((previws)=>({wrongLettersCount : previws.wrongLettersCount+1}))
            }
        }
        
    }

    OnChengeEvent = (e) =>{
        const {currentSentence} = this.state
        
        const inputValue = e.target.value
        if (currentSentence.slice(0,inputValue.length) === inputValue){
            this.setState({typeInputFeild : inputValue , isInputFelidError : false} , this.isTwoValuesMatch)
        }
        else{
            this.setState({typeInputFeild : inputValue , isInputFelidError : true} , this.isTwoValuesMatch)
        }

        
    }

    isTwoValuesMatch = () =>{
        const {typeInputFeild , currentSentence , intervelStartTime , minutes} = this.state

        if(intervelStartTime === minutes){
            this.timerFunction()
            this.setState({intervelStartTime : -1})
        }
        
        if (typeInputFeild === currentSentence){
            this.randomFunction()
            clearInterval(uniqueId)
            this.setState((previws) =>({allLetters : previws.allLetters + typeInputFeild.length , typeInputFeild : "" , intervelStartTime : previws.minutes}))
            
        }
    }

    render(){
        const {isPopupTrue , currentSentence , username , minutes , typeInputFeild , isInputFelidError , Accuracy , Wpm , allLetters} = this.state
        
        // console.log(allLetters)
        const wrongBgColor = isInputFelidError && "wron-bg-color" 

        return(
            <>
                <div className='logo-container'>
                    <h1 className='logo-heading'>Type Master</h1>
                    <img src='https://i.ibb.co/VCw4Fpz/type-logo-1-removebg-preview.png' className='logo'/>
                </div>
                <div className='time-container'>
                    <p className='time'>{minutes}</p>
                </div>
                <div className='letters-container'>
                    <p className='letters'>{currentSentence}</p>
                </div>
                <input className={`input-typing ${wrongBgColor}`} type='text' placeholder='Type here...' value={typeInputFeild} onChange={this.OnChengeEvent} onKeyUp={this.onKeyUpEvent}/>
                {isPopupTrue && (
                    <div className='popup-super-container'>
                        <div className='popup-sub-container'>
                            <h1 className='status-heading'>Hello</h1>
                            <p className='username-text'>{username}</p>
                            <p className='all-text'>Time : {this.props.minutes}min</p>
                            <p className='all-text'>WPM : {Wpm}</p>
                            <p className='all-text'>Accuracy : {Accuracy}%</p>
                            <button className='try-again-btn' onClick={this.clicktryBtn}>Tryagain</button>
                        </div>
                    </div>

                )}
                
                
            </>
        )
    }
}

export default Home