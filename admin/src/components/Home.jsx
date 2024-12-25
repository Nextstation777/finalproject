import React, { useState } from 'react';
import axios from 'axios';
import '../stye/Home.css'; // ตรวจสอบให้แน่ใจว่าเส้นทางไฟล์ถูกต้อง


function Home() {
  const [code, setCode] = useState('');
  const [orders, setOrders] = useState([]);

  const fetchOrdersByCode = async () => {
    setOrders([]); // ลบข้อมูลเก่า
    try {
      const response = await axios.get(`https://localhost:7199/OrdersByCode?code=${code}`);
      if (response.data.length === 0) {
        alert('ไม่พบข้อมูลสำหรับโค้ดที่ระบุ');
      }
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('ไม่พบรหัสสินค้าที่ระบุ');
    }
  };

  return (
    <div className="home-container">
      <h2>ตรวจสอบสถานะสินค้า</h2>
      <div className="home-input-container">
        <label className="aaaaa" htmlFor="code">รหัสสินค้า:</label>
        <input
          type="text"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <button className="home-green-button" onClick={fetchOrdersByCode}>ค้นหาสินค้า</button>
      <div>
        {orders.length !== 0 ? (
          <table>
            <thead>
              <tr>
                <th>รหัสสินค้า</th>
                <th>สถานะสินค้า</th>
                <th>ที่อยู่</th>
                <th>สินค้า</th>
                <th>ราคาสินค้า</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td><span>{order.code}</span></td>
                  <td>
                    <span>
                    {order.status == 1 ? 'กำลังจัดเตรียมสินค้า' : 
                    order.status == 2 ? 'กำลังจัดส่งสินค้า' : 
                    order.status == 3 ? 'จัดส่งสินค้าเรียบร้อยแล้ว' : 
                    order.status == 4 ? 'ยกเลิกการจัดส่งสินค้า' : 
                    order.status}
                    </span>
                  </td>
                  <td>
                    <span>{order.street} {order.district} {order.city} {order.uf}</span>
                  </td>
                  <td>
                    <span>
                      {order.products && order.products
                        .map(product => {
                          const idDisplay = product.id === 1 ? 'ตู้ลิ้นชักไม้สัก' : product.id === 2 ? 'ที่วางร่มไม้สัก' : product.id === 3 ? 'เก้าอี้ไม้ขนาดเล็ก' : product.id === 4 ? 'ชั้นวางของไม้สัก' : product.id;
                          return `${idDisplay} (${product.quantity})`;
                        })
                        .join(', ')}
                    </span>
                  </td>
                  <td><span>{order.formattedCartTotal}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
