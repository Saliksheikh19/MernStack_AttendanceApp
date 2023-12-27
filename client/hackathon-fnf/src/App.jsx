import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from "./pages/Register";
import Login from "./pages/login";
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Settings from './pages/Setting';
import ViewAttendance from './pages/ViewAttendance';

const App = () => {
  const user = useSelector((state) => state?.user?.currentUser);
  console.log(user)
 return ( 
  <BrowserRouter>
  <Routes>
  <Route exact path='/' element={ user? <Settings/> : <Login/>  } />
    <Route path='/login' element={ <Login/>} />
    <Route path='/viewattendance' element={ <ViewAttendance/>} />
  </Routes>
  </BrowserRouter>
)

};

export default App;
