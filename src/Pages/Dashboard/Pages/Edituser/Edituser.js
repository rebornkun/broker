import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { db } from '../../../../config/firebase'
import './Edituser.css'

const Edituser = () => {
    const [userData, setUserData] = useState({})
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
        USD: userData?.USD || 0,
        available: userData?.available || 0,
        earned: userData?.earned || 0,
        paid: userData?.paid || 0,
        current_plan: userData?.current_plan || "",
        last_profit_added_time: userData?.last_profit_added_time || "",
        plan_buy_time: userData?.plan_buy_time || "",
        plan_profit: userData?.plan_profit || 0,
    }
    const [values, setValues] = useState(initialValues) 
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(()=>{
        if(location.state){
            getUserData(location.state.email)
        }else{
            navigate('/')
        }
    },[])
    useEffect(()=>{
        setValues(initialValues)
    },[userData])
    const userCollectionRef = collection(db, "User") 
    const getUserData = async(email) => {
        try{
            const d = await getDocs(query(userCollectionRef, where("email", "==", `${email}`))) 
            let res = []
            d.forEach(user => {
                res.push({
                    id: user.id, 
                    ...user.data()
                })
            })
            setUserData(res[0])
        }catch(e){
            navigate('/', {replace: true})
            console.log(e.message)
        }
    }
    
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

    console.log(userData)
    const updateProfile = async(values) => {
        try{
            const userDoc = doc(db, "User", userData?.id)
            await updateDoc(userDoc, {email: values.email, full_name: values.firstname + ' ' + values.lastname, city: values.city, country: values.country, wallet_address: values.wallet_address, USD: values.USD, available: values.available, earned: values.earned, paid: values.paid, current_plan: values.current_plan, last_profit_added_time: values.last_profit_added_time, plan_buy_time: values.plan_buy_time ,plan_profit: values.plan_profit ,})
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
                <h5 className='monbigtitle'>User Information</h5>
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
                    <div className='formpartcontainer w100p'>
                        <div className='inputBox'>
                            <label htmlFor={'USD'}>USD</label>
                            <input 
                            type='number'
                            id={'USD'}
                            name={'USD'}
                            placeholder={'$0'}
                            value={values.USD}
                            onChange={handleFieldChange}
                            />
                        </div>
                        <div className='inputBox'>
                            <label htmlFor={'available'}>Available</label>
                            <input 
                            type='number'
                            id={'Available'}
                            name={'available'}
                            placeholder={'$0'}
                            value={values.available}
                            onChange={handleFieldChange}
                            />
                        </div>
                    </div>
                    <div className='formpartcontainer w100p'>
                        <div className='inputBox'>
                            <label htmlFor={'earned'}>Earned</label>
                            <input 
                            type='number'
                            id={'Earned'}
                            name={'earned'}
                            placeholder={'$0'}
                            value={values.earned}
                            onChange={handleFieldChange}
                            />
                        </div>
                        <div className='inputBox'>
                            <label htmlFor={'paid'}>Paid</label>
                            <input 
                            type='number'
                            id={'Paid'}
                            name={'paid'}
                            placeholder={'$0'}
                            value={values.paid}
                            onChange={handleFieldChange}
                            />
                        </div>
                    </div>
                    <div className='formpartcontainer w100p'>
                        <div className='inputBox'>
                            <label htmlFor={'current_plan'}>Current Plan</label>
                            <input 
                            type='text'
                            id={'Current_plan'}
                            name={'current_plan'}
                            placeholder={'User Plan'}
                            value={values.current_plan}
                            onChange={handleFieldChange}
                            />
                        </div>
                        <div className='inputBox'>
                            <label htmlFor={'last_profit_added_time'}>Last Profit Added Time</label>
                            <input 
                            type='datetime-local'
                            id={'Last_profit_added_time'}
                            name={'last_profit_added_time'}
                            placeholder={'time profit was updated last'}
                            value={values.last_profit_added_time}
                            onChange={handleFieldChange}
                            />
                        </div>
                    </div>
                    <div className='formpartcontainer w100p'>
                        <div className='inputBox'>
                            <label htmlFor={'plan_buy_time'}>Plan Buy Time</label>
                            <input 
                            type='datetime-local'
                            id={'Plan_buy_time'}
                            name={'plan_buy_time'}
                            placeholder={'Time plan was bought'}
                            value={values.plan_buy_time}
                            onChange={handleFieldChange}
                            />
                        </div>
                        <div className='inputBox'>
                            <label htmlFor={'plan_profit'}>Plan Profit</label>
                            <input 
                            type='number'
                            id={'Plan_profit'}
                            name={'plan_profit'}
                            placeholder={'Profit for current plan'}
                            value={values.plan_profit}
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

export default Edituser;