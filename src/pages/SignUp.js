import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { Link } from 'react-router-dom'
import CustomInput from './../components/CustomInput';
import { useFormik } from 'formik'
import  * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser} from '../features/user/userSlice'
import { District, Province, Ward } from '../features/ghtk/GhtkSlice';

const signupSchema = yup.object({
  firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("Last Name is Required"),
  email: yup.string().nullable().email("Email should be valid").required("Email address is required"),
  mobile: yup
    .string()
    .required("Mobile no is Required")
    .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
  password: yup
    .string()
    .required("Password is Required")
    .min(10, "Password must be at least 10 characters")
    .matches(
      /^(?=.*[A-Za-z]).*$/,
      "Password must contain at least one letter"
    ),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match') // Đảm bảo trùng khớp với mật khẩu
    .required('Please confirm your password'),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const province = useSelector((state)=> state?.ghtk?.provinces?.data);
  const district = useSelector((state) => state?.ghtk?.districts?.data);
  const ward = useSelector((state) => state?.ghtk?.wards?.data);

  const [selectedProvinceId, setSelectedProvinceId] = useState('');
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [selectedWardId, setSelectedWardId] = useState('');

  useEffect(() => {
    dispatch(Province());
    dispatch(District());
    dispatch(Ward());
  }, [])

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
      province:"",
      district: "",
      ward: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) =>{
      //alert(JSON.stringify(values));
      dispatch(registerUser(values));
      navigator('/login')
    },
  });

  const handleProvinceChange = (e) => {
    const selectedId = e.target.value;
    formik.setFieldValue('province', selectedId);
    console.log(selectedId)
    setSelectedProvinceId(selectedId);
    


    // Call API to get districts based on selected province_id
    dispatch(District(selectedId));
  };
  const handleDistrictChange = (e) => {
    const selectedId2 = e.target.value;
    console.log(selectedId2)
    setSelectedDistrictId(selectedId2);
    formik.setFieldValue('district', selectedId2);
    dispatch(Ward(selectedId2));

  }
   const handleWardChange = (e) => {
     const selectedId3 = e.target.value;
     console.log(selectedId3)
     setSelectedWardId(selectedId3);
     formik.setFieldValue('ward', selectedId3);
   }
  return (
    <>
     <Meta/>
     <BreadCrumb />
     <div className='login-wrapper py-5 home-wrapper-2'>
      <div className='row'>
        <div className='col-12' style={{ margin: 'none', padding: 'none'}}>
          <div className='auth-card'>
            <h3>Sigin</h3>
            <form 
              action=''
              onSubmit={formik.handleSubmit}
              className='d-flex flex-column gap-15'
            >
                <CustomInput 
                  type='text' 
                  name='firstname' 
                  className='form-control' 
                  placeholder='First Name'
                  value = { formik.values.firstname}
                  onChange = {formik.handleChange("firstname")}
                  onBlur = {formik.handleBlur("firstname")}
                  />
                <div className='error'>
                  {
                    formik.touched.firstname && formik.errors.firstname
                  }
                </div>
                <CustomInput 
                  type='text' 
                  name='lastname' 
                  className='form-control' 
                  placeholder='Last Name'
                  value = { formik.values.lastname}
                  onChange = {formik.handleChange("lastname")}
                  onBlur = {formik.handleBlur("lastname")}
                  />
                <div className='error'>
                  {
                    formik.touched.lastname && formik.errors.lastname
                  }
                </div>
                <CustomInput 
                  type='email' 
                  name='email' 
                  className='form-control' 
                  placeholder='email'
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
                  type='tel' 
                  name='mobile' 
                  className='form-control' 
                  placeholder='Mobile Number'
                  value = { formik.values.mobile}
                  onChange = {formik.handleChange("mobile")}
                  onBlur = {formik.handleBlur("mobile")}
                  />
                <div className='error'>
                  {
                    formik.touched.mobile && formik.errors.mobile
                  }
                </div>
                <CustomInput 
                  type='password' 
                  name='password' 
                  className='form-control' 
                  placeholder='Password'
                  value = { formik.values.password}
                  onChange = {formik.handleChange("password")}
                  onBlur = {formik.handleBlur("password")}
                  />
                <div className='error'>
                  {
                    formik.touched.password && formik.errors.password
                  }
                </div>
                <CustomInput 
                  type='password' 
                  name='confirmPassword' 
                  className='form-control' 
                  placeholder='Confirm Password'
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className='error'>
                  {
                    formik.touched.confirmPassword && formik.errors.confirmPassword
                  }
                </div>
                <div className="form-group">
                  <label htmlFor="province">Select Province:</label>
                  <select
                    id="province"
                    name="province"
                    className="form-control"
                    value={selectedProvinceId}
                    onChange={handleProvinceChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select province...</option>
                    {province?.map((province) => (
                      <option key={province?.ProvinceId} value={province?.ProvinceID}>
                        {province?.ProvinceName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="district">Select district:</label>
                  <select
                    id="province"
                    name="province"
                    className="form-control"
                    value={selectedDistrictId}
                    onChange={handleDistrictChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select district...</option>
                    {
                      district?.map((district) => (
                      <option key={district?.DistrictID} value={district?.DistrictID}>
                        {district?.DistrictName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="district">Select Ward:</label>
                  <select
                    id="province"
                    name="province"
                    className="form-control"
                    value={selectedWardId}
                    onChange={handleWardChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select ward...</option>
                    {
                      ward?.map((district) => (
                      <option key={district?.WardCode} value={district?.WardCode}>
                        {district?.WardName}
                      </option>
                    ))}
                  </select>
                </div>

              <div>
                <Link to='/forgot-password'>Forgot Password</Link>
              </div>
              <div>
                <div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
                  <button type='submit' className='button border-0'>Sign Up</button>
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

export default SignUp
