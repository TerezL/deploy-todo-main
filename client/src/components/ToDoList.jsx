import React from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";

function ToDoList ({getData, task={}}){


const [cookies, setCookie, removeCookie] = useCookies(null)

 const [data, setData] = useState({
    user_email: task.user_email = cookies.Email,
    title: task.title = [],
    date: task.date = new Date()
  })

  const postData = async (e) => {
    e.preventDefault()
    try{
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/todos`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
     if (response.status === 200) {
      console.log("WORKED")
      getData()
      data.title = ""
     }
    } catch(err) {
      console.error(err)
    }
  }



  function handleChange (e){
    
    const{ name, value} = e.target

    setData(data => ({
      ...data, 
      [name] : value
    }))
    console.log(data)
  }
 
 
 
  

return (
    <>
    <h1 className="header">To Do</h1> 
     <div className="container">
          <form>
            <input 
              required
              maxLength={30}
              placeholder="Your task goes here"
              name="title"
              value={data.title}
              onChange={handleChange}
            />
         
         <button className="add" type="submit" onClick={postData}>Add New</button>
          </form>
         
     </div>
       
   
     
    </>
  )

}

export default ToDoList