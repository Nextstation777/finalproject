import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import '../stye/Orders.css';
function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7199/Oders')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  return (
    <>
      <Nav />
      <div>
        {orders.length !== 0 ? (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Code</th>
                <th>Status</th>
                <th>Address</th>
                <th>Products</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td><span>{order.orderId}</span></td>
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
                        .filter(product => product.orderId === order.orderId)
                        .map(product => {
                          const idDisplay = product.id === 1 ? 'ตู้ลิ้นชักไม้สัก' : product.id === 2 ? 'ที่วางร่มไม้สัก' : product.id === 3 ? 'เก้าอี้ไม้ขนาดเล็ก' : product.id === 4 ? 'ชั้นวางของไม้สัก' : product.id;
                          return `${idDisplay} (${product.quantity})`;
                        })
                        .join(', ')}
                    </span>
                  </td>
                  <td><span>${order.formattedCartTotal}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </>
  );
}

export default Orders;
