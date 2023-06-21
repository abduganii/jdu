import React from 'react'
import { SelectIcon } from '../icons'
import cls from "./person.module.scss"

export default function Person({ avatar, name, id, year, Professor, rate }) {
    return (
        <div className={cls.Person}>
            <img
                src={avatar}
                width={130}
                height={130}
                alt={"img"}
            />
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
