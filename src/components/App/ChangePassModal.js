import React, {useState} from 'react';
import axios from 'axios';

export default function Logout() {
  const [old, setOld] = useState();
  const [newp, setNewp] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await localStorage.getItem('token');
    let response = await axios({
      url: 'https://mainf-app.herokuapp.com/api/users/changePass',
      method: 'POST',
      data: {
        oldPass: old,
        newPass: newp,
      },
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json',
      },
    });
    if (response.data.status === 200) {
      alert('Thành công');
    } else {
      alert(response.data.errors[0].msg);
    }
  };

  return (
    <div
      className="modal fade"
      id="changePassModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Đổi mật khẩu
            </h5>
            <button
              className="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-user"
                aria-describedby="emailHelp"
                placeholder="Mật khẩu cũ "
                onChange={(e) => setOld(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-user"
                placeholder="Mật khẩu mới "
                onChange={(e) => setNewp(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              type="button"
              data-dismiss="modal"
            >
              Hủy
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
