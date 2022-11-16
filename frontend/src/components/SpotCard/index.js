import { useHistory } from "react-router-dom";

import "./SpotCard.css"

const SpotCard = ({ spot }) => {
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        history.push(`/spots/${spot.id}`)
    }
    
    let rating;
    if (spot.avgRating) {   
        rating = Math.round(+spot.avgRating*100)/100;
    } ;

    return (
        <div onClick={handleClick} className="card">
            <div className='image-container'>
                {spot.previewImage ? (
                    <img alt={spot.name} src={spot.previewImage}></img>
                    ): 
                    (
                        <h3>No Preview Image Available</h3>
                    )
                }
            </div>
            <div className='title-container'>
                <h5>{spot.city}, {spot.state}</h5> 
                {spot.avgRating ? (
                    <span>
                    ★ {rating}
                    </span>
                    ) :
                    (<span>No Reviews</span>)
                }
            </div>
            <div className='price-container'>
                <p><span className='price'>${spot.price}</span> night</p>
            </div>
        </div>
    )
};

export default SpotCard;
