import { useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";

import SpotCard from "../SpotCard";

import "./MySpots.css"

const MySpots = () => {
    const { userId } = useParams();
    const spotsObj = useSelector(state => state.spots.allSpots);
    const user = useSelector(state => state.session.user);

    const mySpotsObj = {};
    Object.values(spotsObj).forEach(obj => {
        if (+obj.ownerId === +userId) {
            mySpotsObj[obj.id] = obj
        }
    });

    return (
        <>
        {!user && <Redirect to='/'></Redirect>}
        <div className="mySpots">
            <h2 style={{textAlign: 'center'}}>My Spots</h2>
            {Object.keys(mySpotsObj).length > 0 ? (
                <div className="card-container">
                    {Object.values(mySpotsObj).map((spot) => (
                            <SpotCard key={`spot${spot.id}`} spot={spot} />
                        ))}
                </div>
                ):
                (
                    <div style={{textAlign: "center"}} className="no-spots">
                        <h2 style={{textAlign: "center"}}>Oops... You Don't Have Any Spots!</h2>
                    </div>
                )
            }
        </div>
        </>
    )
};

export default MySpots;
