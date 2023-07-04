import React from 'react'
import cls from "./loader.module.scss"
export default function Loader() {
    return (
        <div className={cls.Loader}>
            <img src="/loader.gif" alt="" />
        </div>
    )
}
