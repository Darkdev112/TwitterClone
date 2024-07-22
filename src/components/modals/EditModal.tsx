import React,{useState, useEffect, useCallback} from 'react'
import Input from '../Input';
import useUser from '../../../hooks/useUser';
import useCurrentUser from '../../../hooks/useCurrentUser';
import { newDispatch, newSelector } from '../../../redux-hooks';
import axios from 'axios';
import { toast } from 'react-toastify';
import { onClose } from '../../../slice/EditSlice';
import Modal from '../Modal';
import ImageUpload from '../ImageUpload';

const EditModal = () => {
    const {data : currentUser} = useCurrentUser();
    const {mutate : mutateFetchedUser} = useUser(currentUser?.id);
    const isOpen = newSelector((state => state.edit.isOpen))
    const dispatch = newDispatch();
    
    const [profileImage, setProfileImage] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");

    useEffect(() => {
      setProfileImage(currentUser?.profileImage)
      setCoverImage(currentUser?.coverImage)
      setName(currentUser?.name)
      setUsername(currentUser?.username)
      setBio(currentUser?.bio)
    }, [currentUser])
    
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)

            await axios.patch('/api/edit',{
                name,
                username,
                bio,
                profileImage,
                coverImage
            })
            mutateFetchedUser();

            toast.success('Successfully updated', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            
            dispatch(onClose());
        } catch (error) {
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
        } finally{
            setIsLoading(false)
        }    
      },[bio, name, username, profileImage, coverImage, isOpen, mutateFetchedUser, ])
    
      const bodyContent = (
        <div className='flex flex-col gap-4'>
            <ImageUpload
                value={profileImage}
                disabled ={isLoading}
                onChange ={(image) => setProfileImage(image)}
                label="Upload profile image"
            />
            <ImageUpload
                value={coverImage}
                disabled ={isLoading}
                onChange ={(image) => setCoverImage(image)}
                label="Upload cover image"
            />
            <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}    
            />
            <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}    
            />
            <Input
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                disabled={isLoading}    
            />     
        </div>
      )
      
  return (
    <Modal
        disabled={isLoading}
        isOpen={isOpen}
        title="Edit your profile"
        actionLabel='Save'
        onClose={() => {dispatch(onClose())} }
        onSubmit={onSubmit}
        body={bodyContent}
    />
  )
}

export default EditModal