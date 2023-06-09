"use client"

import CancelBtn from '../../buttun/cancel'
import BlueButtun from '../../buttun/blueBtn'
import React, { useRef } from 'react'
import cls from "./AddMadal.module.scss"

export default function AddMadal({ role, children, closeMadal, OnSubmit }) {
    const x = useRef()
    return (
        <div ref={x} className={cls.AddMadal}>
            <form className={cls.AddMadal__content} onSubmit={OnSubmit}>
                <h3 className={cls.AddMadal__top}> {role}</h3>
                <div className={cls.AddMadal__inputs}>{children}</div>
                <div className={cls.AddMadal__btm}>
                    <CancelBtn onClick={closeMadal}>キャンセル</CancelBtn>
                    <BlueButtun type={"submit"} style={{ padding: "14px 30px" }}>保存</BlueButtun>
                </div>
            </form >
        </div >
    )
}

// onClick={(e) => {
//     if (e.target === x.current) {
//         closeMadal()
//     }

// }}
