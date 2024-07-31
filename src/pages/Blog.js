import React, { useEffect } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import BlogCart from '../components/BlogCart';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../features/blog/blogSlice';
import  moment from "moment";

const Blog = () => {
    const blogState = useSelector((state)=> state?.blog?.blog);
    const dispatch = useDispatch();
    useEffect(()=>{
        getblogs();
    },[])
    const getblogs = () => {
        dispatch(getAllBlogs());
    }
  return (
    <>
      <Meta title={"Blogs"} />
      <BreadCrumb title="Blogs" />
      <div className='blog-wrapper home-wrapper-2 py-5'>
        <div className='container-xxl'>
            <div className='row'>
                <div className='col-9'>
                    <div className='row'>
                       {
                            blogState && blogState?.map && blogState?.map((item, index) => {
                                return (
                                    <div className='col-6 mb-3' key={index}>
                                        <BlogCart 
                                            id={item?._id} 
                                            title={item?.title} 
                                            description = {item?.description} 
                                            image = {item?.images[0]?.url}  
                                            date = {moment(item?.created_at).format('MMMM Do YYYY, h:mm:ss a')}
                                            category = {item?.category}
                                            />
                                    </div>
                                )
                            })
                               
                        }
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Blog
