import {configureStore} from "@reduxjs/toolkit"
import admin from './Admin.slice'

export const  store=configureStore({
    reducer:{
        admin,
    },
    devTools:process.env.NODE_ENV!=="production"
})