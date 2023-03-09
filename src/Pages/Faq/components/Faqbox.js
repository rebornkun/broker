import { useState } from "react";

const Faqbox = ({title, text}) => {

    const [openModal, setOpenModal] = useState(false)
    return (
        <div className={`faqbox ${openModal ? 'open' : ''}`}>
            <div className="faqbox_header">
                <h5>{title}</h5>
                <div style={{height: '20px', width: '20px', position: "relative", cursor: 'pointer'}} onClick={()=>setOpenModal(!openModal)}>
                    <div className="plus"></div>
                    <div className={`plus ${openModal ? '' : 'close'}`}></div>
                </div>
            </div>
            <div className="faqbox_body">
                {text}
            </div>
        </div>
    );
}

export default Faqbox;