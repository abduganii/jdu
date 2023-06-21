import cls from "./SearchSkill.module.scss"

export default function SearchSkill({ label, onChange, placeholder, ...other }) {
    return (
        <label className={cls.SearchSkill} {...other}>
            {label && <p className={cls.SearchSkill__label}>{label}</p>}
            <input className={cls.SearchSkill__input} type="text" placeholder={placeholder} onChange={onChange} />
        </label>
    )
}
