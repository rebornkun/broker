import './SmallCard.css'

const SmallCard = ({img, title, text}) => {
    return (
        <div className='small_card'>
            <img src={img} alt={title} />
            <h5>{title}</h5>
            <p>{text}</p>
        </div>
    );
}

export default SmallCard;