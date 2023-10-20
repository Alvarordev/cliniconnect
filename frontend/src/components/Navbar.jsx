'use client'

import Link from "next/link";
import {usePathname, useRouter} from "next/navigation"
import { CalendarIcon, CrossIcon } from "./Icons";
import Button from "./Button";
import './Navbar.css'

const Navbar = () => {
    const pathname = usePathname()
    const router = useRouter()

    const routes = [
        {
            title: 'Home',
            path: '/',
            active: pathname === '/' ? true : false
        },
        {
            title: 'Servicios',
            path: '/services',
            active: pathname === '/services' ? true : false
        },
        {
            title: 'Medicos',
            path: '/specialties',
            active: pathname === '/specialties' ? true : false
        },
        {
            title: 'Contacto',
            path: '/contact',
            active: pathname === '/contact' ? true : false
        },
    ]

    const handleClick = async () => {
        const res = await fetch('http://localhost:8080/api/auth/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials:"include",
        })

        if (res.status === 200)  router.refresh()
    }

    return (
        <header className='landing-header'>
            <div className='header-logo'>
                <CrossIcon />
                <span>CLINICONNECT</span>
            </div>

            <nav className='main-nav'>
                <ul className='nav-items'>
                    {routes.map(({title, path, active}) => (
                        <li key={title}>
                            <Link href={path} className={active ? 'active-link' : ''}>{title}</Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className='header-buttons'>
                <div onClick={handleClick}>
                    <Button className={'invert'}>
                        <span>Log Out</span>
                    </Button>

                </div>
                <Link href={'/log-in'} style={{ maxWidth: '150px', width: '100%' }}>
                    <Button>
                        <i><CalendarIcon /></i>
                        <span>Agendar Cita</span>
                    </Button>
                </Link>
            </div>
        </header>
    );
}

export default Navbar;