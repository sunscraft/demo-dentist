'use client';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { FaCheck, FaCalendarDay, FaPhone, FaUser, FaClock, FaCheckCircle } from 'react-icons/fa';

export default function ViewAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({ date: '', status: '' });

    useEffect(() => {
        fetchAppointments();
    }, [filter]);

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            let query = '';
            if (filter.date || filter.status) {
                query = `?${new URLSearchParams(filter).toString()}`;
            }
            const data = await api.get(`/doctor/appointments${query}`);
            setAppointments(data);
        } catch (error) {
            console.error('Failed to fetch appointments', error);
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = async (id) => {
        try {
            await api.patch(`/doctor/appointments/${id}/complete`);
            fetchAppointments();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="view-appointments">
            <div className="page-header-flex">
                <div className="title-group">
                    <h1>Appointments</h1>
                    <p>Track and manage patient bookings</p>
                </div>
                <div className="filters-bar">
                    <input type="date" value={filter.date} onChange={(e) => setFilter({...filter, date: e.target.value})} className="filter-input" />
                    <select value={filter.status} onChange={(e) => setFilter({...filter, status: e.target.value})} className="filter-select">
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>

            <div className="appointments-list">
                {loading ? <div className="loader">Loading...</div> : (
                    appointments.length === 0 ? <div className="empty-state">No appointments found.</div> : (
                        appointments.map((appt) => (
                            <div key={appt.id} className={`appt-card ${appt.status}`}>
                                <div className="appt-main">
                                    <div className="patient-info">
                                        <div className="patient-avatar">{appt.patient_name.charAt(0)}</div>
                                        <div>
                                            <h3>{appt.patient_name}</h3>
                                            <p><FaPhone /> {appt.patient_phone}</p>
                                        </div>
                                    </div>
                                    <div className="appt-details">
                                        <div className="detail-item"><FaCalendarDay /> {appt.date}</div>
                                        <div className="detail-item"><FaClock /> {appt.time}</div>
                                    </div>
                                    <div className="appt-actions">
                                        {appt.status === 'pending' ? (
                                            <button className="complete-btn" onClick={() => handleComplete(appt.id)}>
                                                <FaCheck /> Mark Complete
                                            </button>
                                        ) : (
                                            <span className="completed-badge"><FaCheckCircle /> Completed</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                )}
            </div>

            <style jsx>{`
                .page-header-flex { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
                .title-group h1 { font-size: 28px; font-weight: 800; color: #1e293b; }
                .title-group p { color: #64748b; }
                
                .filters-bar { display: flex; gap: 16px; }
                .filter-input, .filter-select { padding: 10px 16px; border: 1px solid #e2e8f0; border-radius: 12px; outline: none; }

                .appointments-list { display: flex; flex-direction: column; gap: 16px; }
                
                .appt-card {
                    background: white; padding: 24px; border-radius: 20px; border: 1px solid #f1f5f9;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
                }
                .appt-card.completed { opacity: 0.8; background: #f8fafc; }

                .appt-main { display: flex; justify-content: space-between; align-items: center; }
                
                .patient-info { display: flex; align-items: center; gap: 16px; width: 300px; }
                .patient-avatar { width: 48px; height: 48px; background: #eef2ff; color: #6366f1; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 18px; }
                .patient-info h3 { font-size: 18px; font-weight: 700; color: #1e293b; }
                .patient-info p { font-size: 14px; color: #64748b; display: flex; align-items: center; gap: 6px; }

                .appt-details { display: flex; gap: 32px; }
                .detail-item { display: flex; align-items: center; gap: 8px; font-weight: 600; color: #475569; }

                .complete-btn { background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; }
                .completed-badge { color: #10b981; font-weight: 700; display: flex; align-items: center; gap: 8px; }
                
                .empty-state { text-align: center; padding: 60px; color: #94a3b8; font-weight: 600; }
            `}</style>
        </div>
    );
}
