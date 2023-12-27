import "./setting.css";
import { useEffect, useState } from "react";
import {storage} from "../../firebaseconfig.js"
import axios from "axios"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import Topbar from "../components/Topbar.jsx";
export default function Settings() {
    const user = useSelector((state) => state?.user?.currentUser);
    const dispatch = useDispatch()
 let newdate = new Date()
 let date = newdate.toLocaleDateString()
 let checkInTime = newdate.toLocaleTimeString()
 let checkOutTime = newdate.toLocaleTimeString()
 console.log(checkInTime)


  const [file , setFile] = useState(null)
  const [coursename , setCourse] = useState("")
  const [rollnum , setRollnum] = useState("")
  const [username , setUserName] = useState("")
  const [success , setsuccess] = useState(false)
  const [isCheckingIn, setIsCheckingIn] = useState(true)
  const [btn, setBtn] = useState(true)
  const [err , setErr] = useState(false)
  const [msg , setMsg] = useState("")

    const [add,setAdd] = useState('')
    // `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    
    useEffect(()=>{
      let timeout;
        navigator.geolocation.getCurrentPosition(pos=>{
            const {latitude,longitude} = pos.coords;
            console.log(latitude,longitude)
            // 24.8827 67.0682
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${24.8827}&lon=${67.0682}`;
            fetch(url).then(res=>res.json()).then(data=>setAdd(data.address)) 
            if (!btn && !isCheckingIn) {
                    timeout = setTimeout(() => {
                      setBtn(true);
                      isCheckingIn(true);
                      setsuccess(false);
                    }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
                  }
              console.log(timeout)
                  // Cleanup the timeout to avoid memory leaks
                  return () => clearTimeout(timeout);
        })
    },[btn, isCheckingIn])
    
  async function updateHandler(e) {
    let newdate = new Date()
    let date = newdate.toLocaleDateString()
    let checkInTime = newdate.toLocaleTimeString()
    e.preventDefault();
    if (!username && !rollnum && !file && !coursename) {
        alert('There is nothing to upload')
    } else if (file) {
        /** @type {any} */
        const metadata = {
            contentType: 'image/jpg'
        };

        const storageRef = ref(storage, 'postImages/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                    case 'storage/unknown':
                        break;
                }
            },
           
           async () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log('File available at', downloadURL);
                    setFile(downloadURL)
                    const updatedUser = {
                       username,
                       rollnum,
                       coursename,
                       date: date,
                       checkInTime: checkInTime,
                       picture: downloadURL || "" , 
                       postcode:add.postcode,
                       branch:add.neighbourhood,
                      

                   
                    }
                    try {
                      setFile(null)
                      const res = await axios.post('http://localhost:5000/api/attendance/createAt', updatedUser)
                     
                      dispatch({type:"UPDATE_SUCCESS" , payload: res.data.updatedUser})
                     console.log(res)
                     if (res){
                       setsuccess(true)
                       setIsCheckingIn(false)
                     }
                     
                   
                    }
                    
                   
                    catch (error) {
                        console.log(error.response.data.error)
                        setErr(true)
                        setMsg(error.response.data.error)
                    }
                    
                 
                  
                    
                });
            }
        );
    } 

   
}

 async function  checkoutHandler(e){
  let newdate2 = new Date()
  let checkOutTime = newdate2.toLocaleTimeString()
  e.preventDefault();
  const res = await axios.put('http://localhost:5000/api/attendance/updateAttendance', {
    username,
    checkOutTime:checkOutTime
  })
  console.log(res.data)
  setBtn(false)
}
  return (
   <>
    <Topbar/>
    <div className="settings">
      <div className="settingsWrapper">
        
        
        <form className="settingsForm"  onSubmit={(e) => (isCheckingIn ? updateHandler(e) : checkoutHandler(e))}>
          <label>Student Picture</label>
         
          <div className="settingsPP">
         
       <img
            
              src={file ? URL.createObjectURL(file) : user.profilePicture? user.profilePicture : "data:image/png;base64,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"}
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>StudentName</label>
          <input type="text" placeholder={user?.username} name="name"  onChange={(e) => setUserName(e.target.value)} />
          <label>CourseName</label>
          <input  placeholder={user?.coursename} name="email" onChange={(e) => setCourse(e.target.value)}/>
          <label>RollNum</label>
          <input name="password" placeholder={user?.rollnum}  onChange={(e) => setRollnum(e.target.value)} />
         {
          btn ?  <button className="settingsSubmitButton" type="submit">
          {isCheckingIn ? "Check In" : "Check Out"}
          </button> : <span style={{color:"black" , textAlign:"center"}} >Your todays attendance is completed come tommorow</span> 
         }
          {
            success ? <span style={{color:"balck" , textAlign:"center"}} >Your Attendance Mark Succesfully</span> : ""
          }
          {
            err ?  <span style={{color:"balck" , textAlign:"center"}} >{msg}</span> : ""
          }
        </form>
      </div>
    </div>
 
   </>
    );
}