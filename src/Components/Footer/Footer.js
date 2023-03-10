import React from "react";
import "./Footer.css";
import buttonIcon from "../../Assets/Bold-Arrow-Right.svg";

export default function Footer() {
  return (
    <div className='section twbground' style={{height: 'fit-content'}} >
        <div className='section_container'>
            <div className='contents home_sixth'>
                
            <div className='start_a_project_panel'> 
                <h1>Do you want to join us?<br></br> Let’s work together.</h1>
                <div className='btn'>
                    <div className="Start_a_project_btn">
                        <p className='btn_text'>Start trading</p>
                        <img src={buttonIcon} alt='button icon'></img>
                    </div>
                </div>
            </div>

            <div className='flex fdcolumn hfc jcsevenly'>
                    <div className='flex fdrow footer_btn'>
                        <div className='get_in_touch_btn'>
                            <h1>Get in<br></br>touch</h1>
                        </div>

                        <div className='socials'>

                            <div className='footer_btn'>
                                <a href="mailto:rebbon1tech@gmail.com?subject=Hello%20Rebbon%20Tech&body=My%20name%20is">
                                <div className="socials_btn">
                                    <p className='btn_text'>hello@rebbontech.co</p>
                                </div>
                                </a>
                            </div>
                            <div className='socials_btn_container'>
                                <form className="fdcolumn" style={{width: '100%'}}>
                                    <p>subscribe to our newsletter</p>
                                    <input
                                        className="inp"
                                        type={'email'}
                                    />
                                    <div className="subbtn">
                                        Submit
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className='flex rights_and_privacy'>
                        <p>© XTB Trade.Co 2023. All rights reserved. <p>Privacy policy</p></p>
                    </div>

                </div>
                
            </div>
        </div>
    </div>
  );
}
