import cls from "./plus.module.scss"
import { forwardRef } from "react"


const PlusBtn = forwardRef(({ lenght, onClick }, ref) => {
    return (
        <button className={cls.PlusBtn} ref={ref} onClick={onClick}>
            +{lenght}
        </button>
    )
})

export default PlusBtn