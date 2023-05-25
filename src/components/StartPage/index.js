import {Component} from "react"

import "./index.css"

class StartPage extends Component{
    state = {username : "" , minutes : 1 , errorMsg : ""}

    changeUserName = (e) =>{
        this.setState({username : e.target.value})
    }

    changeMinutes = (e) =>{
        this.setState({minutes : e.target.value})
    }

    clickBtn = () =>{
        const {clickStart} = this.props
        const {username , minutes} = this.state
        if (username !== ""){
            clickStart({username , minutes})
            this.setState({username : ""})
        }
        else{
            this.setState({errorMsg : "*Enter your user name"})
        }
        

    }

    render(){
        const {username , minutes , errorMsg} = this.state
        
        return(
            <>
                <h1 className="heading">Welcome</h1>
                <div className="startpage-logo-container">
                    <h1 className="heading-2">Type Master</h1>
                    <img src="https://i.ibb.co/VCw4Fpz/type-logo-1-removebg-preview.png" className="" height={70}/>
                </div>
                <input type="text" placeholder="Enter Your Name"  className="inpu-user" value={username} onChange={this.changeUserName}/>
                <p className="error">{errorMsg}</p>
                <div className="bottom-container">
                    <label className="lable" htmlFor="select">Select Time</label>
                    <select className="select"  id="select" onChange={this.changeMinutes} value={minutes}>
                        <option value="1">1 min</option>
                        <option value="2">2 min</option>
                        <option value="3">3 min</option>
                        <option value="5">5 min</option>
                    </select>
                    <button className="button-start" onClick={this.clickBtn}>Start</button>
                </div>
            </>
        )
    }
}

export default StartPage