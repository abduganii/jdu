import BlueButtun from "../../../UL/buttun/blueBtn"
import SchemaCard from "../../../UL/card/schema"
import FilterSchema from "../../../UL/filterSchema"
import CalendarList from "../../../UL/list/calendarList"
import cls from "./schema.module.scss"
export default function DecanSchemaPage() {
  return (
    <div className={cls.Schema}>
      <div className={cls.Schema__Top}>
        <FilterSchema />
        <BlueButtun>+ Create schedule</BlueButtun>
      </div>
      <CalendarList style={{ marginTop: "18px" }} />
      
      <div className={cls.Schema__test}>
        <ul className={cls.Schema__test__top}>
          <li className={cls.Schema__test__top__item}>09:00</li>
          <li className={cls.Schema__test__top__item}>10:00</li>
          <li className={cls.Schema__test__top__item}>11:00</li>
          <li className={cls.Schema__test__top__item}>12:00</li>
          <li className={cls.Schema__test__top__item}>13:00</li>
          <li className={cls.Schema__test__top__item}>14:00</li>
          <li className={cls.Schema__test__top__item}>15:00</li>
        </ul>

        <div className={cls.Schema__test__btn}>
          <ul className={cls.Schema__test__left}>
            <li className={cls.Schema__test__left__item}>21A</li>
            <li className={cls.Schema__test__left__item}>21B</li>
            <li className={cls.Schema__test__left__item}>21C</li>
            <li className={cls.Schema__test__left__item}>21D</li>
            <li className={cls.Schema__test__left__item}>21E</li>
            <li className={cls.Schema__test__left__item}>21F</li>
          </ul>
          <div className={cls.Schema__test__content}>
    <SchemaCard/>
          </div>
        </div>
      </div>
    </div>
  )
}
