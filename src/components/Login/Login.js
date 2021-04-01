import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './Login.css';

async function loginUser(credentials) {
  return fetch('https://mainf-app.herokuapp.com/api/users/signInAdmin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({setToken}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser({
      email,
      password,
    });
    if (data.status === 201 || data.status === 205) {
      console.log('error');
      alert('Lỗi khi đăng nhập');
      return;
    }
    setToken(data.token);
  };

  return (
    <div className="container d-flex justify-content-center my-5 align-items-center ">
      <div className="card o-hidden border-0 shadow-lg my-5 w-50">
        <div className="card-body p-0">
          <div className="justify-content-center row ">
            <div className="col-lg-6">
              <div>
                <br />
                <br />
                <br />
                <br />
                <div className="text-center">
                  <h1 className="h3 text-gray-900 mb-4">Admin</h1>
                </div>
                <form className="user" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-user"
                      id="exampleInputEmail"
                      aria-describedby="emailHelp"
                      placeholder="Email "
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-user"
                      id="exampleInputPassword"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-user btn-block"
                  >
                    Login
                  </button>
                </form>
                <br />
                <br />
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
