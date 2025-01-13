import React from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";

function WatchList ({getDataW, watch={}}){


const [cookies, setCookie, removeCookie] = useCookies(null)

 const [dataw, setDataW] = useState({
    user_email: watch.user_email = cookies.Email,
    title: watch.title = [],
    date: watch.date = new Date()
  })

  const postDataW = async (e) => {
    e.preventDefault()
    try{
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/watch`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataw)
      })
     if (response.status === 200) {
      console.log("WORKED")
      getDataW()
      dataw.title = ""
     }
    } catch(err) {
      console.error(err)
    }
  }



  function handleChange (e){
    
    const{ name, value} = e.target

    setDataW(dataw => ({
      ...dataw, 
      [name] : value
    }))
    console.log(dataw)
  }
 

 

return (
    <>
    <h1 className="header">To Watch</h1> 
    <div className="container">
          <form>
            <input 
              required
              maxLength={30}
              placeholder="Your task goes here"
              name="title"
              value={dataw.title}
              onChange={handleChange}
            />
         
         <button className="add" type="submit" onClick={postDataW}>Add New</button>
          </form>
         </div>
     
       
   
     
    </>
  )

}

export default WatchList