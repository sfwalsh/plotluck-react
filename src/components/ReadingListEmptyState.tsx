import React from "react";
import "../styling/empty-state.css"
import emptyHeroImage from '../images/emptyState/leaf.png';
import { Link } from "react-router-dom";

const ReadingListEmptyState = () => {
    return (
        <div className="container">
            <div className="d-flex flex-column align-items-center justify-content-center text-center">

                {/* Vertical Alignment in Window from center-framed-content */}

                <div className="center-framed-content mx-3">
                    <img className="top-img" src={emptyHeroImage} />
                    <div>
                        <h4 className="poppins-bold mt-4">You have no items in your collection</h4>
                        <p>
                            Why not add some now?
                        </p>
                    </div>
                    <div>
                        <Link className="btn btn-primary" type="button" to={`/add`}>Add Item</Link>
                    </div>
                </div>

            </div>
        </div>
    )
};

export default ReadingListEmptyState;