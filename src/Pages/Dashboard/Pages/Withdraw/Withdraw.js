import { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate, NavLink, useNavigate, Link } from 'react-router-dom';
import StyledTable from '../../components/StyledTable/StyledTable';
import './Withdraw.css'
import barcode from '../../../../Assets/img/btcbarcode.png';
import { db } from '../../../../config/firebase';
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import appContext from '../../../../context/AppContext';

const Box = () => {
    return (
       <div className='box_div nav'>
            <div className='fdrow gap1 jcsevenly'>
                    <NavLink to={'history'} className='mini_nav' >
                        <div className='fdrow not aic gap02'>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 1H12V8C12 8.18014 11.9031 8.34635 11.7463 8.4351C11.5896 8.52385 11.3972 8.52143 11.2428 8.42875L9 7.0831L6.75725 8.42875C6.60278 8.52143 6.4104 8.52385 6.25365 8.4351C6.0969 8.34635 6 8.18014 6 8V1Z" fill="black"/>
                                <path d="M3 0H13C14.1046 0 15 0.89543 15 2V14C15 15.1046 14.1046 16 13 16H3C1.89543 16 1 15.1046 1 14V13H2V14C2 14.5523 2.44772 15 3 15H13C13.5523 15 14 14.5523 14 14V2C14 1.44772 13.5523 1 13 1H3C2.44772 1 2 1.44772 2 2V3H1V2C1 0.89543 1.89543 0 3 0Z" fill="black"/>
                                <path d="M1 5V4.5C1 4.22386 1.22386 4 1.5 4C1.77614 4 2 4.22386 2 4.5V5H2.5C2.77614 5 3 5.22386 3 5.5C3 5.77614 2.77614 6 2.5 6H0.5C0.223858 6 0 5.77614 0 5.5C0 5.22386 0.223858 5 0.5 5H1Z" fill="black"/>
                                <path d="M1 8V7.5C1 7.22386 1.22386 7 1.5 7C1.77614 7 2 7.22386 2 7.5V8H2.5C2.77614 8 3 8.22386 3 8.5C3 8.77614 2.77614 9 2.5 9H0.5C0.223858 9 0 8.77614 0 8.5C0 8.22386 0.223858 8 0.5 8H1Z" fill="black"/>
                                <path d="M1 11V10.5C1 10.2239 1.22386 10 1.5 10C1.77614 10 2 10.2239 2 10.5V11H2.5C2.77614 11 3 11.2239 3 11.5C3 11.7761 2.77614 12 2.5 12H0.5C0.223858 12 0 11.7761 0 11.5C0 11.2239 0.223858 11 0.5 11H1Z" fill="black"/>
                            </svg>
                            <h4 className='montitle'>Withdrawal History</h4>
                        </div>
                    </NavLink>
                    <NavLink to={'makewithdraw'} className='mini_nav' >
                        <div className='fdrow aic not gap02'>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.5 9.511C5.5763 10.4645 6.32909 11.2078 7.6821 11.2958V12H8.2823V11.291C9.68108 11.1932 10.5 10.445 10.5 9.35941C10.5 8.37164 9.87436 7.86308 8.75534 7.59902L8.2823 7.48655V5.56968C8.8825 5.63814 9.26399 5.96577 9.35554 6.42054H10.4084C10.3321 5.50122 9.54374 4.7824 8.2823 4.70416V4H7.6821V4.71883C6.48677 4.83619 5.67294 5.55501 5.67294 6.57213C5.67294 7.47188 6.27823 8.04401 7.28535 8.27873L7.6821 8.37653V10.4108C7.06663 10.3178 6.65972 9.98044 6.56816 9.511H5.5ZM7.67701 7.34474C7.08698 7.20782 6.76653 6.9291 6.76653 6.50856C6.76653 6.03912 7.11241 5.68704 7.6821 5.58435V7.34474H7.67701ZM8.36877 8.5379C9.08596 8.70416 9.41658 8.97311 9.41658 9.44743C9.41658 9.99022 9.00458 10.3619 8.2823 10.4303V8.51834L8.36877 8.5379Z" fill="black"/>
                                <path d="M8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill="black"/>
                                <path d="M8 13.5C4.96243 13.5 2.5 11.0376 2.5 8C2.5 4.96243 4.96243 2.5 8 2.5C11.0376 2.5 13.5 4.96243 13.5 8C13.5 11.0376 11.0376 13.5 8 13.5ZM8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" fill="black"/>
                            </svg>
                            <h4 className='montitle'>Make Withdrawal</h4>
                        </div>
                    </NavLink>
            </div>
       </div> 
    );
}

const MiniBox = () => {
    return (
       <div style={{padding: '0rem'}} className='box_div nav'>
            <div className='fdrow gap1 jcsevenly'>
                    <NavLink to={'paywithcrypto'} className='mini_nav' >
                        <div className='fdrow aic not gap02'>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.49995 13V14.25C5.49995 14.3881 5.61188 14.5 5.74995 14.5H6.74995C6.88802 14.5 6.99995 14.3881 6.99995 14.25V13H7.49995V14.25C7.49995 14.3881 7.61188 14.5 7.74995 14.5H8.74995C8.88802 14.5 8.99995 14.3881 8.99995 14.25V13H9.08432C11.0762 13 12.5 11.967 12.5 10.1795C12.5 8.67766 11.4932 7.85714 10.314 7.73993V7.65201C11.2847 7.41026 11.9966 6.67766 11.9966 5.46154C11.9966 3.9304 10.8461 3 9.09152 3H8.99995V1.75C8.99995 1.61193 8.88802 1.5 8.74995 1.5H7.74995C7.61188 1.5 7.49995 1.61193 7.49995 1.75V3H6.92709V1.75C6.92709 1.61193 6.81516 1.5 6.67709 1.5H5.74995C5.61188 1.5 5.49995 1.61193 5.49995 1.75V3L3.50159 3.01123C3.36352 3.01123 3.25159 3.12316 3.25159 3.26123V4.25001C3.25159 4.38745 3.36254 4.49912 3.49998 4.5L4.25476 4.49522C4.66709 4.49787 4.99995 4.83287 4.99995 5.24521V10.75C4.99995 11.1642 4.66417 11.5 4.24995 11.5L3.50159 11.5112C3.36352 11.5112 3.25159 11.6232 3.25159 11.7612V12.7612C3.25159 12.8993 3.36352 13.0112 3.50159 13.0112L5.49995 13ZM6.92709 4.48718H8.64569C9.55173 4.48718 10.0838 4.98535 10.0838 5.79853C10.0838 6.67033 9.50858 7.16117 8.20705 7.16117H6.92709V4.48718ZM6.92709 8.53846H8.76793C9.90408 8.53846 10.5225 9.11722 10.5225 10.0623C10.5225 11.0147 9.89688 11.5128 8.36525 11.5128H6.92709V8.53846Z" fill="black"/>
                            </svg>
                            <h4 className='montitle'>Crypto</h4>
                        </div>
                    </NavLink>
                    <NavLink to={'paywithcard'} className='mini_nav' >
                        <div className='fdrow not aic gap02'>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.00004 0L14.6099 3H15.5C15.7762 3 16 3.22386 16 3.5L16 5.5C16 5.77614 15.7761 6 15.5 6H15L15 13C15.2295 13 15.4295 13.1574 15.4851 13.38L15.9851 15.38C16.0224 15.5294 15.9889 15.6886 15.8941 15.81C15.7994 15.9314 15.654 16 15.5 16H0.500035C0.346068 16 0.200686 15.9314 0.105933 15.81C0.011179 15.6886 -0.0223786 15.5294 0.014964 15.38L0.514964 13.38C0.57061 13.1574 0.770601 13 1.00004 13L1 6H0.5C0.223858 6 0 5.77614 0 5.5L3.52859e-05 3.5C3.52859e-05 3.22386 0.223893 3 0.500035 3H1.39022L8.00004 0ZM3.77652 3H12.2235L8.00004 1L3.77652 3ZM2 6L2.00004 13H3.00004L3 6H2ZM4 6L4.00004 13H6.50004L6.5 6H4ZM7.5 6L7.50004 13H8.50004L8.5 6H7.5ZM9.5 6L9.50004 13H12L12 6H9.5ZM13 6L13 13H14V6H13ZM15 5V4H1.00004V5H15ZM14.6096 14H1.39042L1.14042 15H14.8596L14.6096 14Z" fill="black"/>
                            </svg>
                            <h4 className='montitle'>To Bank</h4>
                        </div>
                    </NavLink>
            </div>
       </div> 
    );
}

const PayWithCrypto = () => {

    const { userData, setUserData, getUserData } = useContext(appContext)
    const initialValues = {
        usd: null,
        btc: null,
        txn: '',
    }
    const [values, setValues] = useState(initialValues) 
    const initialErrorValues = {
        usd: '',
        btc: '',
        txn: '',
    }
    const [error, setError] = useState(initialErrorValues) 
    const [pageNo, setPageNo] = useState(1) 
    let wallet_address = 'jsdhbjhhj34uyudh3m4ndsmdnsdmnjsdhbn'
    const navigate = useNavigate()

    const withdrawsCollectionRef = collection(db, "Withdraws") 

    const handleFieldChange = (e) => {
        const {name, value} = e.target
        console.log(name)
        if (name === 'usd'){
            setValues({...values, [name]: value, btc: (value * 0.000038886).toFixed(9)})
        }else if(name === 'btc'){
            setValues({...values, [name]: value, usd: (value / 0.000038886).toFixed(1)})
        }else{
            setValues({...values, [name]: value})
        }
        // setInValue(value)
    }

    const handlePage = () => {
        console.log(values)
        if(values.usd <= 0){
            setError({...error, usd: 'value must be more than 0'})
        }else if(values.btc <= 0){
            setError({...error, btc: 'value must be more than 0'})
        }else if(values.usd > Number(userData[0]?.available?.toFixed(1))){
            setError({...error, usd: 'value must be more than available funds!'})
        }else if(values.btc > Number((userData[0]?.available * 0.000038886).toFixed(1))){
            setError({...error, usd: 'value must be more than available funds!'})
        }else{
            setPageNo(2)
            setError({...error, usd: '', btc: ''})
        }
    }

    const generateString = () => {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < 12; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    
    const completeWithdrawal = async() => {
        setPageNo(3)
        try{
            let date = new Date()
            const userDoc = doc(db, "User", userData[0]?.id)
            let usdMinusFee = Number(values.usd) - (Number(values.usd) * 0.05)
            let btcMinusFee = Number(values.btc) - (Number(values.btc) * 0.05)
            await addDoc(withdrawsCollectionRef, {
                date: date,
                txn_id: generateString(),
                email: userData[0]?.email,
                currency: 'BTC',
                amount: Number(btcMinusFee.toFixed(9)),
                usd: Number(usdMinusFee),
                status: 'pending'
            })
            let paid = userData[0]?.paid + Number(values.usd) 
            await updateDoc(userDoc, { available: userData[0]?.available - Number(values.usd), paid: paid })
            await getUserData()
        }catch(err){
            setError({...error, txn: err.message})
        }

        setTimeout(()=>{
            navigate('/dashboard')
        },3000)
    }

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(wallet_address);
            console.log('Content copied to clipboard');
          } catch (err) {
            console.error('Failed to copy: ', err);
          }
    }

    return (
        <div className='paywithcrypto'>
            { !userData[0]?.wallet_address ? 
                <div className='unav'>
                    <div>
                        <p>Please Link BTC Wallet First!</p>
                    </div>
                </div>
                :
                pageNo === 1 ?
                <div className='amount_section'>
                    <h4 style={{marginTop: '2rem'}}>Withdraw with BTC</h4>
                    <p className='subtitle'>Please Input Amount</p>
                    <div style={{marginTop: '-0.5rem'}} className='fdrow aic gap02'>
                        <p className='montitle'>Available:</p>
                        <p className='value'>{userData[0]?.available?.toFixed(1)}</p>
                    </div>
                    <div className='inputBox'>
                        <label htmlFor={'usd'}>USD</label>
                        <input 
                        type={'number'}
                        id={'USD'}
                        name={'usd'}
                        placeholder={'$1000.0'}
                        min={0}
                        max={userData[0]?.available}
                        value={values.usd}
                        onChange={handleFieldChange}
                        />
                        { error.usd && <p className='error_text'>{error.usd}</p>}
                    </div>
                    <div className='inputBox'>
                        <label htmlFor={'btc'}>BTC</label>
                        <input 
                        type={'number'}
                        id={'BTC'}
                        name={'btc'}
                        placeholder={'0.04994404'}
                        min={0}
                        max={userData[0]?.available * 0.000038886}
                        value={values.btc}
                        onChange={handleFieldChange}
                        />
                        { error.btc && <p className='error_text'>{error.btc}</p>}
                    </div>
                    <button type='submit' onClick={handlePage}>
                        <div className="Schedule_button login">
                            <p>Next</p>
                        </div>
                    </button>
                </div>
                :
                pageNo === 2 ?
                <div className='amount_section'>
                    <div className='back' onClick={()=>setPageNo(1)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.35355 1.64645C8.54882 1.84171 8.54882 2.15829 8.35355 2.35355L2.70711 8L8.35355 13.6464C8.54882 13.8417 8.54882 14.1583 8.35355 14.3536C8.15829 14.5488 7.84171 14.5488 7.64645 14.3536L1.64645 8.35355C1.45118 8.15829 1.45118 7.84171 1.64645 7.64645L7.64645 1.64645C7.84171 1.45118 8.15829 1.45118 8.35355 1.64645Z" fill="black"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3536 1.64645C12.5488 1.84171 12.5488 2.15829 12.3536 2.35355L6.70711 8L12.3536 13.6464C12.5488 13.8417 12.5488 14.1583 12.3536 14.3536C12.1583 14.5488 11.8417 14.5488 11.6464 14.3536L5.64645 8.35355C5.45118 8.15829 5.45118 7.84171 5.64645 7.64645L11.6464 1.64645C11.8417 1.45118 12.1583 1.45118 12.3536 1.64645Z" fill="black"/>
                        </svg>
                    </div>
                    <h4>Confirm Wallet Address</h4>
                    {/* <img src={barcode} alt='barcode' /> */}
                    <div style={{marginTop: '1rem'}} className='inputBox'>
                        <label htmlFor={'wallet'}>Your Wallet address (BTC only)</label>
                        <input 
                        type={'text'}
                        id={'Wallet'}
                        name={'wallet'}
                        placeholder={'0.04994404'}
                        // min={0}
                        disabled={true}
                        value={userData[0]?.wallet_address}
                        // onChange={handleFieldChange}
                        />
                        <div className='copy' onClick={copyToClipboard} onTouchStart={copyToClipboard}>
                            <svg width="18" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 0H6C4.89543 0 4 0.89543 4 2C2.89543 2 2 2.89543 2 4V14C2 15.1046 2.89543 16 4 16H11C12.1046 16 13 15.1046 13 14C14.1046 14 15 13.1046 15 12V2C15 0.89543 14.1046 0 13 0ZM13 13V4C13 2.89543 12.1046 2 11 2H5C5 1.44772 5.44772 1 6 1H13C13.5523 1 14 1.44772 14 2V12C14 12.5523 13.5523 13 13 13ZM3 4C3 3.44772 3.44772 3 4 3H11C11.5523 3 12 3.44772 12 4V14C12 14.5523 11.5523 15 11 15H4C3.44772 15 3 14.5523 3 14V4Z" fill="black"/>
                            </svg>
                        </div>
                    </div>
                    <p style={{marginTop: '1rem'}} className='subtitle'>Note: withdrawals can only be processed during the last 5 days of every month, placing a withdraw now will place it on the queue until due time! also you must have purchased at least 3 packages.<br></br> a 5% charge fee with be collected during the Transaction.</p>
                    <button type='submit' onClick={completeWithdrawal}>
                        <div className="Schedule_button login">
                            <p>Complete Transaction</p>
                        </div>
                    </button>
                </div>
                :
                <div className='amount_section'>
                    <h4>Transaction Made...</h4>
                    <p className='subtitle'>Watch out for your funds!</p>
                    <div className='loader'>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.49995 13V14.25C5.49995 14.3881 5.61188 14.5 5.74995 14.5H6.74995C6.88802 14.5 6.99995 14.3881 6.99995 14.25V13H7.49995V14.25C7.49995 14.3881 7.61188 14.5 7.74995 14.5H8.74995C8.88802 14.5 8.99995 14.3881 8.99995 14.25V13H9.08432C11.0762 13 12.5 11.967 12.5 10.1795C12.5 8.67766 11.4932 7.85714 10.314 7.73993V7.65201C11.2847 7.41026 11.9966 6.67766 11.9966 5.46154C11.9966 3.9304 10.8461 3 9.09152 3H8.99995V1.75C8.99995 1.61193 8.88802 1.5 8.74995 1.5H7.74995C7.61188 1.5 7.49995 1.61193 7.49995 1.75V3H6.92709V1.75C6.92709 1.61193 6.81516 1.5 6.67709 1.5H5.74995C5.61188 1.5 5.49995 1.61193 5.49995 1.75V3L3.50159 3.01123C3.36352 3.01123 3.25159 3.12316 3.25159 3.26123V4.25001C3.25159 4.38745 3.36254 4.49912 3.49998 4.5L4.25476 4.49522C4.66709 4.49787 4.99995 4.83287 4.99995 5.24521V10.75C4.99995 11.1642 4.66417 11.5 4.24995 11.5L3.50159 11.5112C3.36352 11.5112 3.25159 11.6232 3.25159 11.7612V12.7612C3.25159 12.8993 3.36352 13.0112 3.50159 13.0112L5.49995 13ZM6.92709 4.48718H8.64569C9.55173 4.48718 10.0838 4.98535 10.0838 5.79853C10.0838 6.67033 9.50858 7.16117 8.20705 7.16117H6.92709V4.48718ZM6.92709 8.53846H8.76793C9.90408 8.53846 10.5225 9.11722 10.5225 10.0623C10.5225 11.0147 9.89688 11.5128 8.36525 11.5128H6.92709V8.53846Z" fill="black"/>
                        </svg>
                    </div>
                </div>
            }
        </div>
    );
}

const MakeDeposit = () => {
    return (
        <div className='make_deposit box_div'>
            <MiniBox />
            <div className='underline'></div>
            <section style={{paddingTop: '0rem'}}>
                <Routes>
                    <Route index element={<Navigate to="paywithcrypto" replace={true} />} />
                    <Route path="paywithcrypto" element={<PayWithCrypto />} />
                    <Route path="paywithcard" element={
                        <div className='unav'>
                            <div>
                                <p>Sorry, Service Currently Unavailable!</p>
                            </div>
                        </div>
                    } />
                </Routes>
            </section>
        </div>
    );
}

const Withdraw = () => {

    const withdrawsCollectionRef = collection(db, "Withdraws") 
    const { userData, setUserData } = useContext(appContext)
    const [allWithdraws, setAllWithdraws] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(()=>{
        getAllWithdraws()
    },[userData])

    const getAllWithdraws = async() => {
        try{
            setIsLoading(true)
            const all = await getDocs(query(withdrawsCollectionRef, where("email", "==", `${userData[0]?.email}`))) 
            let res = []
            all.forEach(user => {
                res.push({
                    id: user.id, 
                    ...user.data()
                })
            })
            setAllWithdraws(res)
            setIsLoading(false)
            // console.log(res)
        }catch(err){
            // console.log(err)
            setError(err.message)
            setIsLoading(false)
        }
    }

    return (
        <div className='withdraw dashpage'>
            <Box />
            <section>
                <Routes>
                    <Route index element={<Navigate to="history" replace={true} />} />
                    <Route path="history" element={<StyledTable data={allWithdraws} isLoading={isLoading} error={error} />} />
                    <Route path="makewithdraw/*" element={<MakeDeposit />} />
                </Routes>
            </section>
        </div>
    );
}

export default Withdraw;