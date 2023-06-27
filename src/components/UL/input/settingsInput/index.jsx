import cls from "./settingsInput.module.scss"

export default function SettingsInput({ label, type, register, placeholder, onChange, eyeClick, icon, icon2, eyeOpen, ...other }) {
    return (
        <label className={cls.SettingsInput}  {...other}>
            <p className={cls.SettingsInput__label}>{label}</p>
            <input className={cls.SettingsInput__input} type={type} placeholder={placeholder} {...register} onChange={onChange} />
            {icon && <div className={cls.SettingsInput__eye} onClick={eyeClick}> {eyeOpen ? icon : icon2}</div>}
        </label>
    )
}
