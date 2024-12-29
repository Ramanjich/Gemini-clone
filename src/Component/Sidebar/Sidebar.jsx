import React, { useState } from 'react'
import'./Sidebar.css'
import {assets} from '../../assets/assets'
import { useContext } from 'react'
import { Context } from '../../Context/ContextApi'
const Sidebar = () => {
const[extended,setExtended]=useState(false)
const{newChatClick,onSent,prevPrompts,setRecentPrompt}=useContext(Context)

const loadProompt=async (prompt)=>{
    setRecentPrompt(prompt)
    await onSent(prompt)
}


  return (
    <div className='sidebar-container'>
        <div className="top">
            <img onClick={()=>{
                setExtended(prev=>!prev)
            }}src={assets.menu_icon} alt="menuIcon"  className='menu-icon'/>
            <div onClick={()=>newChatClick()} className="new-chat">
                <img src={assets.plus_icon} alt="plusIcon" />
            {extended?<p>New Chat</p>:null}
            </div>
            {extended?
            <div className="recent">
                <p className="recent-title">Recent</p>
                {prevPrompts.map((item,index)=>{
                    return(
                        <div onClick={()=>{loadProompt(item)}} className="recent-entry">
                    <img src={assets.message_icon} alt="messageIcon" />
                    <p>{item.slice(0,11)}...</p>
                </div>
                    )
                })}
                
            </div>:null}
        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt='questionTag' />
                {extended?<p>Help</p>:null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt='questionTag' />
                {extended?<p>Activity</p>:null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt='questionTag' />
                {extended?<p>Settings</p>:null}
            </div>
        </div>
        </div>
  )
}

export default Sidebar