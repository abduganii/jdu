import {
  HelpIcon,
  HomeIcon,
  NewsIcon,
  PersonIcon,
  ScheduleIcon,
  SelectedIcon,
  SettingIcon,
  StudentsIcon,
} from "../icons";

export const navLinks = [
  {
    id: 11,
    link: "/home",
    label: "ホーム",
    icon: (e) => HomeIcon({ fill: e }),
  },
  {
    id: 7,
    link: "/groups",
    label: "Groups",
    icon: (e) => StudentsIcon({ fill: e }),
  },
  {
    id: 76,
    link: "/employees",
    label: "Employees",
    icon: (e) => PersonIcon({ fill: e }),
  },
  {
    id: 1,
    link: "/students",
    label: "学生",
    icon: (e) => StudentsIcon({ fill: e }),
  },
  {
    id: 3,
    link: "/recruitors",
    label: "リクルーター",
    icon: (e) => PersonIcon({ fill: e }),
  },
  {
    id: 2,
    link: "/parents",
    label: "Parents",
    icon: (e) => PersonIcon({ fill: e }),
  },
  {
    id: 5,
    link: "/courses",
    label: "Courses",
    icon: (e) => PersonIcon({ fill: e }),
  },

  {
    id: 6,
    link: "/selected",
    label: "お気に入り",
    icon: (e) => SelectedIcon({ fill: e }),
  },

  {
    id: 9,
    link: "/me",
    label: "私については",
    icon: (e) => PersonIcon({ fill: e }),
  },
  {
    id: 10,
    link: "/myChild",
    label: "My Child",
    icon: (e) => PersonIcon({ fill: e }),
  },
];

export const settingLinks = [
  {
    id: 0,
    link: "/settings",
    label: "設定",
    icon: (e) => SettingIcon({ fill: e }),
  },
  {
    id: 1,
    link: "/help",
    label: "ヘルプ",
    icon: (e) => HelpIcon({ fill: e }),
  },
];

export const recruitorLink = ["ホーム", "学生", "お気に入り"];

export const teacherLink = ["ホーム", "Groups",];

export const decanLink = [
  "ホーム",
  "Groups",
  "Employees",
  "スケジュール",
  "リクルーター",
  "Parents",
];
export const studentLink = ["ホーム", "スケジュール", "私については"];

export const parentLink = ["ホーム", "My Child",];
