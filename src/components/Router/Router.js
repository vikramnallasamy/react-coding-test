import React from 'react';
import { Routes, Route } from 'react-router-dom'
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import PageNotFound from '../../pages/PageNotFound/PageNotFound';
import PaginationPage from '../../pages/PaginationPage/PaginationPage';
import AuthenticateRouter from './AuthenticateRouter';


export default function Router() {

    return (
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='profile' element={<AuthenticateRouter><ProfilePage/></AuthenticateRouter>}/>
            <Route path='login' element={<LoginPage/>}/>
            <Route path='pagination' element={<PaginationPage/>} />
            <Route path='*' element={<PageNotFound/>}/>
        </Routes>
    )
}