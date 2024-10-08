import './User.css'
import { IoPersonCircleSharp } from "react-icons/io5";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
function User(){
    const [user, setUser] = useState({
        "name":"",
        "username":"",
        "email":"",
    });
    const navigate = useNavigate();
    
    const {id} = useParams();
    useEffect(()=>{
        if(!id){
            console.log(`User with id ${id} can't be found.`);
        }
        else{
            console.log(id);
            loadData();
        }
    },[id])

    const loadData = async()=>{
        const response = await axios.get(`http://localhost:8080/user/${id}`);
        setUser(response.data);
        console.log(response.data);
    }
    return(
        <>

          <div className="user-data-cnt">
             <IoPersonCircleSharp className='profile-icon'/>
             <p ><span className='id-label'>ID:</span><span className='id-data'>{user.id}</span></p>
             <p><span className="name-label">Name:</span><span className="name-data">{user.name}</span></p>
             <p><span className="username-label">Username:</span><span className="username-data">{user.username}</span></p>
             <p><span className="email-label">Email:</span><span className="email-data">{user.email}</span></p>
             <button className='btn-back' onClick={()=>{navigate("/")}}>Back</button>


          </div>
        
        </>
    )
}
export default User;