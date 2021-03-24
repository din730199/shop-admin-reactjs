import axios from 'axios';
import React, {Component} from 'react';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import AddModal from './AddModal';

export default class Product extends Component {
  state = {
    loading: true,
    list: [],
    requiredItem: 0,
  };

  componentDidMount() {
    this.getListProductType();
  }

  getListProductType = async () => {
    var response = await axios({
      url: `https://mainf-app.herokuapp.com/api/product/getListProduct`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.setState({list: response.data.data, loading: false});
  };

  replaceModalItem(index) {
    this.setState({
      requiredItem: index,
    });
  }

  currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + 'đ';
  }

  render() {
    const requiredItem = this.state.requiredItem;
    let modalData = this.state.list[requiredItem];
    return (
      <div className="container-fluid">
        {this.state.loading || !this.state.list ? (
          <div>Loading...</div>
        ) : (
          <div>
            {/* <!-- DataTales  --> */}
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <div className="row">
                  <h2 className="h3 mb-2 ml-3">Sản phẩm</h2>
                  <div className="ml-auto mr-3">
                    <button
                      className="btn btn-info mr-2"
                      data-toggle="modal"
                      data-target="#addModal"
                    >
                      Thêm
                    </button>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className="table-responsive">
                  <table
                    className="table table-bordered"
                    id="dataTable"
                    width="100%"
                  >
                    <thead>
                      <tr>
                        <th>Tên sản phẩm</th>
                        <th>Loại sản phẩm</th>
                        <th>Giá</th>
                        <th>Mô tả</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.list.map((i, index) => {
                        return (
                          <tr key={i._id}>
                            <td>{i.name}</td>
                            <td>{i.productType.name}</td>
                            <td>{this.currencyFormat(i.price)}</td>
                            <td>{i.description}</td>
                            <td>
                              <button
                                className="btn btn-info mb-1"
                                data-toggle="modal"
                                data-target="#editModal"
                                onClick={() => this.replaceModalItem(index)}
                              >
                                Sửa
                              </button>
                              <button
                                className="btn btn-danger mb-1"
                                data-toggle="modal"
                                data-target="#deleteModal"
                                onClick={() => this.replaceModalItem(index)}
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <DeleteModal id={modalData._id} />
                  <EditModal data={modalData} />
                  <AddModal />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
