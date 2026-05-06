'use client';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { FaPlus, FaTrash, FaCalendarAlt, FaClock, FaCalendarTimes } from 'react-icons/fa';

export default function DoctorSchedule() {
    const [schedule, setSchedule] = useState([]);
    const [blockedDates, setBlockedDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        date: '',
        start_time: '',
        end_time: ''
    });
    const [blockData, setBlockData] = useState({
        date: '',
        reason: ''
    });

    const fetchSchedule = async () => {
        try {
            const data = await api.get('/doctor/schedule');
            setSchedule(data);
        } catch (error) {
            console.error('Failed to fetch schedule', error);
        }
    };

    const fetchBlockedDates = async () => {
        try {
            // Note: API doc says GET /doctor/schedule, but doesn't explicitly list GET for blocked dates.
            // We'll assume there might be a list or we'll just handle POST/DELETE for now.
            // For now, we'll just focus on slots.
        } catch (error) {}
    };

    useEffect(() => {
        const loadData = async () => {
            await Promise.all([fetchSchedule(), fetchBlockedDates()]);
            setLoading(false);
        };
        loadData();
    }, []);

    const handleAddSlot = async (e) => {
        e.preventDefault();
        try {
            await api.post('/doctor/schedule', formData);
            setFormData({ date: '', start_time: '', end_time: '' });
            fetchSchedule();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleBlockDate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/doctor/blocked-dates', blockData);
            setBlockData({ date: '', reason: '' });
            alert('Date blocked successfully');
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDeleteSlot = async (id) => {
        if (confirm('Delete this time slot?')) {
            try {
                await api.delete(`/doctor/schedule/${id}`);
                fetchSchedule();
            } catch (error) {
                alert(error.message);
            }
        }
    };

    return (
        <div className="doctor-schedule">
            <div className="page-header">
                <h1>Manage My Schedule</h1>
                <p>Set your availability and block dates</p>
            </div>

            <div className="schedule-layout-grid">
                <div className="side-controls">
                    <div className="control-card">
                        <h3><FaClock /> Add Time Slot</h3>
                        <form onSubmit={handleAddSlot}>
                            <div className="form-group">
                                <label>Date</label>
                                <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Start</label>
                                    <input type="time" value={formData.start_time} onChange={(e) => setFormData({...formData, start_time: e.target.value})} required />
                                </div>
                                <div className="form-group">
                                    <label>End</label>
                                    <input type="time" value={formData.end_time} onChange={(e) => setFormData({...formData, end_time: e.target.value})} required />
                                </div>
                            </div>
                            <button type="submit" className="action-btn-primary">Add Availability</button>
                        </form>
                    </div>

                    <div className="control-card block-card">
                        <h3><FaCalendarTimes /> Block Date</h3>
                        <form onSubmit={handleBlockDate}>
                            <div className="form-group">
                                <label>Date</label>
                                <input type="date" value={blockData.date} onChange={(e) => setBlockData({...blockData, date: e.target.value})} required />
                            </div>
                            <div className="form-group">
                                <label>Reason</label>
                                <input type="text" value={blockData.reason} onChange={(e) => setBlockData({...blockData, reason: e.target.value})} placeholder="e.g. On Leave" required />
                            </div>
                            <button type="submit" className="action-btn-block">Block Date</button>
                        </form>
                    </div>
                </div>

                <div className="slots-main">
                    <div className="main-card">
                        <h3>Available Slots</h3>
                        {loading ? <div className="loader">Loading...</div> : (
                            <div className="slots-list">
                                {schedule.length === 0 ? <p className="empty-msg">No slots added yet.</p> : (
                                    schedule.map((slot) => (
                                        <div key={slot.id} className="slot-item">
                                            <div className="slot-date-info">
                                                <div className="date-box">
                                                    <FaCalendarAlt />
                                                    <span>{slot.date}</span>
                                                </div>
                                                <div className="time-box">
                                                    <FaClock />
                                                    <span>{slot.start_time} - {slot.end_time}</span>
                                                </div>
                                            </div>
                                            <button className="slot-delete-btn" onClick={() => handleDeleteSlot(slot.id)}>
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .page-header { margin-bottom: 32px; }
                .page-header h1 { font-size: 28px; font-weight: 800; color: #1e293b; }
                .page-header p { color: #64748b; }

                .schedule-layout-grid { display: grid; grid-template-columns: 350px 1fr; gap: 32px; }
                
                .control-card { background: white; padding: 28px; border-radius: 24px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 24px; border: 1px solid #f1f5f9; }
                .control-card h3 { display: flex; align-items: center; gap: 12px; font-size: 18px; font-weight: 800; margin-bottom: 24px; color: #1e293b; }

                .form-group { margin-bottom: 20px; }
                .form-group label { display: block; margin-bottom: 8px; font-weight: 700; color: #64748b; font-size: 13px; text-transform: uppercase; }
                .form-group input { width: 100%; padding: 12px 16px; border: 1px solid #e2e8f0; border-radius: 12px; outline: none; }
                
                .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

                .action-btn-primary { width: 100%; padding: 14px; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); color: white; border: none; border-radius: 12px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3); }
                .action-btn-block { width: 100%; padding: 14px; background: #fee2e2; color: #b91c1c; border: none; border-radius: 12px; font-weight: 700; cursor: pointer; }

                .main-card { background: white; padding: 32px; border-radius: 28px; min-height: 600px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #f1f5f9; }
                .main-card h3 { font-size: 20px; font-weight: 800; margin-bottom: 24px; }

                .slots-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
                .slot-item { background: #f8fafc; padding: 20px; border-radius: 20px; display: flex; justify-content: space-between; align-items: center; border: 1px solid #f1f5f9; }
                
                .slot-date-info { display: flex; flex-direction: column; gap: 8px; }
                .date-box, .time-box { display: flex; align-items: center; gap: 10px; font-weight: 700; color: #1e293b; font-size: 15px; }
                .time-box { color: #64748b; font-weight: 600; font-size: 13px; }

                .slot-delete-btn { width: 40px; height: 40px; border-radius: 12px; background: #fee2e2; color: #ef4444; border: none; cursor: pointer; transition: 0.2s; }
                .slot-delete-btn:hover { background: #fecaca; }

                .empty-msg { text-align: center; color: #94a3b8; font-weight: 600; margin-top: 100px; }

                @media (max-width: 1100px) {
                    .schedule-layout-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
}
