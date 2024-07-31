import React from 'react'
import { Link } from 'react-router-dom'

const BlogCart = (props) => {
  const {
    id,
    title,
    description,
    image,
    date,
    category
  } = props;
  return (
    
      <div className='blog-cart position-relative'>
        <div className='card-image'>
            <img src={image} className='img-fluid' style={{ height:'500px'}}  alt='blog'/>
        </div>
        <div className='position-absolute' style={{ top:'30px', right:'20px'}}>
          <span style={{backgroundColor: '#2150cc',color: '#fff', padding:'10px 20px', borderRadius:'5px'}}>{category}</span>
        </div>
        <div className='blog-content position-absolute' style={{ bottom: '0'}}>
            <p className='date' style={{ color: 'white', fontSize:'13px', fontWeight:'bold'}}>{date}</p>
            <h5 className='title' style={{ color: "#fff", fontSize:'15px', fontWeight:'bold', textTransform:'uppercase'}}>{title}</h5>
            <p className='desc' dangerouslySetInnerHTML={{ __html: description && description.substr(0, 70) + "..."}} style={{ color:'#fff'}}></p>
            <Link to={"/blog/" + id} className='button'>Read More</Link>
        </div>
      </div>
    
  )
}

export default BlogCart
