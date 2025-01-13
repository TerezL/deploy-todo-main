import React from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";

function TravelList ({getDataT, travel={}}){


const [cookies, setCookie, removeCookie] = useCookies(null)

 const [datat, setDataT] = useState({
    user_email: travel.user_email = cookies.Email,
    title: travel.title = [],
    date: travel.date = new Date()
  })

  const postDataT = async (e) => {
    e.preventDefault()
    try{
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/trav`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datat)
      })
     if (response.status === 200) {
      console.log("WORKED")
      getDataT()
      datat.title = ""
     }
    } catch(err) {
      console.error(err)
    }
  }



  function handleChange (e){
    
    const{ name, value} = e.target

    setDataT(datat => ({
      ...datat, 
      [name] : value
    }))
    console.log(datat)
  }
 

 

return (
    <>
    <h1 className="header">Travel</h1> 
    <div className="container">
          <form>
            <input 
              required
              maxLength={30}
              placeholder="Your task goes here"
              name="title"
              value={datat.title}
              onChange={handleChange}
            />
         
         <button className="add" type="submit" onClick={postDataT}>Add New</button>
          </form>
         </div>
     
       
   
     
    </>
  )

}

export default TravelList