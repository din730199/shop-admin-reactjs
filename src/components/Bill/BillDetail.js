import axios from 'axios';
import React, {Component} from 'react';

export default class BillDetail extends Component {
  state = {
    loading: true,
    list: [],
  };

  componentDidMount() {
    this.getList();
  }

  getList = async () => {
    var response = await axios({
      url: `https://mainf-app.herokuapp.com/api/bill/getBillDetailByBillId/${this.props.match.params.id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.setState({list: response.data.data, loading: false});
  };

  currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + 'đ';
  }

  render() {
    return (
      <div className="container-flui">
        {this.state.loading || !this.state.list ? (
          <div>Loading...{this.props._id}</div>
        ) : (
          <div>
            {/* <!-- DataTales  --> */}
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h2 className="h3 mb-2">Hóa Đơn Chi Tiết</h2>
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
                        <th>Số lượng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.list.map((i, index) => {
                        return (
                          <tr key={i._id}>
                            <td>{i.idProduct.name}</td>
                            <td>{i.idProduct.productType.name}</td>
                            <td>{this.currencyFormat(i.idProduct.price)}</td>
                            <td>{i.quantity}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

// export default function BillDetail() {
//   const [loading, setLoading] = useState(true);
//   const [list, setList] = useState([]);

//   // useEffect(() => {
//   //   async function fetchData() {
//   //     var response = await axios({
//   //       url: `https://mainf-app.herokuapp.com/api/bill/getBillDetailByBillId/${id}`,
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //     });
//   //     setList(response.data.data);
//   //     setLoading(false);
//   //   }
//   //   fetchData();
//   // }, []);

//   const currencyFormat = (num) => {
//     return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + 'đ';
//   };

//   const F_ERG = (date) => {
//     let today = new Date(date);

//     var dd = today.getDate();

//     var mm = today.getMonth() + 1;
//     var yyyy = today.getFullYear();
//     if (dd < 10) {
//       dd = '0' + dd;
//     }

//     if (mm < 10) {
//       mm = '0' + mm;
//     }

//     today = dd + '/' + mm + '/' + yyyy;
//     console.log(today);
//     return today;
//   };

//   return (
//     <div className="container-fluid">
//       {loading || !list ? (
//         <div>Loading...</div>
//       ) : (
//         <div>
//           {/* <!-- DataTales  --> */}
//           <div className="card shadow mb-4">
//             <div className="card-header py-3">
//               <h2 className="h3 mb-2">Hóa Đơn</h2>
//             </div>

//             <div className="card-body">
//               <div className="table-responsive">
//                 <table
//                   className="table table-bordered"
//                   id="dataTable"
//                   width="100%"
//                   cellSpacing="0"
//                 >
//                   <thead>
//                     <tr>
//                       <th>Email khách hàng</th>
//                       <th>Địa Chỉ nhận hàng</th>
//                       <th>Số điện thoại</th>
//                       <th>Tổng giá</th>
//                       <th>Ngày đặt</th>
//                       <th>Trạng thái</th>
//                       <th></th>
//                     </tr>
//                   </thead>
//                   <tbody></tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
