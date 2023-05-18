import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { listProductsDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import axios from "axios";

const AdminCreateProduct = () => {
  var env = process.env.NODE_ENV;
  var apiUrl;
  env === "development" ? (apiUrl = "http://localhost:8000") : (apiUrl = "");

  const ref = useRef();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [model, setModel] = useState("");
  const [weight, setWeight] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [material, setMaterial] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [tag, setTag] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [description, setDescription] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);

  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // console.log(successUpdate)
  // console.log(productUpdate)
  // console.log(productDetails)
  useEffect(() => {
    // console.log(dispatch)
    // console.log(navigate)
    // console.log(id)
    console.log(product)
    // console.log(successUpdate)
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      window.location.reload();
    } else {
      if (product === undefined || !product.name || product._id !== id) {
        dispatch(listProductsDetails(id));
      } else {
        setName(product.name);
        setSku(product.sku);
        setModel(product.model);
        setWeight(product.weight);
        setDimensions(product.dimensions);
        setMaterial(product.material);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setTag(product.tag);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, navigate, id, product, successUpdate]);
  // }, [dispatch, navigate, id, product, successUpdate]);

  // console.log(successUpdate);
  const submitHandler = (e) => {
    e.preventDefault();
    // update product action
    dispatch(
      updateProduct({
        _id: id,
        name,
        sku,
        model,
        weight,
        material,
        dimensions,
        price,
        image,
        brand,
        category,
        tag,
        description,
        countInStock,
      })
    );
    // setFormSubmit(true);
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `${apiUrl}/api/upload`,
        formData,
        config
      );
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const removeCategory = (cat) => {
    const newCategory = category.filter((single) => {
      return single !== cat;
    });
    // console.log(newCategory);
    setCategory(newCategory);
  };

  const updateCategory = () => {
    // .replace(/,\s*$/, "") removes trailing commas from the string
    setCategory([...category, categoryInput.replace(/,\s*$/, "")]);
    setCategoryInput("");
  };
  
  const removeTag = (cat) => {
    const newTag = tag.filter((single) => {
      return single !== cat;
    });
    // console.log(newTag);
    setTag(newTag);
  };

  const updateTag = () => {
    // .replace(/,\s*$/, "") removes trailing commas from the string
    setTag([...tag, tagInput.replace(/,\s*$/, "")]);
    setTagInput("");
  };


  function handleKeyUp(event) {
    event.preventDefault();
    console.log(event.target.id==="category")
    // Enter
    if ( event.keyCode ===188) {
      if(event.target.id==="category"){
        console.log('cat')
        updateCategory()
      }
      if(event.target.id==="tag"){
        console.log('tag')
        updateTag()
      }
    }

    if(event.keyCode === 13){
      submitHandler()
    }
  }

  return (
    <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800 md:overflow-x-hidden">
      <Sidebar openSidebar={openSidebar} />
      <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in pl-64">
        <header className="header bg-white shadow py-4 px-4">
          <div className="header-content flex items-center flex-row">
            <div>
              <a className="flex flex-row items-center">
                <img
                  src={`https://avatars.dicebear.com/api/initials/${userInfo.name}.svg`}
                  alt=""
                  className="h-10 w-10 bg-gray-200 border rounded-full"
                />
                <span className="flex flex-col ml-2">
                  <span className=" w-60 font-semibold tracking-wide leading-none">
                    {userInfo.name}
                  </span>
                  <span className=" w-30 text-gray-500 text-xs leading-none mt-1">
                    {userInfo.email}
                  </span>
                </span>
              </a>
            </div>
            <div className="flex ml-auto">
              {!openSidebar ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-black w-8 h-8 md:hidden"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={() => setOpenSidebar(!openSidebar)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-black w-8 h-8 md:hidden"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={() => setOpenSidebar(!openSidebar)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </div>
          </div>
        </header>
        <div className="main-content flex flex-col flex-grow p-4">
          <Link
            to={`/admin/productlist`}
            className="text-xl underline text-gray-700 mb-6"
          >
            {" "}
            Go Back
          </Link>
          <h1 className="font-bold text-2xl text-gray-700 mb-5">
            Edit Product Details
          </h1>
          {loadingUpdate && <p>Loading...</p>}
          {errorUpdate && <p>{errorUpdate}</p>}
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <form ref={ref} autoComplete="off" onKeyUp={handleKeyUp} >
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Enter Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Product SKU
                </label>
                <input
                  type="text"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Enter Product Name"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Product Price
                </label>
                <input
                  type="text"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Enter Product Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Product Brand
                </label>
                <input
                  type="text"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Enter Product Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Product Model
                </label>
                <input
                  type="text"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Enter Product Name"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Product Weight
                </label>
                <input
                  type="text"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Enter Product Name"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Product Dimensions
                </label>
                <input
                  type="text"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Enter Product Name"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Product Material
                </label>
                <input
                  type="text"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Enter Product Name"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Product Category
                </label>
                {category.map((single, i) => {
                  return (
                    <span className="tag" key={i}>
                      {single}
                      <p onClick={() => removeCategory(single)}>x</p>
                    </span>
                  );
                })}
                <input
                  type="text"
                  id="category"
                  className=" mt-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Enter Product Category"
                  value={categoryInput}
                  onChange={(e) => {
                    setCategoryInput(e.target.value);
                  }}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Product Tags
                </label>
                {tag.map((single, i) => {
                  return (
                    <span className="tag" key={i}>
                      {single}
                      <p onClick={() => removeTag(single)}>x</p>
                    </span>
                  );
                })}
                <input
                  type="text"
                  id="tag"
                  className=" mt-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Enter Product Category"
                  value={tagInput}
                  onChange={(e) => {
                    setTagInput(e.target.value);
                  }}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Product Stock
                </label>
                <input
                  type="text"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Enter Product Stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Product Description
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Enter breif product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Product Image URL
                </label>
                <input
                  type="text"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Enter Product Stock"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 "
                  htmlFor="product_image"
                >
                  Upload Product Image
                </label>
                <input
                  className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:border-transparent "
                  aria-describedby="product_image_help"
                  id="product_image"
                  type="file"
                  onChange={uploadFileHandler}
                />
                <div
                  className="mt-1 text-sm text-gray-500 "
                  id="product_image_help"
                >
                  {uploading && <p>Uploading Image.....</p>}
                </div>
                <div
                  className="mt-1 text-sm text-gray-500 "
                  id="product_image_help"
                >
                  Upload one clear product image
                </div>
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                onClick={submitHandler}
              >
                Update Product
              </button>
            </form>
          )}
        </div>
        <footer className="footer px-4 py-6">
          <div className="footer-content">
            <p className="text-sm text-gray-600 text-center">
              © Rohstore 2020. All rights reserved.{" "}
              <a href="https://rohcodes.com">by Rohit</a>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default AdminCreateProduct;
