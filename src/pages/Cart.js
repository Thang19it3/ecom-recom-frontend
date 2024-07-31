import React, {useState, useEffect } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { AiFillDelete } from "react-icons/ai"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartproduct, getUserCart, updateCartproduct } from './../features/user/userSlice';
import axios from "axios";

const Cart = () => {
    const dispatch = useDispatch();
    const useState2 = useSelector((state) => state.auth.cartProducts);

    const [productUpdateDetail, setProductUpdateDetail] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
    useEffect(()=>{
        dispatch(getUserCart());
    },[]);
    useEffect(()=>{
        if(productUpdateDetail!== null)
        {
            dispatch(updateCartproduct({cartItemId:productUpdateDetail?.cartItemId, quantity:productUpdateDetail?.quantity}));
            setTimeout(() => {
                dispatch(getUserCart());
            }, 1000);
            }
    },[productUpdateDetail])

    const deleteACartPro = (id) => {
        dispatch(deleteCartproduct(id));
        setTimeout(()=> {
            dispatch(getUserCart());
        },1000);
    }

    useEffect(()=>{
        let sum = 0;
        for (let index = 0; index < useState2?.length; index++) {
            const item = useState2[index];
            const price = item?.productId?.isDiscount
                ? item?.price - item?.price * (item?.productId.isDiscount / 100)
                : item?.price;

            sum = sum + Number(item?.quantity) * price;
            setTotalAmount(sum);
        }
    }, [useState2])
  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <section className='cart-wrapper home-wrapper-2 py-5'>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-12'>
                    <div className='cart-header py-3 d-flex justify-content-between align-items-center'>
                        <h4 className='cart-col-1 text-center' style={{ fontSize:'20px', color:'black'}}>Product</h4>
                        <h4 className='cart-col-2' style={{ fontSize:'20px', color:'black'}}>Price</h4>
                        <h4 className='cart-col-3' style={{ fontSize:'20px', color:'black'}}>Quantity</h4>
                        <h4 className='cart-col-4' style={{ fontSize:'20px', color:'black'}}>Money</h4>
                    </div>
                    {
                            useState2 && useState2?.map((item, index)=>{
                                return(
                                    <div key={index} className='cart-data py-3 d-flex justify-content-between align-items-center'>
                                        <div className='cart-col-1 gap-15 d-flex align-items-center'>
                                            <div className='w-25'>
                                                <img 
                                                    src={item?.productId?.images[0]?.url} 
                                                    alt='aa' 
                                                    className='img-fluid'
                                                    />
                                            </div>
                                            <div className='w-75'>
                                                <p>{item?.productId?.title}</p>
                                                <p className='d-flex gap-3'>Color: <ul className='colors ps-0'>
                                                    <li style={{ backgroundColor: item?.color.title}}></li>
                                                </ul>
                                                </p>
                                                
                                            </div>
                                        </div>
                                        <div className='cart-col-2'>
                                            {
                                                item?.productId?.isDiscount ? (
                                                    <>
                                                        <h5 className='price'>
                                                            {formatter.format((item?.price) - (item?.price * (item?.productId.isDiscount / 100)))}
                                                        </h5>
                                                    </>
                                                ) : (
                                                    <h5 className='price'>{formatter.format(item?.price)} 5</h5>
                                                )
                                            }
                                        </div>
                                        <div className='cart-col-3 d-flex align-items-center gap-15'>
                                            <div>
                                                <input 
                                                    className='form-control'
                                                    type='number'
                                                    name=''
                                                    id=''
                                                    min={1}
                                                    max={10}
                                                    value={productUpdateDetail?.quantity ?  productUpdateDetail?.quantity : item?.quantity}
                                                    onChange={(e)=> {setProductUpdateDetail({cartItemId:item?._id, quantity: e.target.value})}}
                                                />
                                            </div>
                                            <div>
                                                <AiFillDelete onClick={()=>{deleteACartPro(item?._id)}} className='text-danger'/>
                                            </div>
                                        </div>
                                        <div className='cart-col-4'>
                                            <h5 className='price'>
                                                {formatter.format(
                                                    (item?.productId?.isDiscount
                                                        ? item?.price - item?.price * (item?.productId.isDiscount / 100)
                                                        : item?.price) * item?.quantity
                                                )}
                                            </h5>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    
                </div>
                <div className='col-12 py-2 mt-4'>
                    <div className='d-flex justify-content-between align-items-baseline'>
                        <Link to="/product" className='button' style={{backgroundColor:'#ed4b4b'}}>Buy Products</Link>
                        {
                            (totalAmount !== null || totalAmount !==0) &&
                            <div className='d-flex flex-column align-items-end'>
                                <h4>Total: {formatter.format(totalAmount)}</h4>
                                <p>Taxes and shipping charges are calculated at checkout</p>
                                <Link to="/ghn" className='button' style={{ backgroundColor:'#2150cc'}}>Payment</Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
      </section>
    </>
  )
}

export default Cart
