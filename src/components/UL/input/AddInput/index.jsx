import cls from "./AddInput.module.scss"
import { Select } from "antd";
import { ReflashIcon } from "../../icons";
import { useState } from "react";
export default function AddInput({
    onChange,
    label,
    placeholder,
    Specialisation = [],
    register,
    passwordGenerate,
    loginGenerate,
    geterat,
    type,
    alert,
    ...other
}) {
    const [click, setClick] = useState(false)

    function generatePassword() {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }
    function generateLoginId() {
        var length = 6,
            charset = "0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }
    return (
        <label className={`${cls.AddInput} ${type === "textarea" && cls.widthFull}`} {...other}>
            <p className={cls.AddInput__label}>{label}</p>
            {
                type === "textarea" ? <textarea  {...register} className={cls.AddInput__textArea} placeholder={placeholder}>
                </textarea> : type === "select" ? <Select
                    defaultValue={placeholder}
                    style={{ width: "100%", }}
                    onChange={onChange}
                    options={Specialisation?.map(sp => ({ value: sp.id, label: sp.name }))}
                /> : <label className={`${cls.AddInput__labelinut}`}>
                    < input autoComplete="none"
                        {...register}
                        className={`${cls.AddInput__input} ${alert && cls.AddInput__border}`}
                        type={type}
                        placeholder={placeholder}
                        onChange={onChange}
                    />
                    {geterat &&
                        <div className={` ${cls.AddInputRoundno} ${click && cls.AddInputRound}`} onClick={() => setClick(!click)}>
                            <div onClick={() => {
                                if (loginGenerate) {
                                    loginGenerate(generateLoginId())
                                }
                                if (passwordGenerate) {
                                    passwordGenerate(generatePassword())
                                }
                            }} >  <ReflashIcon /></div>
                        </div>}
                </label>
            }
            {alert && <p className={cls.AddInput__alert}>{alert}!</p>}
        </label>
    )
}
