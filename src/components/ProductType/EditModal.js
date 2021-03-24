import React, {useState} from 'react';
import axios from 'axios';

export default function EditModal(data) {
  const [name, setName] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await axios({
      url: `https://mainf-app.herokuapp.com/api/productType/updateById/${data.data._id}`,
      method: 'PUT',
      data: {
        name: name,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.data.status === 200) {
      alert('Thành công');
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
          <div className="modal-body">
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-user"
                aria-describedby="emailHelp"
                placeholder={data.data.name}
                onChange={(e) => setName(e.target.value)}
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
