import React, { useState } from 'react';
import { useQuery } from "react-query";


const useGetCardData = (cryptoName, options) => {
    return useQuery(`${cryptoName}-card`, async () => {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoName}`);
        return await response.json();
    }, options);
}

const CryptoTracker = ({ cryptoName }: any) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const onCardClick = () => {
        if(!isExpanded) {
            setIsExpanded(true);
        }
    }

    const { data, isLoading } = useGetCardData(cryptoName, {
        refetchInterval: 60000,
        staleTime: 60000,
    });

    console.log(data, isLoading);

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

export default CryptoTracker;