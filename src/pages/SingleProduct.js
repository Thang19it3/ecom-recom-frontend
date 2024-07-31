import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import ReactStars from 'react-rating-stars-component'
import ReactImageZoom from 'react-image-zoom';
import watch from "../images/laptop.jpg"
import Color from './../components/Color';
import {TbGitCompare} from "react-icons/tb"
import {AiOutlineHeart} from "react-icons/ai"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addRating, exProducts, getAProducts, getAllPro, recomAProducts } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import { addProdCart, getUserCart } from '../features/user/userSlice';
import axios from "axios";
import ProductCart from '../components/ProductCart';

const SingleProduct = () => {
    const [color, setColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [alreadyAdded, setAlreadyAdded] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const getProductId = location.pathname.split("/")[2];

    const dispatch = useDispatch();
    const productState = useSelector((state) => state?.product?.singproduct);
    const productState3 = useSelector((state) => state?.product?.singproduct?.title);
    const productsState = useSelector((state) => state?.product?.allproduct);
    console.log(productsState)
    const cartState = useSelector((state) => state?.auth?.cartProducts);
    const [products, setProducts] = useState([]);
    const [foundProducts, setFoundProducts] = useState([]); 

    console.log(products)

    useEffect(()=>{
        dispatch(getAProducts(getProductId));
        dispatch(getUserCart());
        dispatch(getAllPro());
        dispatch(recomAProducts(productState3));
    },[]);
    useEffect(() => {
        // Gọi API bằng Axios với productState3 như một tham số trong params
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/product', {
                    params: {
                        book_name: productState3 // Truyền giá trị productState3 vào tham số book_name
                    }
                });
                if (response.data) {
                    // Xử lý dữ liệu trả về từ server ở đây nếu cần
                    setProducts(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        // Gọi hàm fetchData khi productState3 thay đổi
        fetchData();
    }, [productState3]);

    

    useEffect(() => {
        const foundProducts = [];
        for (const key in products) {
            const productTitle = products[key][0];
            if (Array.isArray(productsState)) {
                const foundProduct = productsState.find(item => item.title === productTitle);
                if (foundProduct) {
                    foundProducts.push(foundProduct);
                }
            } else {
                console.error('productsState is not an array');
                // Handle the case where productsState is not an array (it might be another type)
                // For example, if productsState is an object or null, handle it accordingly
            }
        }
        setFoundProducts(foundProducts); // Contains the found products from productsState
        // Perform actions or set state based on the found products as needed
    }, [productsState, products]);
    
    
    
    useEffect(()=> {
        for (let index = 0; index < cartState?.length; index++){
            if(getProductId === cartState[index]?.productId?._id){
                setAlreadyAdded(true);
            }
        }
    })
    const uploadCart = () => {
        if (color === null ){
            toast.error("Please Choose Color");
            return false;
        } else {
            dispatch(addProdCart({productId: productState?._id,quantity, color, price: productState?.price}))
            navigate('/cart')
        }
    }
    const props = { 
        width: 400, 
        height: 600, 
        zoomWidth: 600, 
        img:  productState?.images[0]?.url ? productState?.images[0]?.url : "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png"
    }
    const [orderedProduct, setorderedProduct] = useState(true);
    const copyToClipboard = (text) => {
        var textField = document.createElement("textarea");
        textField.innerText = text;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand("copy");
        textField.remove();
    };

    const [star, setStar] = useState(null);
    const [comment, setCommet] = useState(null);
    const addRatingToProduct = () => {
        if (star === null){
            toast.error("Please add star rating")
            return false
        } else if (comment === null)
        {
            toast.error("Please add star rating")
            return false
        } else {
            dispatch(addRating({
                star: star,
                comment: comment,
                prodId: getProductId
            }))
            dispatch(exProducts());

            setTimeout(()=>{
                dispatch(getAProducts(getProductId))
            },100)
        }
        return false
    }

      const [popularProduct, setPopularProduct] = useState([])
      useEffect(() => {
        let data = []
          for (let index = 0; index < productsState?.length; index++) {
              const element = productsState[index];
              if (element.tags === 'popular') {
                data.push(element)
              }
              setPopularProduct(data)
          }
      }, [productsState]);
      console.log(popularProduct);
      const formatter = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
      });
      const [timeLeft, setTimeLeft] = useState(productState?.timeSale);

useEffect(() => {
    setTimeLeft(productState?.timeSale); // Update timeLeft when productState?.timeSale changes
}, [productState?.timeSale]);

useEffect(() => {
    if (timeLeft > 0) {
        const countdown = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime > 0) {
                    return prevTime - 10; // Assuming each decrement is 10 milliseconds
                } else {
                    clearInterval(countdown);
                    return 0;
                }
            });
        }, 10);

        return () => clearInterval(countdown);
    }
}, [timeLeft]); // Run the countdown effect when timeLeft changes

// Rest of your code remains the same...
const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
const seconds = Math.floor((timeLeft / 1000) % 60);
const milliseconds = Math.floor((timeLeft % 1000)).toString().padStart(3, "0");
const formatTime = (value) => value.toString().padStart(2, "0");

  return (
    <>
      <Meta title={"Product"} />
      <BreadCrumb title = {productState?.title} />
      <div className='main-product-wrapper py-5 home-wrapper-2'>
        <div className='container-fluid '>
            <div className='row'>   
                <div className='col-6'>
                    <div className='main-product-image'>
                        <div>
                            <ReactImageZoom {...props} />
                        </div>
                    </div>
                    <div className='other-product-images d-flex flex-wrap gap-15'>
                        {productState?.images.map((item, index) => {
                            return <div key={index}>
                                <img src={item?.url} style={{ width:'100%'}} />
                            </div>
                        })}
                    </div>
                </div>
                <div className='col-6'>
                    <div className='main-product-details'>
                        <div className='border-bottom'>
                            <h3 style={{ fontSize:'25px'}} className='title'>
                                {productState?.title}
                            </h3>
                            
                        </div>
                        <div className='border-bottom py-3'>
                            {productState?.isDiscount ? (
                                <>
                                    <h4 className='price' style={{ textDecoration: 'line-through', color: '#888888', fontSize:'15px' }}>
                                        {formatter.format(productState?.price)}
                                    </h4>
                                    <h4 className = 'price'
                                    style = {
                                        {
                                            color: '#ed4b4b'
                                        }
                                    } >
                                        {formatter.format((productState?.price) - (productState?.price * (productState?.isDiscount / 100)))}
                                    </h4>
                                </>
                            ) : (
                                <h4 className='price'>
                                    {formatter.format(productState?.price)}
                                </h4>
                            )}
                            <div className='d-flex align-items-center gap-10'>
                                {productState?.ratings && productState?.ratings.length > 0 ? (
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        value={productState?.ratings[0]?.star || 0}
                                        edit={false}
                                        activeColor='#ffd700'
                                    />
                                ) : (
                                    <p>No ratings yet</p>
                                )}
                            </div>
                            <a  className='review-btn' href='#review' >Write a Review</a>
                        </div>
                        { productState?.tags === "SALE" && (
                            <div className='d-flex flex-row' style={{ backgroundColor:'#fdd9d9', border:'2px solid #fdb1b1', borderRadius:'5px'}}>
                                <div className='col-7' style={{margin:'35px'}}>
                                    <svg class="svgFlash electron-svg-icon" fill="currentColor" viewBox="0 0 512 512" width="30" xmlns="http://www.w3.org/2000/svg"><g id="a"><g><path d="m452.51 194.38c3.59-3.25 21.83-19.17 24.92-21.99 5 5.57 9.58 10.59 10.24 11.13 2.28 2.05 6.34 2.46 9.4.71 1.83-1.06 4.24-2.64 7.18-5.21 2.93-2.58 4.81-4.76 6.11-6.45 2.15-2.81 2.32-6.93.62-9.5-.96-1.62-20.53-25.25-22.82-27.75-2.13-2.64-22.54-25.53-24-26.72-2.28-2.06-6.34-2.46-9.4-.71-1.83 1.06-4.24 2.64-7.18 5.21-2.93 2.58-4.81 4.76-6.11 6.44-2.15 2.81-2.32 6.93-.62 9.5.44.74 4.72 6.02 9.47 11.8-2.85 2.39-20.75 17.81-24.02 20.59l26.21 32.94z" fill="#454565"></path><path d="m356.57 126.14c.5-4.1 5.2-25.34 5.62-28.97 11.36-.21 21.68-.47 22.98-.67 4.69-.51 9.73-4.21 11.42-8.77 1-2.74 2.14-6.49 2.87-11.63.71-5.14.63-8.89.4-11.63-.41-4.55-4.41-8.25-8.95-8.77-2.74-.44-49.07-1.17-54.22-1.03-5.11-.14-51.64.59-54.5 1.03-4.69.51-9.73 4.22-11.42 8.77-1 2.74-2.14 6.49-2.87 11.63-.71 5.13-.63 8.89-.4 11.63.41 4.55 4.41 8.25 8.95 8.77 1.25.2 11.5.46 22.79.67-.59 3.63-5.47 24.87-6.12 28.97h63.44z" fill="#454565"></path><rect fill="#f04760" height="37.83" rx="18.91" width="37.83" x="15.97" y="225.7"></rect><path d="m327.25 121.9c-34.31 0-67.66 10.31-96.71 27.99l-67.56-.03h-.13l-.06-.02-.04.02h-116.87c-10.42 0-18.86 8.45-18.86 18.86v.19c0 10.42 8.45 18.86 18.86 18.86l92.75.05c9.78.7 17.49 8.85 17.49 18.81v.19c0 10.42-8.45 18.86-18.86 18.86h-51.97c-10.42 0-18.86 8.45-18.86 18.86v.19c0 10.42 8.45 18.86 18.86 18.86h20.4c10.42 0 18.86 8.45 18.86 18.86v.19c0 10.42-8.45 18.86-18.86 18.86h-86.71c-10.42 0-18.86 8.45-18.86 18.86v.19c0 10.42 8.45 18.86 18.86 18.86h101.67c10.42 0 18.86 8.44 18.86 18.86v.19c0 10.42-8.45 18.86-18.86 18.86h-49.4c-10.42 0-18.86 8.45-18.86 18.86v.19c0 10.42 8.45 18.86 18.86 18.86h103.7c25.91 26.16 62.55 42.06 105.15 42.06 92.63 0 178.27-75.09 191.29-167.72s-51.52-167.72-144.15-167.72z" fill="#e03757"></path><path d="m135.64 369.91c131.56-6.76 238.81-105.43 258.84-233.05-19.78-9.61-42.51-14.96-67.24-14.96-34.31 0-67.66 10.31-96.71 27.99l-67.56-.03h-.13l-.06-.02-.04.02h-116.86c-10.42 0-18.86 8.45-18.86 18.86v.19c0 10.42 8.45 18.86 18.86 18.86l92.75.05c9.78.7 17.49 8.85 17.49 18.81v.19c0 10.42-8.45 18.86-18.86 18.86h-51.97c-10.42 0-18.86 8.45-18.86 18.86v.19c0 10.42 8.45 18.86 18.86 18.86h20.4c10.42 0 18.86 8.45 18.86 18.86v.19c0 10.42-8.45 18.86-18.86 18.86h-86.71c-10.42 0-18.86 8.45-18.86 18.86v.19c0 10.42 8.45 18.86 18.86 18.86h101.67c10.42 0 18.86 8.44 18.86 18.86v.19c0 4.29-1.45 8.24-3.87 11.41z" fill="#f04760"></path><path d="m389.77 272.6-79.02 121.93c-1.82 2.8-4.93 4.49-8.27 4.49h-6.19c-6.38 0-11.08-5.97-9.57-12.17l19.47-80.36h-47.47c-5.69 0-9.88-5.32-8.54-10.85l26.34-108.72c.95-3.94 4.48-6.72 8.54-6.72h54.62c5.69 0 9.88 5.32 8.54 10.85l-16.07 66.33h49.35c7.81 0 12.51 8.65 8.27 15.21z"></path></g></g></svg>
                                </div>
                                <div className='col-5' style={{margin:'20px'}}>
                                    <h5 style={{ fontWeight:'bold'}}>Flash Sale end in</h5>
                                    <div className=' col-12 d-flex flex-row'>
                                        <div className='p-1' style={{ color:'#ed4b4b'}}>
                                        {
                                            formatTime(hours)
                                        }
                                        </div>
                                        <span className='p-1'>:</span>
                                        <div className='p-1' style={{ color: '#ed4b4b'}}>
                                        {
                                            formatTime(minutes)
                                        }
                                        </div>
                                        <span className='p-1'>:</span>
                                        <div className='p-1' style={{ color: '#ed4b4b'}}>
                                        {
                                            formatTime(seconds)
                                        }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className=' py-3'>
                            <div className='d-flex gap-10 align-items-center my-2'>
                                <h3 className='product-heading'>Brand:</h3>
                                <p className='product-data'> 
                                    <Link to={'/brand/'+ productState?.brand}>{productState?.brand}</Link>
                                </p>
                            </div>
                            <div className='d-flex gap-10 align-items-center my-2'>
                                <h3 className='product-heading'>Category:</h3>
                                <p className='product-data'> {productState?.category}</p>
                            </div>
                            <div className='d-flex gap-10 align-items-center my-2'>
                                <h3 className='product-heading'>Tags:</h3>
                                <p className='product-data'> {productState?.tags}</p>
                            </div>
                            {
                                alreadyAdded === false && <>
                                    <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                                        <h3 className='product-heading'>Color:</h3>
                                        <Color setColor={setColor} colorData={productState?.color} />
                                    </div>
                                </>
                            }
                            <div className='d-flex align-items-center gap-15 flex-row mt-2 mb-3'>
                                {
                                    alreadyAdded === false && <>
                                        <h3 className='product-heading'>Quantity:</h3>
                                        <div>
                                            <input 
                                                type='number' 
                                                name='' 
                                                min={1}
                                                max={productState?.quanlity}
                                                className='form-control'
                                                style={{width: "100px"}}
                                                onChange={(e) => {
                                                    const newQuantity = e.target.value;
                                                    if (newQuantity > productState?.quanlity) {
                                                        setQuantity(1); // Reset to 1 if the new quantity exceeds the maximum
                                                    } else {
                                                        setQuantity(newQuantity);
                                                    }
                                                }}
                                                value={quantity}
                                                />
                                        </div>
                                    </>
                                }   
                                
                                <div div className = {alreadyAdded ? "ms-0" : "ms-5" + 'd-flex align-items-center gap-30'} >
                                    <button style={{backgroundColor:'#1e96fc'}} className='button border-0' type='button' onClick={()=> {alreadyAdded? navigate('/cart'): uploadCart()}}>
                                    {alreadyAdded?"Go to Cart":"Add to cart"}
                                    </button>
                                </div>
                            </div>
                            <div className='d-flex align-items-center gap-15'>
                                <div>
                                    <a>
                                    <TbGitCompare className='fs-5 me-2'/> Add to Compare
                                    </a>
                                </div>
                                 <div>
                                    <a>
                                    <AiOutlineHeart className='fs-5 me-2'/> Add to Wishlist
                                    </a>
                                </div>
                            </div>
                            <div className='d-flex gap-10 flex-column my-3'>
                                <h3 className='product-heading'>Shipping & Return:</h3>
                                <p className='product-data'>
                                    Free shipping and return avaliable all orders ! <br/>
                                    We ship all Us 
                                </p>
                            </div>
                            <div className='d-flex gap-10 align-items-center my-3'>
                                <h3 className='product-heading'>Product Link:</h3>
                                <a href='javascript:void(0);' onClick={() => {
                                    copyToClipboard(window.location.href);
                                }}>Copy Product Link</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div className='description-wrapper py-5 home-wrapper-2'>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-12'>
                    <h4>DESCRIPTION</h4>
                    <div className='bg-white p-3'>
                        <p dangerouslySetInnerHTML={{
                            __html: productState?.description
                        }}></p>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <section  id = 'review'
      className = 'reviews-wrapper pb-5 home-wrapper-2' >
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-12'>
                    <h3>Reviews</h3>
                    <div className='review-inner-wrapper'>
                        <div className='review-head d-flex justify-content-between align-items-end'>
                            <div>
                                <h4 className='mb-2'>Customer Reviews</h4>
                                <div className='d-flex align-items-center gap-10'>
                                    <ReactStars
                                    count={5}
                                    size={24}
                                    value={4}
                                    edit={false}
                                    activeColor='#ffd700'
                                    />
                                    <p className='mb-0'>Based on 2 Reviews</p>
                                </div>
                            </div>
                            {
                                orderedProduct && (
                                    <div>
                                        <a className='text-dark text-decoration-underline'>Write a review</a>
                                    </div>
                                )
                            }
                        </div>
                        <div className='review-form py-4'>
                            <h4>Write a Review</h4>
                                <div>
                                    <ReactStars
                                    count={5}
                                    size={24}
                                    value={0}
                                    edit={true}
                                    activeColor='#ffd700'
                                    onChange={(e)=>{
                                        setStar(e)
                                    }}
                                    />
                                </div>
                                <div>
                                    <textarea 
                                        cols="30"
                                        rows="4"
                                        className='form-control w-100'
                                        placeholder='Comment'
                                        onChange={(e)=>{
                                        setCommet(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className='d-flex justify-content-end'>
                                    <button onClick={addRatingToProduct} type='button' className='button border-0'>Submit</button>
                                </div>
                        </div>
                        <div className='reviews mt-4'>
                            {
                                productState && productState?.ratings?.map((item, i) => {
                                    return(
                                        <div key={i} className='review'>
                                            <div className='d-flex gap-10 align-items-center'>
                                                    <h6 className='mb-0'>Navdeep</h6>
                                                    <ReactStars
                                                        count={5}
                                                        size={24}
                                                        value={item?.star}
                                                        edit={false}
                                                        activeColor='#ffd700'
                                                        />
                                                </div>
                                                    <p className='mt-3'>
                                                        {item?.comment}
                                                    </p>
                                                </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
      <section className='d-flex' style={{ width:'1550px',paddingLeft:'120px', marginTop:'50px',marginBottom:'50px'}}>
        <ProductCart data = {foundProducts ? foundProducts : []}  grid={4}/>
      </section>
    </>
  )
}

export default SingleProduct
