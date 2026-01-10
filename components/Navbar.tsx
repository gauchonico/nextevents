'use client';
import React from 'react'
import Link from "next/link";
import Image from "next/image";
import posthog from "posthog-js";

const Navbar = () => {
    const handleLogoClick = () => {
        posthog.capture('logo_clicked', {
            location: 'navbar',
        });
    };

    const handleNavLinkClick = (linkName: string, href: string) => {
        posthog.capture('nav_link_clicked', {
            link_name: linkName,
            link_href: href,
            location: 'navbar',
        });
    };

    return (
        <header>
            <nav>
                <Link href="/" className="logo" onClick={handleLogoClick}>
                    <Image src="/icons/logo.png" alt="logo" width={24} height={24}/>
                    <p>Dev Event</p>
                </Link>
                <ul>
                    <Link href="/" onClick={() => handleNavLinkClick('Home', '/')}>Home</Link>
                    <Link href="/" onClick={() => handleNavLinkClick('About', '/')}>About</Link>
                    <Link href="/" onClick={() => handleNavLinkClick('Events', '/')}>Events</Link>
                    <Link href="/" onClick={() => handleNavLinkClick('Contact Us', '/')}>Contact Us</Link>

                </ul>
            </nav>
        </header>
    )
}
export default Navbar
