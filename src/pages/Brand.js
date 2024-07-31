import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { useLocation } from 'react-router-dom';
import { getAllPro, getAllProducts } from '../features/products/productSlice';
import { getBrands } from '../features/brand/brandSlice';
import { getCategorys } from '../features/category/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import Marquee from 'react-fast-marquee';
import gr from '../images/gr.svg';
import gr2 from '../images/gr2.svg';
import gr3 from '../images/gr3.svg';
import gr4 from '../images/gr4.svg';
import ProductCart from '../components/ProductCart';

const Brand = () => {
    const location = useLocation();
    const getBlogId = location.pathname.split("/")[2];
    const [grid, setGrid] = useState(4);
    const dispatch = useDispatch();
    const productState = useSelector((state)=> state?.product.product);
    const productState1 = useSelector((state) => state?.product.allproduct);
    const brandState = useSelector(state => state?.brand?.brands)
    const categoryState = useSelector(state => state?.catogory?.categorys)
    const productLength = productState1?.length;
    const [brands, setBrands] = useState([])
    const [brand, setBrand] = useState(getBlogId)
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState(null)
    const [tags, setTags] = useState(null)
    const [colors, setColors] = useState([])
    const [color, setColor] = useState(null)

    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)
    

    const [sort, setSort] = useState(null)
    const [page, setCurrentPage] = useState(1); // State lưu trữ trang hiện tại
    const limit = 6;  

    useEffect(()=> {
        let newBrands = [];
        let category = [];
        let tag = [];
        let newColor = []

        for (let index = 0; index < productState?.length; index++) {
        const element = productState[index];
        newBrands.push(element.brand);
        category.push(element.category);
        tag.push(element.tags);
        newColor.push(element.color);
        }
        
        setBrands(newBrands)
        setCategories(category)
        setTags(tags)
        setColors(newColor)
    }, [productState]);

    const indexOfLastProduct = page * limit;
    const indexOfFirstProduct = indexOfLastProduct - limit;
    const currentProducts = productState?.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(productLength / limit);
    console.log(totalPages)

    useEffect(()=>{
      dispatch(getAllPro());
      dispatch(getBrands());
      dispatch(getCategorys());
    },[])

    useEffect(()=>{
        getProducts();
    }, [page, limit,sort, tags, brand, category, minPrice, maxPrice])
    const getProducts = () => {
        dispatch(getAllProducts({page,limit,sort, tags, brand, category, minPrice, maxPrice}));
    };


    const handlePageChange = (pageNumber) => {
        if (page < totalPages) {
        setCurrentPage(pageNumber + 1);
        }
    };

     const handleNextPage = () => {
       if (page < totalPages) {
         setCurrentPage(page + 1);
       }
     };

     // Function để quay lại trang trước đó
     const handlePrevPage = () => {
       if (page > 1) {
         setCurrentPage(page - 1);
       }
     };
     const displayPageNumbers = () => {
    const visiblePageNumbers = 5;
    let startPage = Math.max(1, page - Math.floor(visiblePageNumbers / 2));
    let endPage = Math.min(totalPages, startPage + visiblePageNumbers - 1);

    if (endPage - startPage + 1 < visiblePageNumbers) {
        startPage = Math.max(1, endPage - visiblePageNumbers + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
        <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={page === i ? 'active' : ''}
        >
            {i}
        </button>
        );
    }

  return pageNumbers;
};
  return (
    <>
      <Meta title={getBlogId} />
      <BreadCrumb title={getBlogId} />
            <div className='store-wrapper home-wrapper-2 py-5'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-12 d-flex flex-column justify-content-center align-items-center'>
                        <h1>{getBlogId}</h1>
                        <div className='col-6'>
                            <Marquee speed={10}>
                            {
                            brandState?.map((item, index)=>{
                                return(
                                <div onClick={()=> setBrand(item?.title)} key={index} style={{ backgroundColor: 'white', margin:'10px 10px', padding: '20px 20px'}}>
                                    <img src={item?.images[0]?.url}  width={150}/>
                                    <h6>{item?.title}</h6>
                                </div>
                                )
                            })
                            }
                        </Marquee>
                        </div>
                        </div>
                        <div className='col-3'>
                            <div className='filter-card mb-3' style={{ padding:'30px 30px'}}>
                                <h3 className='filter-title' style={{fontSize:'18px', fontWeight:'bold'}}>Shop By Categories</h3>
                                <div>
                                <ul>
                                    {
                                    categoryState?.map((item, index) => {
                                        return(
                                        <li style={{ listStyle:'square'}} key={index} onClick={()=> setCategory(item?.title)}>{item?.title}</li>
                                        )
                                    })
                                    }
                                </ul>
                                </div>
                            </div>
                            <div className='filter-card mb-3' style={{ padding:'30px 30px'}}>
                                <h3 className='filter-title' style={{ fontSize:'18px', fontWeight:'bold'}}>Filter By</h3>
                                <div>
                                    
                                    <h5 className='sub-title'>Price</h5>
                                    <div className='d-flex align-items-center gap-10'>
                                        <div class="form-floating ">
                                        <input 
                                            type="number" 
                                            class="form-control" 
                                            id="floatingInput" 
                                            placeholder="name@example.com"
                                            onChange={(e)=> setMinPrice(parseInt(e.target.value, 10))}
                                            />
                                        <label for="floatingInput">From</label>
                                        </div>
                                        <div class="form-floating">
                                        <input 
                                            type="number" 
                                            class="form-control" 
                                            id="floatingInput2" 
                                            placeholder="name@example.com"
                                            onChange = {
                                            (e) => setMaxPrice(parseInt(e.target.value, 10))
                                            }
                                            />
                                        <label for="floatingInput2">To</label>
                                        </div>
                                    </div>
                                    <h5 className='sub-title'>Color</h5>
                                    <div>
                                    <div className='d-flex flex-wrap'>
                                        <ul className='colors ps-0'>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        </ul>
                                    </div>
                                    </div>
                                
                                </div>
                                <div className='mt-4 mb-3'>
                            <h3 className='sub-title'>Product Tag</h3>
                            <div>
                                <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                                <span onClick={()=> setTags("NEW")}  className='text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3'>
                                    NEW
                                </span>
                                <span onClick={()=> setTags("BESTSELLER")}  className='text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3'>
                                    BESTSELLER
                                </span>
                                <span onClick={()=> setTags("SALE")}  className='text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3'>
                                    SALE
                                </span>
                                </div>
                            </div>
                            </div>
                            </div>
                        </div>
                        <div className='col-9'>
                        <div className='filter-sort-grid mb-4'>
                            <div className='d-flex justify-content-between align-items-center'>
                            <div className='d-flex align-items-center gap-10'>
                                <p className='mb-0 d-block' style={{ width: "100px", fontWeight:'bold',}}>Sort By:</p>
                                <select 
                                name='' 
                                className='form-control form-select' 
                                id=''
                                defaultValue={"manula"}
                                onChange={(e)=>setSort(e.target.value)}
                                >
                                <option value="title">Featured</option>
                                <option value="-title">2</option>
                                <option value="price">Featured</option>
                                <option value="-price">3</option>
                                <option value="createAt">5</option>
                                <option value="-createAt">6</option>
                                </select>
                            </div>

                            <div className='d-flex align-items-center gap-10'>
                                <p className='totalproducts mb-0'>23 Product</p>
                                <div className='d-flex gap-10 align-items-center grid'>
                                <img onClick={()=>{
                                    setGrid(3);
                                }}
                                src={gr4} className='d-block img-fluid' alt='grid' 
                                />

                                <img onClick={()=>{
                                    setGrid(4);
                                }}
                                src={gr3} className='d-block img-fluid' alt='grid' 
                                />

                                <img onClick={()=>{
                                    setGrid(6);
                                }}
                                src={gr2} className='d-block img-fluid' alt='grid' 
                                />
                                
                                <img onClick={()=>{
                                    setGrid(12);
                                }}
                                src={gr} className='d-block img-fluid' alt='grid' 
                                />
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className='products-list pb-5'>
                            <div className='d-flex gap-10 flex-wrap'>
                            <ProductCart data={productState ? productState : []} grid={grid} />

                            <div className='pagination'>
                                {/* Nút "Previous" */}
                                <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
                                
                                {/* Tạo các nút trang */}
                            {displayPageNumbers()}
                                
                                {/* Nút "Next" */}
                                <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
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

export default Brand
