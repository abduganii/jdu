
import { CloseIcon1, FileIcons } from "../../icons"
import cls from "./exal.module.scss"

export default function ExalInput({ onChange, setResolv, resolv }) {

    return (
        <div className={cls.ExalInput}>
            <p className={cls.ExalInput__text}>Choose exel file</p>
            <div className={cls.ExalInput__wrap}>
                <label className={cls.ExalInput__label} >
                    <FileIcons />
                    <input type="file" onChange={(e) => setResolv(e?.target.value)} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                </label>
                <div className={`${cls.ExalInput__resolv} ${resolv ? cls.ExalInput__resolvactive : ""} `}>
                    <p>{resolv ? resolv : "Placeholder"}</p>
                    {resolv ? <div onClick={() => setResolv(null)}> <CloseIcon1 /></div> : ""}
                </div>
            </div>
        </div>
    )
}
