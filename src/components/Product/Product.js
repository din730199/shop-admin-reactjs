import axios from 'axios';
import React, {Component} from 'react';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import AddModal from './AddModal';
import Pagination from './Pagination';

export default class Product extends Component {
  state = {
    loading: true,
    list: [],
    requiredItem: 0,
    currentPage: 1,
    postsPerPage: 10,
    keyword: '',
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

  search(rows) {
    return rows.filter(
      (row) =>
        row.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1 ||
        row.productType.name
          .toLowerCase()
          .indexOf(this.state.keyword.toLowerCase()) > -1
    );
  }

  currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + 'đ';
  }

  render() {
    // Get current posts
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.list.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    const li = this.search(this.state.list);

    // Change page
    const paginate = (pageNumber) => this.setState({currentPage: pageNumber});

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
                  <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control bg-light  small"
                        placeholder="Tìm kiếm..."
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                        onChange={(e) =>
                          this.setState({keyword: e.target.value})
                        }
                      />
                    </div>
                  </form>
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
                      {(this.state.keyword ? li : currentPosts).map(
                        (i, index) => {
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
                        }
                      )}
                    </tbody>
                  </table>
                  <Pagination
                    postsPerPage={this.state.postsPerPage}
                    totalPosts={this.state.list.length}
                    paginate={paginate}
                  />
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
