import React, { useEffect } from "react";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import MainPageCategory from "../components/MainPageCategory";
import Support from "../components/Support";
import Testimonials from "../components/Testimonials";

const Homepage = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    // initially it will look into 3000 port - 404 error
    // if you add localhost:5000 in axios get it will throw a CORS error
    // to fetch the data  we need to set proxy in package.json
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Header />
      <MainPageCategory />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-6">
            <div className="max-w-xl mb-0 md:mx-auto sm:text-center lg:max-w-2xl md:mb-0">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                <span className="relative inline-block">
                  <span className="relative text-black">Shop Products</span>
                </span>{" "}
              </h2>
            </div>
          </div>
          <div className="bg-white">
            <div className="mb-20 max-w-2xl mx-auto pb-16 px-4 sm:py-0 sm:px-6 lg:max-w-7xl lg:px-8 ">
              <div className="mt-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => {
                  return <Product product={product} key={product._id} />;
                })}
              </div>
            </div>
          </div>
        </>
      )}
      {/* <Support /> */}
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Homepage;
