import React, { useEffect } from 'react'
import { useAuthContext } from '../hooks/contexts/auth'
import { getTokenStorage } from '../hooks/storage/token'
import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'

const Routes = () => {
    const {
        loggedUser,
        defineLoggedUserByToken
    } = useAuthContext()

    useEffect(() => {
        getTokenStorage().then(response => {
            if (response)
                defineLoggedUserByToken(response)
        })
    }, [])

    return (
        <>
            {loggedUser
                ? <AuthRoutes />
                : <AppRoutes />
            }
        </>
    )
}

export default Routes