import React, { ReactElement } from "react";
import "../styling/empty-state.css"
import emptyHeroImage from '../images/emptyState/leaf.png';

type ReadingListEmptyStateProps = {
    titleText: string;
    descriptionText: string;
    actionElement: ReactElement;
};

const ReadingListEmptyState = (props: ReadingListEmptyStateProps) => {
    return (
        <div className="container">
            <div className="d-flex flex-column align-items-center justify-content-center text-center">

                {/* Vertical Alignment in Window from center-framed-content */}

                <div className="center-framed-content mx-3">
                    <img className="top-img" src={emptyHeroImage} />
                    <div>
                        <h4 className="poppins-bold mt-4">{props.titleText}</h4>
                        <p>{props.descriptionText}</p>
                    </div>
                    <div>
                        {props.actionElement}
                    </div>
                </div>

            </div>
        </div>
    )
};

export default ReadingListEmptyState;