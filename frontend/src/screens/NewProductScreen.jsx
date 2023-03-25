import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";
import { newProduct } from "../actions/productActions";
import FormContainer from "../components/shared/FromContainer";

const NewProductScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessiores",
    "Headphones",
    "Books",
    "Cloth/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.newProduct);
  useEffect(() => {
    if (success) {
      history.push("/admin");
    }
  }, [history, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", stock);
    formData.set("seller", seller);
    images.forEach((image) => {
      formData.append("images", image);
    });

    console.log(formData);
    dispatch(newProduct(formData));
  };

  const changeHandler = (e) => {

    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="container container-fluid">
      <div className="wrapper my-5">
        <form
          className="shadow-lg"
          onSubmit={submitHandler}
          encType="multipart/form-data"
        >
          <h1 className="mb-4">New Product</h1>

          <div className="form-group">
            <label htmlFor="name_field">Name</label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="price_field">Price</label>
            <input
              type="text"
              id="price_field"
              className="form-control"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description_field">Description</label>
            <textarea
              className="form-control"
              id="description_field"
              rows="8"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="category_field">Category</label>
            <select className="form-control" id="category_field" value={category} onChange={(e)=>setCategory(e.target.value)}>
              {categories.map((item, index)=>{
                return <option key={index} value={item}>{item}</option>
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="stock_field">Stock</label>
            <input
              type="number"
              id="stock_field"
              className="form-control"
              value={stock}
              onChange={(e)=>setStock(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="seller_field">Seller Name</label>
            <input
              type="text"
              id="seller_field"
              className="form-control"
              value={seller}
              onChange={(e)=>setSeller(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Images</label>

            <div className="custom-file">
              <input
                type="file"
                name="product_images"
                className="custom-file-input"
                id="customFile"
                accept="images/*"
                onChange={(e)=>changeHandler(e)}
                multiple
              />
              <label className="custom-file-label" htmlFor="customFile">
                Choose Images
              </label>
              {imagesPreview.map((image, index)=>{
                return <img src={image} key={index} alt='img_preview' className="mt-3 mr-2 " 
                width='55' height="55"/>
              })}
            </div>
          </div>

          <button
            id="login_button"
            type="submit"
            className="btn btn-block py-3"
            disabled={loading ? true : false}
          >
            CREATE
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProductScreen;
