import React from 'react';

const Layout = ({ children, activeTab, onTabChange, isAdmin, onToggleAdmin }) => {
  return (
    <div className="layout-container">
      <header className="app-header">
        <div className="header-content">
          <span style={{ fontSize: '28px' }}>🏆</span>
          <h1>2026년 라켓업 혼복 대회</h1>
        </div>
      </header>

      <nav className="tab-nav">
        <button
          className={`tab-btn ${activeTab === 'live' ? 'active' : ''}`}
          onClick={() => onTabChange('live')}
        >
          실시간 코트
        </button>
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

      {/* ── Sticky Bottom Ad Banner ── */}
      <div className="bottom-ad-banner">
        <img src="/ad.png" alt="DAIN 3D 프린팅" className="bottom-ad-img" />
      </div>

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
          justify-content: center;
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
          padding-bottom: calc(2rem + 72px); /* extra for banner */
          max-width: 1400px;
          margin: 0 auto;
        }

        /* ── Bottom Ad Banner ── */
        .bottom-ad-banner {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 200;
          background: #195fc6; /* match the blue of the ad */
          display: flex;
          justify-content: center;
          align-items: center;
          height: 64px;
          overflow: hidden;
          box-shadow: 0 -3px 12px rgba(0,0,0,0.35);
        }
        .bottom-ad-img {
          height: 100%;
          width: 100%;
          object-fit: contain;
          object-position: center;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .app-header {
            flex-direction: column;
            gap: 0.5rem;
            padding: 1rem 0.5rem;
          }
          .tab-nav {
            width: 100%;
            gap: 0.5rem;
          }
          .tab-btn {
            flex: 1;
            text-align: center;
            padding: 0.6rem 0.2rem;
            font-size: 0.9rem;
            white-space: nowrap;
          }
          .app-main {
            padding: 1rem 0.5rem;
            padding-bottom: calc(1rem + 64px);
          }
          .header-content h1 {
            font-size: 1.4rem;
          }
          .bottom-ad-banner {
            height: 56px;
          }
        }

        /* Print Styles */
        @media print {
          .app-header, .tab-nav, .bottom-ad-banner {
            display: none !important;
          }
          .layout-container {
            background: white !important;
          }
          .app-main {
            padding: 0 !important;
            margin: 0 !important;
          }
        }
      `}</style>
    </div>

  );
};

export default Layout;
