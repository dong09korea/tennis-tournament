import React from 'react';

const LuckyDraw = () => {
  const luckyNumbers = [
    { num: 1, name: "전성빈" }, { num: 2, name: "안세린" }, { num: 3, name: "최종섭" }, { num: 4, name: "허은" }, { num: 5, name: "이석희" },
    { num: 6, name: "김민지" }, { num: 7, name: "정규대" }, { num: 8, name: "김태현" }, { num: 9, name: "신중호" }, { num: 10, name: "김윤정" },
    { num: 11, name: "김명래" }, { num: 12, name: "손정은" }, { num: 13, name: "김세호" }, { num: 14, name: "김한나" }, { num: 15, name: "백경일" },
    { num: 16, name: "손명연" }, { num: 17, name: "서동찬" }, { num: 18, name: "김태희" }, { num: 19, name: "오진우" }, { num: 20, name: "김관희" },
    { num: 21, name: "조명화" }, { num: 22, name: "이재은" }, { num: 23, name: "최정민" }, { num: 24, name: "오연지" }, { num: 25, name: "김성곤" },
    { num: 26, name: "김태현" }, { num: 27, name: "소병호" }, { num: 28, name: "이소영" }, { num: 29, name: "이성철" }, { num: 30, name: "이다경" },
    { num: 31, name: "이정환" }, { num: 32, name: "구향화" }, { num: 33, name: "박성환" }, { num: 34, name: "신지영" }, { num: 35, name: "남경천" },
    { num: 36, name: "우지영" }, { num: 37, name: "김진" }, { num: 38, name: "김주예" }, { num: 39, name: "구용빈" }, { num: 40, name: "유진아" },
    { num: 41, name: "신민규" }, { num: 42, name: "임소리" }, { num: 43, name: "박성혁" }, { num: 44, name: "유미숙" }, { num: 45, name: "김진영" },
    { num: 46, name: "함아영" }, { num: 47, name: "정태선" }, { num: 48, name: "이현주" }, { num: 49, name: "전재안" }, { num: 50, name: "정민지" },
    { num: 51, name: "조병규" }, { num: 52, name: "홍은주" }, { num: 53, name: "김종형" }, { num: 54, name: "김혜지" }, { num: 55, name: "정석연" },
    { num: 56, name: "송다혜" }, { num: 57, name: "김병현" }, { num: 58, name: "조은나" }, { num: 59, name: "정대현" }, { num: 60, name: "김선경" },
    { num: 61, name: "김상민" }, { num: 62, name: "서현주" }, { num: 63, name: "박찬주" }, { num: 64, name: "박성은" }, { num: 65, name: "홍진일" },
    { num: 66, name: "이지연" }, { num: 67, name: "박주연" }, { num: 68, name: "오진주" }, { num: 69, name: "고용우" }, { num: 70, name: "강예원" },
    { num: 71, name: "김수정" }, { num: 72, name: "주혜령" }, { num: 73, name: "김동호" }, { num: 74, name: "나츠미" }, { num: 75, name: "오창현" },
    { num: 76, name: "김은하" }, { num: 77, name: "홍민우" }, { num: 78, name: "김한나" }, { num: 79, name: "이정우" }, { num: 80, name: "박미영" },
    { num: 81, name: "곽남기" }, { num: 82, name: "박선영" }, { num: 83, name: "문기우" }, { num: 84, name: "권주연" }, { num: 85, name: "박종호" },
    { num: 86, name: "이혜연" }, { num: 87, name: "김주경" }, { num: 88, name: "김미영" }, { num: 89, name: "구본혁" }, { num: 90, name: "김민선" },
    { num: 91, name: "김석환" }, { num: 92, name: "미스융" }, { num: 93, name: "김대성" }, { num: 94, name: "이진희" }, { num: 95, name: "안성진" },
    { num: 96, name: "유지희" }
  ];

  return (
    <div className="lucky-draw-container">
      <div className="lucky-draw-content">
        <header className="lucky-header">
          <h2>제2회 라켓업 클래식</h2>
          <h1>럭키 드로우 넘버</h1>
        </header>

        <div className="lucky-grid-overlay">
          <div className="lucky-grid">
            {luckyNumbers.map(item => (
              <div key={item.num} className="lucky-item">
                <span className="lucky-num">{item.num}</span>
                <span className="lucky-name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <footer className="lucky-footer">
          <p>- 현장에 없는 참가자 상품 수령 불가합니다. -</p>
          <p>- 대회 참가자 변동 시 기존 번호로 수령 가능합니다. -</p>
          <div className="lucky-logo">
            <span className="logo-text">RACKET UP</span>
            <span className="logo-sub">TENNIS CLUB EST. 2022</span>
          </div>
        </footer>
      </div>

      <style>{`
        .lucky-draw-container {
          position: relative;
          min-height: 120vh;
          background: url('/lucky-bg.png') no-repeat center center;
          background-size: cover;
          display: flex;
          justify-content: center;
          padding: 2rem 1rem;
          color: white;
          font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
        }

        .lucky-draw-content {
          width: 100%;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(2px);
          border-radius: 20px;
          padding: 1rem;
        }

        .lucky-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .lucky-header h2 {
          font-size: 1.5rem;
          font-weight: 300;
          margin: 0;
          color: rgba(255, 255, 255, 0.9);
          letter-spacing: 2px;
        }

        .lucky-header h1 {
          font-size: 3rem;
          font-weight: 800;
          margin: 0;
          text-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
          letter-spacing: -1px;
        }

        .lucky-grid-overlay {
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2rem 1rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          width: 100%;
          margin-bottom: 2rem;
          position: relative;
        }
        
        /* Watermark like in the image */
        .lucky-grid-overlay::after {
          content: 'RACKET UP\\A 2026 CLASSIC';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 5rem;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.05);
          white-space: pre-wrap;
          text-align: center;
          pointer-events: none;
          line-height: 0.8;
          z-index: 0;
        }

        .lucky-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.8rem 0.5rem;
          position: relative;
          z-index: 1;
        }

        .lucky-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 1rem;
          padding: 2px 4px;
        }

        .lucky-num {
          font-weight: 400;
          color: rgba(255, 255, 255, 0.6);
          width: 20px;
          text-align: right;
          font-style: italic;
          font-family: 'Georgia', serif;
        }

        .lucky-name {
          font-weight: 600;
          color: white;
        }

        .lucky-footer {
          text-align: center;
          margin-top: auto;
          width: 100%;
        }

        .lucky-footer p {
          margin: 4px 0;
          font-size: 0.9rem;
          font-weight: 500;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .lucky-logo {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0.8;
        }

        .logo-text {
          font-weight: 900;
          font-size: 1.2rem;
          letter-spacing: 1px;
        }

        .logo-sub {
          font-size: 0.6rem;
          letter-spacing: 2px;
        }

        /* Mobile specific adjustments to match the tall aspect ratio */
        @media (max-width: 600px) {
          .lucky-grid {
            grid-template-columns: repeat(4, 1fr);
          }
          .lucky-header h1 {
            font-size: 2.2rem;
          }
          .lucky-item {
            font-size: 0.9rem;
          }
        }
        
        @media (max-width: 400px) {
          .lucky-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default LuckyDraw;
