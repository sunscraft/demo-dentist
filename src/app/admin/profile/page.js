'use client';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function DoctorProfile() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', phone: '', specialization: '', 
        qualification: '', experience_years: '', address: '', 
        city: '', state: '', pincode: '', bio: '', consultation_fee: ''
    });

    useEffect(() => {
        if (user) {
            fetchProfile();
        }
    }, [user]);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            // Fetch all users to get the full profile data for the current logged-in doctor
            const data = await api.get('/admin/users');
            if (Array.isArray(data)) {
                const profile = data.find(d => d.id === user.id);
                if (profile) {
                    setFormData({
                        name: profile.name || '',
                        email: profile.email || '',
                        password: '',
                        phone: profile.phone || '',
                        specialization: profile.specialization || '',
                        qualification: profile.qualification || '',
                        experience_years: profile.experience_years || '',
                        address: profile.address || '',
                        city: profile.city || '',
                        state: profile.state || '',
                        pincode: profile.pincode || '',
                        bio: profile.bio || '',
                        consultation_fee: profile.consultation_fee || ''
                    });
                }
            }
        } catch (error) {
            console.error('Failed to fetch profile', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = { ...formData };
            if (!payload.password) delete payload.password; // Don't send empty password if not changing

            await api.patch(`/admin/users/${user.id}`, payload);
            alert('Profile updated successfully!');
            fetchProfile(); // Refresh data
        } catch (error) {
            alert(error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="loader" style={{ margin: '40px auto' }}></div>;
    }

    return (
        <div className="profile-page">
            <div className="page-header">
                <h1>My Profile</h1>
                <p>Manage your personal information and clinic details</p>
            </div>

            <div className="profile-card">
                <form onSubmit={handleSubmit} className="doctor-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Name *</label>
                            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                        </div>
                        <div className="form-group">
                            <label>Email *</label>
                            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                        </div>
                        <div className="form-group">
                            <label>New Password (Leave blank to keep current)</label>
                            <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label>Specialization</label>
                            <input type="text" value={formData.specialization} onChange={(e) => setFormData({...formData, specialization: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label>Qualification</label>
                            <input type="text" value={formData.qualification} onChange={(e) => setFormData({...formData, qualification: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label>Experience (Years)</label>
                            <input type="number" value={formData.experience_years} onChange={(e) => setFormData({...formData, experience_years: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label>Consultation Fee (₹)</label>
                            <input type="number" value={formData.consultation_fee} onChange={(e) => setFormData({...formData, consultation_fee: e.target.value})} />
                        </div>
                        <div className="form-group full-width">
                            <label>Address</label>
                            <input type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label>State</label>
                            <input type="text" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label>Pincode</label>
                            <input type="text" value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value})} />
                        </div>
                        <div className="form-group full-width">
                            <label>Bio</label>
                            <textarea rows="4" value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})}></textarea>
                        </div>
                    </div>
                    
                    <div className="form-actions">
                        <button type="submit" className="save-btn" disabled={saving}>
                            {saving ? 'Saving...' : 'Save Profile'}
                        </button>
                    </div>
                </form>
            </div>

            <style jsx>{`
                .page-header { margin-bottom: 30px; }
                .page-header h1 { font-size: 28px; font-weight: 800; color: #1e293b; }
                .page-header p { color: #64748b; margin-top: 4px; }
                
                .profile-card { background: white; padding: 40px; border-radius: 24px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #f1f5f9; max-width: 900px; }
                
                .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .form-group.full-width { grid-column: 1 / -1; }
                .form-group label { display: block; margin-bottom: 8px; font-weight: 600; color: #475569; font-size: 13px; }
                .form-group input, .form-group textarea { width: 100%; padding: 12px 16px; border: 1px solid #cbd5e1; border-radius: 12px; font-family: inherit; font-size: 14px; outline: none; transition: border-color 0.2s; }
                .form-group input:focus, .form-group textarea:focus { border-color: #6366f1; }
                .form-group textarea { resize: vertical; }

                .form-actions { display: flex; justify-content: flex-end; margin-top: 40px; padding-top: 24px; border-top: 1px solid #f1f5f9; }
                .save-btn { background: #6366f1; color: white; border: none; padding: 14px 32px; border-radius: 12px; font-weight: 700; cursor: pointer; font-size: 15px; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3); transition: transform 0.2s; }
                .save-btn:hover { transform: translateY(-2px); }
                .save-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
                
                @media (max-width: 768px) {
                    .form-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
}
