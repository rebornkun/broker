import { useRef, useState } from 'react'
import './Login.css'

const Login = () => {

    const [show, setShow] = useState(false)
    const inputRef = useRef() 
    // console.log(inValue)

    const handleView = () => {
        if(inputRef.current.getAttribute('type') === 'password'){
            inputRef.current.setAttribute('type', 'text');
            setShow(true)
        }else{
            inputRef.current.setAttribute('type', 'password');
            setShow(false)
        }
    }

    return (
        <div className="login_container">
            <div className='login_content'>
                <div className='form_container'>
                </div>
                <div className='forms'>
                    <h1>SIGN IN</h1>
                    <form>
                        <div className='inputBox'>
                            <label htmlFor={'Email'}>Email</label>
                            <input 
                            type={'email'}
                            id={'Email'}
                            name={'Email'}
                            placeholder={'abc@gmail.com'}
                            // value={inValue}
                            // onChange={handleFieldChange}
                            />
                        </div>

                        <div className='inputBox'>
                            <label htmlFor={'Password'}>Password</label>
                            <input 
                            ref={inputRef}
                            type={'password'}
                            id={'Password'}
                            name={'Password'}
                            placeholder={'Min of 6 chars'}
                            // value={inValue}
                            // onChange={handleFieldChange}
                            />
                            {
                                show ? 
                                <svg className='password_vis_toogle' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>{handleView()}}>
                                    <path d="M13.3589 11.2375C15.0613 9.72095 16 7.99998 16 7.99998C16 7.99998 13 2.49998 8 2.49998C6.98462 2.49998 6.05172 2.7268 5.20967 3.08831L5.98054 3.85918C6.60983 3.63315 7.28441 3.49998 8 3.49998C10.1194 3.49998 11.879 4.66816 13.1679 5.95708C13.8037 6.59288 14.2978 7.23191 14.6327 7.71239C14.7055 7.81675 14.7704 7.91319 14.8273 7.99998C14.7704 8.08677 14.7055 8.1832 14.6327 8.28756C14.2978 8.76805 13.8037 9.40707 13.1679 10.0429C13.0031 10.2077 12.8306 10.3705 12.6506 10.5292L13.3589 11.2375Z" fill="black"/>
                                    <path d="M11.2975 9.17612C11.4286 8.80854 11.5 8.41259 11.5 7.99998C11.5 6.06698 9.933 4.49998 8 4.49998C7.58738 4.49998 7.19144 4.57138 6.82386 4.7025L7.64618 5.52482C7.76176 5.50845 7.87989 5.49998 8 5.49998C9.38071 5.49998 10.5 6.61926 10.5 7.99998C10.5 8.12008 10.4915 8.23821 10.4752 8.3538L11.2975 9.17612Z" fill="black"/>
                                    <path d="M8.35385 10.4751L9.17617 11.2974C8.80858 11.4286 8.41263 11.5 8 11.5C6.067 11.5 4.5 9.93297 4.5 7.99998C4.5 7.58735 4.5714 7.1914 4.70253 6.82381L5.52485 7.64613C5.50847 7.76172 5.5 7.87986 5.5 7.99998C5.5 9.38069 6.61929 10.5 8 10.5C8.12012 10.5 8.23825 10.4915 8.35385 10.4751Z" fill="black"/>
                                    <path d="M3.34944 5.47072C3.16945 5.62941 2.99693 5.79226 2.83211 5.95708C2.19631 6.59288 1.70216 7.23191 1.36727 7.71239C1.29454 7.81675 1.22963 7.91319 1.1727 7.99998C1.22963 8.08677 1.29454 8.1832 1.36727 8.28756C1.70216 8.76805 2.19631 9.40707 2.83211 10.0429C4.12103 11.3318 5.88062 12.5 8 12.5C8.7156 12.5 9.39018 12.3668 10.0195 12.1408L10.7904 12.9116C9.9483 13.2732 9.01539 13.5 8 13.5C3 13.5 0 7.99998 0 7.99998C0 7.99998 0.938717 6.279 2.64112 4.7624L3.34944 5.47072Z" fill="black"/>
                                    <path d="M13.6464 14.3535L1.64645 2.35353L2.35355 1.64642L14.3536 13.6464L13.6464 14.3535Z" fill="black"/>
                                </svg>
                                :
                                <svg className='password_vis_toogle' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>{handleView()}}>
                                    <path d="M16 8C16 8 13 2.5 8 2.5C3 2.5 0 8 0 8C0 8 3 13.5 8 13.5C13 13.5 16 8 16 8ZM1.1727 8C1.22963 7.91321 1.29454 7.81677 1.36727 7.71242C1.70216 7.23193 2.19631 6.5929 2.83211 5.95711C4.12103 4.66818 5.88062 3.5 8 3.5C10.1194 3.5 11.879 4.66818 13.1679 5.95711C13.8037 6.5929 14.2978 7.23193 14.6327 7.71242C14.7055 7.81677 14.7704 7.91321 14.8273 8C14.7704 8.08679 14.7055 8.18323 14.6327 8.28758C14.2978 8.76807 13.8037 9.4071 13.1679 10.0429C11.879 11.3318 10.1194 12.5 8 12.5C5.88062 12.5 4.12103 11.3318 2.83211 10.0429C2.19631 9.4071 1.70216 8.76807 1.36727 8.28758C1.29454 8.18323 1.22963 8.08679 1.1727 8Z" fill="black"/>
                                    <path d="M8 5.5C6.61929 5.5 5.5 6.61929 5.5 8C5.5 9.38071 6.61929 10.5 8 10.5C9.38071 10.5 10.5 9.38071 10.5 8C10.5 6.61929 9.38071 5.5 8 5.5ZM4.5 8C4.5 6.067 6.067 4.5 8 4.5C9.933 4.5 11.5 6.067 11.5 8C11.5 9.933 9.933 11.5 8 11.5C6.067 11.5 4.5 9.933 4.5 8Z" fill="black"/>
                                </svg>
                            }
                            <p className='forget_password'>Forget Password?</p>
                        </div>

                        <div className="Schedule_button login">
                            <p>Login</p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;