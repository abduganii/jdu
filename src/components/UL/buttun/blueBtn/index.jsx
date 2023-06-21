import cls from "./BlueButtun.module.scss"

export default function BlueButtun({ children, type = "button", className, onClick, OnSubmit, ...other }) {
    return (
        <button
            className={`${cls.BlueButtun}  ${className && className}`} type={type} onClick={onClick} onSubmit={OnSubmit} {...other} >
            {children}
        </button >
    )
}