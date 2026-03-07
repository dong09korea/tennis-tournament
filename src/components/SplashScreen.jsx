import React, { useState, useEffect } from 'react';

const SPLASH_KEY = 'splashShown_v1';

const SplashScreen = ({ onEnter }) => {
    const [countdown, setCountdown] = useState(5);
    const [canEnter, setCanEnter] = useState(false);

    useEffect(() => {
        if (countdown <= 0) {
            setCanEnter(true);
            return;
        }
        const t = setTimeout(() => setCountdown(c => c - 1), 1000);
        return () => clearTimeout(t);
    }, [countdown]);

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#0a160a',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '28px'
        }}>
            {/* Ad label */}
            <div style={{
                fontSize: '0.72rem', color: '#888', letterSpacing: '2px',
                textTransform: 'uppercase'
            }}>
                advertisement
            </div>

            {/* Ad Image */}
            <div style={{
                background: '#fff',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
                maxWidth: '340px',
                width: '88vw',
            }}>
                <img
                    src="/ad.png"
                    alt="DAIN 3D 프린팅 광고"
                    style={{ width: '100%', display: 'block' }}
                />
            </div>

            {/* Enter Button or Countdown */}
            {canEnter ? (
                <button
                    onClick={onEnter}
                    style={{
                        padding: '14px 48px',
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        borderRadius: '50px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #d5ff00, #a8c800)',
                        color: '#0a160a',
                        cursor: 'pointer',
                        boxShadow: '0 4px 20px rgba(213,255,0,0.35)',
                        transition: 'transform 0.15s',
                        animation: 'popIn 0.3s ease'
                    }}
                    onMouseDown={e => e.currentTarget.style.transform = 'scale(0.96)'}
                    onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    입장 →
                </button>
            ) : (
                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px'
                }}>
                    <div style={{
                        width: '52px', height: '52px', borderRadius: '50%',
                        border: '3px solid #333',
                        borderTop: '3px solid #d5ff00',
                        animation: 'spin 1s linear infinite',
                        position: 'relative'
                    }} />
                    <span style={{ color: '#d5ff00', fontWeight: 700, fontSize: '1rem' }}>
                        {countdown}초 후 입장 가능
                    </span>
                </div>
            )}

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes popIn {
                    from { transform: scale(0.7); opacity: 0; }
                    to   { transform: scale(1);   opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default SplashScreen;
