import React from 'react'
import cls from "./loader.module.scss"
export default function Loader() {
    return (
        <div className={cls.Loader}>
            {/* <img src="/loader.gif" alt="" /> */}
            <div>
                <div class={cls.ldsring}><div></div><div></div><div></div><div></div></div>
                <p>読み込み中...</p>
            </div>
        </div>
    )
}
