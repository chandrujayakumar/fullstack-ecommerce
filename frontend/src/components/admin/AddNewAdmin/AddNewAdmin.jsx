import React, { useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material'
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { addNewAdmin } from '../../../features/admin/adminThunks';


  const Input = styled(TextField)(({ theme }) => ({
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
    "& input[type=number]": {
      MozAppearance: "textfield",
    },
  }));

const AddNewAdmin = ({ popup, setPopup }) => {

    const dispatch = useDispatch()

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const handleAddNewAdminForm = (event) => {
        event.preventDefault()

        const addNewAdminForm = new FormData()

        addNewAdminForm.set('fullname', fullName)
        addNewAdminForm.set('email', email)
        addNewAdminForm.set('role', role)

        dispatch(addNewAdmin(addNewAdminForm))
    }

    const handleFullNameChange = (e) => {
        setFullName(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleRoleChange = (e) => {
        setRole(e.target.value)
    }

    const closeAddNewAdminProduct = () => {
        setPopup(false)
    }

    useEffect(() => {
        if(!popup){
            setFullName('')
            setEmail('')
            setRole('')
        }
    }, [popup])

  return (
    <>
        {popup && (
            <div className='z-[6000] fixed left-0 top-0 right-0 w-full h-full bg-[rgba(0,0,0,0.7)] flex-center backdrop-blur-[6px]'>
                <div className='relative flex-center w-[420px] h-auto bg-white shadow-xl border-lightGray3 border-[1px] rounded-[5px] px-[3rem] py-[2rem]'>
                    <FontAwesomeIcon 
                        className='z-[100] absolute top-2 right-2 cursor-pointer hover:text-mediumGray2' 
                        onClick={closeAddNewAdminProduct}
                        icon={faClose}/>
                    <form className='w-full h-full flex-center flex-col gap-[2rem]' onSubmit={handleAddNewAdminForm}>
                        <h3 className='text-[30px] font-extrabold text-mediumGray'>Add New Admin</h3>
                        <div className='flex-center flex-col gap-[1rem] w-full'>
                            <Input label="Full Name" variant='outlined' type="text" size='medium' InputProps={{ sx: { fontFamily: 'Montserrat, sans-serif', '& .MuiOutlinedInput-notchedOutline': { borderRadius: '2px' } } }} InputLabelProps={{ sx: { fontFamily: 'Montserrat, sans-serif' } }} fullWidth value={fullName} onChange={handleFullNameChange} required />
                            <Input label="Email" variant="outlined" type='text' size='medium' InputProps={{ sx: { fontFamily: 'Montserrat, sans-serif', '& .MuiOutlinedInput-notchedOutline': { borderRadius: '2px' } } }} InputLabelProps={{ sx: { fontFamily: 'Montserrat, sans-serif' } }} fullWidth value={email} onChange={handleEmailChange} required />
                            <select className={`cursor-pointer w-full bg-transparent border-[1px] border-lightGray2 hover:border-mediumGray rounded-[2px] py-[1rem] px-[1rem] ${role === '' ? "text-mediumGray2" : "text-black"} bg-white`} value={role} onChange={handleRoleChange} required>
                                <option className='text-mediumGray' value="">Role</option>
                                <option className='text-mediumGray' value="admin">Admin</option>
                                <option className='text-mediumGray' value="project manager">Project Manager</option>
                                <option className='text-mediumGray' value="software architect">Software Architect</option>
                                <option className='text-mediumGray' value="users manager">Users Manager</option>
                                <option className='text-mediumGray' value="sellers manager">Sellers Manager</option>
                                <option className='text-mediumGray' value="orders manager">Orders Manager</option>
                                <option className='text-mediumGray' value="content manager">Content Manager</option>
                                <option className='text-mediumGray' value="finance manager">Finance Manager</option>
                                <option className='text-mediumGray' value="hr manager">HR Manager</option>
                                <option className='text-mediumGray' value="customer support manager">Customer Support Manager</option>
                                <option className='text-mediumGray' value="marketing manager">Marketing Manager</option>
                                <option className='text-mediumGray' value="it manager">IT Manager</option>
                                <option className='text-mediumGray' value="compliance officer">Compliance Officer</option>
                                <option className='text-mediumGray' value="operations manager">Operations Manager</option>
                            </select>
                            <Button variant='contained' type='Add' sx={{ width: "100%", height: "2.7rem", fontFamily: 'Montserrat, sans-serif' }}>    
                                Add
                            </Button>
                        </div>
                    </form>
                </div>
            </div>  
        )}
    </>
  )
}

export default AddNewAdmin