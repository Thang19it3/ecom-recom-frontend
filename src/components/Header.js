import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {BsSearch} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import cart from '../images/cart-large-minimalistic-svgrepo-com.svg'
import compare from '../images/compare.svg'
import whistlist from '../images/heart-svgrepo-com.svg'
import user from '../images/user.svg'
import menu from '../images/menu.svg'
import user3 from '../images/icons8-user-50 (1).png'
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getAProducts } from '../features/products/productSlice';
import {BsLinkedin, BsGithub, BsYoutube, BsInstagram} from 'react-icons/bs'
import logo from "../images/dd.png"
import { getCategorys } from '../features/category/categorySlice';
import { getUserCart } from '../features/user/userSlice';


const Header = () => {
    const dispatch= useDispatch();
    const cartState = useSelector((state)=> state?.auth?.cartProducts);
    const productState = useSelector(state => state?.product?.product);
    const categoryState = useSelector(state => state?.catogory?.categorys)
    const authState = useSelector(state=>state.auth);
    const [total, setToatal] = useState(null);
    const [paginate, setPaginate] = useState(true);
    const [category, setCategory] = useState(null)
    const [productOpt, setProductOpt] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(getCategorys());
        dispatch(getUserCart())
    },[])

    useEffect(()=>{
        let sum = 0;
        for (let index = 0; index < cartState?.length; index++) {
            sum = sum + (Number(cartState[index]?.quantity) * Number(cartState[index]?.price)); 
            setToatal(sum);
        }
    },[cartState]);

    useEffect(() => {
        let data = [];
        for (let index = 0; index < productState?.length; index++) {
            const element = productState[index];
            data.push({id:index,prod:element?._id, name:element?.title})
        }
        setProductOpt(data)
    }, [productState]);

    const handleLogout = () => {
        localStorage.clear()
        window.location.reload()
    }
  return (
    <>
      <header className='header-top-strip py-2'>
        <div className='container-xxl'>
            <div className='row'>
                <div className='col-12'>
                    <p className='text-white mb-0 d-flex justify-content-center'>30% discount on all products special for November!</p>
                </div>
            </div>
        </div>
      </header>
      <header className='header-top-strip1 py-2'>
        <div className = 'container-fluid' >
            <div className='row'>
                <div className = 'col-4 text-black d-flex justify-content-start align-items-center' >
                        <h6 className='p-1 mb-0 text-center'>LANGUAGES</h6>
                        <h6 className='p-1 mb-0'>CONTRY</h6>
                        <h6 className='p-1 mb-0'>QUICK HELP</h6>
                </div>
                <div className='col-4'>
                    <p className='text-black mb-0 d-flex justify-content-center text-white' style={{ backgroundColor: "#072AC8",}}>FREE SHIPPING FOR ALL ORDERS OF</p>
                </div>
                <div  className = 'col-4 text-black mb-0 d-flex justify-content-center' >
                    <BsInstagram className='m-1 mb-0' />
                    <BsYoutube className='m-1 mb-0'/>
                    <BsGithub className='m-1 mb-0' />
                    <BsLinkedin className='m-1 mb-0' />
                </div>
            </div>
        </div>
      </header>
      <header className='header-upper py-3'>
        <div className='container-fluid'>
            <div className='row'>
                <div  className = 'col-2 d-flex justify-content-start' >     
                        <Link to={'/'}>
                            <img src={logo} alt='ddd' style={{position:'absolute', width:'150px', top:'50px', left:'120px'}}/>
                        </Link>
                </div>
                <div  className = 'col-5 d-flex justify-content-center' >
                    <div className='input-group'>
                        <Typeahead
                            id="pagination-example"
                            onPaginate={() => console.log('Results paginated')}
                            onChange={(selected) => {
                                navigate(`/product/${selected[0]?.prod}`)
                                dispatch(getAProducts(selected[0]?.prod))
                            }}
                            options={productOpt}
                            paginate={paginate}
                            labelKey={"name"}
                            minLength={2}
                            placeholder="Search for Product here..."
                        />
                        <span className='input-group-text p-3' id='basic-addon2'>
                            <BsSearch className='fs-6 text-white' />
                        </span>
                    </div>
                </div>
                <div className = 'col-4 d-flex justify-content-end p-2' >
                        <div className='mx-3' >
                            <Link className = 'd-flex align-items-center gap-10 text-white' >
                                <img  src={compare} alt='aa' style={{ color: 'black'}} />
                            </Link>
                        </div>
                        <div className='mx-3'>
                            <Link to={authState?.user === null ? "/login" : "/my-profile"} className = 'd-flex align-items-center gap-10 text-white' >
                                <img  src={user} alt='aa' />
                                {
                                    //authState.user ==="" ? <p className='mb-0'>Login <br/> My Account</p> : <p className='mb-0'>Welcome <br/> {authState?.user?.firstname}</p>
                                }
                            </Link>
                        </div>
                        <div className='mx-3'>
                            <Link  to = "/wishlist"
                            className = 'd-flex align-items-center gap-10 text-white' >
                                <img  src={whistlist} alt='aa' style={{ width:'30px'}} />
                            </Link>
                        </div>
                        <div>
                            <div className='menu-bottom d-flex align-items-center gap-30'>
                                <div>
                                    <div className='dropdown'>
                                        <button
                                        className='btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center' 
                                        type='button'
                                        id='dropdownMenuButton1'
                                        data-bs-toggle = "dropdown"
                                        aria-expanded = "false"
                                        style={{ marginTop:'-6px'}}
                                        >
                                            <img src={cart} alt='aa' style={{ width:'30px'}} />
                                        </button>
                                        <div className='dropdown-menu' aria-labelledby="dropdownMenuButton1" style={{ width: '300px', padding:'20px 20px'}}>
                                           {
                                            cartState?.map((item,index)=>{
                                                    return (
                                                        <>
                                                            <div className='d-flex'>
                                                                <div className='d-flex' style={{padding:'5px 5px'}}>
                                                                    <img src={item?.productId?.images[0]?.url} width={60} />
                                                                    <div>
                                                                        <p style={{fontSize:'8PX'}}>{item?.productId?.title}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                            })
                                           }
                                           <div className='d-flex'>
                                                <Link to="/cart" className='btn' style={{ backgroundColor: '#1e69fc', padding:'10px 20px', color:'white', marginRight:'5px'}}>View cart</Link>
                                                <Link to="/ghn" className='btn' style={{ backgroundColor: '#006fb8', color: 'white', padding:'10px 20px'}}>Check out</Link>
                                           </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginLeft: '-30px', marginRight:'-20px'}}>
                            <div className='menu-bottom d-flex align-items-center gap-30'>
                                <div>
                                    <div className='dropdown'>
                                        <button
                                        className='btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center' 
                                        type='button'
                                        id='dropdownMenuButton1'
                                        data-bs-toggle = "dropdown"
                                        aria-expanded = "false"
                                        style={{ marginTop:'-6px'}}
                                        >
                                            <img src={user3} alt='aa' style={{ width:'30px'}} />
                                        </button>
                                        <div className='dropdown-menu' aria-labelledby="dropdownMenuButton1" style={{ width: '350px', padding:'20px 20px'}}>
                                        {
                                            authState?.user === null ? (
                                                <div className='d-flex'>
                                                <Link to="/login" className='btn' style={{ backgroundColor: '#1e69fc', padding:'10px 20px', color:'white', marginRight:'5px'}}>Login</Link>
                                                <Link to="/ghn" className='btn' style={{ backgroundColor: '#006fb8', color: 'white', padding:'10px 20px'}}>Register</Link>
                                           </div>
                                            ) : (
                                                <div className='d-flex'>
                                                    <Link to="/my-profile" className='btn' style={{ backgroundColor: '#1e69fc', padding:'10px 20px', color:'white', marginRight:'5px'}}>Profile</Link>
                                                    <Link to="/my-orders" className='btn' style={{ backgroundColor: '#1e69fc', padding:'10px 20px', color:'white', marginRight:'5px'}}>Order</Link>
                                                    <Link to="/login" onClick={handleLogout} className='btn' style={{ backgroundColor: '#1e69fc', padding:'10px 20px', color:'white', marginRight:'5px'}}>Log out</Link>
                                                </div>
                                            )
                                        }   
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <svg
                                className="svgNotification electron-svg-icon"
                                height="30"
                                viewBox="0 0 512 512"
                                width="30"
                                >
                                <g clipRule="evenodd" fillRule="evenodd">
                                    <path d="m328.084 422.916c-5.04 37.808-37.451 66.165-75.592 66.165s-70.552-28.355-75.601-66.161l-2.432-18.208h156.052z" fill="#e4404d" />
                                    <path d="m241.242 488.243c-33.1-4.935-59.807-31.3-64.351-65.324l-2.432-18.208h133.552l-2.427 18.204c-4.536 34.027-31.243 60.393-64.342 65.328z" fill="#fd4755" />
                                    <path d="m85.729 189.68c0-91.962 74.801-166.76 166.763-166.76 91.963 0 166.753 74.798 166.753 166.76v180.95h-333.516z" fill="#e6bd5c" />
                                    <path d="m85.729 189.68c0-49.496 21.676-94.011 56.026-124.577 24.848-14.719 53.819-23.183 84.736-23.183 91.963 0 166.753 74.798 166.753 166.76v161.95h-307.515z" fill="#ffd266" />
                                    <path d="m420.819 354.471c18.314 0 33.199 14.885 33.199 33.2 0 18.314-14.886 33.199-33.199 33.199h-336.655c-18.313 0-33.199-14.886-33.199-33.199 0-18.314 14.884-33.2 33.199-33.2z" fill="#e6bd5c" />
                                    <path d="m430.211 419.516c-2.979.88-6.13 1.354-9.392 1.354h-336.655c-18.313 0-33.199-14.886-33.199-33.199 0-5.941 1.568-11.52 4.309-16.348 2.978-.879 6.129-1.352 9.39-1.352h336.655c18.314 0 33.199 14.885 33.199 33.2.001 5.939-1.566 11.518-4.307 16.345z" fill="#ffd266" />
                                    <path d="m230.068 138.4c0-63.686 51.793-115.48 115.479-115.48 63.687 0 115.488 51.791 115.488 115.48 0 63.693-51.794 115.491-115.488 115.491-63.693-.001-115.479-51.801-115.479-115.491z" fill="#d7d7d7" />
                                    <path d="m230.068 138.4c0-63.184 50.983-114.654 113.979-115.461 62.997.807 113.988 52.273 113.988 115.461 0 63.192-50.984 114.665-113.988 115.471-63.003-.807-113.979-52.283-113.979-115.471z" fill="#efefef" />
                                    <path d="m245.187 138.4c0-55.341 45.018-100.36 100.359-100.36 55.342 0 100.369 45.017 100.369 100.36 0 55.348-45.02 100.371-100.369 100.371-55.347 0-100.359-45.026-100.359-100.371z" fill="#e4404d" />
                                    <path d="m348.797 38.098c53.843 1.722 97.118 46.047 97.118 100.302 0 54.26-43.269 98.591-97.118 100.313-53.848-1.722-97.11-46.056-97.11-100.313 0-54.253 43.268-98.58 97.11-100.302z" fill="#fd4755" />
                                    <path d="m345.546 157.521c4.419 0 8-3.581 8-8.002v-62.35c0-4.419-3.581-8-8-8-4.41 0-8 3.581-8 8v62.35c.001 4.421 3.59 8.002 8 8.002zm8 27.41c0-4.421-3.581-8.002-8-8.002-4.41 0-8 3.58-8 8.002v4.709c0 4.41 3.59 8 8 8 4.419 0 8-3.59 8-8z" fill="#d7d7d7" />
                                    <path d="m345.546 157.521c.617 0 1.218-.07 1.795-.202 1.447-1.448 2.343-3.448 2.343-5.658v-62.35c0-4.419-3.581-8-8-8-.616 0-1.216.07-1.793.202-1.448 1.448-2.345 3.447-2.345 5.655v62.35c.001 4.422 3.59 8.003 8 8.003zm4.138 29.552c0-4.421-3.581-8.002-8-8.002-.616 0-1.216.07-1.792.202h-.001c-1.448 1.448-2.345 3.447-2.345 5.657v4.709c0 4.41 3.59 8 8 8 .616 0 1.216-.07 1.791-.202 1.449-1.449 2.346-3.449 2.346-5.656v-4.708z" fill="#efefef" />
                                </g>
                            </svg>
                        </div>
                         <div>
                            <svg class="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"/>
                            </svg>
                        </div>
                    
                </div>
            </div>
        </div>
      </header>
      <header className='header-bottom'>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-8'>
                    <div className='menu-bottom d-flex align-items-center gap-30'>
                        <div>
                            <div className='dropdown' style={{ backgroundColor: "#2150cc"}}>
                                <button
                                className='btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center' 
                                type='button'
                                id='dropdownMenuButton1'
                                data-bs-toggle = "dropdown"
                                aria-expanded = "false"
                                >
                                    <img src={menu} alt='aa' />
                                    <span className='me-5 d-inline-block'>Shop Categories</span>
                                </button>
                                <ul className='dropdown-menu' aria-labelledby="dropdownMenuButton1">
                                    {
                                        categoryState?.map((item, index) => {
                                            return(
                                             <li>
                                                <Link className='dropdown-item text-white' to={'/category/'+ item?.title}>
                                                    {item?.title}
                                                </Link>
                                            </li>
                                            )
                                        })
                                        }
                                </ul>
                            </div>
                        </div>
                        <div className='menu-links'>
                            <div className='d-flex align-items-center gap-15'>
                                <NavLink className="text-black" to="/">Home</NavLink>
                                <NavLink className="text-black" to="/product">OUR STORE</NavLink>
                                <NavLink className="text-black" to="/blogs">BLOGS</NavLink>
                                <NavLink className="text-black" to="/contact">CONTACT</NavLink>
                                <button onClick={handleLogout} className='border border-0 bg-transparent text-white text-uppercase' type='button'>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div  className = 'col-4 d-flex justify-content-center align-items-center' >
                    <h6 className='p-2 mb-0 text-center text-success font-weight-bold'>FLASH DEALS</h6>
                    <h6 className='p-2 mb-0 text-center text-primary font-weight-bold'>NEW ARRIVALS</h6>
                    <h6 className='p-2 mb-0 text-center text-warning font-weight-bold'>SUPER SALE!</h6>
                    <h6 className='p-2 mb-0 text-center text-danger font-weight-bold'>OUTLET</h6>
                </div>
            </div>
        </div>
      </header>
    </>
  )
}

export default Header;
