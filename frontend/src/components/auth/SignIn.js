import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { redirect } from "react-router-dom";
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

const SignIn = () => {

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { user, message ,success } = useSelector((state) => state.User);
  const { email, password } = data;

  if(success){
    return  <h1 className="alert alert-success mt-5">Log In Success !</h1>
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, loading: true });
    const user = { email, password };
    dispatch(loginUser(user));
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

  const signinForm = () => {
    return (
      <>
        <form onSubmit={(e) => handleSubmit(e)}>
          <MDBContainer fluid>
            <MDBCard
              className="text-black m-5"
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
                      Sign In
                    </p>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <MDBIcon fas icon="envelope me-3" size="lg" />
                      <MDBInput
                        onChange={(e) => handleInput(e)}
                        value={data.email}
                        label="Your Email"
                        id="email"
                        type="email"
                        autoComplete="false"
                      />
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <MDBIcon fas icon="lock me-3" size="lg" />
                      <MDBInput
                        onChange={(e) => handleInput(e)}
                        value={data.name}
                        label="Password"
                        id="password"
                        type="password"
                        autoComplete="false"
                      />
                    </div>

                    <MDBBtn className="mb-4" size="lg" type="submit">
                      Sign In
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
  return (
    <React.Fragment>
      <div className="container-fluid pb-3 item-center">
        <div className="col-md-6 m-auto">{showMessage()}</div>
      </div>
      {!user.message && signinForm()}
    </React.Fragment>
  );
};
export default SignIn;
