import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import UpdateModal from './UpdateStatusModal';

export default class Bill extends Component {
  state = {
    loading: true,
    showModal: false,
    list: [],
    listDetail: [],
    requiredItem: 0,
  };

  componentDidMount() {
    this.getList();
    this.getDetail();
  }

  getList = async () => {
    var response = await axios({
      url: `https://mainf-app.herokuapp.com/api/bill/getAllBill`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.setState({list: response.data.data, loading: false});
  };

  getDetail = async () => {
    var response = await axios({
      url: `https://mainf-app.herokuapp.com/api/bill/getAllBillDetail`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.setState({listDetail: response.data.data});
  };

  replaceModalItem(index) {
    this.setState({
      requiredItem: index,
    });
  }

  currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + 'đ';
  }

  F_ERG = (date) => {
    let today = new Date(date);

    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    today = dd + '/' + mm + '/' + yyyy;
    return today;
  };

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
                <h2 className="h3 mb-2">Hóa Đơn</h2>
              </div>

              <div className="card-body">
                <div className="table-responsive">
                  <table
                    className="table table-bordered"
                    id="dataTable"
                    width="100%"
                    cellSpacing="0"
                  >
                    <thead className="bg-info text-white">
                      <tr>
                        <th>Email khách hàng</th>
                        <th>Địa Chỉ nhận hàng</th>
                        <th>Số điện thoại</th>
                        <th>Tổng giá</th>
                        <th>Ngày đặt</th>
                        <th>Trạng thái</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.list.map((i, index) => (
                        <tr key={i._id}>
                          <td>{i.idUser.email}</td>
                          <td>{i.idUser.address}</td>
                          <td>{i.idUser.numberphone}</td>
                          <td>{this.currencyFormat(i.total)}</td>
                          <td>{this.F_ERG(i.dateOrder)}</td>
                          <td>
                            {i.status === 0
                              ? 'Chưa thanh toán'
                              : i.status === 1
                              ? 'Đã thanh toán'
                              : 'Đã hủy'}
                          </td>
                          <td>
                            <button
                              className="fas fa-pen font-weight-bold btn btn-info mr-2"
                              data-toggle="modal"
                              data-target="#editModal"
                              onClick={() => this.replaceModalItem(index)}
                            ></button>
                            <Link
                              className="fas fa-info font-weight-bold btn btn-success px-3"
                              to={`/billdetail/${i._id}`}
                            ></Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <UpdateModal data={modalData} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
