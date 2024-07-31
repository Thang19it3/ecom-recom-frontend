import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import  * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../components/CustomInput';
import { loginUser } from '../features/user/userSlice';

const loginSchema = yup.object({
  email: yup.string().nullable().email("Email should be valid").required("Email address is required"),
  password: yup.string().required("Password is Required"),
});

const Login = () => {
  const authState = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values))
      navigate('/')
    },
  })
  return (
    <>
     <Meta title={"Login"}></Meta> 
     <BreadCrumb title="Login"></BreadCrumb>

     <div className='login-wrapper py-5 home-wrapper-2'>
      <div className='row'>
        <div className='col-12'>
          <div className='auth-card'>
            <h3 className='text-center' style={{ marginBottom:"20px"}}>Login</h3>
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
                <CustomInput 
                  type='password' 
                  name='password' 
                  className='form-control'
                  value = { formik.values.password}
                  onChange = {formik.handleChange("password")}
                  onBlur = {formik.handleBlur("password")}
                    />
                  <div className='error'>
                    {
                      formik.touched.password && formik.errors.password
                    }
                  </div>
              <div>
                <Link to='/forgot-password'>Forgot Password</Link>
              </div>
               <div>
                <div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
                  <button type='submit' className='button border-0'>Login</button>
                  <button className='button border-0'>Sign Up</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
     </div>
    </>
  )
}

export default Login
