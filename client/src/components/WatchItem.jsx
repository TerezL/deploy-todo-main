import React from "react";
import { useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'


function WatchItem({watch, getDataW}) {
  

  const deleteItem = async() => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/watch/${watch.id}`, {
        method: 'DELETE'
      })
      if (response.status === 200) {
        getDataW()
      }
    } catch (err) {
      console.error(err)
    }
  }
 
  return (
    <>
      <li className="list-item">
      <div className="info-container">
      
      <p className="task-title">{watch.title}</p>
      </div>
      <div className="button-container">
        
        <button className="delete" onClick={deleteItem}><DeleteOutlineIcon /></button>
      </div>
     
      </li>
    </>
  )
}

export default WatchItem;
