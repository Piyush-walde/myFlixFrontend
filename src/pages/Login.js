import {useNavigate} from 'react-router-dom';
import './ReLog.css'

function Login(){
 
    let userCred={};
    let navigate=useNavigate();

    function readValue(property,value){
        userCred[property]=value;
         
    }


    function Login(){
   
        fetch("https://myflix-apibypiyush.herokuapp.com/users/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userCred)
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);

            if(data.success===true){
                localStorage.setItem("myflix_user",JSON.stringify(data));
            
                navigate("/homepage");
            }
        })
        .catch((err)=>{
            console.log(err);
        })



    }
    
    function gotoRegister(){
        navigate("/register");
    }

return (
   <div className='my-form'>
  <img src='https://imgs.search.brave.com/yP59Q4i3O6ObtiGz5u0pAkM8pdBQQKsFbWYUVKmGk_I/rs:fit:1000:337:1/g:ce/aHR0cHM6Ly9teWZs/aXh0di5jb20vaW1h/Z2VzL2xvZ28ucG5n'/>

   
<div className="form-container">

  <input type="text" className="form-control" placeholder="username" onChange={((event)=>{
      readValue("username",event.target.value);
  })} />
 
  <input type="password" className="form-control" placeholder="Password" onChange={((event)=>{
      readValue("password",event.target.value);
  })} />
  
 
  <button type="button" className="btn btn-primary" onClick={Login}>Login</button>

  <div className='new-user'>
  <p>New User ?</p>
  <button type='button' className='btn btn-primary' onClick={gotoRegister} >Register Here</button>

  </div>
   
</div>

</div>
     
)

}

export default Login;