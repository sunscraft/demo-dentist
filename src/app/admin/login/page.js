'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from './login.module.css'; // Importing from the same folder

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const result = await login(email, password);
        if (!result.success) {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div className={styles.splitScreenContainer}>
            {/* LEFT SIDE: Brand & Info */}
            <div className={styles.leftPanel}>
                <div className={styles.brandHeader}>
                    <div className={styles.brandIcon}>☀️</div>
                    <span className={styles.brandName}>Sunscraft</span>
                </div>

                <div className={styles.heroContent}>
                    <h2 className={styles.heroTitle}>Reliable Clinical Systems</h2>
                    <p className={styles.heroDescription}>
                        Empowering healthcare administrators with precision tools for patient management,
                        clinical workflows, and institutional stability.
                    </p>
                </div>

                <div className={styles.bottomVisuals}>
                    <div className={styles.imageFrame}>
                        <img
                            src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800"
                            alt="Clinical Hallway"
                        />
                    </div>


                </div>
            </div>

            {/* RIGHT SIDE: Login Form */}
            <div className={styles.rightPanel}>
                <div className={styles.formWrapper}>
                    <div className={styles.formHeader}>
                        <h1>System Login</h1>
                        <p>Access the clinical administration portal.</p>
                    </div>

                    {error && <div className={styles.errorBox}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <label>Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@medicore.com"
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <div className={styles.labelRow}>
                                <label>Password</label>

                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? 'Signing in...' : 'Login →'}
                        </button>
                    </form>

                    <footer className={styles.formFooter}>
                        <p>By logging in, you agree to the Institutional Data Security Protocol and Privacy Policy. Unauthorized access is strictly prohibited.</p>
                    </footer>
                </div>
            </div>
        </div>
    );
}