import React from 'react';

export default function Nav() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <form className="form-inline">
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
        >
          <i className="fa fa-bars"></i>
        </button>
      </form>
      <ul className="navbar-nav ml-auto">
        <button
          className="dropdown-item"
          data-toggle="modal"
          data-target="#changePassModal"
        >
          <i className="fas fa-lock fa-sm fa-fw mr-2 text-gray-400"></i>
          Đổi mật khẩu
        </button>
        <button
          className="dropdown-item"
          data-toggle="modal"
          data-target="#logoutModal"
        >
          <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
          Đăng xuất
        </button>
      </ul>
    </nav>
  );
}
