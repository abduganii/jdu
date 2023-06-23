import React from 'react'
import Avatar from 'react-avatar'
import { SelectIcon } from '../icons'
import cls from "./person.module.scss"

export default function Person({ avatar, name, id, year, Professor, rate }) {
    return (
        <div className={cls.Person}>
            {
                avatar ? <img
                    src={avatar}
                    width={130}
                    height={130}
                    alt={"img"}
                /> : <Avatar name={name} size="130" round={true} />

            }
            <div className={cls.Person__contect}>
                <p className={cls.Person__name}>{name}</p>
                <div className={cls.Person__div}>
                    <p className={cls.Person__id}>ID:{id}</p>
                    <p className={cls.Person__year}> {year || Professor}</p>
                </div>
                {rate && <div className={cls.Person__rate}><SelectIcon fill={"black"} border={"black"} /> <p>{rate}</p></div>}
            </div>
        </div>
    )
}
