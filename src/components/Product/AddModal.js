import React, {useState} from 'react';
import axios from 'axios';

export default function AddModal() {
  const [name, setName] = useState();
  const [productType, setProductType] = useState();
  const [price, setPrice] = useState();
  const [des, setDes] = useState();
  const [image, setImage] = useState([]);

  const handleSubmit = async (e) => {
    const data = new FormData();

    image.forEach((file, i) => {
      data.append('images', file);
    });

    data.append('name', name);
    data.append('productType', productType);
    data.append('price', price);
    data.append('description', des);
    e.preventDefault();
    let response = await axios({
      url: `https://mainf-app.herokuapp.com/api/product/addProduct`,
      method: 'POST',
      data: data,
      headers: {
        'Content-type': 'application/json',
        'Content-Type': 'multipart/form-data',
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
      let img = event.target.files;
      setImage(Array.from(img));
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
              Thêm sản phẩm
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
            <div className="input-group mb-3">
              <select
                onClick={(e) => setProductType(e.target.value)}
                className="custom-select"
                id="inputGroupSelect02"
              >
                <option value="">Chọn...</option>
                <option value="5e820949b0c17b530873db31">Đầm nữ</option>
                <option value="5e820969b0c17b530873db32">Áo sơmi</option>
                <option value="5e82097fb0c17b530873db33">Áo thun</option>
                <option value="5e820995b0c17b530873db34">Áo khoác</option>
                <option value="605402cc95f39c279c750fdb">Giầy</option>
                <option value="605402f395f39c279c750fdc">Quần</option>
              </select>
              <div className="input-group-append">
                <label className="input-group-text">Loại</label>
              </div>
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-user"
                aria-describedby="emailHelp"
                placeholder="Tên sản phẩm"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-user"
                aria-describedby="emailHelp"
                placeholder="Giá"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-user"
                aria-describedby="emailHelp"
                placeholder="Mô tả"
                onChange={(e) => setDes(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="file"
                aria-describedby="emailHelp"
                onChange={onImageChange}
                multiple
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
