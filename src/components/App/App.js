import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Login from '../Login/Login';
import ProductType from '../ProductType/ProductType';
import Product from '../Product/Product';
import Bill from '../Bill/Bill';
import BillDetail from '../Bill/BillDetail';

import LogoutModal from './LogoutModal';
import ChangePassModal from './ChangePassModal';
import Sidebar from './Sidebar';
import Nav from './Nav';
import useToken from './useToken';

function App() {
  const {token, setToken} = useToken();
  console.log('token', typeof token);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div id="wrapper">
      <Router>
        <Sidebar />
        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Nav />
            {/* <!-- Begin Page Content --> */}

            <Switch>
              <Route
                exact
                path="/"
                render={() => <Redirect to="/productType" />}
              />
              <Route path="/productType" component={ProductType} />
              <Route path="/product" component={Product} />
              <Route path="/bill" component={Bill} />
              <Route path="/billdetail/:id" component={BillDetail} />
            </Switch>

            {/* <!-- End Page Content --> */}
          </div>
        </div>
        {/* End Content Wrapper */}
        <LogoutModal />
        <ChangePassModal />
      </Router>
    </div>
  );
}

export default App;
