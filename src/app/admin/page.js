'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { FaUserFriends, FaCalendarDay, FaUserMd, FaDollarSign } from 'react-icons/fa';
import styles from './dashboard.module.css';

export default function AdminDashboard() {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState({});
    const [loading, setLoading] = useState(true);

    const TODAY = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            try {
                const [docList, appts] = await Promise.all([
                    api.get('/admin/users'),
                    api.get('/appointments'),
                ]);
                const docMap = {};
                docList.forEach(d => { docMap[d.id] = d; });
                setDoctors(docMap);
                setAppointments(Array.isArray(appts) ? appts : []);
            } catch (err) {
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, [user]);

    const todayAppts = appointments.filter(a => a.date === TODAY);

    return (
        <div className={styles.dashboardPage}>
            {/* Top Stat Cards */}
            <div className={styles.statGrid}>
                <StatCard label="Total Patients" value="12,482" icon={<FaUserFriends color="#3b82f6" />} />
                <StatCard label="Today's Appts" value={todayAppts.length} icon={<FaCalendarDay color="#10b981" />} />
                <StatCard label="Total Doctors" value={Object.keys(doctors).length} icon={<FaUserMd color="#6366f1" />} />
                <StatCard label="Revenue" value="$54,230" icon={<FaDollarSign color="#f59e0b" />} />
            </div>

            <div className={styles.mainGrid}>
                {/* Left Side: Appointments */}
                <div className={styles.sectionCard}>
                    <h3 className={styles.sectionTitle}>Today's Appointments</h3>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>PATIENT</th>
                                <th>TIME</th>
                                <th>DOCTOR</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="4">Loading...</td></tr>
                            ) : todayAppts.length === 0 ? (
                                <tr><td colSpan="4">No appointments today.</td></tr>
                            ) : (
                                todayAppts.map(a => (
                                    <tr key={a.id}>
                                        <td className={styles.patientName}>{a.patient_name}</td>
                                        <td style={{ fontWeight: '600' }}>{a.time}</td>
                                        <td>{doctors[a.doctor_id]?.name || 'Dr. Watson'}</td>
                                        <td>
                                            <span className={`${styles.statusBadge} ${styles[a.status] || styles.pending}`}>
                                                {a.status.toUpperCase()}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Right Side: Sidebar Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className={styles.sectionCard}>
                        <h3 className={styles.sectionTitle}>Monthly Progress</h3>
                        <div style={{ height: '100px', background: '#f8fafc', borderRadius: '8px', marginBottom: '15px' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span style={{ color: '#64748b', fontSize: '13px' }}>New Registrations</span>
                            <span style={{ fontWeight: '700', color: '#0f172a' }}>+18%</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#64748b', fontSize: '13px' }}>Completed Visits</span>
                            <span style={{ fontWeight: '700', color: '#0f172a' }}>2.4k</span>
                        </div>
                    </div>

                    <div className={styles.darkCard}>
                        <h3 className={styles.sectionTitle}>Hospital Capacity</h3>
                        <p style={{ fontSize: '12px', opacity: 0.8, marginBottom: '20px' }}>Real-time bed availability</p>
                        <div style={{ fontSize: '32px', fontWeight: '800', marginBottom: '10px' }}>84% <span style={{ fontSize: '14px', fontWeight: '400' }}>Occupied</span></div>
                        <div style={{ width: '100%', height: '8px', background: '#334155', borderRadius: '4px' }}>
                            <div style={{ width: '84%', height: '100%', background: '#3b82f6', borderRadius: '4px' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon }) {
    return (
        <div className={styles.statCard}>
            <div>
                <span className={styles.statLabel}>{label}</span>
                <div className={styles.statValue}>{value}</div>
            </div>
            <div style={{ fontSize: '24px' }}>{icon}</div>
        </div>
    );
}