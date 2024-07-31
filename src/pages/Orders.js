import React, { useEffect } from 'react'
import Container from '../components/Container'
import BreadCrumb from './../components/BreadCrumb';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/user/userSlice';
import { Link } from 'react-router-dom';

const Orders = () => {
  const dispatch = useDispatch()
  const orderState = useSelector(state => state.auth.getOrderUser?.orders)

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });

  useEffect(()=>{
    dispatch(getOrders())
  },[])
  return (
    <>
      <BreadCrumb title='My Order' />
        <Container class1 = "cart=wrapper home-wrapper-2 py-5">
            <div className='row' style={{ backgroundColor:'white'}}>
                <div className='col-12 mt-3' style={{ border:'1px sold #eaebed', borderBottom:'1px solid #eaebed'}}>
                    <div className='row' style={{ padding:'10px 10px'}}>
                      <div className='col-3'>
                        <h5>Mã đặt hàng</h5>
                      </div>
                      <div className='col-3'>
                        <h5>Tổng Tiền</h5>
                      </div>
                      <div className='col-3'>
                        <h5>Tổng tiền sau giảm giá</h5>
                      </div>
                      <div className='col-3'>
                        <h5>Trạng Thái</h5> 
                      </div>
                    </div>
                </div>
                <div className='col-12 mt-3' style={{ borderBottom: '1px solid #eaebed'}}>
                  {
                    orderState && orderState?.map((item, index)=>{
                      return (
                        <div className='row' key={index} style={{ fontSize:'18px', padding:'10px 10px'}}>
                          <div className='col-3'>
                            <p>
                              <Link to={'/order/'+ item?._id} style={{color:'black'}}>
                                {item?._id}
                              </Link>
                            </p>
                          </div>
                          <div className='col-3'>
                            <p>{formatter.format(item?.totalPrice)}</p>
                          </div>
                          <div className='col-3'>
                            <p>{formatter.format(item?.totalPriceAfterDiscount)}</p>
                          </div>
                          <div className='col-3'>
                            <p>{item?.orderStatus}</p>
                          </div>
                          <div className='col-12'>
                            <div className='row p-3' style={{ fontSize:'15px'}}>
                              <div className='col-3' style={{ fontWeight: 'bold'}}>
                                <h6>Tên sản phẩm</h6>
                              </div>
                              <div className='col-3' style={{ fontWeight:'bold'}}>
                                <h6>Số lượng</h6>
                              </div>
                              <div className='col-3' style={{ fontWeight: 'bold'}}>
                                <h6>Giá</h6>
                              </div>
                              <div className='col-3' style={{ fontWeight:'bold'}}>
                                <h6>Màu</h6>
                              </div>
                              <div>
                                {
                                  item?.orderItems?.map((i, index) => {
                                    return(
                                      <div className='row p-3' style={{fontWeight:'normal', fontSize:'13px'}}>
                                        <div className='col-3'>
                                          <h6>{i?.product?.title}</h6>
                                        </div>
                                        <div className='col-3'>
                                          <h6>{i?.quantity}</h6>
                                        </div>
                                        <div className='col-3'>
                                          <h6>{formatter.format(i?.price)}</h6>
                                        </div>
                                        <div className='col-3'>
                                          <ul className='colors ps-0'>
                                            <li style={{backgroundColor: i?.color?.title}}></li>
                                          </ul>
                                        </div>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
            </div>
        </Container>
    </>
  )
}

export default Orders
