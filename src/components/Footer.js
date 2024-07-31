import React from 'react'
import news from '../images/newsletter.png'
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import {BsLinkedin, BsGithub, BsYoutube, BsInstagram} from 'react-icons/bs'

const Footer = () => {
  return (
    <>
      <footer className='py-4'>
        <div className='container-xxl'>
          <div className='row align-items-center'>
            <div className = 'col-5' >
              <div className='footer-top-data d-flex gap-30 algin-items-center'>
                <img src={news} alt="ahhihi" />
                <h2 className='mb-0 text-white'>Sign Up for Newsletter</h2>
              </div>
            </div>
            <div className = 'col-7' >
              <div className='input-group'>
                <input
                  type='text'
                  className='form-control py-1'
                  placeholder='Your Email Address'
                  aria-label="Your Email Address"
                  aria-describedby="basic-addon2"
                />
                  <span className='input-group-text p-2' id='basic-addon2'>
                    Subscribe
                  </span>
              
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='py-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-4'>
              <h4 className='text-white mb-4'>Contact Us</h4>
              <div>
                <address className='text-white fs-6'>224 Tran Dai Nghia, <br/> Ngu Hanh Son <br/> Da Nang </address>
                <a href='0839123862' className='mt-3 d-block mb-1 text-white' >0839123862</a>
                <a href='0839123862' className='mt-2 d-block mb-0 text-white' >nvthang19it3@vku.udn.vn</a>
                <div className='social_icons d-flex align-items-center gap-30 mt-4'>
                  <a href=''>
                    <BsLinkedin className='text-white fs-4' />
                  </a>
                  <a href=''>
                    <BsGithub  className='text-white fs-4'/>
                  </a>
                  <a href=''>
                    <BsYoutube className='text-white fs-4' />
                  </a>
                  <a href=''>
                    <BsInstagram  className='text-white fs-4'/>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-3'>
              <h4 className='text-white mb-4'>Infomation</h4>
              <div className='footer-link d-flex flex-column'>
                <Link className='text-white py-2 mb-1'>Privacy Policy</Link>
                <Link className='text-white py-2 mb-1'>Refund Policy</Link>
                <Link className='text-white py-2 mb-1'>Shipping Policy</Link>
                <Link className='text-white py-2 mb-1'>Blogs</Link>
              </div>
            </div>
            <div className='col-3'>
              <h4 className='text-white mb-4'>Account</h4>
              <div className='footer-link d-flex flex-column'>
                <Link className='text-white py-2 mb-1'>Electron Inside</Link>
                <Link className='text-white py-2 mb-1'>Company</Link>
                <Link className='text-white py-2 mb-1'>Careers</Link>
                <Link className='text-white py-2 mb-1'>Brands</Link>
              </div>
            </div>
            <div className='col-2'>
              <h4 className='text-white mb-4'>Policies</h4>
              <div className='footer-link d-flex flex-column'>
                <Link className='text-white py-2 mb-1'>Electron Inside</Link>
                <Link className='text-white py-2 mb-1'>Company</Link>
                <Link className='text-white py-2 mb-1'>Careers</Link>
                <Link className='text-white py-2 mb-1'>Brands</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='py-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <p className='text-center mb-0 text-white'>
                &copy; {new Date().getFullYear()}; Powered by Developer's Corner {""}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer;
