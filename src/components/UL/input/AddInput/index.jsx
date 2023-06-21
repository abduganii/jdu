import cls from "./AddInput.module.scss"

export default function AddInput({ onChange, label, placeholder, register, type, ...other }) {
    return (
        <label className={`${cls.AddInput} ${type === "textarea" && cls.widthFull}`} {...other}>
            <p className={cls.AddInput__label}>{label}</p>
            {type === "textarea" ? <textarea  {...register} className={cls.AddInput__textArea} placeholder={placeholder}>
            </textarea> : <input autoComplete="none"  {...register} className={cls.AddInput__input} type={type} placeholder={placeholder} onChange={onChange} />}
        </label>
    )
}
