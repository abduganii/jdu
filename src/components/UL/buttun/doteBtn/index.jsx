import cls from "./doteBtn.module.scss"

export default function DoteBtn({ onClick, ...other }) {
    return (
        <div className={cls.DoteBtn} onClick={onClick} {...other}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
