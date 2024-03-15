import React, { useState } from 'react'
import axios from 'axios'
import Joi  from'joi'

const Register = () => {
  const [loading, setloading] = useState(false)
  const [errorList, setErrorList] = useState([])
    const [user, setuser] = useState({
        first_name:'',
        last_name:'',


        age:0,
        password:''

    })

    const handleUser=(e)=>{
      
        let myUser={...user}
        myUser[e.target.name]= e.target.value
        setuser(myUser)
        displatError(user)
    //   setuser(prev=>{return{...prev, ...myUser}})
      // console.log(user);
      
    }
    const displatError=(user)=>{
      console.log(user);
      let validatrResult=validateRegister(user)
        if(validatrResult.error){
          setloading(false)
          setErrorList(validatrResult.error.details)
        }else{
             setErrorList([])
        }
    }
    const handleRegister=async(e)=>{
        e.preventDefault()
        let validatrResult=validateRegister(user)
        console.log(validatrResult);
        if(validatrResult.error){
setloading(false)
setErrorList(validatrResult.error.details)
        }else{
          let response=await axios.post(`http://localhost:3000/signup`,user)
        console.log(response.data);
        setloading( true)
        if(response){
          setloading(false)
        }else{
          setloading(false)
          alert(`error`)
        }
        }
        
    }
    function validateRegister(user){
      let schema=Joi.object({
        first_name:Joi.string().alphanum().min(3).max(30).required(),
        last_name:Joi.string().alphanum().min(3).max(10).required(),
        age:Joi.number().min(18).max(90).required(),
        // email:Joi.string().required(),
        password:Joi.string()
      })
    return schema.validate(user,{abortEarly : false})
    }
  return (
    <div>
        <div className='container  m-auto my-3 p-3'>
            <h1 className='text-center'>Register</h1>
            {
              errorList.map((ele,index)=>{
                return (
                  <div key={index} className='alert alert-danger'>{ele.message}</div>
                )
              })
            }
            
<form onSubmit={handleRegister}>
    <label htmlFor='first_name'>FIRST NAME:
    </label>
    <input type="text" placeholder="firstnamr" className='form-control my-2' name='first_name' id='first_name'onChange={handleUser}/>

    <label htmlFor='last_name'>LAST NAME:
    </label>
    <input type="text" placeholder="lastname" className='form-control my-2' name='last_name' id='last_name'onChange={handleUser}/>

    <label htmlFor='age'>AGE:
    </label>
    <input type="number" placeholder="age" className='form-control my-2' name='age' id='age'onChange={handleUser}/>

    <label htmlFor='password'>PASSWORD:
    </label>
    <input type="password" placeholder="password" className='form-control my-2' name='password' id='password' onChange={handleUser}/>
<button className='btn btn-outline-info'>{loading?<i className='fa  fa-spinner'></i>:'Register'}</button>
</form>
        </div>
    </div>
  )
}

export default Register