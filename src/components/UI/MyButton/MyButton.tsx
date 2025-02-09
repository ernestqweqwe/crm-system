import * as React from 'react'
import { FC } from 'react'
import './MyButton.scss'

interface IButtonProps {
    children?: React.ReactNode
    className: string
    onClick?: () => false | Promise<void> | void
}

const MyButton: FC<IButtonProps> = ({ children, ...props }) => {
    return <button {...props}>{children}</button>
}

export default MyButton
