import './PlanCard.css'

const PlanCard = ({color, title, cost, interest, min, max, duration}) => {
    return (
        <div className='plancard_con'>
            <div style={{backgroundColor: color}} className='header'>
                <h5>{title}</h5>
            </div>
            <div>
                <h5>{`$${cost}`}</h5>
                <div className='underlinec'></div>
            </div>
            <div className='contt fdcolumn w100p h100p jcc aic'>
                <p>interest: {interest}%</p>
                <div className='underline'></div>
                <p>Min: {`$${min}`}</p>
                <div className='underline'></div>
                <p>Max: {`$${max}`}</p>
                <div className='underline'></div>
                <p>{duration}hrs</p>
            </div>
        </div>
    );
}

export default PlanCard;