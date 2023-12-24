import cls from "./userChechboz.module.scss"

export default function UserCheckBoz({ openUser, setopenUser, ...other }) {
    return (
        <div className={cls.UserCheckBoz} {...other}>
            <label>
                <input
                    name='type'
                    type={"radio"}
                    value={"inputs"}
                    checked={openUser == "inputs" ? true : false}
                    onChange={(e) => setopenUser(e.target.value)}
                />
                <p>Form</p>
            </label>
            <label>

                <input name='type'
                    type={"radio"}
                    value={"excel"}
                    checked={openUser == "excel" ? true : false}

                    onChange={(e) => setopenUser(e.target.value)}
                />
                <p>  excel</p>
            </label>
        </div>
    )
}