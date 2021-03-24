import React from 'react';
import axios from 'axios';

export default function UpdateModal(data) {
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    let response = await axios({
      url: `https://mainf-app.herokuapp.com/api/bill/updateById/${data.data._id}`,
      method: 'PUT',
      data: {
        status: 1,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.data.status === 200) {
      window.alert('Thành công');
      window.location.reload();
    } else {
      alert(response.data.errors[0].msg);
    }
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    let response = await axios({
      url: `https://mainf-app.herokuapp.com/api/bill/updateById/${data.data._id}`,
      method: 'PUT',
      data: {
        status: -1,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.data.status === 200) {
      window.alert('Thành công');
      window.location.reload();
    } else {
      alert(response.data.errors[0].msg);
    }
  };

  return (
    <div
      className="modal fade"
      id="editModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {data.data._id}
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
          <div className="modal-body">Cập nhật trạng thái hóa đơn</div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              type="button"
              data-dismiss="modal"
            >
              Hủy
            </button>
            <button className="btn btn-primary" onClick={handleSubmit1}>
              Đã thanh toán
            </button>
            <button className="btn btn-primary" onClick={handleSubmit2}>
              Đã hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
