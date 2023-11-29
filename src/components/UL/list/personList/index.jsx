import DoteBtn from '../../buttun/doteBtn'
import IdBtn from '../../buttun/idBtn'

import PlusBtn from '../../buttun/plusBtn'
import SkillBtn from '../../buttun/skill'
import ListModal from '../../madals/listMadal'
import React from 'react'
import { useRef, useState } from 'react'
import Avatar from 'react-avatar';
import cls from "./personlist.module.scss";
import { Link } from '@react-email/link'


export default function PersonList({ id, img, name, gruop, student, rate, phone, skill, email, remove, update, onClick }) {
    const [useId, setIseId] = useState()
    const [clickTrue, setClick] = useState(false)
    const x = useRef()
    const y = useRef()
    const o = useRef()
    const u = useRef()
    const em = useRef()
    const [number, setNumber] = useState(0)

    return (
        <div style={{ position: 'relative' }}>
            <div className={cls.PersonList} onClick={(e) => {
                if (e.target != y.current && e.target != o.current && e.target != u.current && e.target != em.current) {
                    onClick(e)
                }
            }} >
                <div className={cls.PersonList__fillname} >
                    {img ? <img
                        src={img}
                        width={48}
                        height={48}
                        alt={img}
                    /> : <Avatar name={name} size="48" round={true} />
                    }
                    <p className={cls.PersonList__name}>{name}</p>
                </div>
                <div className={cls.PersonList__id}>
                    <IdBtn>ID:{id}</IdBtn>
                </div>
                <p className={cls.PersonList__Gruop}>{gruop}</p>
                {rate && <div className={cls.PersonList__progres}>
                    {rate}
                </div>
                }
                {phone && <p className={cls.PersonList__phone}>{phone}</p>}
                {student ? <div className={cls.PersonList__skill}>{skill}</div> : ""}
                {email && <a href={`mailto:${email}`} className={cls.PersonList__email} ref={em}>{email}</a>}
                <DoteBtn ref={y} style={{ marginLeft: "50px" }} onClick={() => setIseId(true)} />
                <hr className={cls.PersonList__line} />
            </div>
            <div
                ref={x}
                onClick={e => {
                    if (e.target == x.current) {
                        setIseId(false)
                    }
                }}
                style={useId ? { display: "flex" } : { display: "none" }}
                className={cls.backround}
            ></div>
            <ListModal
                remove={() => {
                    setIseId(false)
                    remove()
                }
                }
                update={() => {
                    setIseId(false)
                    update()
                }}
                onClick={onClick}
                style={useId ? { display: "block" } : { display: "none" }}
            />
        </div>
    )
}
