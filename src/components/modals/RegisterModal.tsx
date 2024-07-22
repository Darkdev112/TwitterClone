import React,{useCallback, useState} from 'react'
import { newSelector, newDispatch } from '../../../redux-hooks';
import { inClose } from '../../../slice/registerSlice';
import { onOpen } from '../../../slice/loginSlice';
import Input from '../Input';
import Modal from '../Modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import { setName, setEmail, setPassword, setUsername } from '../../../slice/clientDetailsSlice';

const LoginModal = () => {

  const loginState = newSelector((state) => state.login)
  const registerState = newSelector((state) => state.register)
  const clientDetailsState = newSelector((state) => state.clientDetails )
  const dispatch = newDispatch();
  const [isLoading, setIsLoading] = useState(false)


  const onToggle = useCallback(() => {
    if(isLoading){
      return;
    }

    dispatch(inClose());
    dispatch(onOpen());
  },[isLoading,registerState,loginState]) 

  const handleSubmit = useCallback(async () => {
    try{
      setIsLoading(true); 
        console.log(clientDetailsState)
        await axios.post('/api/register', clientDetailsState)

        toast.success('Account created successfully', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });

          signIn('credentials',{
            email : clientDetailsState.email,
            password : clientDetailsState.password
          })
          dispatch(setName(""))
          dispatch(setEmail(""))
          dispatch(setPassword(""))
          dispatch(setUsername(""))
      dispatch(inClose())
    }
    catch(error){
      console.log(error);
      toast.error('Something went wrong', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
    finally{
      setIsLoading(false);
    }
  },[registerState, clientDetailsState])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input
        key="name"
        placeholder='Name'
        onChange={(e)=>{dispatch(setName(e.target.value))}}
        value={clientDetailsState.name}
        disabled={isLoading}
      />
      <Input
        key="username"
        placeholder='Username'
        onChange={(e)=>{dispatch(setUsername(e.target.value))}}
        value={clientDetailsState.username}
        disabled={isLoading}
      />
      <Input
        key="email"
        placeholder='Email'
        onChange={(e)=>{dispatch(setEmail(e.target.value))}}
        value={clientDetailsState.email}
        disabled={isLoading}
      />
      <Input
        key="password"
        placeholder='Password'
        type='password'
        onChange={(e)=>{dispatch(setPassword(e.target.value))}}
        value={clientDetailsState.password}
        disabled={isLoading}
      />
    </div>
  )

  const footerContent = (
    <div className='text-neutral-400 text-center mt-4'>
      <p>Already have an account? <span onClick={onToggle} className='text-white cursor-pointer hover:underline'>
          Sign in
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerState.isOpen}
      title="Create an account"
      actionLabel='Register'
      onClose={()=>{dispatch(inClose())}}
      onSubmit={handleSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal