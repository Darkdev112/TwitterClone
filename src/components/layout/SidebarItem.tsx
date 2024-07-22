import { useRouter } from 'next/router'
import {useCallback} from 'react'
import React, { FC } from 'react'
import { IconType } from 'react-icons/lib'
import useCurrentUser from '../../../hooks/useCurrentUser'
import { newDispatch, newSelector } from '../../../redux-hooks'
import { onOpen } from '../../../slice/loginSlice'

interface SidebarProps{
  label : string
  href : string
  icon : IconType
  onClick? : () => void
  auth? : boolean
}

const SidebarItem : FC<SidebarProps>= ({label, href, icon : Icon, onClick, auth}) => {
  const router = useRouter();
  const {data : currentUser} = useCurrentUser();
  const loginState = newSelector((state)=>state.login);
  const dispatch = newDispatch()
  const handleClick = useCallback(() => {
    if(onClick)
    {
      return onClick()
    }
    
    if(auth && !currentUser){
      dispatch(onOpen())
    }
    else if(href){
      router.push(href)
    }
  },[router, href, onClick, loginState, auth, currentUser])
  return (
    <div onClick={handleClick} className='flex flex-row items-center'>
      <div className='
        relative
        rounded-full
        h-14
        w-14
        flex
        items-center
        justify-center
        p-4
        hover:bg-slate-300
        hover:bg-opacity-10
        cursor-pointer
        lg:hidden 
      '>
          <Icon size={28} color="white"/> 
      </div>
      <div className='
        relative
        hidden
        lg:flex
        items-center
        gap-4
        p-4
        rounded-full
        hover:bg-slate-300
        hover:bg-opacity-10
        cursor-pointer
      '>
        <Icon size={24} color="white"/>
        <p className='hidden lg:block text-white text-xl'>{label}</p>
      </div>
    </div>
  )
}



export default SidebarItem