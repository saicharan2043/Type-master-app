import { Component } from "react";

import StartPage from "./components/StartPage"
import Home from "./components/Home"

import AllContext from "./context/AllContext"

import Demo from "./components/Demo"

import './App.css';

const lettersList = ["ak", "al" , "sl" , "ka" , "ks" , "a;" , "dj" , "dl" , "dk" , "d;" , "fj" , "fk" , "ls" , "f;" , ";s" , "jk" , "sd" , "aj" , "ld" , "la" , "ld"]

class App extends Component {
  state = {isStartPageTrue : true , username : "" , minutes : 1}

  clickTryAgain = () =>{
    this.setState({isStartPageTrue:true})
  }

  clickStart = (name) =>{
    const {username , minutes} = name
    
    this.setState({isStartPageTrue : false , username , minutes})
  }

  render(){
    const {isStartPageTrue , username , minutes} = this.state
    return (
      <AllContext.Provider value={{
        username ,
        minutes ,
        allLettersList : lettersList
      }}>
        <div className="bg-start-page">
          {isStartPageTrue ? <StartPage clickStart={this.clickStart}/> : <Home username={username}  minutes={minutes} lettersList={lettersList} clickTryAgain={this.clickTryAgain}/>}
        </div>
      </AllContext.Provider>
      
    );
  }
  
}

export default App;

     