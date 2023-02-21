import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../actions/authActions";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const { name, email, password } = data;
  const { user  } = useSelector((state) => state.User);
  



  const handleSubmit = async (e) => {
    e.preventDefault();

    setData({ ...data, loading: true });
    const user = { name, email, password };

    dispatch(registerUser(user));
  };





  const handleInput = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };




  const showMessage = () =>
    user.message ? (
      <>
        <div className="alert alert-danger mt-5">{user.message}</div>
        <a href="signup">Click here to go back</a>
      </>
    ) : (
      ""
    );
  

  const signupForm = () => {
    return (
      <>
        <form onSubmit={(e) => handleSubmit(e)}>
          <MDBContainer fluid>
            <MDBCard
              className="text-black"
              style={{ borderRadius: "25px" }}
            >
              <MDBCardBody>
                <MDBRow>
                  <MDBCol
                    md="10"
                    lg="6"
                    className="order-2 order-lg-1 d-flex flex-column align-items-center"
                  >
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>

                    <div className="d-flex flex-row align-items-center mb-4 ">
                      <MDBIcon fas icon="user me-3" size="lg" />
                      <MDBInput
                        onChange={(e) => handleInput(e)}
                        label="Your Name"
                        id="name"
                        type="text"
                        className="w-100"
                        value={data.name}
                      />
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <MDBIcon fas icon="envelope me-3" size="lg" />
                      <MDBInput
                        onChange={(e) => handleInput(e)}
                        label="Your Email"
                        id="email"
                        type="email"
                        value={data.email}
                      />
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <MDBIcon fas icon="lock me-3" size="lg" />
                      <MDBInput
                        onChange={(e) => handleInput(e)}
                        label="Password"
                        id="password"
                        type="password"
                        value={data.password}
                        autoComplete="true"
                      />
                    </div>

                    <MDBBtn className="mb-4" size="lg">
                      Register
                    </MDBBtn>
                  </MDBCol>

                  <MDBCol
                    md="10"
                    lg="6"
                    className="order-1 order-lg-2 d-flex align-items-center"
                  >
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      fluid
                    />
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBContainer>
        </form>
      </>
    );
  };

  const dashBoard=()=>{
    return <h1>Welcome to DashBoard  {user.user.name}</h1>
  }

  return (
    <React.Fragment>
      <div className="container-fluid  justify-content-center item-center pb-3 d-flex ">
        <div className="col-md-6 mt-5">
          {user.success && dashBoard()}
          {showMessage()}
        </div>
      </div>
      {!user.success && signupForm()}
    </React.Fragment>
  );
};
export default SignUp;
