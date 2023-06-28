import cls from "./doteBtn.module.scss"
import { forwardRef } from "react"

const DoteBtn = forwardRef(({ onClick, ...other }, ref) => {
    return (
        <div className={cls.DoteBtn} ref={ref} onClick={onClick} {...other}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
})
export default DoteBtn