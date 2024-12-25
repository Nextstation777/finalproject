import React from 'react'
import { Link } from 'react-router-dom'
function Nav() {
  return (
    <nav>
        <Link to="/admin">Admin</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/products">Products</Link>
    </nav>
  )
}

export default Nav