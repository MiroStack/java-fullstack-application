import { useEffect, useState } from "react";
import "./AddEditUser.css"
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AddUser() {
    const navigate = useNavigate()
    const {id} = useParams();
    const[user, setUser] =useState({
        name:"",
        username:"",
        email:""
    })
    const{name, username, email} =user;


    useEffect(()=>{
        if(!id){
            console.log("no id");
        }
        else{
            loadData();
        }
     },[id]);


     const loadData = async ()=>{
        const response = await axios.get(`http://localhost:8080/user/${id}`);
        setUser(response.data);
     }
 




    const onInputChange = (e)=>{
        setUser({...user, [e.target.name]:e.target.value});

    }
    const onSubmit = async(e)=>{
           e.preventDefault();
           if(id){
             await axios.put(`http://localhost:8080/user/${id}`, user);
             navigate("/");
           }
           else if(user.name != "" && user.username != "" && user.email != ""){
                await axios.post("http://localhost:8080/user", user);
                navigate("/");
            }
           else{
                alert("Sorry you need to fill out all field of the form.")
            }
         
    }
    useEffect(()=>{
         console.log(user);
    },[user])
    return(
        <>
          <div className="add-edit-user-cnt">
                <h2>Register User</h2>
                <form onSubmit={(e)=>onSubmit(e)}>
                <label>Name</label> <br/>
                <input type="text" placeholder="Name..." name="name" value={name} onChange={(e)=>onInputChange(e)}/>
                <br/>
                <label>Username</label> <br/>
                <input type="text" placeholder="Username..." name="username" value={username} onChange={(e)=>onInputChange(e)}/>
                <br/>
                <label>Email</label> <br/>
                <input type="text" placeholder="Email..." name="email" value={email} onChange={(e)=>onInputChange(e)}/>
                <br/>
                <div className="btn-container">
                    <button onClick={()=>{navigate("/")}}>Back</button>
                     <button type="submit" >Save</button>
                </div>
        </form>
          </div>
        
        </>
    )
}
export default AddUser;