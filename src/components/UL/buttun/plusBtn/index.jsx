import cls from "./plus.module.scss"

export default function PlusBtn({ lenght, onClick }) {
    return (
        <button className={cls.PlusBtn} onClick={onClick}>
            +{lenght}
        </button>
    )
}
