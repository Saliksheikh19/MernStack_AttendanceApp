import { useEffect, useState } from "react";
import { userRequest , publicRequest } from "../requestmethods";
import "./viewattendance.css";
import { useSelector } from "react-redux";
import Topbar from "../components/Topbar";


export default function viewAttendance() {
    const user = useSelector((state) => state?.user?.currentUser)
    console.log(user)
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await publicRequest.get("/attendance/getAt");
        const filteredOrders = res.data.filter(item => item.username === user?.username);
        setOrders(filteredOrders);
      } catch {}
    };
    getOrders();
  }, []);
  console.log(orders)
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <>
    <Topbar/>
    <div className="widgetLg">
      <h3 className="widgetLgTitle">ATTENDANCE</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">StudentName</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Rollnum</th>
          <th className="widgetLgTh">CourseName</th>
          <th className="widgetLgTh">CheckIn</th>
          <th className="widgetLgTh">CheckOut</th>
        </tr>
        {orders.map((order) => (
          <tr className="widgetLgTr" key={order._id}>
            <td className="widgetLgUser">
              <span className="widgetLgName">{order.username}</span>
            </td>
            <td className="widgetLgDate">{new Date(order.createdAt).toLocaleDateString()}</td>
            <td className="widgetLgAmount">{order.rollnum}</td>
            <td className="widgetLgAmount">{order.coursename}</td>
            <td className="widgetLgAmount">{(order.checkInTime)}</td>
            <td className="widgetLgAmount">{(order.checkOutTime)}</td>
          
            
            
          </tr>
        ))}
      </table>
    </div>
    </>
  );
}
