import cls from "./settingsInput.module.scss"

export default function SettingsInput({ label, type, className, register, alert, placeholder, onChange, eyeClick, icon, icon2, eyeOpen, ...other }) {
    return (
        <label className={`${cls.SettingsInput} ${className && className}`}  {...other}>
            <p className={cls.SettingsInput__label}>{label}</p>
            <input className={`${cls.SettingsInput__input} ${alert && cls.SettingsInput__border}`} type={type} placeholder={placeholder} {...register} onChange={onChange} />
            {icon && <div className={cls.SettingsInput__eye} onClick={eyeClick}> {eyeOpen ? icon : icon2}</div>}
            {alert ? <p className={cls.SettingsInput__alert}>{alert}</p> : ""}
        </label>
    )
}
