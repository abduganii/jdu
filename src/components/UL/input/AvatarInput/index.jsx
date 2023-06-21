'use client'


import { useState } from 'react'
import { UploadNewIcon } from '../../icons'
import cls from "./AvatarInput.module.scss"

export default function AvatarInput({ onChange, ...other }) {
    const [file, setFile] = useState()
    const hendleimg = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }
    return (
        <div className={cls.AvatarInput}  {...other} >
            <label >
                <input type="file" onChange={(e) => {
                    hendleimg(e)
                    onChange(e)
                }
                } />
                <div className={cls.AvatarInput__avatar}>
                    {file ? <img className={cls.AvatarInput__avatar__img} src={URL.createObjectURL(file)} alt="img" /> : <UploadNewIcon color={"#5627DC"} />}
                </div>
                <p className={cls.AvatarInput__avatar__text}>avatar</p>
            </label>
            <p className={cls.AvatarInput__text}>The photo must be 3x4 in size and no larger than 524kb.</p>
        </div>
    )
}
