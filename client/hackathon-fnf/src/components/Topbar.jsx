
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './topbar.css'

import { logout } from '../redux/userRedux';

export default function Topbar() {
const dispatch = useDispatch()
  const handleLogout = ()=>{
 dispatch(logout())
  }
const user = useSelector((state) => state?.user?.currentUser);
  return (
    <nav className="navbar navbar-expand-lg " style={{backgroundColor:"#73a580"}}>
    <div className="container-fluid top">
      <a className="navbar-brand" style={{color:"white"}} ><Link style={{textDecoration:"none" , color:"inherit"}} to={"/"}>SMIT ONLINE ATTENDANCE</Link></a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div style={{flexGrow: 0}} className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
       
        <li className="nav-item" style={{backgroundColor:" rgb(1, 114, 114)" , color:"white" , borderRadius:"4px" , marginRight:"5px"}}>
         <a className="nav-link" style={{color:"white"}} >   <Link style={{textDecoration:"none" , color:"inherit"}} to={"/viewattendance"}>  view attendance </Link></a> 
          </li> 
         
         { user?  <li className="nav-item" style={{backgroundColor:" rgb(1, 114, 114)" , color:"white" , borderRadius:"4px"}}>
            <a className="nav-link" onClick={handleLogout} style={{color:"white"}} >logout</a>
          </li> : "" 
          }
          
         
  
         
        </ul>
        
      {user? "" : 
       <ul className="navbar-nav  mb-2 mb-lg-0">
          <li className="nav-item">
          <a className="nav-link" ><Link className='link' to={'/login'}>Login</Link></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" ><Link className='link' to={'/signup'}>Register</Link></a>
        </li>
        </ul>
       }
      
       
      </div>
    </div>
  </nav>
  )
}
