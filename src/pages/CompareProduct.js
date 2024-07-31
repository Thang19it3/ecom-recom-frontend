import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import cross from "../images/cross.svg";
import Color from '../components/Color';

const CompareProduct = () => {
  return (
    <>
      <Meta title={"Blogs"} />
      <BreadCrumb title="Blogs" />
      <div className='compare-product-wrapper py-5 home-wrapper-2'>
        <div className='container-xxl'>
            <div className='row'>
                <div className='col-3'>
                    <div className='compare-product-card position-relative'>
                        <img src={cross} alt='cr' className='position-absolute cross img-fluid' />
                        <div className='product-card-image'>
                            <img src={require("../images/watch.jpg")} alt='a' />
                        </div>
                        <div className='compare-product-details'>
                            <h5 className='title'>
                                đjáds  ads  asd á asda s asd á 
                            </h5>
                            <h6 className='price mb-3'>
                                $566
                            </h6>

                            <div>
                                <div className='product-details'>
                                    <h5>Brand:</h5>
                                    <p>Havels</p>
                                </div>
                                <div className='product-details'>
                                    <h5>Type:</h5>
                                    <p>Havels</p>
                                </div>
                                <div className='product-details'>
                                    <h5>Type:</h5>
                                    <p>Havels</p>
                                </div>
                                <div className='product-details'>
                                    <h5>Color:</h5>
                                    <div>
                                        <Color />
                                    </div>
                                </div>
                                <div className='product-details'>
                                    <h5>Size:</h5>
                                    <p>Havels</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default CompareProduct
