import React, { useState } from "react";
import {useCookies} from "react-cookie"

function Authorise() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const[error, setError] = useState(null)
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)

  console.log(cookies)
  
  function viewLogin (status) {
    setError(null)
    setIsLogin(status)
  }

async function handleSubmit (e, endpoint) {
  e.preventDefault()
  if (!isLogin && password !== confirmPassword) {
    setError('Make sure passwords match')
    return
  }
  const response = await fetch(`${import.meta.env.VITE_APP_URL}/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify({email, password})
  })

 const data = await response.json()
 if (data.detail) {
  setError(data.detail)
 } else {
  setCookie('Email', data.email)
  setCookie('AuthToken', data.token)

  window.location.reload()
 }
}

  return (
    <>
      <div className="auth-container">
        <div className="auth-container-box">
          <form>
            <h2 className="header">{isLogin ? 'Please log in' : 'Please sign up'}</h2>
            <input 
            type="email" 
            placeholder="email" 
            onChange={(e) => setEmail(e.target.value)}
            />
            <input 
            type="password" 
            placeholder="password" 
            onChange={(e) => setPassword(e.target.value)}  
            />
           {!isLogin && 
           <input 
           type="password" 
           placeholder="confirm password" 
           onChange={(e) => setConfirmPassword(e.target.value)} 
           />}
           <button type="submit" className="create" onClick={(e) => handleSubmit(e, isLogin ? 'login' : 'signup')}>{isLogin ? "Sign In" : "Sign Up"}</button>
           {error && <p>{error}</p>}
          </form>
          <div className="auth-options">
            <button onClick={() => viewLogin(false)}
            style={{backgroundColor : !isLogin ? '#6B8192' : '#ADB6C4',  borderRadius : '0 0 0 .8rem'}}
            >Sign Up</button>
            <button onClick={() => viewLogin(true)}
            style={{backgroundColor : isLogin ? '#6B8192' : '#ADB6C4', borderRadius : '0 0 .8rem 0'}}
            >Login</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Authorise;
