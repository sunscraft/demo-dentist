'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    FaThLarge, FaUserMd, FaUserFriends, FaCalendarCheck,
    FaCog, FaQuestionCircle, FaPlus, FaSignOutAlt, FaBriefcaseMedical
} from 'react-icons/fa';
import styles from './Sidebar.module.css'; // Importing as a module

export default function Sidebar({ user, logout }) {
    const pathname = usePathname();

    const menuItems = [
        { title: 'Dashboard', path: '/admin', icon: <FaThLarge />, roles: ['admin', 'doctor'] },
        { title: 'Doctors', path: '/admin/doctors', icon: <FaUserMd />, roles: ['admin', 'doctor'] },
        { title: 'Patients', path: '/admin/patients', icon: <FaUserFriends />, roles: ['admin', 'doctor'] },
        { title: 'Appointments', path: '/admin/appointments', icon: <FaCalendarCheck />, roles: ['admin', 'doctor'] },
        { title: 'Settings', path: '/admin/settings', icon: <FaCog />, roles: ['admin', 'doctor'] },
        { title: 'Help Center', path: '/admin/help', icon: <FaQuestionCircle />, roles: ['admin', 'doctor'] },
    ];

    const filteredMenu = menuItems.filter(item => item.roles.includes(user.role));

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <div className={styles.logoContainer}>
                    <div className={styles.logoIcon}><FaBriefcaseMedical /></div>
                    <div className={styles.logoText}>
                        <h3>Sunscraft</h3>
                        <span>CLINICAL SYSTEMS</span>
                    </div>
                </div>
            </div>

            <nav className={styles.sidebarNav}>
                {filteredMenu.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`${styles.navItem} ${pathname === item.path ? styles.active : ''}`}
                    >
                        <span className={styles.navIcon}>{item.icon}</span>
                        <span className={styles.navText}>{item.title}</span>
                    </Link>
                ))}
            </nav>

            <div className={styles.sidebarFooter}>
                <button className={styles.newApptBtn}>
                    <FaPlus /> <span>New Appointment</span>
                </button>

                <button onClick={logout} className={styles.logoutLink}>
                    <FaSignOutAlt /> <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}