import { Trophy, Lock, Unlock } from 'lucide-react';

const Layout = ({ children, activeTab, onTabChange, isAdmin, onToggleAdmin }) => {
  return (
    <div className="layout-container">
      <header className="app-header">
        <div className="header-content">
          <Trophy size={28} color="var(--tennis-yellow)" />
          <h1>WIMBLEDON LIVE</h1>
        </div>

        <button
          onClick={onToggleAdmin}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '5px',
            opacity: 0.5,
            transition: 'all 0.3s'
          }}
          title={isAdmin ? "Exit Admin Mode" : "Admin Mode"}
        >
          {isAdmin ? <Unlock size={20} color="#ff4444" /> : <Lock size={20} color="#666" />}
        </button>
      </header>

      <nav className="tab-nav">
        <button
          className={`tab-btn ${activeTab === 'match' ? 'active' : ''}`}
          onClick={() => onTabChange('match')}
        >
          대진표
        </button>
        <button
          className={`tab-btn ${activeTab === 'standings' ? 'active' : ''}`}
          onClick={() => onTabChange('standings')}
        >
          순위표
        </button>
      </nav>

      <main className="app-main">
        {children}
      </main>

      <style>{`
        .layout-container {
          width: 100%;
          min-height: 100vh;
          background-color: var(--bg-color);
          margin: 0 auto;
        }
        .app-header {
          padding: 1.5rem 2rem;
          background: linear-gradient(180deg, rgba(0,78,50,0.9) 0%, rgba(0,0,0,0) 100%);
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(5px);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header-content {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .header-content h1 {
          font-size: 1.8rem;
          margin: 0;
          letter-spacing: 1px;
          color: white;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        .tab-nav {
          display: flex;
          gap: 1rem;
        }
        .tab-btn {
          padding: 0.8rem 1.5rem;
          background: rgba(255,255,255,0.05);
          color: #aaa;
          border-radius: 12px;
          border: 1px solid transparent;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .tab-btn.active {
          background: var(--tennis-yellow);
          color: var(--wimbledon-green);
          box-shadow: 0 0 15px rgba(213, 255, 0, 0.3);
          transform: translateY(-2px);
        }
        .app-main {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .app-header {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }
          .tab-nav {
            width: 100%;
          }
          .tab-btn {
            flex: 1;
            text-align: center;
          }
          .app-main {
            padding: 1rem;
          }
          .header-content h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
