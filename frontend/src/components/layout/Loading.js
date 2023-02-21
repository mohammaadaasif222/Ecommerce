import Spinner from "react-bootstrap/Spinner";

function Loading() {
  return (
    <>
      <div className="container d-flex justify-content-center text-center align-items-center" style={{ height: "80vh" }}>
        <div className="">
          <Spinner animation="border" />
          <Spinner animation="border" />
          <Spinner animation="border" />
          <Spinner animation="border" />
          <Spinner animation="border" />
        </div>
      </div>
    </>
  );
}

export default Loading;
