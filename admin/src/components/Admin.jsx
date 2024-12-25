import React, { useState } from 'react';
import Nav from './Nav';
import axios from 'axios';
import '../stye/Admin.css'

function Admin() {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState('1'); // กำหนดค่าเริ่มต้นเป็น '1'

  const handleUpdate = async () => {
    try {
      const idToUpdate = encodeURIComponent(orderId); // แปลง orderId เป็นรูปแบบที่เหมาะสำหรับ URL
      const response = await axios.patch(`https://localhost:7199/UpdateOrder/${idToUpdate}`, {
        status: status
      });

      // Handle success response
      console.log('Updated order:', response.data);
      window.alert('แก้ไขสถานะสินค้าเรียบร้อย'); // เพิ่ม Popup แจ้งเตือนเมื่อ Update สำเร็จ
    } catch (error) {
      // Handle error
      window.alert('ไม่มีเลขออเดอร์ที่ระบุ');
      console.error('Error updating order:', error);
    }
  };

  return (
    <>
      <Nav />
      <div class="aaa__content">
        <h2 class="b">แก้ไขสถานะสินค้า</h2>
        <div class="aaa__content">
          <label htmlFor="orderId">OrderId:</label>
          <input
            type="text"
            id="orderId"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
        </div>
        <div class="aaa__content">
          <label htmlFor="status">สถานะสินค้า:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="1">กำลังจัดเตรียมสินค้า</option>
            <option value="2">กำลังจัดส่งสินค้า</option>
            <option value="3">จัดส่งสินค้าเรียบร้อยแล้ว</option>
            <option value="4">ยกเลิกการจัดส่งสินค้า</option>
          </select>
        </div>
        <button class="aaa__content" onClick={handleUpdate}>อัพเดตสินค้า</button>
      </div>
    </>
  );
}

export default Admin;
