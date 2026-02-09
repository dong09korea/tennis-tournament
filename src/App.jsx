import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Bracket from './components/Bracket';
import Standings from './components/Standings';
import AdminDashboard from './components/AdminDashboard';
import initialData from './assets/data.json';

import { subscribeToData, uploadData } from './services/firebase';

function App() {
    const [activeTab, setActiveTab] = useState('match');
    const [data, setData] = useState(initialData);
    const [status, setStatus] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = subscribeToData(setData);
        return () => unsubscribe();
    }, []);

    const handleUpload = async () => {
        if (confirm("현재 데이터를 Firebase에 업로드하시겠습니까? (기존 데이터 덮어쓰기)")) {
            setStatus("업로드 중...");
            try {
                await uploadData(initialData);
                setStatus("업로드 완료! (성공)");
                setTimeout(() => setStatus(""), 3000);
            } catch (e) {
                setStatus("업로드 실패: " + e.message);
            }
        }
    };

    return (
        <Layout
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isAdmin={isAdmin}
            onToggleAdmin={() => {
                if (isAdmin) {
                    setIsAdmin(false);
                    setActiveTab('match');
                } else {
                    setActiveTab('admin');
                }
            }}
        >
            {/* Admin Controls (Floating DB Init Button - Only show if Admin AND not in Dashboard) */}
            {/* Floating Controls (Show on non-admin tabs) */}
            {activeTab !== 'admin' && (
                <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                    {status && <div style={{ background: 'rgba(0,0,0,0.8)', color: 'white', padding: '10px', borderRadius: '8px' }}>{status}</div>}

                    {/* DB Reset - Only for Admins */}
                    {isAdmin && (
                        <button
                            onClick={handleUpload}
                            style={{
                                padding: '10px 15px',
                                background: '#d32f2f',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                opacity: 0.9,
                                boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
                            }}
                        >
                            DB 초기화 (주의)
                        </button>
                    )}

                    {/* Operator Mode - Always visible */}
                    <button
                        onClick={() => setActiveTab('admin')}
                        style={{
                            padding: '10px 15px',
                            background: '#444',
                            color: 'white',
                            border: '1px solid #666',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            opacity: 0.9,
                            boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
                        }}
                    >
                        ⚙️ 운영자 모드
                    </button>
                </div>
            )}

            {activeTab === 'admin' ? (
                <AdminDashboard
                    data={data}
                    isAdmin={isAdmin}
                    onLogin={(val) => setIsAdmin(val)}
                />
            ) : activeTab === 'match' ? (
                <Bracket matches={data.matches} teams={data.teams} courts={data.courts} isAdmin={isAdmin} />
            ) : (
                <Standings teams={data.teams} groups={data.groups} />
            )}
        </Layout>
    );
}

export default App;
