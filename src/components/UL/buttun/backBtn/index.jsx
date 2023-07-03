import { DownLoadIcon, LeftIcon } from '../../icons'
import cls from "./BackBtn.module.scss"

export default function BackBtn({ onClick, role, ...other }) {
    return (
        <div className={cls.BackBtn} {...other}>
            <div onClick={onClick}> <LeftIcon />Back</div>

            {role && <label >
                Download resume
                <DownLoadIcon />
            </label>}
        </div>
    )
}
