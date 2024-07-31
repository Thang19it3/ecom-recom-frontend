import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

const shippingSchema = yup.object({
    firstName: yup.string().required("First Name is Required"),
    lastName: yup.string().required("Last Name is Required"),
    address: yup.string().required("address is Required"),
    state: yup.string().required("state is Required"),
    city: yup.string().required("City is Required"),
    country: yup.string().required("country is Required"),
    other: yup.string().required("country is Required"),
    pincode: yup.number().required("pincode is Required"),
});

const Checkout = () => {
    const dispatch = useDispatch();
    const cartState = useSelector(state => state?.auth?.cartProducts);
    const [totalAmount, setTotalAmount] = useState(null);
    const [shippingInfo, setShippingInfo] = useState(null);
    useEffect(() => {
        let sum = 0;
        for (let index = 0; index < cartState?.length; index++) {
            sum = sum + (Number(cartState[index].quantity) * cartState[index].price);
            setTotalAmount(sum);
        }
    }, [cartState])

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            address: "",
            state: "",
            city: "",
            country: "",
            pincode: "",
            other: ""
        },
        validationSchema: shippingSchema,
        onSubmit: (values) =>{
            shippingInfo(values);
        }
    })

    const loadScript = (src) => {
        return new Promise((resolve)=>{
            const script = document.createElement("root");
            script.src = src.
            script.onload = () => {
                resolve(true)
            }
            script.onerror =  () => {
                resolve(false)
            }
            document.body.appendChild(script);
        })
    }
    
    const checkOutHandler = async () => {
        const res = await loadScript("https://checkout.razorpay.com/vi/checkout.js")
        if(!res)
        {
            alert("failed to load");
            return;
        }
        const result = await axios.post("http://localhost:5000/api/user/order/checkout")
        if (!result)
        {
             alert("Somthing went wrong");
             return;
        }
        const { amount, id: order_id, currency }  = result.data
        const options = {
            key: "",
            amount: amount.toString(),
            currency: currency,
            name: "",
            description: "Test",
            image: "",
            order_id: order_id,
            
        }
    }

  return (
    <>
      <div className='checkout-wrapper py-5 home-wrapper-2'>
        <div className='container-xxl'>
            <div className='row'>
                <div className='col-7'>
                    <div className='checkout-left-data'>
                        <h3 className='website-name'>Dev Corner</h3>
                        <nav
                        style={{"--bs-breadcrumb-dirider":">"}}
                        aria-label="breadcrumb"
                        >
                            <ol className='breadcrumb'>
                                <li className='breadcrumb-item'>
                                    <a href='/cart' className='text-dark total-price'>Cart</a>
                                </li>
                                &nbsp; 
                                <li className='breadcrumb-item total-price  active' aria-current="page">
                                    Information
                                </li>
                                &nbsp; 
                                <li className='breadcrumb-item total-price active' aria-current="page">
                                    Shipping
                                </li>
                                 &nbsp; 
                                <li className='breadcrumb-item total-price active' aria-current="page">
                                    Payment
                                </li>
                            </ol>
                        </nav>
                        <h4 className='title total' >Contact information</h4>
                        <p className='user-details total'>
                            thtt@gmail.com
                        </p>
                        <h4 className='mb-3'>Shipping Address</h4>
                        <form action='' onSubmit={formik.handleSubmit} className='d-flex gap-15 flex-wrap justify-content-between'>
                            <div className='w-100'>
                                <select
                                    name='country'
                                    className='form-control form-select'
                                    onChange={formik.handleChange("country")}
                                    onBlur={formik.handleBlur("country")}
                                    value={formik.values.country}
                                >
                                    <option value="" selected disabled>
                                        Select Country
                                    </option>
                                    <option value="Viet Nam" selected >
                                        Viet Nam
                                    </option>
                                </select>
                                <div className='error ms-2 my-1'>
                                    {
                                        formik.touched.country && formik.errors.country
                                    }
                                </div>
                            </div>
                            <div className = 'flex-grow-1' >
                                <input 
                                    type='text' 
                                    name='firstName'
                                    placeholder='First Name' 
                                    className='form-control'
                                    onChange={formik.handleChange("firstName")}
                                    onBlur={formik.handleBlur("firstName")}
                                    value={formik.values.firstName}

                                    />
                                    <div className='error ms-2 my-1'>
                                    {
                                        formik.touched.firstName && formik.errors.firstName
                                    }
                                </div>
                            </div>
                            <div className = 'flex-grow-1' >
                                <input 
                                type='text' 
                                placeholder='Last Name' 
                                className='form-control' 
                                onChange={formik.handleChange("lastName")}
                                onBlur={formik.handleBlur("lastName")}
                                value={formik.values.lastName}
                                name = 'lastName'
                                />
                                <div className='error ms-2 my-1'>
                                    {
                                        formik.touched.lastName && formik.errors.lastName
                                    }
                                </div>
                            </div>
                            <div className='w-100'>
                                <input 
                                type='text' 
                                placeholder='Address' 
                                className='form-control' 
                                onChange={formik.handleChange("address")}
                                onBlur={formik.handleBlur("address")}
                                value={formik.values.address}
                                name = 'address'
   
                                />
                                <div className='error ms-2 my-1'>
                                    {
                                        formik.touched.address && formik.errors.address
                                    }
                                </div>
                            </div>
                            <div className='w-100'>
                                <input 
                                type='text' 
                                placeholder='Apartment, Suite, etc' 
                                className='form-control' 
                                onChange={formik.handleChange("other")}
                                onBlur={formik.handleBlur("other")}
                                value={formik.values.other}
                                name = 'other'
                                />
                                 <div className='error ms-2 my-1'>
                                    {
                                        formik.touched.other && formik.errors.other
                                    }
                                </div>
                            </div>
                            <div className = 'flex-grow-1' >
                                <input 
                                type='text' 
                                placeholder='city' 
                                className='form-control' 
                                onChange={formik.handleChange("city")}
                                onBlur={formik.handleBlur("city")}
                                value={formik.values.city}
                                name = 'city'
                                />
                                 <div className='error ms-2 my-1'>
                                    {
                                        formik.touched.city && formik.errors.city
                                    }
                                </div>
                            </div>
                            <div className = 'flex-grow-1' >
                                <select
                                    name='state'
                                    className='form-control form-select'
                                    onChange={formik.handleChange("state")}
                                    onBlur={formik.handleBlur("state")}
                                    value={formik.values.state}
                                >
                                    <option value="" selected disabled>
                                        Select State
                                    </option>
                                    <option value="Đà Nẵng" selected>
                                        Đà Nẵng
                                    </option>
                                </select>
                                <div className='error ms-2 my-1'>
                                    {
                                        formik.touched.state && formik.errors.state
                                    }
                                </div>
                            </div>
                            <div className='flex-grow-1'>
                                <input 
                                type='text' 
                                placeholder='zipcode' 
                                className='form-control' 
                                onChange={formik.handleChange("pincode")}
                                onBlur={formik.handleBlur("pincode")}
                                value={formik.values.pincode}
                                name = 'pincode'
                                />
                                 <div className='error ms-2 my-1'>
                                    {
                                        formik.touched.pincode && formik.errors.pincode
                                    }
                                </div>
                            </div>
                            <div className='w-100'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <Link to="/cart" className='text-dark'>
                                        <BiArrowBack className='me-2' /> Return to Cart
                                    </Link>
                                    <Link to="/cart" className='button'>
                                        Continue to Shipping
                                    </Link>
                                    <button className='button' type='submit'>Place Order</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='col-5'>
                    <div className='border-bottom py-4'>
                    {
                        cartState && cartState?.map((item, index)=>{
                            return(
                                <div key={index} className='d-flex gap-10 mb-2 align-items-center'>
                                    <div className='w-75 d-flex gap-10'>
                                        <div className='w-25 position-relative'>
                                            <span 
                                                style={{ top: "-10px", right: "2px"}} 
                                                className='badge bg-secondary text-white rounded-circle p-2 position-absolute'>{item?.quantity}</span>
                                            <img width={100} height={100} className='img-fluid' src={item?.productId?.images[0]?.url} alt='product' />
                                        </div>
                                        <div>
                                            <h5 className='total'>{item?.productId?.title}</h5>
                                            <p className='total-price'>{item?.color?.title}</p>
                                        </div>
                                    </div>
                                    <div className='flex-grow-1'>
                                        <h5 className='total'>$ {item?.price * item?.quantity}</h5>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                    <div className = 'border-bottom py-4' >
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className='total'>Subtotal</p>
                            <p className='total-price'>${totalAmount?totalAmount: "0"}</p>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className='mb-0 total'>Shipping</p>
                            <p className='mb-0 total-price'>$5</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center border-bottom py-4'>
                        <h4 className='total'>Total</h4>
                        <h5 className='total-price'>${totalAmount?totalAmount: "0"}</h5>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
