import { useState  , useEffect} from "react"

const Demo = ()=>{
    const [count , setCount] = useState(180)

    let id 

    // useEffect(()=>{
        
    // } , [])

    const callInetervel = () =>{
        id = setInterval(()=>{
            setCount(priviews => priviews+1)
            if (count === 0){
                clearInterval(id)
            }
        } , 1000)
        
    }

    const clickbtn = () =>{
        callInetervel()
    }

    

    return(
        <>
            <h1>{count}</h1>
            <button onClick={clickbtn}>click me</button>
        </>
        
    )
}


export default Demo