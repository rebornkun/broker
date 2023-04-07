import { useContext, useEffect, useState } from "react";
import './CryptoStrip.css'
import icon from '../../../../Assets/play.png'
import appContext from "../../../../context/AppContext";

const Box = ({data}) => {
    return(
        <div className="strip_box fdrow">
            <img src={`${data.image}`} alt="fff"/>
            <p className="name">{data.name} {`(${data.symbol.toUpperCase()})`}</p>
            <p className="price">{`$${data.current_price}`}</p>
            <div className="percentage fdrow">
                <img src={icon} alt="fff"/>
                <p style={{color: data.price_change_percentage_24h < 0 ? 'red' : 'green'}}>{`${(Math.round(data.price_change_percentage_24h * 100) / 100).toFixed(2)}%`}</p>
            </div>
        </div>
    );
}

const Strip = ({data}) => {
    return(
        <div className={`strip_rope fdrow h100`}>
            {
            data.map((data,i)=>{
                return <Box data={data}/>
            })
            }
        </div>
    );
}

const CryptoStrip = () => {

    let [cryptoData, setCryptoData] = useState([])
    let [show, setShow] = useState(false)
    useEffect(()=>{
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        .then((res)=> res.json())
        .then((res) => {
            let arr = res.slice(0,7)
            setCryptoData(arr)
            // console.log(arr)
        })
    },[])

  const { appScrollBody, btcPrice, setBtcPrice } = useContext(appContext)
  const scroll = () => {
    let elementTop = appScrollBody.current.scrollTop
    let elementheight = appScrollBody.current.scrollHeight
      if (elementTop > 50) {
        setShow(true)
        if (elementheight - 1000 < elementTop) {
          setShow(false)
        } else {
          setShow(true)
        }
      } else {
        setShow(false)
      }

  }

  useEffect(()=>{
    setBtcPrice(cryptoData[0])
  },[])
  
  useEffect(()=>{
    appScrollBody.current.addEventListener("scroll", scroll);
    
    return () => {
      appScrollBody.current.removeEventListener("scroll", scroll)
    }
  },[])


    return (
        <div className={`crypto_strip_container ${!show ? 'show' : ''} fdrow`}>
            <div className="blah">
                <Strip data={cryptoData} />
                <Strip data={cryptoData} />
            </div>
        </div>
    );
}

export default CryptoStrip;