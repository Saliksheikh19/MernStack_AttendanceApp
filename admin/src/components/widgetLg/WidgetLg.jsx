import "./widgetLg.css"

import { DataGrid } from '@mui/x-data-grid'
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethods";

export default function ProductList() {
  const [orders, setOrders] = useState([]);

   useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await publicRequest.get("/attendance/getAt");
        setOrders(res.data);
      } catch {}
    };
    getOrders();
  }, []);
  console.log(orders)

  const columns = [
    // { field: "_id", headerName: "ID", width: 220 },
    {
      field: "students",
      headerName: "STUDENTS",
      width: 190,
      renderCell: (params) => {
        console.log(params)
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.picture} alt="" />
             <span style={{fontWeight:"600"}}> {params.row.username} </span>
          </div>
        );
      },
    },
    { field: "coursename", headerName: "COURSE", width: 150 },
    {
      field: "rollnum",
      headerName: "ROLLNUM",
      width: 100,
    },
    {
      field: "checkInTime",
      headerName: "CHECKINTIME",
      width: 160,
    },
    {
      field: "checkOutTime",
      headerName: "CHECKOUTTIME",
      width: 160,
    },
    {
      field: "branch",
      headerName: "BRANCH",
      width: 160,
    },
    {
      field: "date",
      headerName: "DATE",
      width: 160,
    },
   
  ];

  return (

    <div>
    <h1 style={{textAlign:"center" , color:"#73a580"}}>SMIT STUDENTS ATTENDANCE</h1>
    <div className="productList">
      <DataGrid
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
    </div>

  );
}

