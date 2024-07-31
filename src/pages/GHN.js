import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
import { service, shipping } from '../features/ghtk/GhtkSlice';
import { PayPalButton } from "react-paypal-button-v2";
import { getConfig } from '../features/payment/paymentService';
import { createAnOrders } from '../features/user/userSlice';
import { getAllCoupon } from '../features/coupon/couponSlice';
import { Link, useNavigate } from 'react-router-dom';
const { DateTime } = require('luxon');

const GHN = () => {
    const dispatch = useDispatch();
    const cartState = useSelector(state => state?.auth?.cartProducts);
    const districtUser = useSelector(state => state?.auth?.user?.district)
    const brandState = useSelector(state => state?.brand?.brands)
    const servicesState = useSelector(state => state?.ghtk?.services?.data);
    const shippingState = useSelector(state => state?.ghtk?.shippings?.data?.total);
    const couponState = useSelector(state => state?.coupon?.coupons)
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [metamask, setMetamask] = useState(null);
    const [discountedTotal, setDiscountedTotal] = useState(null);
    console.log(metamask)   
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
    const formattedAmount = formatter.format(shippingState);
    
    const [totalAmount, setTotalAmount] = useState(null);
    const formattedTotalAmount = formatter.format(totalAmount);
    
    const totalAll = totalAmount + shippingState - discountedTotal;
    const usd = totalAll / 23000
    const metamaskMoney = usd / 100
    let roundedNumber1 = Math.ceil(metamaskMoney);
    let numberWithZeros = Number(`${roundedNumber1}e18`);
    const roundedNumber = Math.ceil(usd);
    console.log(numberWithZeros)
    const formattedTotalAll = formatter.format(totalAll);
    const [cartPro, setCartPro] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [payment, setPayment] = useState('later_money')
    const [sdkReady, setSdkReady] = useState(false)
    const navigate = useNavigate();

    
    

    
     const handlePayment = (e) => {
         setPayment(e.target.value)
         console.log(e.target.value)
     }

     const handleMetaMaskPayment = async () => {
         try {
             const accounts = await window.ethereum.request({
                 method: "eth_requestAccounts"
             });
            setMetamask(accounts)
             // Nếu yêu cầu thông qua MetaMask thành công, bạn có thể thực hiện các thao tác khác ở đây
         } catch (error) {
             console.log(error.code); // In ra mã lỗi nếu có lỗi xảy ra trong quá trình yêu cầu
             // Xử lý các trường hợp lỗi nếu cần thiết
         }
     };



     const handleSendMetaMaskPayment = async () => {
         try {
             // Lấy địa chỉ ví MetaMask được chọn
             const accounts = await window.ethereum.request({
                 method: "eth_requestAccounts"
             });

             if (accounts.length > 0) {
                 const selectedAccount = accounts[0];
                 // Tạo đối tượng transaction
                 const transactionObject = {
                     from: selectedAccount,
                     to: "0xCFab27DAFf0885E468e8575a4EC9379a32E8C3Ce", // Địa chỉ đích cần thanh toán
                     gas: Number(21000).toString(16),
                     gasPrice: Number(25000).toString(16),
                     value: Number(numberWithZeros).toString(16), // Giá trị cần thanh toán (ví dụ: 1 Ether)
                 };

                 // Gửi yêu cầu chứng thực transaction qua MetaMask
                 const result = await window.ethereum.request({
                     method: "eth_sendTransaction",
                     params: [transactionObject],
                 });
                 dispatch(createAnOrders({
                     totalPrice: totalAmount,
                     totalPriceAfterDiscount: totalAmount,
                     orderItems: cartPro,
                     paiAt: DateTime.now(),
                     payment: "Metamask"
                 }))
                 navigate('/my-orders')
                 // Xử lý kết quả sau khi thanh toán thành công
                 console.log("Transaction successful:", result);
             }
         } catch (error) {
             console.error("Error sending MetaMask payment:", error);
             // Xử lý các trường hợp lỗi nếu cần thiết
         }
     };


     const addPaypalScript = async () => {
        console.log("Adding PayPal script...");
        try {
            console.log("Adding PayPal script...");
            const {data} = await getConfig()
        const script = document.createElement('script');
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
            // Các dòng code khác
        } catch (error) {
            console.error("Error fetching PayPal config:", error);
        }
     }
     useEffect(()=> {
        let item = [];
        if (cartState && cartState?.length > 0) {
            for (let index = 0; index < cartState.length; index++) {
                item.push({
                    product: cartState[index].productId._id,
                    quantity: cartState[index].quantity,
                    color: cartState[index].color._id,
                    price: cartState[index].price,
                })
            }
        }
        setCartPro(item)
     },[cartState])
     const onSuccessPaypal = (details, data) => {
        dispatch(createAnOrders({
            totalPrice: totalAmount,
            totalPriceAfterDiscount: totalAmount,
            orderItems: cartPro,
            paiAt: details.update_time,
            payment: "Payment"
        }))
        navigate('/my-orders')
     }
    

    
    useEffect(() => {
        dispatch(getBrands());
        dispatch(service());
        dispatch(shipping());
        dispatch(getAllCoupon());
        if(!window.paypal){
        addPaypalScript();
        } else {
            setSdkReady(true)
        }
    }, []);
    
    useEffect(() => {
        let sum = 0;
        for (let index = 0; index < cartState?.length; index++) {
            const products = cartState[index]?.productId;
             if (!Array.isArray(products)) {
                const brand = products?.brand;
                for (let index = 0; index < brandState?.length; index++) {
                    const element = brandState[index]?.title;
                    if (element === brand){
                        const foundUser = brandState[index]?.userId?.district;
                        dispatch(service({ fromDistrict: foundUser, toDistrict: districtUser }));   
                    }
                }
               /*console.log(brand);*/
            }

            

            let sum = 0;
        for (let index = 0; index < cartState?.length; index++) {
            const item = cartState[index];
            const price = item?.productId?.isDiscount
                ? item?.price - item?.price * (item?.productId.isDiscount / 100)
                : item?.price;

            sum = sum + Number(item?.quantity) * price;
            setTotalAmount(sum);
        }
        }
    }, [cartState, districtUser, brandState, dispatch]);

    

    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
        const ser = selectedService;
        console.log(selectedService);

        
            const requests = [];

            cartState.forEach((item) => {
                const products = item?.productId;
                if (!Array.isArray(products)) {
                    const brand = products?.brand;
                    const height = products?.height;
                    const length = products?.length;
                    const width = products?.width;
                    const weight = products?.weight;
                    const price = products?.price;

                    const foundBrand = brandState.find((brandItem) => brandItem?.title === brand);
                    const foundUser = foundBrand?.userId?.district;
                    const wardUser = foundBrand?.userId?.ward;

                    if (districtUser && foundUser) {
                        requests.push(
                            dispatch(service({ fromDistrict: foundUser, toDistrict: districtUser }))
                        );
                    }
                    requests.push(
                        dispatch(
                            shipping({
                                serviceId: event.target.value,
                                insuranceValue: price,
                                fromDistrict: districtUser,
                                toDistrict: foundUser,
                                toWard: wardUser,
                                height: height,
                                length: length,
                                weight: weight,
                                width: width,
                            })
                        )
                    );
                }
            });
    }
     const handleCouponChange = (e) => {
         setCouponCode(e.target.value);
     };
     
     

     const applyCoupon = () => {
         const foundCoupon = couponState?.find((coupon) => coupon?.name === couponCode);
         if (foundCoupon) {
             // Tính toán số tiền giảm giá dựa trên phần trăm giảm của mã coupon
             const discountPercentage = foundCoupon?.discount; // Giả sử trường discount là phần trăm giảm giá (ví dụ: 10, 20, 30,...)
             const discountAmount = (totalAmount * discountPercentage) / 100;
          
             setAppliedCoupon(foundCoupon); // Lưu thông tin mã giảm giá đã áp dụng
             setDiscountedTotal(discountAmount); // Lưu tổng tiền sau khi áp dụng mã giảm giá

             // Cập nhật các hành động khác sau khi áp dụng mã giảm giá
             // Có thể cần cập nhật lại tổng tiền hoặc các thông tin khác trên giao diện
         } else {
             console.log('Mã giảm giá không hợp lệ hoặc không tồn tại');
         }
     };
     
   

  return (
    <>
        <Meta title={"Order"}/>
        <BreadCrumb title = "Order" />
        <div className='ght-wrapper py-5 home-wrapper-2' style={{backgroundColor:"white"}}>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-4'>
                        <div className='col-12' style={{ border: '1px solid #eaebed', padding:'20px 20px', borderRadius:'5px'}}>
                            <h5>Delivery method</h5>
                            {
                                servicesState?.map((item, index)=> {
                                    return(
                                        <div class="form-check">
                                            <input 
                                                class="form-check-input" 
                                                type="radio" 
                                                name={item?.short_name}
                                                id="flexRadioDefault1" 
                                                value={item?.service_id}
                                                onChange={handleServiceChange}
                                                checked={selectedService === item?.service_id}
                                                />
                                            <label class="form-check-label" for={item?.short_name}>
                                                {item?.short_name}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className = 'col-12' style = {{border: '1px solid #eaebed',padding: '20px 20px',borderRadius: '5px', marginTop:'20px'}}>
                                <div className='menu-bottom d-flex align-items-center'>
                                    <div className='dropdown'>
                                        <button
                                            className='btn dropdown-toggle border-0 gap-15 d-flex align-items-center' 
                                            type='button'
                                            id='dropdownMenuButton1'
                                            data-bs-toggle = "dropdown"
                                            aria-expanded = "false"
                                            style={{ backgroundColor: '#1e68fc', borderRadius:'5px', color: '#fff'}}
                                        >
                                                Get coupon
                                        </button>
                                        <div className='dropdown-menu' aria-labelledby="dropdownMenuButton1" style={{ width: '300px', padding:'20px 20px'}}>
                                            <div className='d-flex flex-column'>
                                                {
                                                    couponState?.map((item, index)=> {
                                                        return(
                                                            <>
                                                                <div onClick={() => setCouponCode(item?.name)} className='coupon d-flex' style={{ margin:'30px 30px'}}>
                                                                    <div className='gift-text' style={{ padding:'10px 10px'}}>
                                                                        <h6 style={{ fontSize:'10px'}}>YOUR GIFT</h6>
                                                                    </div>
                                                                    <div className='gift-center'>
                                                                        <h6>{item?.name}</h6>
                                                                        <p>{item?.discount}%</p>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                         <div className='col-12' style={{ border: '1px solid #eaebed',borderRadius:'5px',marginTop:'20px', padding:'40px 40px',}}>
                            {/* Trường nhập mã giảm giá */}
                            <input
                                type="text"
                                placeholder="Mã giảm giá"
                                value={couponCode}
                                onChange={handleCouponChange}
                                style={{padding:'20px 20px', borderRadius:'5px'}}
                            />
                            <button className='coupon' style={{ marginLeft:'20px', backgroundColor:'#1e96fc', color:'white', padding:'20px 30px',border:'none', borderRadius:'5px'}} onClick={applyCoupon}>Giảm giá</button>
                            {/* Hiển thị thông tin mã giảm giá đã áp dụng */}
                            {appliedCoupon && (
                                <div>
                                    Discount code applied: {appliedCoupon.name} - {appliedCoupon.discount}%
                                </div>
                            )}
                            {/* Hiển thị tổng tiền sau khi áp dụng mã giảm giá */}
                            {discountedTotal && (
                                <div>
                                    Total amount after applying discount code: {formatter.format(discountedTotal)}
                                </div>
                            )}
                        </div>
                        <div style={{ border: '1px solid #eaebed',borderRadius:'5px', marginTop: '20px',padding:'20px 20px'}}>
                            <h5>Thanh toán</h5>
                            <div class="form-check">
                                <input value="later_money"  class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Pay later
                                </label>
                            </div>
                            <div class="form-check">
                                <input onChange={handlePayment} value="paypal" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                                <label class="form-check-label" for="flexRadioDefault2">
                                    Paymet
                                </label>
                            </div>
                            <div class="form-check">
                                <input onChange={handlePayment} value="metamask" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                                <label class="form-check-label" for="flexRadioDefault2">
                                    MetaMask
                                </label>
                            </div>
                        </div>
                       
                    </div>
                    <div className='col-5' style={{ border:'1px solid #eaebed',borderRadius:'5px', padding: '30px 20px'}}>
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
                                                <img style={{ width:'100px', height:'100px'}} className='img-fluid' src={item?.productId?.images[0]?.url} alt='product' />
                                            </div>
                                            <div>
                                                <h5 className='total'>{item?.productId?.title}</h5>
                                                <p className='total-price'>{item?.color?.title}</p>
                                            </div>
                                        </div>
                                        <div className='flex-grow-1' style={{ marginLeft:'100px', textAlign:'right'}}>
                                            <h5 className='total'>
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
                        <div className = 'border-bottom py-4' >
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='total' style={{ fontWeight:'bold', fontSize:'18px'}}>Total</p>
                                <p className='total-price' style={{ fontWeight:'bold', fontSize:'18px'}}>{formattedTotalAmount?formattedTotalAmount: "0"}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='mb-0 total'>Delivery</p>
                                <p className='mb-0 total-price'>{formattedAmount?formattedAmount : "0"}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='mb-0 total' style={{marginTop:'10px'}}>Discount</p>
                                <p className='mb-0 total-price'>{formatter.format(discountedTotal?discountedTotal : "0")}</p>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center border-bottom py-4'>
                            <h4 className='total' style={{fontWeight:'bold', fontSize:'20px'}}>Total</h4>
                            <h5 className='total-price' style={{ fontWeight: 'bold', fontSize:'20px'}}>{formattedTotalAll ? formattedTotalAll: "0"}</h5>
                        </div>
                        <div>
                            {
                                payment === 'paypal' && sdkReady ? (
                                <PayPalButton
                                    amount={roundedNumber}
                                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                    onSuccess={onSuccessPaypal}
                                    
                                />
                            ): (
                                payment === 'later_money' && sdkReady && ( 
                                    <button style={{ backgroundColor: '#2150cc', color:'#fff',fontWeight:'bold', border:'none', padding:'10px 20px',borderRadius:'10px',marginTop:'20px'}}> Order </button>
                                )
                            )}
                            {
                                payment === 'metamask' && sdkReady && (
                                    <div>
                                        <button
                                        style={{
                                            backgroundColor: '#your_color',
                                            color: '#your_color',
                                            fontWeight: 'bold',
                                            border: 'none',
                                            padding: '10px 20px',
                                            borderRadius: '10px',
                                            marginTop: '20px'
                                        }}
                                        onClick={handleMetaMaskPayment} // Thêm sự kiện xử lý khi click vào nút này
                                    >
                                        Payment MetaMask
                                    </button>
                                    <button
                                        style={{
                                            backgroundColor: '#your_color',
                                            color: '#your_color',
                                            fontWeight: 'bold',
                                            border: 'none',
                                            padding: '10px 20px',
                                            borderRadius: '10px',
                                            marginTop: '20px'
                                        }}
                                        onClick={handleSendMetaMaskPayment} // Thêm sự kiện xử lý khi click vào nút này
                                    >
                                        Payment
                                    </button>
                                    </div>
                                )
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default GHN
