import React from 'react';
import {Link} from 'react-router-dom';

export default function Sidebar() {
  return (
    <ul
      className="navbar-nav bg-gradient-info sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <li className="nav-item mt-5">
        <Link className="nav-link" to="/">
          <i className="fas fa-box mr-2"></i>
          <span>Loại sản phẩm</span>
        </Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" to="/product">
          <i className="fas fa-boxes mr-2"></i>
          <span>Sản Phẩm</span>
        </Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" to="/bill">
          <i className="fas fa-file-invoice mr-2"></i>
          <span>Hóa Đơn</span>
        </Link>
      </li>
    </ul>
  );
}
