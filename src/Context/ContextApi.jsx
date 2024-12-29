import { createContext, useState } from "react";
import run from "../Config/Gemini";

 export const Context=createContext();

 const ContextProvider=(props)=>{
      const[input,setInput]=useState("");
      const[recentPrompt,setRecentPrompt]=useState("");
      const[prevPrompts,setPrevPrompts]=useState([]);
      const[showResult,setShowResult]=useState(false);
      const[loading,setLoading]=useState(false);
      const[resultData,setResultData]=useState("");

     const delayPara=(index,nextword)=>{
            setTimeout(function(){
                setResultData(prev=>prev+nextword);
            },75*index)
     }
     const newChatClick=()=>{
        setLoading(false)
        setShowResult(false)
     }
    const onSent=async(prompt)=>{
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if(prompt !==undefined){
             response=await run(prompt)
             setRecentPrompt(prompt)
        }else{
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response=await run(input)
        }
        
        
        
        const responseArray=response.split("**")
        let newArray="";
        for (let i=0; i<responseArray.length; i++){
            if(i===0 || i%2!==0){
                newArray+=responseArray[i];
            }
            else{
                newArray +='<b>'+responseArray[i]+'</b>'
            }
        }
        let newResponse=newArray.split("*").join("<br/>")
        let newResponseArray=newResponse.split(" ");
        for(let i=0;i<newResponseArray.length;i++){
            const nextword=newResponseArray[i];
            delayPara(i,nextword+" ")
        }

        setLoading(false)
        setInput('')
        
    }
    
    const contextValue={
       newChatClick,prevPrompts,setPrevPrompts,onSent,setRecentPrompt,recentPrompt,showResult,loading,resultData,input,setInput
    }
    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )


 }
 export default ContextProvider