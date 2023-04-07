import { signInWithEmailAndPassword, updatePassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { auth, db } from '../../../../config/firebase';
import appContext from '../../../../context/AppContext';
import { passwordRegex } from '../../../../utils/schema';
import './Settings.css'

const Box = () => {
    return (
       <div style={{marginBottom: '1rem'}} className='box_div nav'>
            <div className='fdrow gap1 jcsevenly'>
                    <NavLink to={'changepassword'} className='mini_nav' >
                        <div className='fdrow not aic gap02'>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C7.31051 0 6.15738 0.265343 5.07166 0.559653C3.96156 0.860567 2.84316 1.21461 2.18528 1.42928C1.63625 1.60844 1.22098 2.09359 1.14123 2.69209C0.544608 7.16942 1.92804 10.4869 3.606 12.682C4.44183 13.7754 5.35024 14.5904 6.12309 15.1354C6.50924 15.4077 6.86713 15.6165 7.17105 15.7596C7.45186 15.8918 7.7523 16 8 16C8.24771 16 8.54814 15.8918 8.82896 15.7596C9.13287 15.6165 9.49076 15.4077 9.87691 15.1354C10.6498 14.5904 11.5582 13.7754 12.394 12.682C14.072 10.4869 15.4554 7.16942 14.8588 2.6921C14.779 2.09359 14.3637 1.60844 13.8147 1.42928C13.1568 1.21461 12.0384 0.860567 10.9283 0.559652C9.84262 0.265343 8.68949 0 8 0ZM8 5C8.82843 5 9.5 5.67157 9.5 6.5C9.5 7.15311 9.0826 7.70873 8.5 7.91465L8.88494 9.90506C8.94461 10.2136 8.70826 10.5 8.39404 10.5H7.60596C7.29174 10.5 7.05539 10.2136 7.11506 9.90506L7.5 7.91465C6.9174 7.70873 6.5 7.15311 6.5 6.5C6.5 5.67157 7.17157 5 8 5Z" fill="black"/>
                            </svg>
                            <h4 className='montitle'>Change Password</h4>
                        </div>
                    </NavLink>
                    {/* <NavLink to={'makedeposit'} className='mini_nav' >
                        <div className='fdrow aic not gap02'>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.5 9.511C5.5763 10.4645 6.32909 11.2078 7.6821 11.2958V12H8.2823V11.291C9.68108 11.1932 10.5 10.445 10.5 9.35941C10.5 8.37164 9.87436 7.86308 8.75534 7.59902L8.2823 7.48655V5.56968C8.8825 5.63814 9.26399 5.96577 9.35554 6.42054H10.4084C10.3321 5.50122 9.54374 4.7824 8.2823 4.70416V4H7.6821V4.71883C6.48677 4.83619 5.67294 5.55501 5.67294 6.57213C5.67294 7.47188 6.27823 8.04401 7.28535 8.27873L7.6821 8.37653V10.4108C7.06663 10.3178 6.65972 9.98044 6.56816 9.511H5.5ZM7.67701 7.34474C7.08698 7.20782 6.76653 6.9291 6.76653 6.50856C6.76653 6.03912 7.11241 5.68704 7.6821 5.58435V7.34474H7.67701ZM8.36877 8.5379C9.08596 8.70416 9.41658 8.97311 9.41658 9.44743C9.41658 9.99022 9.00458 10.3619 8.2823 10.4303V8.51834L8.36877 8.5379Z" fill="black"/>
                                <path d="M8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill="black"/>
                                <path d="M8 13.5C4.96243 13.5 2.5 11.0376 2.5 8C2.5 4.96243 4.96243 2.5 8 2.5C11.0376 2.5 13.5 4.96243 13.5 8C13.5 11.0376 11.0376 13.5 8 13.5ZM8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" fill="black"/>
                            </svg>
                            <h4 className='montitle'>Make Deposit</h4>
                        </div>
                    </NavLink> */}
            </div>
       </div> 
    );
}

const FormBox = ({ userData }) => {
    const [isEditPersonalInfoLoading, setIsEditPersonalInfoLoading] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [error, setError] = useState(false)
    
    const getName = (type) => {
        const fullName = userData?.full_name || ''
        const split = fullName.split(' ')
        if(type === 1){
            return split[0] || ''
        }else if(type === 2){
            return split[1] || ''
        }
    }
    
    const initialValues = {
        email: userData?.email || "",
        firstname: getName(1),
        lastname:  getName(2),
        city: userData?.city || "",
        country: userData?.country || "",
        wallet_address: userData?.wallet_address || "",
    }
    const [values, setValues] = useState(initialValues) 
    useEffect(()=>{
        setValues(initialValues)
    },[userData])
    
    const handleFieldChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
        // setInValue(value)
    }

    const handleEditUser = (e) => {
        setIsEditPersonalInfoLoading(true)
        setIsSubmit(true)
        setError('')
        e.preventDefault()
        updateProfile(values)
    }

    const updateProfile = async(values) => {
        console.log(values)
        try{
            const userDoc = doc(db, "User", userData?.id)
            await updateDoc(userDoc, {email: values.email, full_name: values.firstname + ' ' + values.lastname, city: values.city, country: values.country, wallet_address: values.wallet_address})
            setIsEditPersonalInfoLoading(false)
        }catch(err){
            console.log(err.message)
            setError(err.message)
            setIsEditPersonalInfoLoading(false)
        }
    }

    return (
       <div className='box_div settings nav'>
            <div className='fdcol gap1 jcsevenly w100p'>
                <h5 className='monbigtitle'>Personal Information</h5>
                <div className='underline'></div>
                <form onSubmit={handleEditUser}>
                    <div className='formpartcontainer w100p'>
                        <div className='inputBox'>
                            <label htmlFor={'firstname'}>First Name</label>
                            <input 
                            type='text'
                            id={'Firstname'}
                            name={'firstname'}
                            placeholder={'John'}
                            value={values.firstname}
                            onChange={handleFieldChange}
                            />
                        </div>
                        <div className='inputBox'>
                            <label htmlFor={'lastname'}>Last Name</label>
                            <input 
                            type={'text'}
                            id={'Lastname'}
                            name={'lastname'}
                            placeholder={'Smith'}
                            value={values.lastname}
                            onChange={handleFieldChange}
                            />
                        </div>
                    </div>
                    <div className='formpartcontainer full w100p'>
                        <div className='inputBox'>
                            <label htmlFor={'Email'}>Email</label>
                            <input 
                            type={'email'}
                            id={'Email'}
                            name={'email'}
                            placeholder={'abc@gmail.com'}
                            value={values.email}
                            onChange={handleFieldChange}
                            />
                        </div>
                    </div>
                    <div className='formpartcontainer w100p'>
                        <div className='inputBox'>
                            <label htmlFor={'city'}>City</label>
                            <input 
                            type='text'
                            id={'City'}
                            name={'city'}
                            placeholder={'New York'}
                            value={values.city}
                            onChange={handleFieldChange}
                            />
                        </div>
                        <div className='inputBox'>
                            <label htmlFor={'country'}>Country</label>
                            <input 
                            type='text'
                            id={'Country'}
                            name={'country'}
                            placeholder={'United States'}
                            value={values.country}
                            onChange={handleFieldChange}
                            />
                        </div>
                    </div>
                    <div className='formpartcontainer full w100p'>
                        <div className='inputBox'>
                            <label htmlFor={'wallet_address'}>Wallet Address</label>
                            <input 
                            type={'text'}
                            id={'Wallet_address'}
                            name={'wallet_address'}
                            placeholder={'Your btc address here'}
                            value={values.wallet_address}
                            onChange={handleFieldChange}
                            />
                        </div>
                    </div>
                    <div className='formpartcontainer full w100p'>
                        <button type='submit'>
                            <div className="Schedule_button login">
                                { 
                                    isEditPersonalInfoLoading ?
                                    <div className='loader'>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.49995 13V14.25C5.49995 14.3881 5.61188 14.5 5.74995 14.5H6.74995C6.88802 14.5 6.99995 14.3881 6.99995 14.25V13H7.49995V14.25C7.49995 14.3881 7.61188 14.5 7.74995 14.5H8.74995C8.88802 14.5 8.99995 14.3881 8.99995 14.25V13H9.08432C11.0762 13 12.5 11.967 12.5 10.1795C12.5 8.67766 11.4932 7.85714 10.314 7.73993V7.65201C11.2847 7.41026 11.9966 6.67766 11.9966 5.46154C11.9966 3.9304 10.8461 3 9.09152 3H8.99995V1.75C8.99995 1.61193 8.88802 1.5 8.74995 1.5H7.74995C7.61188 1.5 7.49995 1.61193 7.49995 1.75V3H6.92709V1.75C6.92709 1.61193 6.81516 1.5 6.67709 1.5H5.74995C5.61188 1.5 5.49995 1.61193 5.49995 1.75V3L3.50159 3.01123C3.36352 3.01123 3.25159 3.12316 3.25159 3.26123V4.25001C3.25159 4.38745 3.36254 4.49912 3.49998 4.5L4.25476 4.49522C4.66709 4.49787 4.99995 4.83287 4.99995 5.24521V10.75C4.99995 11.1642 4.66417 11.5 4.24995 11.5L3.50159 11.5112C3.36352 11.5112 3.25159 11.6232 3.25159 11.7612V12.7612C3.25159 12.8993 3.36352 13.0112 3.50159 13.0112L5.49995 13ZM6.92709 4.48718H8.64569C9.55173 4.48718 10.0838 4.98535 10.0838 5.79853C10.0838 6.67033 9.50858 7.16117 8.20705 7.16117H6.92709V4.48718ZM6.92709 8.53846H8.76793C9.90408 8.53846 10.5225 9.11722 10.5225 10.0623C10.5225 11.0147 9.89688 11.5128 8.36525 11.5128H6.92709V8.53846Z" fill="black"/>
                                        </svg>
                                    </div>
                                    :
                                    <p>Save</p>
                                }
                            </div>
                        </button>
                    </div>

                </form>
            </div>
       </div> 
    );
}

const PasswordFormBox = ({ userData }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const initialValues = {
        current_password: '', 
        new_password: '', 
        confirm_new_password: '', 
    }
    const [values, setValues] = useState(initialValues) 
    
    const handleFieldChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }

    useEffect(()=>{
        if(error.length === 0 && isSubmit){
            setIsSubmit(false)
            updatePasswordFunc(values)
        }
    },[error])

    //validate form 
    const validateValues = (values) => {
        let errors = '';
        
        if(!values.current_password){
            errors = "Password is required"
        }else if(!passwordRegex.test(values.new_password)){
            errors = "min 5 characters, 1 upper, 1 lower, 1 numeric digit"
        }
        if(!values.confirm_new_password){
            errors = "Confirm Password is required"
        }else if(values.confirm_new_password != values.new_password){
            errors = "Passwords do not match"
        }

        return errors;
    }

    //validate form data on click
    const handleEditPassword = (e) => {
        
        setIsSubmit(true)
        e.preventDefault()
        setError(validateValues(values))
    }

    const updatePasswordFunc = async(values) => {
        setIsLoading(true)
        try{
            const userDoc = doc(db, "User", userData?.id)
            await signInWithEmailAndPassword(auth, userData.email, values.current_password)
            await updatePassword(auth.currentUser, values.new_password)
            await updateDoc(userDoc, {password: values.new_password})
            alert('password changed successfully')
            setIsLoading(false)
            setTimeout(()=>{
                navigate('/dashboard')
            },2000)
        }catch(err){
            console.log(err.message)
            let error = ''
            if ( err.message === 'Firebase: Error (auth/requires-recent-login).'){
                setError('Please re-login and try again')
            }
            setError(err.message)
            setIsLoading(false)
        }
    }

    const [show, setShow] = useState(false)
    const [showTwo, setShowTwo] = useState(false)
    const [showThree, setShowThree] = useState(false)
    const inputRef = useRef() 
    const inputRefTwo = useRef() 
    const inputRefThree = useRef() 

    const handleView = (ref) => {
        if(ref.current.getAttribute('type') === 'password'){
            ref.current.setAttribute('type', 'text');
        }else{
            ref.current.setAttribute('type', 'password');
        }
        
        if(ref.current.name === 'current_password'){
            setShow(!show)
        }else if(ref.current.name === 'new_password'){
            setShowTwo(!showTwo)
        }else if(ref.current.name === 'confirm_new_password'){
            setShowThree(!showThree)
        }
    }

    return (
       <div className='box_div settings changepassword'>
            <div className='fdcol gap1 jcsevenly w100p'>
                <h5 className='monbigtitle'>Change Password</h5>
                <div className='underline'></div>
                <form onSubmit={handleEditPassword}>
                    <div className='inputBox'>
                        <label htmlFor={'Current_password'}>Current Password</label>
                        <input 
                        ref={inputRef}
                        type={'password'}
                        id={'Current_password'}
                        name={'current_password'}
                        placeholder={''}
                        value={values.current_password}
                        onChange={handleFieldChange}
                        />
                        {
                            show ? 
                            <svg className='password_vis_toogle' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" 
                            onClick={()=>{
                                handleView(inputRef) 
                                }}>
                                <path d="M13.3589 11.2375C15.0613 9.72095 16 7.99998 16 7.99998C16 7.99998 13 2.49998 8 2.49998C6.98462 2.49998 6.05172 2.7268 5.20967 3.08831L5.98054 3.85918C6.60983 3.63315 7.28441 3.49998 8 3.49998C10.1194 3.49998 11.879 4.66816 13.1679 5.95708C13.8037 6.59288 14.2978 7.23191 14.6327 7.71239C14.7055 7.81675 14.7704 7.91319 14.8273 7.99998C14.7704 8.08677 14.7055 8.1832 14.6327 8.28756C14.2978 8.76805 13.8037 9.40707 13.1679 10.0429C13.0031 10.2077 12.8306 10.3705 12.6506 10.5292L13.3589 11.2375Z" fill="black"/>
                                <path d="M11.2975 9.17612C11.4286 8.80854 11.5 8.41259 11.5 7.99998C11.5 6.06698 9.933 4.49998 8 4.49998C7.58738 4.49998 7.19144 4.57138 6.82386 4.7025L7.64618 5.52482C7.76176 5.50845 7.87989 5.49998 8 5.49998C9.38071 5.49998 10.5 6.61926 10.5 7.99998C10.5 8.12008 10.4915 8.23821 10.4752 8.3538L11.2975 9.17612Z" fill="black"/>
                                <path d="M8.35385 10.4751L9.17617 11.2974C8.80858 11.4286 8.41263 11.5 8 11.5C6.067 11.5 4.5 9.93297 4.5 7.99998C4.5 7.58735 4.5714 7.1914 4.70253 6.82381L5.52485 7.64613C5.50847 7.76172 5.5 7.87986 5.5 7.99998C5.5 9.38069 6.61929 10.5 8 10.5C8.12012 10.5 8.23825 10.4915 8.35385 10.4751Z" fill="black"/>
                                <path d="M3.34944 5.47072C3.16945 5.62941 2.99693 5.79226 2.83211 5.95708C2.19631 6.59288 1.70216 7.23191 1.36727 7.71239C1.29454 7.81675 1.22963 7.91319 1.1727 7.99998C1.22963 8.08677 1.29454 8.1832 1.36727 8.28756C1.70216 8.76805 2.19631 9.40707 2.83211 10.0429C4.12103 11.3318 5.88062 12.5 8 12.5C8.7156 12.5 9.39018 12.3668 10.0195 12.1408L10.7904 12.9116C9.9483 13.2732 9.01539 13.5 8 13.5C3 13.5 0 7.99998 0 7.99998C0 7.99998 0.938717 6.279 2.64112 4.7624L3.34944 5.47072Z" fill="black"/>
                                <path d="M13.6464 14.3535L1.64645 2.35353L2.35355 1.64642L14.3536 13.6464L13.6464 14.3535Z" fill="black"/>
                            </svg>
                            :
                            <svg className='password_vis_toogle' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>{handleView(inputRef)}}>
                                <path d="M16 8C16 8 13 2.5 8 2.5C3 2.5 0 8 0 8C0 8 3 13.5 8 13.5C13 13.5 16 8 16 8ZM1.1727 8C1.22963 7.91321 1.29454 7.81677 1.36727 7.71242C1.70216 7.23193 2.19631 6.5929 2.83211 5.95711C4.12103 4.66818 5.88062 3.5 8 3.5C10.1194 3.5 11.879 4.66818 13.1679 5.95711C13.8037 6.5929 14.2978 7.23193 14.6327 7.71242C14.7055 7.81677 14.7704 7.91321 14.8273 8C14.7704 8.08679 14.7055 8.18323 14.6327 8.28758C14.2978 8.76807 13.8037 9.4071 13.1679 10.0429C11.879 11.3318 10.1194 12.5 8 12.5C5.88062 12.5 4.12103 11.3318 2.83211 10.0429C2.19631 9.4071 1.70216 8.76807 1.36727 8.28758C1.29454 8.18323 1.22963 8.08679 1.1727 8Z" fill="black"/>
                                <path d="M8 5.5C6.61929 5.5 5.5 6.61929 5.5 8C5.5 9.38071 6.61929 10.5 8 10.5C9.38071 10.5 10.5 9.38071 10.5 8C10.5 6.61929 9.38071 5.5 8 5.5ZM4.5 8C4.5 6.067 6.067 4.5 8 4.5C9.933 4.5 11.5 6.067 11.5 8C11.5 9.933 9.933 11.5 8 11.5C6.067 11.5 4.5 9.933 4.5 8Z" fill="black"/>
                            </svg>
                        }
                    </div>
                    <div className='inputBox'>
                        <label htmlFor={'New_password'}>New Password</label>
                        <input 
                        ref={inputRefTwo}
                        type={'password'}
                        id={'New_password'}
                        name={'new_password'}
                        placeholder={''}
                        value={values.new_password}
                        onChange={handleFieldChange}
                        />
                        {
                            showTwo ? 
                            <svg className='password_vis_toogle' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" 
                            onClick={()=>{
                                handleView(inputRefTwo) 
                                }}>
                                <path d="M13.3589 11.2375C15.0613 9.72095 16 7.99998 16 7.99998C16 7.99998 13 2.49998 8 2.49998C6.98462 2.49998 6.05172 2.7268 5.20967 3.08831L5.98054 3.85918C6.60983 3.63315 7.28441 3.49998 8 3.49998C10.1194 3.49998 11.879 4.66816 13.1679 5.95708C13.8037 6.59288 14.2978 7.23191 14.6327 7.71239C14.7055 7.81675 14.7704 7.91319 14.8273 7.99998C14.7704 8.08677 14.7055 8.1832 14.6327 8.28756C14.2978 8.76805 13.8037 9.40707 13.1679 10.0429C13.0031 10.2077 12.8306 10.3705 12.6506 10.5292L13.3589 11.2375Z" fill="black"/>
                                <path d="M11.2975 9.17612C11.4286 8.80854 11.5 8.41259 11.5 7.99998C11.5 6.06698 9.933 4.49998 8 4.49998C7.58738 4.49998 7.19144 4.57138 6.82386 4.7025L7.64618 5.52482C7.76176 5.50845 7.87989 5.49998 8 5.49998C9.38071 5.49998 10.5 6.61926 10.5 7.99998C10.5 8.12008 10.4915 8.23821 10.4752 8.3538L11.2975 9.17612Z" fill="black"/>
                                <path d="M8.35385 10.4751L9.17617 11.2974C8.80858 11.4286 8.41263 11.5 8 11.5C6.067 11.5 4.5 9.93297 4.5 7.99998C4.5 7.58735 4.5714 7.1914 4.70253 6.82381L5.52485 7.64613C5.50847 7.76172 5.5 7.87986 5.5 7.99998C5.5 9.38069 6.61929 10.5 8 10.5C8.12012 10.5 8.23825 10.4915 8.35385 10.4751Z" fill="black"/>
                                <path d="M3.34944 5.47072C3.16945 5.62941 2.99693 5.79226 2.83211 5.95708C2.19631 6.59288 1.70216 7.23191 1.36727 7.71239C1.29454 7.81675 1.22963 7.91319 1.1727 7.99998C1.22963 8.08677 1.29454 8.1832 1.36727 8.28756C1.70216 8.76805 2.19631 9.40707 2.83211 10.0429C4.12103 11.3318 5.88062 12.5 8 12.5C8.7156 12.5 9.39018 12.3668 10.0195 12.1408L10.7904 12.9116C9.9483 13.2732 9.01539 13.5 8 13.5C3 13.5 0 7.99998 0 7.99998C0 7.99998 0.938717 6.279 2.64112 4.7624L3.34944 5.47072Z" fill="black"/>
                                <path d="M13.6464 14.3535L1.64645 2.35353L2.35355 1.64642L14.3536 13.6464L13.6464 14.3535Z" fill="black"/>
                            </svg>
                            :
                            <svg className='password_vis_toogle' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>{handleView(inputRefTwo)}}>
                                <path d="M16 8C16 8 13 2.5 8 2.5C3 2.5 0 8 0 8C0 8 3 13.5 8 13.5C13 13.5 16 8 16 8ZM1.1727 8C1.22963 7.91321 1.29454 7.81677 1.36727 7.71242C1.70216 7.23193 2.19631 6.5929 2.83211 5.95711C4.12103 4.66818 5.88062 3.5 8 3.5C10.1194 3.5 11.879 4.66818 13.1679 5.95711C13.8037 6.5929 14.2978 7.23193 14.6327 7.71242C14.7055 7.81677 14.7704 7.91321 14.8273 8C14.7704 8.08679 14.7055 8.18323 14.6327 8.28758C14.2978 8.76807 13.8037 9.4071 13.1679 10.0429C11.879 11.3318 10.1194 12.5 8 12.5C5.88062 12.5 4.12103 11.3318 2.83211 10.0429C2.19631 9.4071 1.70216 8.76807 1.36727 8.28758C1.29454 8.18323 1.22963 8.08679 1.1727 8Z" fill="black"/>
                                <path d="M8 5.5C6.61929 5.5 5.5 6.61929 5.5 8C5.5 9.38071 6.61929 10.5 8 10.5C9.38071 10.5 10.5 9.38071 10.5 8C10.5 6.61929 9.38071 5.5 8 5.5ZM4.5 8C4.5 6.067 6.067 4.5 8 4.5C9.933 4.5 11.5 6.067 11.5 8C11.5 9.933 9.933 11.5 8 11.5C6.067 11.5 4.5 9.933 4.5 8Z" fill="black"/>
                            </svg>
                        }
                    </div>
                    <div className='inputBox'>
                        <label htmlFor={'Confirm_new_password'}>Confirm New Password</label>
                        <input 
                        ref={inputRefThree}
                        type={'password'}
                        id={'Confirm_new_password'}
                        name={'confirm_new_password'}
                        placeholder={''}
                        value={values.confirm_new_password}
                        onChange={handleFieldChange}
                        />
                        {
                            showThree ? 
                            <svg className='password_vis_toogle' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" 
                            onClick={()=>{
                                handleView(inputRefThree)
                                }}>
                                <path d="M13.3589 11.2375C15.0613 9.72095 16 7.99998 16 7.99998C16 7.99998 13 2.49998 8 2.49998C6.98462 2.49998 6.05172 2.7268 5.20967 3.08831L5.98054 3.85918C6.60983 3.63315 7.28441 3.49998 8 3.49998C10.1194 3.49998 11.879 4.66816 13.1679 5.95708C13.8037 6.59288 14.2978 7.23191 14.6327 7.71239C14.7055 7.81675 14.7704 7.91319 14.8273 7.99998C14.7704 8.08677 14.7055 8.1832 14.6327 8.28756C14.2978 8.76805 13.8037 9.40707 13.1679 10.0429C13.0031 10.2077 12.8306 10.3705 12.6506 10.5292L13.3589 11.2375Z" fill="black"/>
                                <path d="M11.2975 9.17612C11.4286 8.80854 11.5 8.41259 11.5 7.99998C11.5 6.06698 9.933 4.49998 8 4.49998C7.58738 4.49998 7.19144 4.57138 6.82386 4.7025L7.64618 5.52482C7.76176 5.50845 7.87989 5.49998 8 5.49998C9.38071 5.49998 10.5 6.61926 10.5 7.99998C10.5 8.12008 10.4915 8.23821 10.4752 8.3538L11.2975 9.17612Z" fill="black"/>
                                <path d="M8.35385 10.4751L9.17617 11.2974C8.80858 11.4286 8.41263 11.5 8 11.5C6.067 11.5 4.5 9.93297 4.5 7.99998C4.5 7.58735 4.5714 7.1914 4.70253 6.82381L5.52485 7.64613C5.50847 7.76172 5.5 7.87986 5.5 7.99998C5.5 9.38069 6.61929 10.5 8 10.5C8.12012 10.5 8.23825 10.4915 8.35385 10.4751Z" fill="black"/>
                                <path d="M3.34944 5.47072C3.16945 5.62941 2.99693 5.79226 2.83211 5.95708C2.19631 6.59288 1.70216 7.23191 1.36727 7.71239C1.29454 7.81675 1.22963 7.91319 1.1727 7.99998C1.22963 8.08677 1.29454 8.1832 1.36727 8.28756C1.70216 8.76805 2.19631 9.40707 2.83211 10.0429C4.12103 11.3318 5.88062 12.5 8 12.5C8.7156 12.5 9.39018 12.3668 10.0195 12.1408L10.7904 12.9116C9.9483 13.2732 9.01539 13.5 8 13.5C3 13.5 0 7.99998 0 7.99998C0 7.99998 0.938717 6.279 2.64112 4.7624L3.34944 5.47072Z" fill="black"/>
                                <path d="M13.6464 14.3535L1.64645 2.35353L2.35355 1.64642L14.3536 13.6464L13.6464 14.3535Z" fill="black"/>
                            </svg>
                            :
                            <svg className='password_vis_toogle' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>{handleView(inputRefThree)}}>
                                <path d="M16 8C16 8 13 2.5 8 2.5C3 2.5 0 8 0 8C0 8 3 13.5 8 13.5C13 13.5 16 8 16 8ZM1.1727 8C1.22963 7.91321 1.29454 7.81677 1.36727 7.71242C1.70216 7.23193 2.19631 6.5929 2.83211 5.95711C4.12103 4.66818 5.88062 3.5 8 3.5C10.1194 3.5 11.879 4.66818 13.1679 5.95711C13.8037 6.5929 14.2978 7.23193 14.6327 7.71242C14.7055 7.81677 14.7704 7.91321 14.8273 8C14.7704 8.08679 14.7055 8.18323 14.6327 8.28758C14.2978 8.76807 13.8037 9.4071 13.1679 10.0429C11.879 11.3318 10.1194 12.5 8 12.5C5.88062 12.5 4.12103 11.3318 2.83211 10.0429C2.19631 9.4071 1.70216 8.76807 1.36727 8.28758C1.29454 8.18323 1.22963 8.08679 1.1727 8Z" fill="black"/>
                                <path d="M8 5.5C6.61929 5.5 5.5 6.61929 5.5 8C5.5 9.38071 6.61929 10.5 8 10.5C9.38071 10.5 10.5 9.38071 10.5 8C10.5 6.61929 9.38071 5.5 8 5.5ZM4.5 8C4.5 6.067 6.067 4.5 8 4.5C9.933 4.5 11.5 6.067 11.5 8C11.5 9.933 9.933 11.5 8 11.5C6.067 11.5 4.5 9.933 4.5 8Z" fill="black"/>
                            </svg>
                        }
                    </div>
                    <div className='formpartcontainer full w100p'>
                        <button type='submit'>
                            <div className="Schedule_button login">
                                { 
                                    isLoading ?
                                    <div className='loader'>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.49995 13V14.25C5.49995 14.3881 5.61188 14.5 5.74995 14.5H6.74995C6.88802 14.5 6.99995 14.3881 6.99995 14.25V13H7.49995V14.25C7.49995 14.3881 7.61188 14.5 7.74995 14.5H8.74995C8.88802 14.5 8.99995 14.3881 8.99995 14.25V13H9.08432C11.0762 13 12.5 11.967 12.5 10.1795C12.5 8.67766 11.4932 7.85714 10.314 7.73993V7.65201C11.2847 7.41026 11.9966 6.67766 11.9966 5.46154C11.9966 3.9304 10.8461 3 9.09152 3H8.99995V1.75C8.99995 1.61193 8.88802 1.5 8.74995 1.5H7.74995C7.61188 1.5 7.49995 1.61193 7.49995 1.75V3H6.92709V1.75C6.92709 1.61193 6.81516 1.5 6.67709 1.5H5.74995C5.61188 1.5 5.49995 1.61193 5.49995 1.75V3L3.50159 3.01123C3.36352 3.01123 3.25159 3.12316 3.25159 3.26123V4.25001C3.25159 4.38745 3.36254 4.49912 3.49998 4.5L4.25476 4.49522C4.66709 4.49787 4.99995 4.83287 4.99995 5.24521V10.75C4.99995 11.1642 4.66417 11.5 4.24995 11.5L3.50159 11.5112C3.36352 11.5112 3.25159 11.6232 3.25159 11.7612V12.7612C3.25159 12.8993 3.36352 13.0112 3.50159 13.0112L5.49995 13ZM6.92709 4.48718H8.64569C9.55173 4.48718 10.0838 4.98535 10.0838 5.79853C10.0838 6.67033 9.50858 7.16117 8.20705 7.16117H6.92709V4.48718ZM6.92709 8.53846H8.76793C9.90408 8.53846 10.5225 9.11722 10.5225 10.0623C10.5225 11.0147 9.89688 11.5128 8.36525 11.5128H6.92709V8.53846Z" fill="black"/>
                                        </svg>
                                    </div>
                                    :
                                    <p>Update Password</p>
                                }
                            </div>
                        </button>
                    </div>
                    { error && <p className='error_text'>{error}</p>}

                </form>
            </div>
       </div> 
    );
}

const Settings = () => {
    const { userData, setUserData, getUserData } = useContext(appContext)
    const [image, setImage] = useState()
    

    return (
        <div className='settings dashpage'>
            <Routes>
                <Route index element={
                    <>
                    <div className='fdrow aic jcc gap02 prof'>
                        <div className='prolfile_photo settings box'>
                            <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.01766 10.6063C9.01766 8.731 9.77772 6.93253 11.1306 5.60652C12.4835 4.28051 14.3185 3.53556 16.2318 3.53556C18.1451 3.53556 19.98 4.28051 21.333 5.60652C22.6859 6.93253 23.4459 8.731 23.4459 10.6063C23.4459 12.4815 22.6859 14.28 21.333 15.606C19.98 16.932 18.1451 17.677 16.2318 17.677C14.3185 17.677 12.4835 16.932 11.1306 15.606C9.77772 14.28 9.01766 12.4815 9.01766 10.6063ZM23.1285 18.7782C24.8446 17.3868 26.0808 15.5103 26.6685 13.4048C27.2562 11.2993 27.1668 9.06728 26.4124 7.01343C25.6579 4.95958 24.2753 3.18391 22.4532 1.92873C20.631 0.673548 18.4581 0 16.2309 0C14.0037 0 11.8308 0.673548 10.0086 1.92873C8.18646 3.18391 6.80384 4.95958 6.04942 7.01343C5.295 9.06728 5.20554 11.2993 5.79325 13.4048C6.38095 15.5103 7.6172 17.3868 9.33328 18.7782C3.58182 20.7633 0 25.1843 0 30.0507C0 30.5195 0.190014 30.9691 0.528242 31.3006C0.86647 31.6322 1.32521 31.8184 1.80353 31.8184C2.28186 31.8184 2.74059 31.6322 3.07882 31.3006C3.41705 30.9691 3.60706 30.5195 3.60706 30.0507C3.60706 26.0381 7.85438 21.2123 16.2318 21.2123C24.6092 21.2123 28.8565 26.0381 28.8565 30.0507C28.8565 30.5195 29.0465 30.9691 29.3848 31.3006C29.723 31.6322 30.1817 31.8184 30.66 31.8184C31.1384 31.8184 31.5971 31.6322 31.9353 31.3006C32.2736 30.9691 32.4636 30.5195 32.4636 30.0507C32.4636 25.1843 28.8854 20.7633 23.1285 18.7782Z" fill="#312F2F"/>
                            </svg>
                        </div>
                        <div className='edit_pic'>
                            <input type='file' />
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.4983 0.794613L13.6465 0.646461C14.1179 0.175057 14.8822 0.175056 15.3536 0.646461C15.825 1.11787 15.825 1.88216 15.3536 2.35357L15.2054 2.50172C15.7315 3.09072 15.7119 3.99525 15.1465 4.56067L4.85356 14.8536C4.78948 14.9176 4.70919 14.9631 4.62128 14.9851L0.621278 15.9851C0.450891 16.0277 0.270647 15.9778 0.146457 15.8536C0.022267 15.7294 -0.0276575 15.5491 0.0149394 15.3787L1.01494 11.3787C1.03692 11.2908 1.08238 11.2105 1.14646 11.1465L10.7877 1.5052C10.5926 1.3676 10.321 1.3861 10.1465 1.56067L6.85356 4.85357C6.6583 5.04883 6.34172 5.04883 6.14646 4.85357C5.95119 4.65831 5.95119 4.34172 6.14646 4.14646L9.43935 0.853568C10.0053 0.287595 10.9111 0.268451 11.5 0.796139C12.0678 0.287434 12.9299 0.286925 13.4983 0.794613Z" fill="black"/>
                            </svg>
                        </div>
                    </div>
                    <Box />
                    <FormBox userData={userData[0]} />
                    </>
                } />
                <Route path='changepassword' element={
                    <div>
                        <PasswordFormBox userData={userData[0]} />
                    </div>
                }/>
            </Routes>

        </div>
    );
}

export default Settings;