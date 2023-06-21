"use client"

import CancelBtn from '../../buttun/cancel'
import BlueButtun from '../../buttun/blueBtn'
import React, { useRef } from 'react'
import cls from "./AddMadal.module.scss"

export default function AddMadal({ role, children, closeMadal, OnSubmit }) {
    const x = useRef()
    return (
        <div ref={x} className={cls.AddMadal} onClick={(e) => {
            if (e.target === x.current) {
                closeMadal()
            }

        }}>
            <form className={cls.AddMadal__content} onSubmit={OnSubmit}>
                <h3 className={cls.AddMadal__top}>Add {role}</h3>
                <div className={cls.AddMadal__inputs}>{children}</div>
                <div className={cls.AddMadal__btm}>
                    <CancelBtn onClick={closeMadal}>Cancel</CancelBtn>
                    <BlueButtun type={"submit"} style={{ padding: "14px 30px" }}>Save</BlueButtun>
                </div>
            </form >
        </div >
    )
}
