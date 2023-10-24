import React from 'react'
import Avatar from 'react-avatar'
import { Link } from 'react-router-dom'
import { EmailNewIcon, SelectIcon } from '../icons'
import cls from "./person.module.scss"

export default function Person({ avatar, role, name, id, year, email, Professor, rate }) {

    return (
        <div className={cls.Person}>
            {
                role == 'gruop' ? <div className={cls.Person__gruop}>{name}
                </div> : avatar ? <img
                    src={avatar}
                    width={130}
                    height={130}
                    alt={"img"}
                /> : <Avatar name={name} size="130" round={true} />

            }
            <div className={cls.Person__contect}>
                <div>
                    <p className={cls.Person__name}>{name}</p>
                    <div className={cls.Person__div}>
                        <p className={cls.Person__id}>ID:{id}</p>
                        <p className={cls.Person__year}> {year || Professor}</p>
                    </div>
                    {rate && <div className={cls.Person__rate}><SelectIcon fill={"black"} border={"black"} /> <p>{rate}</p></div>}
                </div>
                {email && <a href={`mailto:${email}`} className={cls.Person__email}><EmailNewIcon /> {email}</a>}
            </div>
        </div>
    )
}
