import React from 'react'
import cls from "./noGalllery.module.scss"

export default function NoGaler() {
    return (
        <div className={cls.NoGaler}>
            <img src="/Image/2phote.png" alt="img" />
            <div className={cls.NoGaler__wrap}>
                <h3 className={cls.NoGaler__title}>Galery</h3>
                <p className={cls.NoGaler__text}>You can find more and clearly data and foto, video galery about this student when it uploaded.</p>
            </div>
        </div>
    )
}
