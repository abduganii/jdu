import cls from "./settingsInput.module.scss"

export default function SettingsInput({ label, type, placeholder, onChange, value, eyeClick, icon, icon2, eyeOpen, ...other }) {
    return (
        <label className={cls.SettingsInput}  {...other}>
            <p className={cls.SettingsInput__label}>{label}</p>
            <input className={cls.SettingsInput__input} value={value} type={type} placeholder={placeholder} onChange={onChange} />
            {icon && <div className={cls.SettingsInput__eye} onClick={eyeClick}> {eyeOpen ? icon : icon2}</div>}
        </label>
    )
}
