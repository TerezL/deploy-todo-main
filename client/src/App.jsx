import React, { useState } from "react";
import ListItem from "./components/ListItem.jsx";
import { useEffect} from "react";
import Authorise from "./components/Authorise.jsx";
import { useCookies } from "react-cookie";
import ToDoList from "./components/ToDoList.jsx";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TravelList from "./components/TravelList.jsx";
import TravelItem from "./components/TravelItem.jsx";
import ShopList from "./components/ShopList.jsx";
import ShopItem from "./components/ShopItem.jsx";
import WatchItem from "./components/WatchItem.jsx";
import WatchList from "./components/WatchList.jsx";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
 const authToken = cookies.AuthToken
 const userEmail = cookies.Email
 const [ tasks, setTasks] = useState(null)
 const [ travels, setTravels] = useState(null)
 const [shops, setShops] = useState(null)
 const [watches, setWatches] = useState(null)
 const [value, setValue] = React.useState('1');

 const handleChange = (event, newValue) => {
   setValue(newValue);
 };

 const getData = async () => {
   try {
     const response = await fetch(`${import.meta.env.VITE_APP_URL}/todos/${userEmail}`)
     const json = await response.json()
     setTasks(json)
   } catch (err) {
     console.error(err)
   }
 }
 const getDataT = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/trav/${userEmail}`)
    const json = await response.json()
    setTravels(json)
  } catch (err) {
    console.error(err)
  }
}

const getDataS = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/shop/${userEmail}`)
    const json = await response.json()
    setShops(json)
  } catch (err) {
    console.error(err)
  }
}

const getDataW = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/watch/${userEmail}`)
    const json = await response.json()
    setWatches(json)
  } catch (err) {
    console.error(err)
  }
}

 useEffect(() => {
   if (authToken) {
     getData()
     getDataT()
     getDataS()
     getDataW()
   }}
 , [])

 console.log(tasks)

 function signOut(){
  console.log('signout')
  removeCookie('Email')
  removeCookie('AuthToken')
  window.location.reload()
}


 //Sort by date
 const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))
 const sortedTravels = travels?.sort((a,b) => new Date(a.date) - new Date(b.date))
 const sortedShops = shops?.sort((a,b) => new Date(a.date) - new Date(b.date))
 const sortedWatches = watches?.sort((a,b) => new Date(a.date) - new Date(b.date))

 
  return (
    <>
    
    {!authToken && <Authorise />}
    {authToken && <><div className="signout-box"><button className="signout" onClick={signOut}>Sign Out</button></div><div className="app">
      
    <TabContext value={value}>
        
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="To Do" value="1" />
            <Tab label="Travel" value="2" />
            <Tab label="Shop" value="3" />
            <Tab label="Watch" value="4" />
          </TabList>
       
        <TabPanel value="1"> <ToDoList  getData={getData}/>
        {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
      </TabPanel>
        <TabPanel value="2"><TravelList  getDataT={getDataT}/>
        {sortedTravels?.map((travel) => <TravelItem key={travel.id} travel={travel} getDataT={getDataT} />)}
      </TabPanel>
        <TabPanel value="3"><ShopList getDataS={getDataS} />
        {sortedShops?.map((shop) => <ShopItem key={shop.id} shop={shop} getDataS={getDataS} />)}</TabPanel>
        <TabPanel value="4"><WatchList getDataW={getDataW} />
        {sortedWatches?.map((watch) => <WatchItem key={watch.id} watch={watch} getDataW={getDataW} />)}</TabPanel>
      </TabContext>
      </div>
      </>}
      
    </>
  )
}

export default App
