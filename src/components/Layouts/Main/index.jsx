import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { GetMe } from '../../../services/me'
import Header from '../../UL/header'
import SideBar from '../../UL/sidebar'
import cls from "./Main.module.scss"

export default function MainLayout() {
    const [user, setUser] = useState()
    const router = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            await GetMe()
                .then(res => setUser(res?.data))
                .catch(err => navigate('auth/login'))
        }
        fetchData()
            .then((err) => {
                console.log(err);
            })

    }, [router]);
    return (
        <div>
            <Header user={user} />
            <div className={cls.MainLayout__content}>
                <SideBar user={user} />
                <Outlet />
            </div>
        </div>
    )
}
