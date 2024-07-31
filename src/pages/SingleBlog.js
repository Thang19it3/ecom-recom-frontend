import React, { useEffect } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from './../components/BreadCrumb';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineArrowLeft} from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux';
import { getABlog } from '../features/blog/blogSlice';

const SingleBlog = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[2];
  const blogState = useSelector((state)=>state?.blog?.singleBlog);

  useEffect(() => {
    getblog();
  },[]);

  const getblog = () => {
    dispatch(getABlog(getBlogId));
  }
  return (
    <>
     <Meta title={blogState?.title}/>
     <BreadCrumb title= {blogState?.title} />
     <div className='blog-wrapper py-5 home-wrapper'>
        <div className='container-xxl'>
            <div className='row'>
                <div className='col-12'>
                    <div className='single-blog-card'>
                        <Link to={"/blogs"} className='d-flex align-items-center gap-10'> <HiOutlineArrowLeft className='fs-5' /> Go back to Blogs</Link>
                        <h3>{blogState?.title}</h3>
                        <img src={blogState?.images[0]?.url ? blogState?.images[0]?.url : null} alt='blog' className='img-fluid w-100 my-4' /> 
                        <p dangerouslySetInnerHTML={{
                          __html: blogState?.description,
                        }}></p>
                    </div>
                </div>
                
            </div>
        </div>
     </div> 
    </>
  )
}

export default SingleBlog
