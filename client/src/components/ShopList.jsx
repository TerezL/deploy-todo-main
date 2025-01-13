import React from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";

function ShopList ({getDataS, shop={}}){


const [cookies, setCookie, removeCookie] = useCookies(null)

 const [datas, setDataS] = useState({
    user_email: shop.user_email = cookies.Email,
    title: shop.title = [],
    date: shop.date = new Date()
  })

  const postDataS = async (e) => {
    e.preventDefault()
    try{
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/shop`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datas)
      })
     if (response.status === 200) {
      console.log("WORKED")
      getDataS()
      datas.title = ""
     }
    } catch(err) {
      console.error(err)
    }
  }



  function handleChange (e){
    
    const{ name, value} = e.target

    setDataS(datas => ({
      ...datas, 
      [name] : value
    }))
    console.log(datas)
  }
 

 

return (
    <>
    <h1 className="header">Shop List</h1> 
    <div className="container">
          <form>
            <input 
              required
              maxLength={30}
              placeholder="Your task goes here"
              name="title"
              value={datas.title}
              onChange={handleChange}
            />
         
         <button className="add" type="submit" onClick={postDataS}>Add New</button>
          </form>
         </div>
     
       
   
     
    </>
  )

}

export default ShopList