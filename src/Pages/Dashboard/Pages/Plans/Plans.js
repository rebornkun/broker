import { doc, updateDoc } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../../../config/firebase';
import appContext from '../../../../context/AppContext';
import './Plans.css'

const Boxplans = ({planName, price, interest, min, max, duration, showAlert, setShowAlert, setAlertText, currentPlan, setCurrentPlan }) => {

    const { userData, setUserData } = useContext(appContext)
    let planRank = planName === 'Basic' ? 1 : planName === 'Standard' ? 2 : planName === 'Gold' ? 3 : 4
    const handleBuyPlan = () => {
        if (userData[0]?.USD < price){
            // console.log('low')
            setAlertText('nobalance')
            setShowAlert(true)
        }else{
            // console.log('ok')
            setCurrentPlan([planName, price, planRank])
            setAlertText('confirm')
            setShowAlert(true)
        }
    } 

    return (
        <div className='boxplan plancard_con fdcolumn aic jcsevenly'>
            <h4>{planName}</h4>
            <div>
                <h5>${price}</h5>
                <div className='underlinec'></div>
            </div>
            <div className='fdrow aic gap02 mbbb'>
                <p className='montitle'>Interest:</p>
                <p style={{textOverflow: 'ellipsis', overflow: 'hidden'}} className='value'>{interest}%</p>
            </div>
            <div className='underline'></div>
            <div className='fdrow aic gap02 mbbb'>
                <p className='montitle'>Min:</p>
                <p style={{textOverflow: 'ellipsis', overflow: 'hidden'}} className='value'>${min}</p>
            </div>
            <div className='underline'></div>
            <div className='fdrow aic gap02 mbbb'>
                <p className='montitle'>Max:</p>
                <p style={{textOverflow: 'ellipsis', overflow: 'hidden'}} className='value'>${max}</p>
            </div>
            <div className='underline'></div>
            <div className='fdrow aic gap02 mbbb'>
                <p className='montitle'>Duration:</p>
                <p style={{textOverflow: 'ellipsis', overflow: 'hidden'}} className='value'>{duration}</p>
            </div>
            {
               userData[0]?.current_plan === planName ?
            <div style={{height: '40px', width: '100%', backgroundColor: 'pink', borderRadius: '10px'}} className='fdrow aic jcc'>
                <p>Current Plan</p>
            </div>
            :
            userData[0]?.plan_rank === 0 ?
            <div className="Schedule_button login" onClick={handleBuyPlan}>
                <div className='fdrow aic jcc gap05' style={{zIndex: '1'}}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path  d="M8 1C9.38071 1 10.5 2.11929 10.5 3.5V4H5.5V3.5C5.5 2.11929 6.61929 1 8 1ZM11.5 4V3.5C11.5 1.567 9.933 0 8 0C6.067 0 4.5 1.567 4.5 3.5V4H1V14C1 15.1046 1.89543 16 3 16H13C14.1046 16 15 15.1046 15 14V4H11.5Z" fill="white"/>
                    </svg>
                    <p>Buy Plan</p>
                </div> 
            </div>
            :
            userData[0]?.plan_rank < planRank ?
            <div className="Schedule_button login" onClick={handleBuyPlan}>
                <div className='fdrow aic jcc gap05' style={{zIndex: '1'}}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.27049 1.04714C7.66556 0.625727 8.33449 0.625725 8.72956 1.04714L15.0754 7.81608C15.6742 8.45475 15.2214 9.50002 14.3459 9.50002H11.5V10.5C11.5 11.0523 11.0523 11.5 10.5 11.5H5.50003C4.94774 11.5 4.50003 11.0523 4.50003 10.5V9.50002H1.65414C0.778704 9.50002 0.325857 8.45475 0.924607 7.81608L7.27049 1.04714Z" fill="red"/>
                        <path d="M4.50003 13.5C4.50003 12.9477 4.94774 12.5 5.50003 12.5H10.5C11.0523 12.5 11.5 12.9477 11.5 13.5V14.5C11.5 15.0523 11.0523 15.5 10.5 15.5H5.50003C4.94774 15.5 4.50003 15.0523 4.50003 14.5V13.5Z" fill="red"/>
                    </svg>
                    <p>Upgrade Plan</p>
                </div> 
            </div>
            :
            userData[0]?.plan_rank > planRank ?
            <div style={{height: '40px', width: '100%', backgroundColor: 'grey', borderRadius: '10px'}} className='fdrow aic jcc'>
                <p>Unavailable</p>
            </div>
            :
            ''
            }
        </div>
    );
}

const LowFunds = ({}) => {
    const [show, setShow] = useState(true) 
    return (
       <div style={{display: show ? 'block' : 'none'}} className='profit box_div fdrow'>
            <p className='value'>You account is empty! <Link to={'/dashboard/deposit/makedeposit'}>Fund Now</Link></p>
            
            <div className='cancel' onClick={()=>setShow(false)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.14645 2.85355C1.95118 2.65829 1.95118 2.34171 2.14645 2.14645C2.34171 1.95118 2.65829 1.95118 2.85355 2.14645L8 7.29289L13.1464 2.14645C13.3417 1.95118 13.6583 1.95118 13.8536 2.14645C14.0488 2.34171 14.0488 2.65829 13.8536 2.85355L8.70711 8L13.8536 13.1464C14.0488 13.3417 14.0488 13.6583 13.8536 13.8536C13.6583 14.0488 13.3417 14.0488 13.1464 13.8536L8 8.70711L2.85355 13.8536C2.65829 14.0488 2.34171 14.0488 2.14645 13.8536C1.95119 13.6583 1.95119 13.3417 2.14645 13.1464L7.29289 8L2.14645 2.85355Z" fill="black"/>
                </svg>
            </div>
       </div> 
    );
}
const Alert = ({showAlert, setShowAlert, alertText, currentPlan, setCurrentPlan}) => {
    // console.log(showAlert)
    // console.log(currentPlan)
    const { userData, setUserData, getUserData } = useContext(appContext)
    // console.log(userData[0]?.id)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const buyPlan = async() => {
        setIsLoading(true)
        try{
            const userDoc = doc(db, "User", userData[0]?.id)
            const date = new Date()
            await updateDoc(userDoc, { current_plan: currentPlan[0], plan_buy_time: date, last_profit_added_time: date, USD: userData[0]?.USD - currentPlan[1], plan_rank: currentPlan[2], plan_profit: 0})
            await getUserData()
            navigate('/dashboard')
            setIsLoading(false)
        }catch(err){
            console.log(err)
            setIsLoading(false)
        }
    }
    return (
       <div style={{display: showAlert ? 'flex' : 'none'}} className='alert'>
        { alertText === 'nobalance' ?    
        <div>
            <p className='value'>Insufficient balance! <Link to={'/dashboard/deposit/makedeposit'}>Fund Now</Link></p>
            <div className='cancel' onClick={()=>setShowAlert(false)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.14645 2.85355C1.95118 2.65829 1.95118 2.34171 2.14645 2.14645C2.34171 1.95118 2.65829 1.95118 2.85355 2.14645L8 7.29289L13.1464 2.14645C13.3417 1.95118 13.6583 1.95118 13.8536 2.14645C14.0488 2.34171 14.0488 2.65829 13.8536 2.85355L8.70711 8L13.8536 13.1464C14.0488 13.3417 14.0488 13.6583 13.8536 13.8536C13.6583 14.0488 13.3417 14.0488 13.1464 13.8536L8 8.70711L2.85355 13.8536C2.65829 14.0488 2.34171 14.0488 2.14645 13.8536C1.95119 13.6583 1.95119 13.3417 2.14645 13.1464L7.29289 8L2.14645 2.85355Z" fill="black"/>
                </svg>
            </div>
        </div>
        :
        alertText === 'confirm' ?
        <div>
            { isLoading ?
            <div className='loader'>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.49995 13V14.25C5.49995 14.3881 5.61188 14.5 5.74995 14.5H6.74995C6.88802 14.5 6.99995 14.3881 6.99995 14.25V13H7.49995V14.25C7.49995 14.3881 7.61188 14.5 7.74995 14.5H8.74995C8.88802 14.5 8.99995 14.3881 8.99995 14.25V13H9.08432C11.0762 13 12.5 11.967 12.5 10.1795C12.5 8.67766 11.4932 7.85714 10.314 7.73993V7.65201C11.2847 7.41026 11.9966 6.67766 11.9966 5.46154C11.9966 3.9304 10.8461 3 9.09152 3H8.99995V1.75C8.99995 1.61193 8.88802 1.5 8.74995 1.5H7.74995C7.61188 1.5 7.49995 1.61193 7.49995 1.75V3H6.92709V1.75C6.92709 1.61193 6.81516 1.5 6.67709 1.5H5.74995C5.61188 1.5 5.49995 1.61193 5.49995 1.75V3L3.50159 3.01123C3.36352 3.01123 3.25159 3.12316 3.25159 3.26123V4.25001C3.25159 4.38745 3.36254 4.49912 3.49998 4.5L4.25476 4.49522C4.66709 4.49787 4.99995 4.83287 4.99995 5.24521V10.75C4.99995 11.1642 4.66417 11.5 4.24995 11.5L3.50159 11.5112C3.36352 11.5112 3.25159 11.6232 3.25159 11.7612V12.7612C3.25159 12.8993 3.36352 13.0112 3.50159 13.0112L5.49995 13ZM6.92709 4.48718H8.64569C9.55173 4.48718 10.0838 4.98535 10.0838 5.79853C10.0838 6.67033 9.50858 7.16117 8.20705 7.16117H6.92709V4.48718ZM6.92709 8.53846H8.76793C9.90408 8.53846 10.5225 9.11722 10.5225 10.0623C10.5225 11.0147 9.89688 11.5128 8.36525 11.5128H6.92709V8.53846Z" fill="black"/>
                </svg>
            </div>
            :
            <>
                <p className='value'>Confirm Transaction! </p>
                <div style={{marginTop: '2rem'}} className='fdrow jcsb'>
                        <svg onClick={()=>setShowAlert(false)} width="16" className='bad' height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.14645 2.85355C1.95118 2.65829 1.95118 2.34171 2.14645 2.14645C2.34171 1.95118 2.65829 1.95118 2.85355 2.14645L8 7.29289L13.1464 2.14645C13.3417 1.95118 13.6583 1.95118 13.8536 2.14645C14.0488 2.34171 14.0488 2.65829 13.8536 2.85355L8.70711 8L13.8536 13.1464C14.0488 13.3417 14.0488 13.6583 13.8536 13.8536C13.6583 14.0488 13.3417 14.0488 13.1464 13.8536L8 8.70711L2.85355 13.8536C2.65829 14.0488 2.34171 14.0488 2.14645 13.8536C1.95119 13.6583 1.95119 13.3417 2.14645 13.1464L7.29289 8L2.14645 2.85355Z" fill="black"/>
                        </svg>
                        <svg onClick={()=>buyPlan()} width="16" className='confrim' height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.96963 4.96967C9.26253 4.67678 9.7374 4.67678 10.0303 4.96967C10.3196 5.25897 10.3231 5.72582 10.0409 6.01947L6.04873 11.0097C6.04297 11.0169 6.03682 11.0238 6.03029 11.0303C5.7374 11.3232 5.26253 11.3232 4.96963 11.0303L2.32319 8.38388C2.03029 8.09099 2.03029 7.61612 2.32319 7.32322C2.61608 7.03033 3.09095 7.03033 3.38385 7.32322L5.47737 9.41674L8.94974 4.9921C8.95592 4.98424 8.96256 4.97674 8.96963 4.96967Z" fill="green"/>
                            <path d="M8.04921 10.1099L8.96963 11.0303C9.26253 11.3232 9.7374 11.3232 10.0303 11.0303C10.0368 11.0238 10.043 11.0169 10.0487 11.0097L14.0409 6.01947C14.3231 5.72582 14.3196 5.25897 14.0303 4.96967C13.7374 4.67678 13.2625 4.67678 12.9696 4.96967C12.9626 4.97674 12.9559 4.98424 12.9497 4.9921L9.47737 9.41674L8.99202 8.9314L8.04921 10.1099Z" fill="green"/>
                        </svg>
                </div>
            </>}
        </div>
        :
        ''
        }
       </div> 
    );
}

const Plans = () => {
    const { userData, setUserData } = useContext(appContext)
    const [ showAlert, setShowAlert ] = useState(false)
    const [ alertText, setAlertText ] = useState('nobalance')
    const [ currentPlan, setCurrentPlan ] = useState([])
    // console.log(userData)
    return (
        <div className="plans dashpage">
            { userData[0]?.USD === 0 && <LowFunds />}
            <div className='plann_co'>
                <Boxplans planName={'Basic'} price={1000} interest={200} min={1000} max={1999} duration={'24hrs'} showAlert={showAlert} setShowAlert={setShowAlert} setAlertText={setAlertText} currentPlan={currentPlan} setCurrentPlan={setCurrentPlan} />
                <Boxplans planName={'Standard'} price={2500} interest={300} min={2500} max={7499} duration={'24hrs'} showAlert={showAlert} setShowAlert={setShowAlert} setAlertText={setAlertText} currentPlan={currentPlan} setCurrentPlan={setCurrentPlan} />
                <Boxplans planName={'Gold'} price={5000} interest={400} min={5000} max={19999} duration={'24hrs'} showAlert={showAlert} setShowAlert={setShowAlert} setAlertText={setAlertText} currentPlan={currentPlan} setCurrentPlan={setCurrentPlan} />
                <Boxplans planName={'Platinum'} price={10000} interest={500} min={10000} max={'unlimited'} duration={'24hrs'} showAlert={showAlert} setShowAlert={setShowAlert} setAlertText={setAlertText} currentPlan={currentPlan} setCurrentPlan={setCurrentPlan} />
            </div>
            <Alert showAlert={showAlert} setShowAlert={setShowAlert} alertText={alertText} currentPlan={currentPlan} setCurrentPlan={setCurrentPlan} />
        </div>
    );
}

export default Plans;