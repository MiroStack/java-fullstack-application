import './UserTable.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
function UserTable(){
    const [user, setUser] = useState([]);
    const loadUser = async ()=>{
        const response = await axios.get("http://localhost:8080/users");
        setUser(response.data);
    }
    useEffect(()=>{
         loadUser();
    },[])
    useEffect(()=>{
         console.log(user)
    },[user])

    const deleteUser = async(id)=>{
        try{
            await axios.delete(`http://localhost:8080/user/${id}`);
        }
        catch(error){
            console.log(`Failed to delete User with id ${id}.`)
        }
        const newUsers = user.filter((element, index)=>element.id != id);
        setUser(newUsers);

    }
    return(
        <div className='table-container'>
             <Link to="/adduser">
              <button className='btn-add'>Add User</button>
            </Link>
           <table>
            <thead>
                <tr>
                        <th>ID</th>
                        <th>
                            Name
                        </th>
                        <th>
                            Username
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Action
                        </th>
                </tr>
               
            </thead>
            <tbody>
                {
                    user.map((element, index)=> 
                    <tr key={element.id}>
                    <td data-label="ID">{element.id}</td>
                    <td data-label="Name">{element.name}</td>
                    <td data-label="Username">{element.username}</td>
                    <td data-label="Email">{element.email}</td>
                    <td data-label="Action" className='action-column'>
                        <Link to={`/edituser/${element.id}`} className='btn-wrapper'>
                           <button className='btn-edit'>Edit</button>
                        </Link>
                        <Link to={`/viewuser/${element.id}`} className='btn-wrapper'>
                           <button className='btn-view'>View</button>
                        </Link>
                        <Link className='btn-wrapper'>
                           <button className='btn-delete' onClick={()=>deleteUser(element.id)}>Delete</button>
                        </Link>
                                                
                        
                    </td>
                </tr>
                    
                    )
                }
              
            </tbody>
             
           </table>
        </div>
    )
}
export default UserTable