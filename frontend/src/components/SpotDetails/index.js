import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { deleteReview, removeSpot } from "../../store/spot";
import { fetchSingleSpot, fetchSpotReviews } from "../../store/spot";
import EditSpotModal from "../EditSpotModal";
import BookingCard from "../BookingCard";
import ReviewFormModal from "../ReviewFormModal";
import "./SpotDetails.css"
import MapContainer from "../Maps";

const SpotDetails = () => {
    const { spotId } = useParams();
    const [spotLoaded, setSpotLoaded] = useState(false);
    const [spot, setSpot] = useState({});
    const [reviews, setReviews] = useState({});
    const [reviewDelete, setReviewDelete] = useState(false)
    const [editSubmit, setEditSubmit] = useState(false);
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        dispatch(fetchSingleSpot(spotId)).then((data) => {
            setSpotLoaded(true)
            setSpot(data)
        })
    }, [dispatch, spotId, reviewDelete, editSubmit])

    useEffect(() => {
        dispatch(fetchSpotReviews(spotId)).then((data) => {
            setReviews(data)
        })
    }, [spotLoaded, spotId, dispatch, reviewDelete, editSubmit])

    const { Reviews } = reviews;

    const capitalize = (str) => {
        const capital = str[0].toUpperCase();
        const newStr = capital + str.slice(1);
        return newStr
    };

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(removeSpot(spot))
        history.push('/')
    };

    const handleReviewDelete = (e, id) => {
        e.preventDefault();
        return dispatch(deleteReview(id)).then((data) => {
            setReviewDelete(!reviewDelete)
        })
    };

    let rating;
    if (spot.avgStarRating) {
        rating = Math.round(+spot.avgStarRating*100)/100
    };

    if (spotLoaded && Object.keys(spot).length > 0) {
        return (
            <div className="page-container">
                <div className="header-container">
                    <div className="header-upper">
                        <h2>{spot.name}</h2>
                    </div>
                    <div className="header-lower">
                        <div className="header-lower-left">
                            {spot.avgStarRating ? (
                                <p className="head-rating">★{rating}</p>
                                )
                            :
                                (
                                    <p className="head-rating">★ No Reviews Yet</p>
                                )
                            }
                            <p className="head-rating">{spot.numReviews} {spot.numReviews === 1 ? (<>review</>) : (<>reviews</>)}</p>
                            <p className="city-state">{spot.city}, {spot.state}</p>
                        </div>
                        <div className="header-lower-right">
                            {user && spot.ownerId === user.id && (
                                <div className="buttons">
                                    <button className="clickable delete-btn" onClick={handleDelete}><i className="fa-regular fa-trash-can"></i></button>
                                    <EditSpotModal setEditSubmit={setEditSubmit} spot={spot}/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="image-box">
                    <div className="image-box-left">
                        <img className="big-img" alt={spot.SpotImages[0].id} src={spot.SpotImages[0].url}></img>
                    </div>
                    <div className="image-box-right">
                        <div className="imgbox-top">
                            <div className="top-left smimg-top">
                                {spot.SpotImages[1]
                                        ? (
                                            <img className="det-img" alt={spot.SpotImages[1].id} src={spot.SpotImages[1].url}></img>
                                        )
                                        : (
                                            <p>No Image Available</p>
                                        )
                                }
                            </div>
                            <div className="top-right smimg-top">
                                {spot.SpotImages[2]
                                        ? (
                                            <img className="det-img top-corner" alt={spot.SpotImages[2].id} src={spot.SpotImages[2].url}></img>
                                        )
                                        : (
                                            <p>No Image Available</p>
                                        )
                                }
                            </div>
                        </div>
                        <div className="imgbox-bot">
                            <div className="bot-left smimg-bot">
                                {spot.SpotImages[3]
                                    ? (
                                        <img className="det-img" alt={spot.SpotImages[3].id} src={spot.SpotImages[3].url}></img>
                                    )
                                    : (
                                        <p>No Image Available</p>
                                    )
                                }
                            </div>
                            <div className="bot-right smimg-bot">
                                {spot.SpotImages[4]
                                ? (
                                    <img className="det-img bot-corner" alt={spot.SpotImages[4].id} src={spot.SpotImages[4].url}></img>
                                )
                                : (
                                    <p>No Image Available</p>
                                )
                                }
                            </div>
                        </div>
                    </div>   
                </div>
                <div className="body-container">
                    <div className="body-left">
                        <div className="body-left-header">
                            <h3>Entire spot hosted by {capitalize(spot.Owner.firstName)} {capitalize(spot.Owner.lastName)}</h3>
                            <p>6 guests · 4 bedrooms · 5 beds · 2 baths</p>
                        </div>
                        <hr className="line"></hr>
                        <div className="bl">
                            <div className="bl-flex">
                                <div className="icon-container">
                                    <div className="icon">
                                        <i className="fa-solid fa-medal"></i>
                                    </div>
                                    <div className="icon key">
                                        <i className="fa-solid fa-key"></i>
                                    </div>
                                    <div className="icon">
                                        <i className="fa-regular fa-calendar"></i>
                                    </div>
                                </div>
                                <div className="body-left-standout">
                                    <div className="super-host">
                                        <h3 className="title">{capitalize(spot.Owner.firstName)} is a Superhost</h3>
                                        <p className="bot-text">Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests</p>
                                    </div>
                                    <div className="super-host checkIn">
                                        <h3 className="title">Self check-in</h3>
                                        <p className="bot-text">You can check in with the smart lock</p> 
                                    </div>
                                    <div id='48hr' className="super-host hrCancel">
                                        <h3 className="title">Free cancellation for 48 hours.</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="body-left-desc">
                            <hr className="det-line"></hr>
                            <p>{spot.description}</p>
                            <hr className="det-line"></hr>
                        </div>
                        <div className="bl-amenities-container">
                            <div className="amenities-header">
                                <h3>What this place offers</h3>
                            </div>
                            <div className="amenities">
                                <div className="amenity">
                                    <i className="fa-solid fa-mountain"></i>
                                    <span>Mountain view</span>
                                </div>
                                <div className="amenity">
                                    <i className="fa-solid fa-utensils"></i>
                                    <span>Kitchen</span>
                                </div>
                                <div className="amenity">
                                    <i className="fa-solid fa-mountain-sun"></i>
                                    <span>Valley view</span>
                                </div>
                                <div className="amenity">
                                    <i className="fa-solid fa-wifi"></i>
                                    <span>Wifi</span>
                                </div>
                                <div className="amenity">
                                    <i className="fa-solid fa-computer"></i>
                                    <span>Dedicated workspace</span>
                                </div>
                                <div className="amenity">
                                    <i className="fa-solid fa-car"></i>
                                    <span>Free parking on premises</span>
                                </div>
                                <div className="amenity">
                                    <i className="fa-solid fa-hot-tub-person"></i>
                                    <span>Private hot tub</span>
                                </div>
                                <div className="amenity">
                                    <i className="fa-solid fa-tv"></i>
                                    <span>HDTV with Disney+, Hulu, Netflix</span>
                                </div>
                <hr className="det-line"></hr>
                            </div>
                            <div>
                                <MapContainer spot={spot} />
                            </div>
                            <hr className="det-line"></hr>
                        </div>
                    </div>
                    <div className="body-right">
                        <BookingCard rating={rating} spot={spot} />
                    </div> 
                </div>
                <div className="reviews-container">
                    <div className="reviews-header">
                        <div className="rating-stars">
                            <div className="review-star">
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <h2>
                                {rating} · {spot.numReviews} reviews
                            </h2>
                        </div>
                        {user && user.id !== spot.Owner.id && (
                        <ReviewFormModal setReviewDelete={setReviewDelete} />
                    )}
                    </div>
                    <div className="reviews-box">
                        {Reviews && Reviews.length > 0 ? Reviews.map(obj => (
                            <div key={obj.id} className="review-actual">
                                <div className="review-left">
                                    <div className="review-upper">
                                        <div className="inner-left">
                                            <p>{capitalize(obj.User.firstName)}</p>
                                        </div>
                                        <div className="inner-right">
                                            <span className="each-star">
                                                <i className="fa-solid fa-star"></i>
                                            </span>
                                            <p>{obj.stars}</p>
                                        </div>
                                        {user && obj.User.id === user.id && (
                                            <button onClick={(e) => handleReviewDelete(e, obj.id)} className="clickable review-dlt delete-btn"><i className="fa-regular fa-trash-can"></i></button>
                                            )}
                                    </div>
                                    <p>{obj.review}</p>
                                </div>
                                <div className="review-right">
                                </div>
                            </div>
                        )):
                            <h3>No Reviews (Yet)</h3>
                        }
                    </div>
                    {/* {user && user.id !== spot.Owner.id && (
                        <ReviewFormModal setReviewDelete={setReviewDelete} />
                    )} */}
                </div>
                <hr className="line"></hr>
            </div>
        )
    } else return (
        <div className="loader"></div>
    );
};

export default SpotDetails;
