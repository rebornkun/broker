import './components.css'

const Table = () => {
    return (
        <div className='profit box_div fdrow'>
            <div className='fdrow aic gap02'>
                <p className='montitle'>Earned:</p>
                <p className='value'>$0.0</p>
            </div>
            <div className='fdrow aic gap02'>
                <p className='montitle'>Available:</p>
                <p className='value'>$0.0</p>
            </div>
            <div className='fdrow aic gap02'>
                <p className='montitle'>Paid:</p>
                <p className='value'>$0.0</p>
            </div>
       </div> 
    );
}

export default Table;