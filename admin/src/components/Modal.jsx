import React from 'react';

function Modal({ isOpen, children }) {
  // ตรวจสอบว่า Modal ถูกเปิดหรือไม่
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
}

export default Modal;
