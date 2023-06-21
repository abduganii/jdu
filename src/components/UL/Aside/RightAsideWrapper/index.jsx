import cls from './RightAsideWrapper.module.scss'

const RightAsideWrapper = ({ children, ...other }) => {
    return (
        <div className={cls.aside} {...other}>
            {children}
        </div>
    );
}

export default RightAsideWrapper;
