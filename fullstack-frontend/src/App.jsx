import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./layout/Navbar";
import AddEditUser from "./users/AddEditUser";
import UserTable from "./users/UserTable";
import User from "./users/User";
function App() {


  return (
    <>
    <BrowserRouter>
    <Navbar/>
         <Routes>
            <Route path="/" element={<UserTable/>}/>
            <Route path="/adduser" element={<AddEditUser/>}/>
            <Route path="/edituser/:id" element={<AddEditUser/>}/>
            <Route path="/viewuser/:id" element={<User/>}/>
         </Routes>
    </BrowserRouter>
      
         
    </>
  )
}

export default App
