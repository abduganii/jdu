import BlueButtun from '../../buttun/blueBtn'
import Person from '../../person'

import React from 'react'
import { useRef } from 'react'
import cls from "./delete.module.scss"

export default function DeleteMadel({ id, name, avater, years, progress, remove, className, role, close, ...other }) {
    const x = useRef()
    return (
        <div
            ref={x}
            className={`${cls.DeleteMadel} ${className}`}
            onClick={(e) => { if (e.target === x.current) { close() } }}
            {...other}>
            <div className={cls.DeleteMadel__wrap}>
                <h3 className={cls.DeleteMadel__top}>Delete {role}</h3>
                <div className={cls.DeleteMadel__content}>
                    <Person name={name} year={years} avatar={avater} id={id} />
                    <h3 className={cls.DeleteMadel__agree}>Do you want to delete this {role}?</h3>
                    <p className={cls.DeleteMadel__text}>By deleting a {role}, you will immediately add this {role} to the {role} archive.</p>
                </div>
                <div className={cls.DeleteMadel__botton}>
                    <button className={cls.DeleteMadel__Cancel} onClick={close}>
                        Cancel
                    </button>
                    <BlueButtun onClick={remove} style={{ padding: "14px 30px" }}>
                        Delete
                    </BlueButtun>
                </div>
            </div>
        </div >
    )
}
