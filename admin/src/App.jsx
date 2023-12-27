import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import React from "react"
import {
  BrowserRouter ,
  Routes,
  Route
} from "react-router-dom";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

function App() {
  const admin = useSelector((state) => state?.user?.currentUser?.isAdmin);
  console.log(admin)
  return (
    
  <Routes>
    <Route path="/login" element={<Login />} />
    
    {admin ? (
      <React.Fragment>
        <Route
          path="/"
          element={
            <>
              <Topbar />
              <div className="container">
                <Sidebar />
                <Home />
              </div>
            </>
          }
        />
        <Route path="/products" element={
        <>
        <Topbar />
        <div className="container">
          <Sidebar />
          <ProductList />
        </div>
      </>} 
        />
        <Route path="/product/:productId" element={ <>
       <Topbar />
       <div className="container">
         <Sidebar />
         <Product />

       </div>
     </> }/>
        
        <Route path="/newproduct" element={
       <>
       <Topbar />
       <div className="container">
         <Sidebar />
         <NewProduct />
       </div>
     </>} />
      </React.Fragment>
    ) : (
      <Route path="/" element={<Login />} />
    )}
  </Routes>
</BrowserRouter>

  );
}

export default App;
