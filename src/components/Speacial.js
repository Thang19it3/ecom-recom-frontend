import React from 'react';
import ReactStars from 'react-rating-stars-component'
import { Link } from 'react-router-dom';

const Speacial = (props) => {
    const { title, brand, totalrating, price, sold, quanlity } = props;
  return (
    <div className='col-6 mb-3'>
      <div className='speacial-product-card'>
        <div className='d-flex justify-content-between'>
            <div>
                <img src={require('../images/watch.jpg')} className='img-fluid' />
            </div>
            <div className='speacial-product-content'>
                <h5 className='brand'>{brand}</h5>
                <h6 className='title'>
                    {title}
                </h6>
                <ReactStars count={5} size={24} value={totalrating} edit= 'false' activeColor='#ffd700' />
                <p className='price'>
                    <span className='red-p'>{price}</span> <strike>$300</strike>
                </p>
                <div className='discount-till d-flex align-items-center gap-10'>
                    <p className='mb-0 d-flex gap-10'>
                        <b>5</b> days
                    </p>
                    <div className='d-flex gap-10 align-items-center'>
                        <span className='badge rounded-circle p-3 bg-danger'>1</span>:
                        <span className='badge rounded-circle p-3 bg-danger'>1</span>:
                        <span className='badge rounded-circle p-3 bg-danger'>1</span>
                    </div>
                </div>
                <div className='prod-count'>
                        <p>Product: {quanlity}</p>
                        <div className='progress'>
                            <div 
                                className='progress-bar'
                                role='progressbar'
                                style={{ width: quanlity / quanlity + sold  * 100 + "%"}}
                                aria-aria-valuenow={(quanlity / quanlity + sold  * 100)}
                                aria-valuemin={quanlity}
                                aria-valuemax= {sold + quanlity}
                            ></div>
                        </div>
                    </div>
                <Link className='button'>Add to cart</Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Speacial
