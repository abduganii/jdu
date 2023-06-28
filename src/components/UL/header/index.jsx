import { useEffect, useState } from 'react'
import cls from "./header.module.scss"
import Avatar from 'react-avatar';
import { useLocation, useNavigate } from 'react-router-dom';
export default function Header({ user }) {

    const [roles, setRoles] = useState("")
    const router = useNavigate()


    useEffect(() => {
        const role = user?.role
        if (role == "decan") {
            setRoles("Decan")
        }
        if (role == "recruitor") {
            setRoles("Employer")
        }
    }, [router, user?.role]);
    return (
        <header className={cls.Header}>
            <h3 className={cls.Header__logo}>{roles} Panel</h3>
            <div className={cls.Header__left}>
                <input className={cls.Header__search} type="text" placeholder="Search" onChange={(e) => router(`?search=${e?.target.value}`)} />
                <div className={cls.Header__clock}>
                    <div className={cls.Header__clock__japon}>
                        <p className={cls.Header__clock__title}>Japan</p>
                        <p className={cls.Header__clock__text}>08:30</p>
                    </div>
                    <div className={cls.Header__clock__center}>
                        <div className={cls.Header__clock__line}></div>
                        <img
                            className={cls.Header__clock__img}
                            src={"/Image/line.png"}
                            width={15}
                            height={3}
                            alt={"img"}
                        />
                        <div className={cls.Header__clock__line2}></div>
                    </div>
                    <div className={cls.Header__clock__japon}>
                        <p className={cls.Header__clock__title1}>Uzbekistan</p>
                        <p className={cls.Header__clock__text1}>12:30</p>
                    </div>
                </div>
                <div className={cls.Header__profil}>
                    {
                        user?.avatar ? <img
                            className={cls.Header__profil__img}
                            src={user?.avatar}
                            width={44}
                            height={44}
                            alt={"img"}
                        /> : <Avatar name={`${user?.firstName} ${user?.lastName || ''}`} size="44" round={true} />
                    }

                    <div>
                        <p className={cls.Header__profil__name}>{user?.firstName} {user?.lastName || ""}</p>
                        <p className={cls.Header__profil__id}>ID: {user?.loginId}</p>
                    </div>
                </div>
            </div>
        </header>
    )
}
