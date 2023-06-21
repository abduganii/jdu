import cls from "./concel.module.scss"

export default function CancelBtn({ onClick, children }) {
    return (
        <button className={cls.CancelBtn} onClick={onClick}>
            {children}
        </button>
    )
}
