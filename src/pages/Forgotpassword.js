import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from './../components/BreadCrumb';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import CustomInput from '../components/CustomInput';
import { forgotPasswordToken } from '../features/user/userSlice';

const emailSchema = yup.object({
  email: yup.string().nullable().email("Email should be valid").required("Email address is required"),
});

const Forgotpassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
        initialValues: {
          email: "",
        },
        validationSchema: emailSchema,
        onSubmit: (values) => {
          dispatch(forgotPasswordToken(values))
        },
        })
  return (
    <div>
      <Meta title={"Forgot Password"} />
      <BreadCrumb title="Forgot Password" />
      <div className='login-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          <div className='col-12'>
            <div className='auth-card'>
              <h3 className='text-center mb-3'>Login</h3>
              <form 
              action=''
              onSubmit={formik.handleSubmit}
              className='d-flex flex-column gap-15'>
                <CustomInput 
                type='email' 
                name='email' 
                className='form-control' 
                value = { formik.values.email}
                onChange = {formik.handleChange("email")}
                onBlur = {formik.handleBlur("email")}
                  />
                <div className='error'>
                  {
                    formik.touched.email && formik.errors.email
                  }
                </div>
               <div>
                <div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
                  <button type='submit' className='button border-0'>Login</button>
      
                </div>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forgotpassword
