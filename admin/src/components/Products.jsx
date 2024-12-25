import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Modal from './Modal'; // Import Modal component หรือโมดัลที่คุณสร้างไว้
import '../stye/Products.css';
function Products() {
    const [stocks, setStocks] = useState([]);
    const [amountToUpdate, setAmountToUpdate] = useState(0);
    const [idToUpdate, setIdToUpdate] = useState(null);

    const fetchStocks = async () => {
        try {
            const response = await fetch('https://localhost:7199/Stock');
            const data = await response.json();
            setStocks(data);
        } catch (error) {
            console.error('Error fetching stocks:', error);
        }
    };

    useEffect(() => {
        fetchStocks();
    }, []);

    const handleEdit = async () => {
        try {
            const response = await fetch(`https://localhost:7199/StockEdit?id=${idToUpdate}&newAmount=${amountToUpdate}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(amountToUpdate) // ส่งข้อมูลในรูปแบบ JSON
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            const data = await response.json().catch(() => null); // เผื่อกรณีที่ตอบกลับไม่ใช่ JSON
            console.log('Edit success:', data);
            fetchStocks(); // รีเฟรชข้อมูลหลังจากการแก้ไขสำเร็จ
            setIdToUpdate(null);
            setAmountToUpdate(0);
        } catch (error) {
            console.error('Error editing stock:', error.message);
        }
    };

    const openEditModal = (stock) => {
        setIdToUpdate(stock.id);
        setAmountToUpdate(stock.amount); // ตั้งค่าจำนวนที่มีอยู่ปัจจุบันในช่อง
    };

    return (
        <>
            <Nav />
            <div className='dashboard-content'>
                <div className='dashboard-content-container'>
                    <div className='dashboard-content-header'>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product</th>
                                <th>Amount</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {stocks.map((stock, index) => (
                                <tr key={index}>
                                    <td>{stock.id}</td>
                                    <td>{stock.id === 1 ? 'ตู้ลิ้นชักไม้สัก' : stock.id === 2 ? 'ที่วางร่มไม้สัก' : stock.id === 3 ? 'เก้าอี้ไม้ขนาดเล็ก' : stock.id === 4 ? 'ชั้นวางของไม้สัก' : 'ไม่ทราบชื่อ'}</td>
                                    <td>{stock.amount}</td>
                                    <td>
                                        <button onClick={() => openEditModal(stock)}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* แสดง Modal หรือ Dialog เมื่อ idToUpdate ไม่เป็น null */}
                    {idToUpdate !== null && (
                        <Modal isOpen={true}>
                            <div>
                                <h2>แก้ไขจำนวน</h2>
                                <label htmlFor="amount">จำนวน: </label>
                                <input
                                    type="number"
                                    id="amount"
                                    value={amountToUpdate}
                                    onChange={(e) => setAmountToUpdate(e.target.value)}
                                />
                            <button class="green-button" onClick={handleEdit}>Update</button>
                            <button class="red-button" onClick={() => setIdToUpdate(null)}>Close</button>
                            </div>
                        </Modal>
                    )}
                </div>
            </div>
        </>
    );
}

export default Products;
