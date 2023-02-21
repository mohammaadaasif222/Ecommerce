import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProudcts } from "../actions/productActions";
import Pagination from "react-js-pagination";
import Loading from "./layout/Loading";
import Card from "./product/Card";

const Home = () => {
  const [activePage, setActivePage] = useState(1);

  const { loading, products, error,keyword  } = useSelector((state) => state.Products);

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(fetchProudcts(keyword,activePage));


  }, [dispatch,keyword, activePage]);

  function handlePageChange(pageNo) {

    setActivePage(pageNo);
  }
  if (!products.resPerPage) {
    return;
  }

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="conatiner">
          <div className="row w-100">
            <div className="col-md-3"></div>
            <div className="col-md-9 mt-5">
              <div className="row">
                {products.products
                  ? products.products.map((item, index) => (
                      <Card key={index}>{item}</Card>
                    ))
                  : null}
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row m-auto d-flex justify-content-center">
              <div>
                <Pagination
                  className="justify-content-center"
                  activePage={activePage}
                  itemsCountPerPage={products.resPerPage}
                  totalItemsCount={products.countProduct}
                  pageRangeDisplayed={5}
                  onChange={handlePageChange}
                  nextPageText="Next"
                  prevPageText="Prev"
                  lastPageText="Last"
                  firstPageText="First"
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Home;
