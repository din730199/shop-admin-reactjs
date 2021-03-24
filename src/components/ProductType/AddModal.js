import React, {useState} from 'react';
import axios from 'axios';

export default function AddModal() {
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const handleSubmit = async (e) => {
    const data = new FormData();
    data.append('name', name);
    data.append('image', image);
    e.preventDefault();
    let response = await axios({
      url: `https://mainf-app.herokuapp.com/api/productType/addProductType`,
      method: 'POST',
      data: data,
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

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  return (
    <div
      className="modal fade"
      id="addModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Thêm loại sản phẩm
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
                placeholder="Loại sản phẩm"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="file"
                aria-describedby="emailHelp"
                onChange={onImageChange}
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
