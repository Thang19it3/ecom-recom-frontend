import React, { useEffect, useState } from 'react';
import main from "../images/main-banner.jpg";
import main1 from "../images/catbanner-01.jpg";
import main2 from "../images/catbanner-02.jpg";
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import "../css/home.css";
import BlogCart from '../components/BlogCart';
import ProductCart from '../components/ProductCart';
import Speacial from '../components/Speacial';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../features/blog/blogSlice';
import moment from "moment";
import { getAllProducts, recomProducts } from '../features/products/productSlice';
import Container from '../components/Container';
import Carousel from '../components/Carousel';
import img from '../images/1-50.png'
import img1 from '../images/3-44.png'
import img2 from '../images/7-3.png'
import img3 from '../images/slider-1600-600-3.png'
import img4 from '../images/slider-1600-600-5.png'
import img5 from '../images/8-3.png'
import img6 from '../images/2-49.png'
import img7 from '../images/5-1.png'
import img8 from '../images/5-5.png'
import img9 from '../images/banner3.png'
import img91 from '../images/rong.png'
import img92 from '../images/rong2.png'
import img93 from '../images/4-22.png'
import img94 from '../images/6-1.png'
import img95 from '../images/7.png'
import img97 from '../images/10.png'
import ReactStars from 'react-rating-stars-component'
import { getBrands } from '../features/brand/brandSlice';
import axios from "axios";
import { getAlllUser } from '../features/user/userSlice';



const Home = () => {
  const slides = [
    img,
    img1,
    img2,
  ]
  const slides2 = [
    img3,
    img4,

  ]
  const blogState = useSelector((state)=> state?.blog?.blog);
  const productState = useSelector((state)=>state?.product.product);
  const brandState = useSelector(state => state?.brand?.brands);
  const customer = useDispatch(state => state?.auth?.getAllUser)
  //const recomState = useSelector(state => state?.product?.recomproduct)
  useEffect(()=>{
     dispatch(getBrands());
     dispatch(getAllProducts())
     dispatch(getAlllUser())
     //dispatch(recomProducts());
  },[])
  const first15Brands = brandState && Array.isArray(brandState) ? brandState?.slice(0, 8) : [];

  const [productIdFromAPI, setProductIdFromAPI] = useState([]);
  const [productIdFromAPI1, setProductIdFromAPI1] = useState([]);
  //console.log(productIdFromAPI)

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/');
      if (response?.status === 200) {
        const dataFromAPI = response?.data;
        console.log(dataFromAPI)
        const foundProducts = [];
        dataFromAPI.forEach(async (productFromAPI) => {
          const productIdFromAPI = productFromAPI.productId;
          //console.log(productIdFromAPI);
          if (Array.isArray(productState)){
            const foundProduct = productState.find(product => product?._id === productIdFromAPI);
          
            if (foundProduct) {
              foundProducts.push(foundProduct);
              // Thực hiện các thao tác tiếp theo với sản phẩm tìm thấy
            }
          }
        });
        setProductIdFromAPI(foundProducts);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchData1 = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/products');
    if (response?.status === 200) {
      const dataFromAPI = response?.data;
      console.log(dataFromAPI);

      // Assuming productState is an array of products
      const foundProducts = [];
      dataFromAPI.recommendations.forEach((recommendation) => {
        const foundProduct = productState.find((product) => product.title === recommendation.movie);
        if (foundProduct) {
          foundProducts.push(foundProduct);
        }
      });

      setProductIdFromAPI1(foundProducts);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

  useEffect(() => {
    fetchData();
    fetchData1();
  }, [productState]);
  
  
  
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    if (productState) {
      const copyOfProducts = [...productState]; // Create a    of the array
      const shuffledProducts = copyOfProducts.sort(() => 0.5 - Math.random());
      const selectedProducts = shuffledProducts.slice(0, 8);
      setRandomProducts(selectedProducts);
    }
  }, [productState]);

  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    if (productState) {
      const popularProducts = productState.filter(
        (product) => product.tags && product.tags.includes('SALE')
      ).slice(0, 6); // Retrieve up to 6 products with 'popular' tag
      setPopularProducts(popularProducts);
    }
  }, [productState]);


  let productWithIsSaleOne = null;
  if (Array.isArray(productState)) {
    productWithIsSaleOne = productState.find(product => product.isSale === 1);
  }
  const timeSaleValue = productWithIsSaleOne?.timeSale;


  let ratingElements = null;

 if (productState && Array.isArray(productState)) {
    const allRatings = productState
      .filter(productItem => productItem.ratings && Array.isArray(productItem.ratings))
      .flatMap(productItem => productItem.ratings)
      .filter(rating => rating.star === 5);
   if (allRatings.length >= 15) {
    // Take the first 15 ratings after filtering
    const selectedRatings = allRatings.slice(0, 15);

    ratingElements = selectedRatings.map((rating, index) => {
      const productItem = productState[index]
      const postedBy1 = rating.postedby;
      

      return(
        <div key={`rating-${index}`} className="rating-item" style={{ padding:'20px 20px', border: '1px solid #eaebed', margin: '20px 20px', width:'350px'}}>
          <div className='d-flex'>
            <h4>Jhon</h4>
            <div style={{ border: '1px solid #1e96fc', borderRadius:'10px', fontSize:'10px', color:'#1e96fc', height:'20px',marginLeft:'20px',marginTop:'7px'}}>
              <span style={{padding:'20px 10px'}}>REVIEWER</span>
            </div>
          </div>
          <div className='d-flex'>
            <ReactStars
              count={5}
              size={24}
              value={rating.star}
              edit={false}
              activeColor='#ffd700'
            />
            <div style={{ backgroundColor: '#49a760', padding:'5px 10px', borderRadius:'10px', marginLeft:'10px'}}>
              <span style={{fontSize:'15px', color:'white'}}>{rating?.star}/{rating?.star}</span>
            </div>
          </div>
          <p style={{ marginTop:'20px'}}>Comment: {rating.comment}</p>
          <div className='d-flex'>
            <img src={productItem?.images[0]?.url} alt='d' width={70} />
            <p className='hidden-text' style={{ fontWeight:'bold', marginTop:'20px', marginLeft:'10px'}}>{productItem?.title}</p>
          </div>
        </div>
      )
   });
  } else {
    console.log('Not enough ratings with a star value of 5 available');
  }
 } else {
   // Handle the case where productState is not an array or is undefined
   console.log('Product state is not an array or is undefined');
 }


  
 
  let initialTime = 300000; // Giá trị mặc định

  if (typeof productWithIsSaleOne !== 'undefined' && productWithIsSaleOne !== null) {
    initialTime = productWithIsSaleOne.timeSale || 300000; // Sử dụng giá trị từ productWithIsSaleOne nếu có
  }
  const [timeLeft, setTimeLeft] = useState(initialTime);

  const dispatch = useDispatch();
  useEffect(() => {
    
    const countdown = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 10; // Giả định mỗi lần giảm là 10 milliseconds
        } else {
          clearInterval(countdown);
          return 0;
        }
      });
    }, 10);

    return () => clearInterval(countdown);
  }, [timeLeft]);

  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);
  const milliseconds = Math.floor((timeLeft % 1000)).toString().padStart(3, "0");

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });

  const formatTime = (value) => value.toString().padStart(2, "0");
  useEffect(() => {
    getPros();
    getblogs();

  
  }, [])
  const getblogs = () => {
    dispatch(getAllBlogs());
  };

  const getPros = () => {
    dispatch(getAllProducts());
  }
  const [isDivVisible, setIsDivVisible] = useState(true);

  const handleDivClick = () => {
    setIsDivVisible(false);
  };
  return (
    <>
      {isDivVisible && (
        <div className='z-3 bck' onClick={handleDivClick}>
          <img className='z-4 position-absolute' src={img9} alt='Image' />
        </div>
      )}
      <Container  class1 = "home-wrapper-1 py-5" >
        <div className='row'>
            <div className='col-3'>
              <Carousel>
                {[
                  ...slides.map((s)=> <img className='img-fluid rounded-3' alt='2' src={s} />)
                ]}
              </Carousel>
            </div>
            <div className='col-6' >
              <div className='banner'>
                <div style={{ marginLeft:'80px', paddingTop:'200px'}}>
                  <span style={{ backgroundColor: '#ed4b4b', padding: '10px 20px', borderRadius:'20px', color:'white', fontWeight:'bold'}}>FROM 500.000 đ</span>
                  <h4 style={{ color:'white', fontWeight:'bold', fontSize:'40px',marginTop:'40px'}}>HARMAN CARDON SL2300</h4>
                  <p style={{ color:'white', marginTop:'20px'}}>Headphones are a type of audio equipment that are <br/> worn on or over the ears to listen to music, podcasts, <br/> audiobooks, and other forms of audio content privately.</p>
                  <button style={{ backgroundColor:'#b20808',padding:'10px 30px', borderRadius:'20px', fontWeight:'bold',color:'white',marginTop:'20px'}}>BUY NOW</button>
                </div>
              </div>
            </div>
            <div className='col-3 p-5' style={{ border: '2px solid #FFDC00', borderRadius: '10px'}}>
              <h5 style={{fontWeight:'bold',fontSize:'20px'}}>Product of The Day</h5>
              <p>Special price only valid today!</p>
              <p className='fw-bold'>Visit every day, win!</p>
              <div className='d-flex'>
                <div className='p-3' style={{ background: '#f25e10', borderRadius: '5px'}}>
                  {
                    formatTime(hours)
                  }
                </div>
                <span className='p-3'>:</span>
                <div className='p-3' style={{ background: '#f25e10', borderRadius: '5px'}}>
                  {
                    formatTime(minutes)
                  }
                </div>
                <span className='p-3'>:</span>
                <div className='p-3' style={{ background: '#f25e10', borderRadius: '5px'}}>
                  {
                    formatTime(seconds)
                  }
                </div>
              </div>
              <div className='my-4' style={{ width: '80%', border:'1px solid #eaebed'}}>
                <img src={productWithIsSaleOne?.images[0]?.url} alt='d' style={{ width:'100%'}} />
              </div>
              <div>
                <h6>{productWithIsSaleOne?.title}</h6>
                <p style={{fontWeight:'bold'}}>{formatter.format(productWithIsSaleOne?.price)}</p>
              </div>
            </div>
          </div>
      </Container> 

      <Container  class1 = "home-wrapper-1 py-5" >
        <div className='row'>
            <div className='col-12' style={{ border:'1px solid #eaebed', borderRadius: '5px'}}>
              <div className='row'>
                <div className='col-2 p-4'>
                  <div className='col-6 text-center py-1 fw-bold' style={{ backgroundColor: '#b20808', borderRadius: '20px', color:'white'}}>
                    TOP
                  </div>
                  <h5 className='py-3'>Bestseller Brands</h5>
                  <p>Making the ultimate sports watch for athletes of all kinds required a unique approach. That’s why specialized bands</p>
                  <div className='brand py-3'>
                    <img src={img91} alt='1' style={{ width:'350px', marginLeft:'-50px'}} />
                  {/*{
                    first15Brands?.map((item,index)=>{
                      return(
                        <div className='d-flex align-items-center my-2 brand-b'>
                          <div className='row'>
                            <div className='col-3' >
                              <img src={img7} alt='ddw' className='brand-m'/>
                            </div>
                            <div className = 'col-6'>
                              <p className='fw-normal brand-text'>{item?.title}</p>
                            </div>
                            <div className='col-3 d-flex justify-content-center'>
                              <span className='brand-img'>13</span>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                  */}
                  </div>
                </div>
                <div className='col-2 d-flex flex-column p-4'>
                  <img alt='4' src={img5} className='p-2' />
                  <img alt='dd' src={img6} className='p-2' />
                </div>
                <div className='col-8 py-4'>
                  <div className='row'>
                    <ProductCart data={productIdFromAPI1 ? productIdFromAPI1 : []} grid={4} />
                  </div>
                </div>
              </div>
            </div>
        </div>
      </Container>

      <Container>
        <div className='row'>
          <div className='col-12' style={{ border:'1px solid #eaebed', borderRadius: '5px'}}>
            <div className='row '>
              <div className='col-3 box' style={{ backgroundColor: '#FCEFE3'}}>
                <div className='banner-1'>
                <h4 className='text-center' style={{ color: '#91563a',paddingTop:'60px'}}>IPHONE 15 PROMAX</h4>
                <p className='text-center' style={{ color: '#91563a'}}>Free Shipping On Over 10.000.000 đ</p>
                </div>
              </div>
              <div className='col-3' style={{ backgroundColor: '#eeffea'}}>
                <div className='banner-2'>
                <h4 className='text-center' style={{ color: '#2E8014',paddingTop:'60px'}}>Samsung Olec SmartTV</h4>
                <p className='text-center' style={{ color: '#2E8014'}}>Up to 20% off Tet Holiday</p>
                </div>
              </div>
              <div className='col-3' style={{ backgroundColor: '#f2f4ff'}}>
                <div className='banner-3'>
                <h4 className='text-center' style={{ color: '#47479B',paddingTop:'60px'}}>Smart Headphone</h4>
                <p className='text-center' style={{ color: '#47479B'}}>Free Shipping On Over 10.000.000 đ</p>
                </div>
              </div>
              <div className='col-3' style={{ backgroundColor: '#FCEFE3'}}>
                <div className='banner-4'>
                <h4 className='text-center' style={{ color: '#91563a',paddingTop:'60px'}}>IPHONE 15 PROMAX</h4>
                <p className='text-center' style={{ color: '#91563a'}}>Free Shipping On Over 10.000.000 đ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container  class1 = "home-wrapper-1 py-5" >
        <div className='row'>
            <div className='col-12' style={{ border:'1px solid #eaebed', borderRadius: '5px'}}>
              <div className='row'>
                <div className='col-7'>
                  <div className='row' style={{ padding:'30px 30px'}}>
                    <ProductCart data={popularProducts ? popularProducts : []} grid={4} />
                  </div>
                </div>
                <div className='col-3 d-flex flex-column p-4'>
                  <img alt='4' src={img8} className='p-2' />
                </div>
                <div className='col-2 p-4'>
                  <div className='col-6 text-center py-1 fw-bold' style={{ backgroundColor: '#cee8ff', borderRadius: '20px'}}>
                    SALE
                  </div>
                  <h5 className='py-3'>Trend Products</h5>
                  <p>Making the ultimate sports watch for athletes of all kinds required a unique approach. That’s why specialized bands</p>
                  <div className='brand py-3'>
                    <img src={img92} alt='3' style={{ width:'300px'}} />
                  </div>
                </div>
              </div>
            </div>
        </div>
      </Container>

      <Container  class1 = "home-wrapper-1 py-5" >
        <div className='row'>
            <div>
              <h5 style={{ fontWeight:'bold'}}>Product Reviews</h5>
            </div>
            <Marquee>
              {ratingElements}
            </Marquee>
           
        </div>
      </Container>
            <section className='home-wrapper-2 py-5' style={{backgroundColor:'white'}}>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='services d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center gap-15' >
                  <img src={require('../images/service.png')}  alt='services'/>
                  <div>
                    <h6>Free Shipping</h6>
                    <p className='mb-0'>From all orders over $5</p>
                  </div>
                </div>

                <div className = 'd-flex align-items-center gap-15' >
                  <img src={require('../images/service-02.png')}  alt='services'/>
                  <div>
                    <h6>Daily Surprise Offres</h6>
                    <p className='mb-0'>Save upto 25% off</p>
                  </div>
                </div>

                <div className = 'd-flex align-items-center gap-15' >
                  <img src={require('../images/service-03.png')}  alt='services'/>
                  <div>
                    <h6>Support 24/7</h6>
                    <p className='mb-0'>Shop with an expert</p>
                  </div>
                </div>

                <div className = 'd-flex align-items-center gap-15' >
                  <img src={require('../images/service-04.png')}  alt='services'/>
                  <div>
                    <h6>Affordable Prices</h6>
                    <p className='mb-0'>Get Factory Default Price</p>
                  </div>
                </div>

                <div  className = 'd-flex align-items-center gap-15' >
                  <img src={require('../images/service-05.png')}  alt='services'/>
                  <div>
                    <h6>Secure Payments</h6>
                    <p className='mb-0'>100% Protected Payment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Container  class1 = "home-wrapper-1 py-5" >
        <div className='row'>
            <div className='col-6'>
              <h4 style={{ fontWeight:'bold'}}>NEW</h4>
              <Marquee direction = "right" className = 'd-flex' >
                {
                  randomProducts?.map((item, index) => {
                    return (
                      <Link to={`/product/${item?._id}`} style={{border:'1px solid #eaebed', margin:'10px 10px', width: '280px', height:'500px'}}>
                        <img className='rounded mx-auto d-block' src={item?.images[0]?.url} alt='a' style={{ width:'80%', height:'200px', margin:'5px 5px'}} />
                        <div style={{ margin:'10px 40px'}}>
                          <h5 className= 'ellipsis-text' style={{ fontSize:'15px', width:'80%', color:'black'}}>{item?.title}</h5>
                          <div>
                            <ReactStars
                              count={5}
                              size={24}
                              value={item?.ratings?.star}
                              edit={false}
                              activeColor='#ffd700'
                            />
                          </div>
                          <p style={{ color:'#ef2d34', marginTop:'10px'}}>{formatter.format(item?.price)}</p>
                        </div>
                      </Link>
                    )
                  })
                }
              </Marquee>
            </div>
            <div className='col-6'>
              <h4 style={{fontWeight:'bold'}}>BESTSELLER</h4>
              <Marquee direction = "left" className = 'd-flex' >
                {
                  randomProducts?.map((item, index) => {
                    return (
                      <Link to={`/product/${item?._id}`} style={{border:'1px solid #eaebed', margin:'10px 10px', width: '280px', height:'500px'}}>
                        <img className='rounded mx-auto d-block' src={item?.images[0]?.url} alt='a' style={{ width:'80%', height:'200px', margin:'5px 5px'}} />
                        <div style={{ margin:'10px 40px'}}>
                          <h5 className= 'ellipsis-text' style={{ fontSize:'15px', width:'80%', color:'black'}}>{item?.title}</h5>
                          <div>
                            <ReactStars
                              count={5}
                              size={24}
                              value={item?.ratings?.star}
                              edit={false}
                              activeColor='#ffd700'
                            />
                          </div>
                          <p style={{ color:'#ef2d34', marginTop:'10px'}}>{formatter.format(item?.price)}</p>
                        </div>
                      </Link>
                    )
                  })
                }
              </Marquee>
            </div>
        </div>
      </Container>      


      <section className='marque-wrapper home-wrapper py-5'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <div className='marquee-inner-wrapper card-wrapper'>
                <Marquee className='d-flex'>
                  <div className='mx-4 w-25'>
                    <img src={require('../images/brand-01.png')}  alt='brand'/>
                  </div>

                  <div className='mx-4 w-25'>
                    <img src={img93}  alt='brand'/>
                  </div>

                  <div className='mx-4 w-25'>
                    <img src={img94}  alt='brand'/>
                  </div>

                  <div className='mx-4 w-25'>
                    <img src={img95}  alt='brand'/>
                  </div>

                  <div className='mx-4 w-25'>
                    <img src={img94}  alt='brand'/>
                  </div>

                  <div className='mx-4 w-25'>
                    <img src={img95}  alt='brand'/>
                  </div>

                  <div className='mx-4 w-25'>
                    <img src={img95}  alt='brand'/>
                  </div>
                  
                  <div className='mx-4 w-25'>
                    <img src={img93}  alt='brand'/>
                  </div>
                  
                  <div className='mx-4 w-25'>
                    <img src={require('../images/brand-01.png')}  alt='brand'/>
                  </div>

                  <div className='mx-4 w-25'>
                    <img src={img97}  alt='brand'/>
                  </div>

                  <div className='mx-4 w-25'>
                    <img src={img93}  alt='brand'/>
                  </div>

                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='blog-wrapper py-5 home-wrapper-2' style={{ backgroundColor:'#fff'}}>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <h3 className='section-heading'>Our Latest Blogs</h3>
            </div>
            <div className='row'>
              {
                            blogState && blogState?.map && blogState?.map((item, index) => {
                                if (index < 3){
                                  return (
                                    <div className='col-3' key={index}>
                                        <BlogCart 
                                            id={item?._id} 
                                            title={item?.title} 
                                            description = {item?.description} 
                                            image = {item?.images[0]?.url}  
                                            date = {moment(item?.created_at).format('MMMM Do YYYY, h:mm:ss a')}
                                            category = {item?.category}
                                            />
                                    </div>
                                )
                                }
                            })
                               
                        }
                        <div>

                        </div>
            </div>
          </div>
        </div>
      </section>


    </>
  )
}

export default Home;
