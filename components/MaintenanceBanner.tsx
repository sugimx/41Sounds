'use client';

import { useState } from 'react';

export default function MaintenanceBanner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <>
            {/* Overlay */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 999,
            }} />

            {/* Modal Box */}
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#FFFFFF',
                borderLeft: '5px solid #FFA500',
                borderRadius: '8px',
                padding: '32px',
                maxWidth: '500px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                zIndex: 1000,
                textAlign: 'center',
            }}>
                <div style={{
                    fontSize: '40px',
                    marginBottom: '16px',
                }}>
                    ⚠️
                </div>

                <h2 style={{
                    margin: '0 0 16px 0',
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#333333',
                }}>
                    Important Update
                </h2>

                <p style={{
                    margin: '0 0 24px 0',
                    fontSize: '16px',
                    color: '#666666',
                    lineHeight: '1.6',
                }}>
                    The concert <strong>date</strong>, <strong>venue</strong>, and <strong>pricing</strong> may be subject to changes. The website will be updated with the final details shortly. Thank you for your patience!
                </p>

                <button
                    onClick={() => setIsVisible(false)}
                    style={{
                        backgroundColor: '#FFA500',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '12px 32px',
                        fontSize: '16px',
                        fontWeight: '600',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FF8C00'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFA500'}
                >
                    Got it!
                </button>
            </div>
        </>
    );
}
