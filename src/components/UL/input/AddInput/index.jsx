import cls from "./AddInput.module.scss"
import { Select } from "antd";
export default function AddInput({ onChange, label, placeholder, Specialisation = [], register, type, ...other }) {
    return (
        <label className={`${cls.AddInput} ${type === "textarea" && cls.widthFull}`} {...other}>
            <p className={cls.AddInput__label}>{label}</p>
            {type === "textarea" ? <textarea  {...register} className={cls.AddInput__textArea} placeholder={placeholder}>
            </textarea> : type === "select" ? <Select
                defaultValue={placeholder}
                style={{ width: "100%", }}
                onChange={onChange}
                options={Specialisation?.map(sp => ({ value: sp.id, label: sp.name }))}
            /> : < input autoComplete="none"  {...register} className={cls.AddInput__input} type={type} placeholder={placeholder} onChange={onChange} />}
        </label>
    )
}
