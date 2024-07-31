import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link, useLocation } from 'react-router-dom';
import addcart from '../images/add-cart.svg';
import view from '../images/view.svg';
import procom from '../images/prodcompare.svg';
import wish from '../images/wish.svg';
import { useDispatch } from 'react-redux';
import { addToWishlist } from '../features/products/productSlice';
import DOMPurify from 'dompurify';
import img1 from "../images/holiday.png"

const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
        text = text.substring(0, maxLength);
        text = text.slice(0, Math.max(text.lastIndexOf(' '), text.lastIndexOf('<')));
        return text + '...';
    }
    return text;
};

const ProductCart = (props) => {
    const { grid, data }  =  props;
    let location = useLocation();
    const dispatch = useDispatch();

    const addToWish = (id) => {
        alert(id);
        dispatch(addToWishlist(id));
    }
     const formatter = new Intl.NumberFormat('vi-VN', {
         style: 'currency',
         currency: 'VND'
     });

  return (
    <>  
        {
            data?.map((item, index) =>{
                
                return (
                    <div 
                    key={index}
                    className = {
                        `${location.pathname === "/product" ? `gr-${grid} ` : "col-3"}`} style={{ border: '1px solid #eaebed', position:'relative', padding:'0px', margin:'0px'}} >
                            <div className='product-card position-relative'>
                                <div className='wishlist-icon position-absolute'>
                                    <button className='border-0 bg-transparent' onClick={(e)=>{
                                        addToWish(item?._id);
                                    }}>
                                        <img src={wish} alt='wish' />
                                    </button>
                                </div>
                                <div className='product-image'>
                                    <img className='img-fluid '  src={item?.images[0]?.url} alt='aihi' width={200} style={{margin: "auto"}} />
                                    <img className='img-fluid  mx-auto' src={item?.images[1]?.url} alt='aihi' width={200} />
                                </div>
                                <div className='product-details'>
                                    <h6 className='brand'>
                                        {item?.brand}
                                    </h6>
                                    <h5 className = 'product-title hidden-text' >
                                        {item?.title}
                                    </h5>
                                    <ReactStars 
                                        count={5} 
                                        size={24} 
                                        value= {item?.totalrating.toString()} 
                                        edit= 'false' 
                                        activeColor='#ffd700' 

                                        />
                                    <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}
                                    dangerouslySetInnerHTML={{__html: item?.description}}
                                    >
                                        
                                    </p>
                                    <p className='price'>{formatter.format(item?.price)}</p>
                                </div>
                                <div  className = 'action-bar position-absolute top-50 start-50 translate-middle shadow-lg p-3 mb-5 bg-white rounded' >
                                    <div className='d-flex flex-row gap-15'>
                                        <Link>
                                            <img src={procom} />
                                        </Link>
                                        <Link>
                                            <img src={addcart} />
                                        </Link>
                                        <Link to ={'/product/'+ item?._id} className='border-0 bg-transparent'>
                                            <img src={view} />
                                        </Link>
                                    </div>
                                </div>
                                <div className = 'position-absolute top-0 start-0' >
                                {
                                    item?.tags === 'BESTSELLER' && (
                                         <div style={{ background: '#1e96fc', padding:'5px 10px', borderRadius: '10px', marginTop: '10px',marginLeft:'10px', color:'white'}}>BESTSELLER</div>
                                    )
                                }
                                {item?.tags === 'NEW' && (
                                    <div style={{ background: '#49a760', padding: '5px 10px', borderRadius: '10px', marginTop: '10px', marginLeft: '10px', color: 'white' }}>
                                    New
                                    </div>
                                )}
                                {item?.tags === 'SALE' && (
                                    <div>
                                        <div style={{ background: '#b20808', padding: '5px 10px', borderRadius: '10px', marginTop: '10px', marginLeft: '10px', color: 'white' }}>
                                            SALE
                                        </div>
                                        <div style={{ background: '#ed4b4b', padding: '5px 10px', borderRadius: '10px', marginTop: '10px', marginLeft: '10px', color: 'white' }}>
                                            {item?.isDiscount}%
                                        </div>
                                    </div>

                                )}
                                </div>
                            </div>
                        </div>
                )
            })
        }

       
    </>
  )
}

export default ProductCart
