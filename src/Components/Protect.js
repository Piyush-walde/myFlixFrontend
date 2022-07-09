import {Navigate} from 'react-router-dom'
function Protect(props){

    let Token=JSON.parse(localStorage.getItem("myflix_user")).token;

    return Token!==null?props.children:<Navigate to="/login"/>

}

export default Protect; 