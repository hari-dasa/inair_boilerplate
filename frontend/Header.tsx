import React, { ReactNode } from 'react';
import './Header.scss';

export type HeaderProps = {
    title?: string;
    icon?: ReactNode;
}

const Header = ({ title, icon }: HeaderProps) => {
    return (
        <header className="header">
            <div className="icons">
                {icon}
            </div>
            <div className="text">{title}</div>
        </header>
    )
}

export default Header;