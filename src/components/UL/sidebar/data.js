import { HelpIcon, HomeIcon, NewsIcon, PersonIcon, ScheduleIcon, SelectedIcon, SettingIcon, StudentsIcon } from "../icons";

export const navLinks = [
    {
        id: 0,
        link: '/home',
        label: 'Home',
        icon: (e) => HomeIcon({fill:e})
    },
    {
        id: 1,
        link: '/students',
        label: 'Students',
        icon: (e)=>  StudentsIcon({fill:e})
    },
    {
        id: 2,
        link: '/teachers',
        label: 'Teachers',
        icon: (e)=>  PersonIcon({fill:e})
    },
    {
        id: 3,
        link: '/recruitors',
        label: 'Recruitors',
        icon: (e)=>  PersonIcon({fill:e})
    },
    {
        id: 4,
        link: '/schedule',
        label: 'Schedule',
        icon: (e)=>ScheduleIcon({fill:e})
    },
    {
        id: 5,
        link: '/courses',
        label: 'Courses',
        icon: (e)=>PersonIcon({fill:e})
    },

    {
        id: 6,
        link: '/selected',
        label: 'Selected',
        icon: (e)=> SelectedIcon({fill:e})
    },
    {
        id: 7,
        link: '/groups',
        label: 'Groups',
        icon: (e)=>  StudentsIcon({fill:e})
    },

    {
        id: 8,
        link: '/news',
        label: 'News',
        icon: (e)=>  NewsIcon({fill:e})
    },
    {
        id: 9,
        link: '/aboutMe',
        label: 'About Me',
        icon: (e)=>   PersonIcon({fill:e})
    }, 
    {
        id: 10,
        link: '/myChild',
        label: 'My Child',
        icon: (e)=>  PersonIcon({fill:e})
    },
]

export const settingLinks = [
    {
        id: 0,
        link: '/settings',
        label: 'Settings',
        icon: (e)=>    SettingIcon({fill:e})
       
    },
    {
        id: 1,
        link: '/help',
        label: 'Help',
        icon:  (e)=>   HelpIcon({fill:e})
     
    }
    
]


export const recruitorLink = ['Home', 'Students', 'Selected']

export const decanLink = ['Home','Students',"Teachers","Recruitors","Schedule"]