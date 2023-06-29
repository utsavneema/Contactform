import React, { useState } from 'react'
//import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Contact from './components/contactfor/contact';
import UserList from './components/contactfor/UserList';
import DeleteUser from './components/contactfor/DeleteUser';
// import UpdateUser from './components/contactfor/UpdateUser';
// import './App.css';

function App() {
  return (
      // <div className='App'>
     //     <h1>High Order Component</h1>
    //     <HO1 cmp = {Counter} />
    //     <HO2 cmp = {Counter} />
  
    //   </div>
    <>
    {<Contact />}
    {<UserList />}
    {<DeleteUser />}
    {/* {<UpdateUser/>} */}
    
    {/* <BrowserRouter>
    <Routes>
      <Route path = '/' element ={<GetApi />}></Route>
    </Routes>
    </BrowserRouter> */}
    </>

  );
  
}

// function HO1 (props){
//   return <h2 style={{backgroundColor:'lightblue', width: 75}}><props.cmp/></h2>
// }
// function HO2 (props){
//   return <h2 style={{backgroundColor:'lightgreen', width: 75}}><props.cmp/></h2>
// }

// function Counter(){
//   const[count, setCount] = useState(0);
// return <div>
//   <h3>{count}</h3>
//   <button onClick={() =>setCount((count) => count + 1)}>Update</button>
// </div>
// }
export default App;
