import React from 'react'
import HomeTechPage from '../../../components/Pages/Teacher/homePage'

export default function TeacherHome({ data, user, count }) {
    return (
        <>
            <HomeTechPage data={data} user={user} count={count} />
        </>
    )
}

