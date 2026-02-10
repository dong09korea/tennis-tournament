import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Bracket from './components/BracketFixed';
import Standings from './components/Standings';
import AdminDashboard from './components/AdminDashboardNew';
import initialData from './assets/data.json';

import { subscribeToData, uploadData } from './services/firebase';

function App() {
    // Initialize state from localStorage if available
    const [activeTab, setActiveTab] = useState(() => localStorage.getItem('activeTab') || 'match');
    const [data, setData] = useState(initialData);
    const [status, setStatus] = useState("");
    const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true');

    // Persist state changes
    useEffect(() => {
        localStorage.setItem('activeTab', activeTab);
    }, [activeTab]);

    useEffect(() => {
        localStorage.setItem('isAdmin', isAdmin);
    }, [isAdmin]);

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
            {/* Operator Mode - Always visible */}
            {/* Operator Mode - Moved to AdminDashboard */}
            {activeTab !== 'admin' && (
                <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
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
                        🔐 운영자 로그인
                    </button>
                    {/* DB Reset Removed - Access inside Admin Dashboard */}
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
