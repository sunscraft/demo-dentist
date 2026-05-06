'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/admin/Sidebar';
import { FaBars } from 'react-icons/fa';
import Link from 'next/link';
import './admin.css';

export default function AdminLayout({ children }) {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isLoginPage = pathname === '/admin/login';

    // Close sidebar on route change
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (!loading) {
            if (!user && !isLoginPage) {
                router.push('/admin/login');
            } else if (user && isLoginPage) {
                router.push('/admin');
            }
        }
    }, [user, loading, router, isLoginPage]);

    if (loading) {
        return (
            <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                <p style={{ color: '#0f172a', fontWeight: '600' }}>Loading MediCore Admin...</p>
            </div>
        );
    }

    if (isLoginPage) return <>{children}</>;
    if (!user) return null;

    return (
        <div className="admin-layout-wrapper">
            {/* Mobile Overlay */}
            <div 
                className={`admin-overlay ${isSidebarOpen ? 'open' : ''}`} 
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            {/* Sidebar */}
            <div className={`admin-sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
                <Sidebar user={user} logout={logout} />
            </div>

            {/* Main Content Area */}
            <div className="admin-main-content">
                <header className="admin-header-main">
                    <div className="header-left" style={{ display: 'flex', alignItems: 'center' }}>
                        <button 
                            className="mobile-menu-btn" 
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <FaBars />
                        </button>
                        <h1 style={{ fontSize: '18px', color: '#0f172a', fontWeight: '700', marginRight: '15px' }}>
                            {pathname.includes('doctors') 
                                ? (user?.role === 'admin' ? 'Manage Doctors' : 'Doctors Directory') 
                                : pathname.includes('profile') 
                                    ? 'Edit Profile' 
                                    : 'Admin Dashboard'}
                        </h1>
                        <Link href="/admin/profile" style={{ textDecoration: 'none' }}>
                            <button style={{
                                padding: '6px 12px',
                                background: '#e2e8f0',
                                color: '#0f172a',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '13px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
                                    {user.name?.charAt(0)}
                                </div>
                                Edit Profile
                            </button>
                        </Link>
                    </div>
                    <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        {/* Empty right side, or we can just leave the div structure without the profile link */}
                    </div>
                </header>

                <main style={{ padding: '32px', flex: 1, overflowX: 'hidden' }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
