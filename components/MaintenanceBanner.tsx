'use client';

import { useState } from 'react';

export default function MaintenanceBanner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <>
            {/* Overlay */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.55)',
                    zIndex: 999,
                }}
            />

            {/* Modal Box */}
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#FFFFFF',
                    borderLeft: '5px solid #DC2626',
                    borderRadius: '12px',
                    padding: '32px',
                    maxWidth: '500px',
                    width: '90%',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                    zIndex: 1000,
                    textAlign: 'center',
                }}
            >
                <div
                    style={{
                        fontSize: '42px',
                        marginBottom: '16px',
                    }}
                >
                    ⚠️
                </div>

                <h2
                    style={{
                        margin: '0 0 16px',
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#333333',
                    }}
                >
                    Event Cancelled
                </h2>

                <p
                    style={{
                        margin: '0 0 24px',
                        fontSize: '16px',
                        color: '#555555',
                        lineHeight: '1.7',
                    }}
                >
                    We regret to inform you that the event has been cancelled.

                    <br /><br />

                    All ticket holders will receive a full refund. The refund
                    amount will be processed within{' '}
                    <strong style={{ color: '#DC2626' }}>
                        15 working days
                    </strong>{' '}
                    to the original payment method.

                    <br /><br />

                    Thank you for your patience and support.
                </p>

                <button
                    onClick={() => setIsVisible(false)}
                    style={{
                        backgroundColor: '#DC2626',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '12px 32px',
                        fontSize: '16px',
                        fontWeight: '600',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                    }}
                    onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = '#B91C1C')
                    }
                    onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = '#DC2626')
                    }
                >
                    I Understand
                </button>
            </div>
        </>
    );
}