import DoteBtn from '../../buttun/doteBtn'
import IdBtn from '../../buttun/idBtn'

import PlusBtn from '../../buttun/plusBtn'
import SkillBtn from '../../buttun/skill'
import ListModal from '../../madals/listMadal'
import React from 'react'
import { useRef, useState } from 'react'
import Avatar from 'react-avatar';
import cls from "./personlist.module.scss"

export default function PersonList({ id, img, name, gruop, student, rate, phone, skill = [], email, remove, update, onClick }) {
    const [useId, setIseId] = useState()
    const x = useRef()
    const y = useRef()

    return (
        <div style={{ position: 'relative' }}>
            <div className={cls.PersonList} onClick={(e) => {
                if (e.target != y.current) {
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
                    <progress className={cls.PersonList__progres__progress} value={rate} max="100">70 %</progress>
                    <p className={cls.PersonList__progres__text}>{rate}%</p>
                </div>
                }
                {phone && <p className={cls.PersonList__phone}>{phone}</p>}
                {skill.length !== 0 ? <div className={cls.PersonList__skill}>
                    {skill.slice(0, 3).map(e => (

                        <SkillBtn name={e?.skill?.name} color={e?.skill?.color} backround={'rgba(241, 101, 41, 0.1)'} />
                    ))}
                    {(skill?.length - 3) > 0 ? <PlusBtn lenght={skill.length - 3} /> : ""}
                </div> : student ? <div className={cls.PersonList__skill}></div> : ""}
                {email && <p className={cls.PersonList__email}>{email}</p>}
                <DoteBtn ref={y} style={{ marginLeft: "40px" }} onClick={() => setIseId(true)} />
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
