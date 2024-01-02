import React from 'react';

import { Header } from '../Components/Header/Header';

interface PageLayoutProps {
    children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    )
}