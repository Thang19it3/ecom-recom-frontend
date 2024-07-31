import React, { useEffect } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import cross from '../images/cross.svg'
import { useDispatch, useSelector } from 'react-redux';
import { getUserProductWishlist } from '../features/user/userSlice';
import { addToWishlist } from '../features/products/productSlice';

const Wishlist = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    getWishlistFormDb();
  },[])

  const getWishlistFormDb = () => {
    dispatch(getUserProductWishlist());
  }

  const wishlistState = useSelector((state) => state.auth?.wishlist?.wishlist);
  const removeFormWishlist = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    },300);
  }

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });
  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wislist" />
      <div className='wishlist-wrapper home-wrapper-2 py-5'>
        <div className='container-xxl'>
          <div className='row'>
          {
            wishlistState?.length === 0 && 
            <div className='text-center fs-3'>
              No Data
            </div>
          }
          {
            wishlistState?.map((item, index)=>{
              return (
                <div className='col-3' key={index} style={{ backgroundColor:'#fff'}}>
                  <div className='wishlist-card w-100 position-relative'>
                    <img
                      src={cross} 
                      alt='aa'
                      className='position-absolute cross img-fluid'
                      style={{ marginTop:'-180px'}}
                      onClick={(e) => {removeFormWishlist(item?._id)}}
                    />
                    <div className='wishlist-card-image'> 
                      <img  src={item?.images[0]?.url ? item?.images[0]?.url : null } className='img-fluid  d-block mx-auto' width={160} alt='aa'/>
                    </div>
                  <div className=' py-3 px-3'>
                    <h5 className='title'>{item?.title}</h5>
                      <h6 className='price'>{formatter.format(item?.price)}</h6>
                  </div>
                  </div>
                </div>
              )
            })
          }
          </div>
        </div>
      </div>
    </>
  )
}

export default Wishlist
