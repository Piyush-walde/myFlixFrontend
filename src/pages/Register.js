import {useNavigate} from 'react-router-dom';
import './ReLog.css'
function Register(){
 
    let user={};
    let navigate=useNavigate();

    function readValue(property,value){
         user[property]=value;
         console.log(user);
    }


    function register(){
   
        fetch("https://myflix-apibypiyush.herokuapp.com/users/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            navigate("/login");
        })
        .catch((err)=>{
            console.log(err);
        })

    }

return (
   
   <div className='my-form'>
     <img src='https://imgs.search.brave.com/yP59Q4i3O6ObtiGz5u0pAkM8pdBQQKsFbWYUVKmGk_I/rs:fit:1000:337:1/g:ce/aHR0cHM6Ly9teWZs/aXh0di5jb20vaW1h/Z2VzL2xvZ28ucG5n'/>

   
<div className="form-container">
    
  <input type="text" className="form-control" placeholder="name" onChange={((event)=>{
      readValue("name",event.target.value);
  })} />
  <input type="text" className="form-control" placeholder="username" onChange={((event)=>{
      readValue("username",event.target.value);
  })} />
  <input type="email" className="form-control" placeholder="Email" onChange={((event)=>{
      readValue("email",event.target.value);
  })} />
  <input type="password" className="form-control" placeholder="Password" onChange={((event)=>{
      readValue("password",event.target.value);
  })} />
  <input type="text" className="form-control" placeholder="Contact" onChange={((event)=>{
      readValue("contact",event.target.value);
  })} />
  <input type="text" className="form-control" placeholder="City" onChange={((event)=>{
      readValue("city",event.target.value);
  })} />
 
 <button type="button" className="btn btn-primary" onClick={register}>Sign Up</button>


</div>
</div>  
)

}

export default Register;