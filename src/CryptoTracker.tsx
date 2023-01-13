import React, { useState } from 'react';

const CryptoTracker = ({ cryptoName }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const onCardClick = () => {
        if(!isExpanded) {
            setIsExpanded(true);
        }
    }

    return (
        <div className={`card ${isExpanded ? 'expanded' : 'collapsed'}`}>
            {!isExpanded && (
                <button onClick={onCardClick} className="hitzone" />
            )}
            <div className="card-inner">
                {isExpanded && (
                    <button className="close" onClick={() => setIsExpanded(false)}>Close</button>
                )}
                <div className="top-data">
                    TODO BTC info here
                </div>
            </div>
        </div>
    );
}