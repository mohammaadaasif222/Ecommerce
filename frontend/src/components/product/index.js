import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import "./product.css";
import { Container, Row } from "react-bootstrap";

import { fetchProductDetails } from "../../actions/productActions";

const Product = () => {
  const param = useParams();
  const { loading, data, error } = useSelector((state) => state.Product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductDetails(param.productID));
  }, [dispatch, param.productID]);
  if (!data) {
    return;
  }
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="container-fluid">
          <div className="row "></div>
          <div className="row mt-5">
            <div className="col-md-5 mt-5">
              <img src={data.product.images[0].url} className="w-100"></img>
            </div>
            <div className="col-md-6 mt-5 child-pr-detail">
              <h1 className="product-title d-flex">{data.product.name}</h1>
              <p className="product-sku d-flex">
                <span className="font-medium">SKU : </span>
                <span className="pl-1">{data.product._id}</span>
              </p>
              <h2 className="product-pr">$ {data.product.price}</h2>
              <p className="mrp-msg text-muted">MRP (inclusive of all taxes)</p>
              <button className="btn btn-outline-dark">-</button>
              <input className="input-width" disabled />
              <button className="btn btn-outline-dark">+</button>
              <button className="btn btn-danger mr-3 ml-3">Add to Cart</button>
              <button className="btn btn-danger">Buy Now</button>
              <h3 className="desc pt-3">KNOW YOUR PRODUCT</h3>
              <p className="desc-data">{data.product.description}</p>
              <ul className="product-data">
                <li>
                  <span className="text-muted lable-text">Ratings</span>
                  <br />
                  <span className="data">{data.product.ratings}</span>
                  <hr />
                </li>
                <li>
                  <span className="text-muted lable-text">Reviews</span>
                  <br />
                  <span className="data">{data.product.numOfReviews}</span>
                  <hr />
                </li>
              </ul>
            </div>
          </div>
          <hr />
        </div>
      )}
    </Fragment>
  );
};
export default Product;
