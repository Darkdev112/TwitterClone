import React,{useCallback, useState} from 'react'
import { newSelector, newDispatch } from '../../../redux-hooks';
import { onClose } from '../../../slice/loginSlice';
import { inOpen } from '../../../slice/registerSlice';
import Input from '../Input';
import Modal from '../Modal';
import { signIn } from 'next-auth/react';

const LoginModal = () => {
  const registerState = newSelector((state) => state.register)
  const loginState = newSelector((state) => state.login)
  const dispatch = newDispatch();

  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const onToggle = useCallback(() => {
    if(isLoading){
      return;
    }

    dispatch(onClose());
    dispatch(inOpen());
  },[isLoading,registerState,loginState])

  const handleSubmit = useCallback(async () => {
    try{
      setIsLoading(true);
      signIn('credentials',{
        email,
        password
      })
      dispatch(onClose())
    }
    catch(error){
      console.log(error);
    }
    finally{
      setIsLoading(false);
    }
  },[loginState, email, password])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input
        placeholder='Email'
        onChange={(e)=>{setEmail(e.target.value)}}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder='Password'
        onChange={(e)=>{setPassword(e.target.value)}}
        type='password'
        value={password}
        disabled={isLoading}
      />
    </div>
  )

  const footerContent = (
    <div className='text-neutral-400 text-center mt-4'>
      <p>First time using Twitter? <span onClick={onToggle} className='text-white cursor-pointer hover:underline'>
          Create an account
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginState.isOpen}
      title="Login"
      actionLabel='Sign in'
      onClose={()=>{dispatch(onClose())}}
      onSubmit={handleSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal