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
                <h3 className={cls.DeleteMadel__top}>
                    {role == "student" ? "学生を削除" : role == "decan" ? "" : "リクルーターを削除"}
                </h3>
                <div className={cls.DeleteMadel__content}>
                    <Person name={name} year={years} avatar={avater} id={id} />
                    <h3 className={cls.DeleteMadel__agree}>
                        {role == "student" ? "この学生を削除しますか？" : role == "decan" ? "" : "このリクルーターを削除しますか？"}
                    </h3>
                    <p p className={cls.DeleteMadel__text}>
                        {role === "student" ? "学生を削除すると、その学生はすぐに学生アーカイブに追加されます。" :
                            role == "decan" ? "リクルーターを削除すると、そのリクルーターはすぐにリクルーターアーカイブに追加されます。"
                                : ""
                        }
                    </p>
                </div>
                <div className={cls.DeleteMadel__botton}>
                    <button className={cls.DeleteMadel__Cancel} onClick={close}>
                        キャンセル
                    </button>
                    <BlueButtun onClick={remove} style={{ padding: "14px 30px" }}>
                        削除
                    </BlueButtun>
                </div>
            </div>
        </div >
    )
}
