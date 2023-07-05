import cls from "./inputLogin.module.scss"

export default function LoginInput({ onChange, register = {}, alert, setError, type, placeholder, ...other }) {
    return (
        <div className={cls.LoginInput__label}>
            <input
                className={`${cls.LoginInput} ${alert && cls.LoginInput__border}`}
                type={type}
                placeholder={placeholder}
                {...register}
                {...setError}
                {...other}
            />
            {alert && <p>{alert}</p>}
        </div>
    )
}
