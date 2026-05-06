'use client';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaUserMd, FaEnvelope, FaCertificate, FaPhone, FaEye } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

export default function ManageDoctors() {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [viewProfileModal, setViewProfileModal] = useState(false);
    const [profileData, setProfileData] = useState(null);

    const initialFormState = {
        name: '', email: '', password: '', phone: '', specialization: '',
        qualification: '', experience_years: '', address: '',
        city: '', state: '', pincode: '', bio: '', consultation_fee: ''
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const endpoint = isAdmin ? '/admin/users' : '/doctors';
            const data = await api.get(endpoint);
            setDoctors(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch doctors', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewProfile = async (doctor) => {
        try {
            const data = await api.get(`/admin/users/${doctor.id}/profile`);
            setProfileData(data);
            setViewProfileModal(true);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData };
            if (!payload.password) delete payload.password; // Don't send empty password if not changing

            if (editingDoctor) {
                await api.patch(`/admin/users/${editingDoctor.id}`, payload);
            } else {
                await api.post('/admin/users', payload);
            }
            setShowModal(false);
            setEditingDoctor(null);
            setFormData(initialFormState);
            fetchDoctors();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            await api.patch(`/admin/users/${id}/toggle`);
            fetchDoctors();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this doctor?')) {
            try {
                await api.delete(`/admin/users/${id}`);
                fetchDoctors();
            } catch (error) {
                alert(error.message);
            }
        }
    };

    const openEditModal = (doctor) => {
        setEditingDoctor(doctor);
        setFormData({
            name: doctor.name || '',
            email: doctor.email || '',
            password: '',
            phone: doctor.phone || '',
            specialization: doctor.specialization || '',
            qualification: doctor.qualification || '',
            experience_years: doctor.experience_years || '',
            address: doctor.address || '',
            city: doctor.city || '',
            state: doctor.state || '',
            pincode: doctor.pincode || '',
            bio: doctor.bio || '',
            consultation_fee: doctor.consultation_fee || ''
        });
        setShowModal(true);
    };

    return (
        <div className="manage-doctors">
            <div className="page-header-flex">
                <div className="title-group">
                    <h1>{isAdmin ? 'Manage Doctors' : 'Doctors Directory'} ({doctors.length})</h1>
                    <p>{isAdmin ? 'Register and manage medical staff accounts' : 'View clinic medical staff'}</p>
                </div>
                {/* Only Admin can see the Add Doctor button */}
                {isAdmin && (
                    <button className="primary-btn" onClick={() => { setEditingDoctor(null); setFormData(initialFormState); setShowModal(true); }}>
                        <FaPlus /> Add Doctor
                    </button>
                )}
            </div>

            <div className="table-container">
                <table className="doctors-table">
                    <thead>
                        <tr>
                            <th>Doctor</th>
                            <th>Contact</th>
                            <th>Specialization</th>
                            <th>Status</th>
                            {isAdmin && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={isAdmin ? 5 : 4} className="text-center py-4">Loading Doctors...</td></tr>
                        ) : doctors.length === 0 ? (
                            <tr><td colSpan={isAdmin ? 5 : 4} className="text-center py-4">No doctors found.</td></tr>
                        ) : (
                            doctors.map((doctor) => (
                                <tr key={doctor.id}>
                                    <td>
                                        <div className="doc-cell">
                                            <div className="avatar-circle-sm"><FaUserMd /></div>
                                            <div>
                                                <div className="doc-name">{doctor.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="contact-info">
                                            <div><FaEnvelope /> {doctor.email}</div>
                                            {doctor.phone && <div><FaPhone /> {doctor.phone}</div>}
                                        </div>
                                    </td>
                                    <td>
                                        <span className="spec-tag"><FaCertificate /> {doctor.specialization || 'General'}</span>
                                    </td>
                                    <td>
                                        <div className={`status-badge-mini ${doctor.is_active ? 'active' : 'inactive'}`}>
                                            {doctor.is_active ? 'Active' : 'Inactive'}
                                        </div>
                                    </td>
                                    {isAdmin && (
                                        <td>
                                            <div className="card-footer-actions">
                                                <button className="icon-btn view" title="View Profile" onClick={() => handleViewProfile(doctor)}><FaEye /></button>
                                                <button className="icon-btn-toggle" title="Toggle Status" onClick={() => handleToggleStatus(doctor.id)}>
                                                    {doctor.is_active ? <FaToggleOn className="on" /> : <FaToggleOff className="off" />}
                                                </button>
                                                <button className="icon-btn edit" title="Edit Doctor" onClick={() => openEditModal(doctor)}><FaEdit /></button>
                                                <button className="icon-btn delete" title="Delete Doctor" onClick={() => handleDelete(doctor.id)}><FaTrash /></button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal is only rendered for Admin */}
            {showModal && isAdmin && (
                <div className="modal-overlay">
                    <div className="modal-content-card">
                        <h2>{editingDoctor ? 'Edit Doctor' : 'Add Doctor'}</h2>
                        <form onSubmit={handleSubmit} className="doctor-form">
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Name *</label>
                                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Email *</label>
                                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Password {editingDoctor && '(Leave blank to keep current)'}</label>
                                    <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Specialization</label>
                                    <input type="text" value={formData.specialization} onChange={(e) => setFormData({ ...formData, specialization: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Qualification</label>
                                    <input type="text" value={formData.qualification} onChange={(e) => setFormData({ ...formData, qualification: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Experience (Years)</label>
                                    <input type="number" value={formData.experience_years} onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Consultation Fee (₹)</label>
                                    <input type="number" value={formData.consultation_fee} onChange={(e) => setFormData({ ...formData, consultation_fee: e.target.value })} />
                                </div>
                                <div className="form-group full-width">
                                    <label>Address</label>
                                    <input type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>City</label>
                                    <input type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>State</label>
                                    <input type="text" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Pincode</label>
                                    <input type="text" value={formData.pincode} onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} />
                                </div>
                                <div className="form-group full-width">
                                    <label>Bio</label>
                                    <textarea rows="3" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })}></textarea>
                                </div>
                            </div>

                            <div className="modal-actions-flex">
                                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="save-btn">{editingDoctor ? 'Update Doctor' : 'Save Doctor'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Profile View Modal */}
            {viewProfileModal && profileData && (
                <div className="modal-overlay">
                    <div className="modal-content-card profile-view-card">
                        <div className="profile-header">
                            <div className="avatar-large"><FaUserMd /></div>
                            <div>
                                <h2>{profileData.name || profileData.user?.name || 'Doctor Profile'}</h2>
                                <p>{profileData.specialization || profileData.profile?.specialization || 'General Practice'}</p>
                            </div>
                        </div>

                        <div className="profile-details-grid">
                            <div className="detail-item">
                                <label>Email</label>
                                <p>{profileData.email || profileData.user?.email || 'N/A'}</p>
                            </div>
                            <div className="detail-item">
                                <label>Phone</label>
                                <p>{profileData.phone || profileData.profile?.phone || 'N/A'}</p>
                            </div>
                            <div className="detail-item">
                                <label>Qualification</label>
                                <p>{profileData.qualification || profileData.profile?.qualification || 'N/A'}</p>
                            </div>
                            <div className="detail-item">
                                <label>Experience</label>
                                <p>{profileData.experience_years || profileData.profile?.experience_years ? `${profileData.experience_years || profileData.profile?.experience_years} Years` : 'N/A'}</p>
                            </div>
                            <div className="detail-item">
                                <label>Consultation Fee</label>
                                <p>₹{profileData.consultation_fee || profileData.profile?.consultation_fee || '0'}</p>
                            </div>
                            <div className="detail-item full-width">
                                <label>Address</label>
                                <p>
                                    {[
                                        profileData.address || profileData.profile?.address,
                                        profileData.city || profileData.profile?.city,
                                        profileData.state || profileData.profile?.state,
                                        profileData.pincode || profileData.profile?.pincode
                                    ].filter(Boolean).join(', ') || 'N/A'}
                                </p>
                            </div>
                            <div className="detail-item full-width">
                                <label>Bio</label>
                                <p>{profileData.bio || profileData.profile?.bio || 'No biography available.'}</p>
                            </div>
                        </div>

                        <div className="modal-actions-flex">
                            <button type="button" className="cancel-btn" onClick={() => setViewProfileModal(false)}>Close Profile</button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .page-header-flex { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
                .title-group h1 { font-size: 28px; font-weight: 800; color: #1e293b; }
                .title-group p { color: #64748b; margin-top: 4px; }
                
                .primary-btn {
                    background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
                    color: white; border: none; padding: 12px 24px; border-radius: 14px;
                    display: flex; align-items: center; gap: 10px; font-weight: 700; cursor: pointer;
                    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
                }

                .table-container { background: white; border-radius: 16px; border: 1px solid #f1f5f9; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); overflow: hidden; }
                .doctors-table { width: 100%; border-collapse: collapse; text-align: left; }
                .doctors-table th { padding: 16px 24px; background: #f8fafc; font-size: 13px; font-weight: 700; color: #475569; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; }
                .doctors-table td { padding: 16px 24px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
                .doctors-table tr:last-child td { border-bottom: none; }
                .doctors-table tr:hover { background: #f8fafc; }

                .doc-cell { display: flex; align-items: center; gap: 12px; }
                .avatar-circle-sm { width: 40px; height: 40px; background: #eef2ff; color: #6366f1; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
                .doc-name { font-weight: 700; color: #1e293b; font-size: 15px; }

                .contact-info { display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: #475569; }
                .contact-info div { display: flex; align-items: center; gap: 6px; }

                .status-badge-mini { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; text-transform: uppercase; }
                .status-badge-mini.active { background: #dcfce7; color: #15803d; }
                .status-badge-mini.inactive { background: #fee2e2; color: #b91c1c; }
                
                .spec-tag { font-size: 13px; color: #64748b; font-weight: 600; display: flex; align-items: center; gap: 6px; }

                .text-center { text-align: center; }
                .py-4 { padding-top: 32px; padding-bottom: 32px; }

                .card-footer-actions { display: flex; justify-content: flex-end; gap: 12px; }
                .icon-btn { width: 36px; height: 36px; border-radius: 10px; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; }
                .icon-btn.view { background: #e0e7ff; color: #4f46e5; }
                .icon-btn.edit { background: #f1f5f9; color: #475569; }
                .icon-btn.delete { background: #fee2e2; color: #ef4444; }
                .icon-btn-toggle { background: none; border: none; font-size: 28px; cursor: pointer; padding: 0; }
                .icon-btn-toggle .on { color: #22c55e; }
                .icon-btn-toggle .off { color: #94a3b8; }

                .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 20px; }
                .modal-content-card { background: white; padding: 32px; border-radius: 24px; width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto; }
                .modal-content-card h2 { margin-bottom: 24px; color: #1e293b; }
                
                .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                .form-group.full-width { grid-column: 1 / -1; }
                .form-group label { display: block; margin-bottom: 6px; font-weight: 600; color: #475569; font-size: 13px; }
                .form-group input, .form-group textarea { width: 100%; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-family: inherit; font-size: 14px; outline: none; transition: border-color 0.2s; }
                .form-group input:focus, .form-group textarea:focus { border-color: #6366f1; }
                .form-group textarea { resize: vertical; }

                .modal-actions-flex { display: flex; justify-content: flex-end; gap: 12px; margin-top: 32px; padding-top: 20px; border-top: 1px solid #f1f5f9; }
                .cancel-btn { background: #f1f5f9; color: #64748b; border: none; padding: 10px 20px; border-radius: 10px; font-weight: 700; cursor: pointer; }
                .save-btn { background: #6366f1; color: white; border: none; padding: 10px 20px; border-radius: 10px; font-weight: 700; cursor: pointer; }

                .profile-view-card { max-width: 650px; }
                .profile-header { display: flex; align-items: center; gap: 20px; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid #e2e8f0; }
                .avatar-large { width: 80px; height: 80px; background: #eef2ff; color: #6366f1; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 36px; }
                .profile-header h2 { margin: 0 0 4px 0; color: #1e293b; font-size: 24px; }
                .profile-header p { margin: 0; color: #64748b; font-weight: 600; font-size: 15px; }

                .profile-details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
                .detail-item.full-width { grid-column: 1 / -1; }
                .detail-item label { display: block; font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-bottom: 4px; }
                .detail-item p { margin: 0; color: #1e293b; font-size: 15px; font-weight: 500; line-height: 1.5; }
            `}</style>
        </div>
    );
}
