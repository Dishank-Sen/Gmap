import {configureStore} from '@reduxjs/toolkit'
import mapFeatureReducer from '../features/mapFeatureSlice'

export const store = configureStore({
    reducer: mapFeatureReducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;