import React, { useState } from "react";
// import { signin } from "../../actions/auth";
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
  const [view, setView] = useState("password");
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    message: "",
    showForm: true,
  });

  const { email, password, error, message, showForm } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    // signin(user).then((data) => {
    //   if (data.error) {
    //     setValues({ ...values, error: data.error });
    //   } else {
    //     setValues({
    //       ...values,
    //       email: "",
    //       password: "",
    //       error: "",
    //       message: data.message,
    //       showForm: false,
    //     });
    //   }
    // });
  };
  const handleInput = (e) => {
    const userData = { ...values };
    userData[e.target.id] = e.target.value;
    setValues(userData);
  };

  const showError = () =>
    error ? (
      <>
        <div className="alert alert-danger mt-5">{error}</div>
        <a href="signup">Click here to go back</a>
      </>
    ) : (
      ""
    );
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const handleView = () => {
    if (view === "password") {
      setView("text");
    } else {
      setView("password");
    }
  };

  const signinForm = () => {
    return (
      <>
        <form onSubmit={(e) => handleSubmit(e)} className="pt-5">
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
                        value={values.email}
                        label="Your Email"
                        id="email"
                        type="email"
                      />
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <MDBIcon fas icon="lock me-3" size="lg" />
                      <MDBInput
                        onChange={(e) => handleInput(e)}
                        value={values.password}
                        label="Password"
                        id="password"
                        type={view}
                      />
                      {/* <button onClick={handleView}>
                        {view ? "View" : "Hide"}
                      </button> */}
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
        <div className="col-md-6 m-auto">
          {showError()}
          {showMessage()}
        </div>
      </div>
      {showForm && signinForm()}
    </React.Fragment>
  );
};
export default SignIn;
