import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isNearby : true,
    radius : 1000 
}

export const mapFeatureSlice = createSlice({
    name: 'mapFeatures',
    initialState,
    reducers:{
        switchNearby : (state) => {
            state.isNearby = !state.isNearby
        },
        editRadius : (state, action) => {
            if(state.isNearby){
                state.radius = action.payload
            }
        }
    }
})

export const {switchNearby, editRadius} = mapFeatureSlice.actions

export default mapFeatureSlice.reducer