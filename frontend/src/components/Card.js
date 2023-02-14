import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className="col-md-3 p-3 card">
      <img
        className="img"
        src={props.children.images.url}
        alt={props.children.name}
      ></img>
      <div className="details p-2">
        <Link to={`/product/${props.children._id}`} className="product-name">
          {props.children.name}
        </Link>
        <p className="product-price m-0">$ {props.children.price}</p>
      </div>
    </div>
  );
};
export default Card;
