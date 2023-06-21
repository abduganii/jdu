import React from 'react'
import cls from "./ListModal.module.scss"

export default function ListModal({ update, remove, onClick, className, ...other }) {
    return (
        <div className={`${cls.ListModal} ${className && className}`} {...other}>
            <button className={cls.ListModal__btn} onClick={update}>Edit</button>
            <button className={cls.ListModal__btn} onClick={remove}>Delete</button>
            <button className={cls.ListModal__btn} onClick={onClick}>Action</button>
        </div>
    )
}
