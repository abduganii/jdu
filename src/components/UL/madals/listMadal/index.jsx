import React from 'react'
import cls from "./ListModal.module.scss"

export default function ListModal({ update, remove, role, select, lebel, onClick, className, ...other }) {
    return (
        <div className={`${cls.ListModal} ${className && className}`} {...other}>
            {
                role == "student" ? <button className={cls.ListModal__btn} onClick={select}> {lebel && lebel}</button> : <>
                    <button className={cls.ListModal__btn} onClick={update}>Edit</button>
                    <button className={cls.ListModal__btn} onClick={remove}>Delete</button></>
            }
        </div>
    )
}
