import cls from "./LoginButtun.module.scss"

export default function ButtunLogin({ children, type = 'button', onChange }) {
    return (
        <button type={type} className={cls.ButtunLogin} onClick={onChange}>
            {children}
        </button>
    )
}
