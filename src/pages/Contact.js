import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import * as yup  from 'yup'
import {useFormik} from 'formik'
import { useDispatch } from 'react-redux';
import { createQuery } from '../features/contact/contactSlice';

const contactShema = yup.object({
  name: yup.string().required("name is required"),
  email: yup.string().nullable().email("Email should be valid").required("name is required"),
  mobile: yup.string().default('').nullable().required("mobile is required"),
  comment: yup.string().default('').nullable().required("Comemnt is required"),
})

const Contact = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues:{
      name: '',
      mobile: '',
      email: '',
      comment: '',
    },
    validationSchema: contactShema,
    onSubmit: values => {
      dispatch(createQuery({name: values.name, email: values.email, mobile: values.mobile, comment: values.comment}));
    }
  })
  return (
    <>
      <Meta title={"Contact Us"} />
      <BreadCrumb title="Contact Us" />
      <div className='contact-wrapper home-wrapper-2 py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21385.880128144177!2d108.24127551476778!3d15.986727949796101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142108997dc971f%3A0x1295cb3d313469c9!2sVietnam%20-%20Korea%20University%20of%20Information%20and%20Communication%20Technology.!5e0!3m2!1sen!2s!4v1696953793972!5m2!1sen!2s" width="600" height="450" style={{"border" :"0"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              className='border-0 w-100'
              ></iframe>
            </div>

            <div className='col-12 mt-5'>
              <div className='contact-inner-wrapper d-flex justify-content-between'>
                <div>
                  <h3 className='contact-title mb-4'>Contact</h3>
                  <form 
                  action=''
                  onSubmit={formik.handleSubmit}
                  className='d-flex flex-column gap-15'>
                    <div>
                      <input 
                        type='text' 
                        className='form-control' 
                        placeholder='Name' 
                        name='name'
                        onChange={formik.handleChange("name")}
                        onBlur={formik.handleBlur("name")}
                        value={formik.values.name}
                        />
                        <div className='error'>
                          {
                            formik.touched.name && formik.errors.name
                          }
                        </div>
                    </div>
                    <div>
                      <input 
                        type='email' 
                        className='form-control' 
                        placeholder='email' 
                        name='email'
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                        value={formik.values.email}
                        />
                        <div className='error'>
                          {
                            formik.touched.email && formik.errors.email
                          }
                        </div>
                    </div>
                    <div>
                     <input 
                        type='tel' 
                        className='form-control' 
                        placeholder='mobile Number' 
                        name='mobile'
                        onChange={formik.handleChange("mobile")}
                        onBlur={formik.handleBlur("mobile")}
                        value={formik.values.mobile}
                        />
                        <div className='error'>
                          {
                            formik.touched.mobile && formik.errors.mobile
                          }
                        </div>
                    </div>
                    <div>
                      <textarea 
                        className='w-100 form-control' 
                        cols="30" 
                        rows="4" 
                        placeholder='Comment'
                        name='comment'
                        onChange={formik.handleChange("comment")}
                        onBlur={formik.handleBlur("comment")}
                        value={formik.values.comment}
                        ></textarea>
                        <div className='errors'>
                          {
                            formik.touched.comment && formik.errors.comment
                          }
                        </div>
                    </div>
                    <div>
                      <button type='submit' className='button border-0'>Submit</button>
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className='contact-title mb-4'>Contact</h3>
                  <div>
                    <ul className='ps-0'>
                      <li>
                        <img />
                      </li>
                    </ul>
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

export default Contact;
