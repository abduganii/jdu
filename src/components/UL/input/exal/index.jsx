
import { useState } from "react"
import { PriewExal } from "../../../../services/exal"
import SmallExample from "../../exalTable/exalTable"
import { CloseIcon1, FileIcons, XIcons } from "../../icons"
import cls from "./exal.module.scss"

export default function ExalInput({ onChange, setResolv, exalError, resolv }) {

    const [openMadal, setOpenMadal] = useState(false)
    const [data, setData] = useState([])

    console.log("exalError", exalError)

    const PriewExalFunc = async () => {

        const formData = new FormData()
        formData.append("excel", resolv)

        await PriewExal(formData)
            .then(res => {
                setData(res?.data)
                console.log(res)
            })
            .catch(err => {
                console.log("ok")
            })
    }
    return (
        <>
            <div className={cls.ExalInput}>
                <p className={cls.ExalInput__text}>Choose excel file</p>
                <div className={cls.ExalInput__wrap}>
                    <label className={cls.ExalInput__label} >
                        <FileIcons />
                        <input type="file" onChange={(e) => {
                            setResolv(e?.target.files[0])
                            onChange(e)
                        }} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                    </label>
                    <div className={`${cls.ExalInput__resolv} ${resolv ? cls.ExalInput__resolvactive : ""} `} >
                        <p onClick={() => {
                            if (resolv) {
                                setOpenMadal(true)
                                PriewExalFunc()
                            } else {
                                setOpenMadal(false)
                            }
                        }}>{resolv ? resolv?.name : "Placeholder"}</p>
                        {resolv ? <div onClick={() => setResolv(null)}> <CloseIcon1 /></div> : ""}
                    </div>
                </div>

                {exalError && <p className={cls.ExalInput__error}>Id Must be unique</p>}
            </div>

            {
                openMadal && resolv && <div className={cls.ExalInput__priw}>
                    <div className={cls.ExalInput__priw__wrap}>
                        <div onClick={() => setOpenMadal(false)}>
                            <XIcons />
                        </div>
                    </div>
                    <SmallExample data={data} />
                </div>
            }
        </>
    )
}
