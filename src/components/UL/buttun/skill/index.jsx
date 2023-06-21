import cls from "./skillButtun.module.scss"

export default function SkillBtn({ name, color, backround }) {
    return (
        <p className={cls.SkillBtn} style={{ color: color, backgroundColor: backround }}>
            {name}
        </p>
    )
}
