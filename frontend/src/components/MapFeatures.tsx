import { useState } from "react"
import { useAppSelector, useAppDispatch } from '../features/hooks';
import { switchNearby, editRadius } from '../features/mapFeatureSlice';

export default function MapFeatures() {

    const isNearby = useAppSelector((state) => state.isNearby);
    const radius = useAppSelector((state) => state.radius);
    const dispatch = useAppDispatch()

    const handleNearbyEvent = () => {
        dispatch(switchNearby());
    }

    const handleRadiusEvent = (e : React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value){
            const newRadius = Number(e.target.value)
            dispatch(editRadius(newRadius))
        }
    }

    return(
        <div>
            {/* for nearby location */}
            <p>Enable Nearby location search only:</p>
            <input type="checkbox" checked={isNearby} onChange={ handleNearbyEvent }/>
            {isNearby && (
                <input type="number" value={radius} onChange={(e) => handleRadiusEvent(e)}/>
            )}
        </div>
    )
}