import cls from "./inputLogin.module.scss"

export default function LoginInput({ onChange, register = {}, type, placeholder, ...other }) {
    return (
        <input
            className={cls.LoginInput}
            type={type}
            placeholder={placeholder}
            {...register}
            {...other}
        />
    )
}
