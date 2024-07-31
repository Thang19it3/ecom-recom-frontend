import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../features/user/userSlice'
import { useLocation } from 'react-router-dom'
import { updateAOrder } from '../features/oders/orderSlice'

const Status = () => {
    const dispatch = useDispatch()
    const orderState = useSelector(state => state.auth.getOrderUser?.orders)
    const location = useLocation();
    const getOrderId = location.pathname.split("/")[2];
    console.log(getOrderId)

     const getOrderById = Array.isArray(orderState) ?
         orderState.find(order => order._id === getOrderId) :
         null;
         console.log(getOrderById)
    

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        dispatch(getOrders())
    }, [])

    useEffect(() => {
        // Format the date when getOrderById changes
        if (getOrderById && getOrderById.createdAt) {
            const date = new Date(getOrderById.createdAt);
            const formatted = new Intl.DateTimeFormat('vi-VN', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            }).format(date);

            setFormattedDate(formatted);
        }
    }, [getOrderById]);

    const setUserStatus = (e, i) => {
        const data = {
            id: i,
            orderStatus: e,
        };
        console.log(data)
        dispatch(updateAOrder(data)).then(() => {
            window.location.reload(); // Reload trang sau khi cập nhật thành công
        });
    }
  return (
    <>
      <BreadCrumb title='My Order' />
      <div className='container-xxl'>
        <div className = 'row d-flex justify-content-center' >
            <div className='col-9 '>
                <div style={{ border: '1px solid #eaebed', borderRadius:'5px', padding:'30px 30px', marginBottom:'20px'}}>
                    <h5 style={{fontWeight:'bold', marginBottom:'20px'}}>Status order</h5>
                    <h6>Date: {formattedDate}</h6>
                    <h6>Status: {getOrderById?.orderStatus}</h6>
                    
                </div>
                <div style = {{border: '1px solid #eaebed',borderRadius: '5px',padding: '30px 30px'}} >
                    { 
                        getOrderById?.orderItems?.map((item, index)=> {
                            return(
                                <div key={index} className='d-flex gap-10 mb-2 align-items-center'>
                                        <div className='w-75 d-flex gap-10'>
                                            <div className='w-25 position-relative'>
                                                <span 
                                                    style={{ top: "-10px", right: "2px"}} 
                                                    className='badge bg-secondary text-white rounded-circle p-2 position-absolute'>{item?.quantity}</span>
                                                <img style={{ width:'100px', height:'100px'}} className='img-fluid' src={item?.product?.images[0]?.url} alt='product' />
                                            </div>
                                            <div>
                                                <h5 className='total'>{item?.product?.title}</h5>
                                                <p className='total-price'>{item?.color?.title}</p>
                                            </div>
                                        </div>
                                        <div className='flex-grow-1' style={{ marginLeft:'100px', textAlign:'right'}}>
                                            <h5 className='total'>{formatter.format(item?.price * item?.quantity)}</h5>
                                        </div>
                                        <hr/>
                                        <div>
                                            
                                        </div>
                                    </div>
                            )
                        })
                    }
                </div>
                <div style={{ border:'1px solid #eaebed', borderRadius:'5px', padding: '30px 30px', marginTop:'20px', marginBlock:'50px'}} >
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='total' style={{ fontWeight:'bold', fontSize:'15px'}}>Total</p>
                                <p className='total-price' style={{ fontWeight:'bold', fontSize:'15px'}}>{formatter.format(getOrderById?.totalPriceAfterDiscount)}</p>
                            </div>
                        </div>
                {getOrderById?.orderStatus === 'Giao Hàng' && (
                    <div style={{ border: '1px solid #eaebed', borderRadius:'5px', padding:'30px 30px', marginTop:'20px', marginBottom:'50px', paddingLeft:'750px'}}>
                        <button onClick={() => setUserStatus("Đã nhận", getOrderById?._id)} className='d-flex flex-end' style={{ backgroundColor:'#ed4b4b', padding:'10px 20px', border:'none', color:'#fff',borderRadius:'10px'}}>Đã nhận hàng</button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </>
  )
}

export default Status
