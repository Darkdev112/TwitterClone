import React,{useCallback, useState} from 'react'
import { newSelector, newDispatch } from '../../../redux-hooks';
import { inClose } from '../../../slice/registerSlice';
import { onOpen } from '../../../slice/loginSlice';
import Input from '../Input';
import Modal from '../Modal';

const LoginModal = () => {

  const loginState = newSelector((state) => state.login)
  const registerState = newSelector((state) => state.register)
  const dispatch = newDispatch();

  const [name,setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')
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

      dispatch(inClose())
    }
    catch(error){
      console.log(error);
    }
    finally{
      setIsLoading(false);
    }
  },[registerState])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input
        placeholder='Name'
        onChange={(e)=>{setName(e.target.value)}}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder='Username'
        onChange={(e)=>{setUsername(e.target.value)}}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder='Email'
        onChange={(e)=>{setEmail(e.target.value)}}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder='Password'
        onChange={(e)=>{setPassword(e.target.value)}}
        value={password}
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