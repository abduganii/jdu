import cls from "./Language.module.scss"

export default function Language({ language, onClick }) {
    return (
        <div className={cls.Language}>
            {language?.map(e => (
                <p key={e.id} className={cls.Language__text} onClick={onClick}>{e.text}</p>
            ))}
        </div>
    )
}
