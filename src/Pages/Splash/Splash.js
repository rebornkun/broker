import React, { useContext } from 'react';
import appContext from '../../context/AppContext';
import './Splash.css'


const Splash = ({}) => {

    const { splashdisplay, setSplashDisplay } = useContext(appContext)
    console.log(splashdisplay)
    return(
            <div className={`splash_background ${splashdisplay}`}>
                <div className='splash_container'>
                    <div className='loading'>
                        <span className='dot bounce firstb'></span>
                        <span className='dot bounce secondb'></span>
                        <span className='dot bounce thirdb'></span>
                    </div>
                </div>
            </div>

    );

}

export default Splash;