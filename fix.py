import codecs

with codecs.open(r'c:\Users\USER\.gemini\antigravity\playground\테니스 대회\src\components\KnockoutTree.jsx', 'r', 'utf-8') as f:
    text = f.read()

parts = text.split("    // If a specific tab is selected, render just that round")

new_content = parts[0] + """    // If a specific tab is selected, render just that round
    const isSingleRound = activeTabId && activeTabId !== 'full_tree';
    let renderContent = null;

    if (isSingleRound) {
        const count = getRoundCount(activeTabId);
        if (count > 0) {
            const singleRoundMatches = getMatchesForRound(activeTabId, count, 0);
            let roundTitle = activeTabId.replace('본선 ', '').replace(' (무작위)', '');

            if (activeTabId === '결승') {
                renderContent = (
                    <div className="single-bracket-wrapper">
                        <div className="single-bracket-scroll" style={{display:'flex', justifyContent:'center'}}>
                            {renderColumn(singleRoundMatches, '결승 (FINAL)', true)}
                        </div>
                    </div>
                );
            } else {
                const halfCount = Math.floor(count / 2);
                const leftMatches = singleRoundMatches.slice(0, halfCount);
                const rightMatches = singleRoundMatches.slice(halfCount);

                renderContent = (
                    <div className="single-bracket-wrapper dual-bracket-canvas">
                        <div className="single-bracket-scroll" style={{ display: 'flex', minWidth: 'max-content' }}>
                            {/* LEFT HALF */}
                            <div className="bracket-half left-half">
                                {renderColumn(leftMatches, roundTitle, true)}
                            </div>

                            <div className="single-center-gap"></div>

                            {/* RIGHT HALF */}
                            <div className="bracket-half right-half">
                                {renderColumn(rightMatches, roundTitle, false)}
                            </div>
                        </div>
                    </div>
                );
            }
        }
    } else {
        renderContent = (
            <div className="dual-bracket-wrapper">
                <div className="dual-bracket-scroll">
                    <div className="dual-bracket-canvas">

                        {/* LEFT HALF */}
                        <div className="bracket-half left-half">
                            {renderColumn(leftR32, '32강', true)}
                            {renderColumn(leftR16, '16강', true)}
                            {renderColumn(leftR8, '8강', true)}
                            {renderColumn(leftR4, '4강', true)}
                        </div>

                        {/* CENTER FINAL */}
                        <div className="bracket-center">
                            <div className="tree-column center-align">
                                <h4 className="tree-round-header finals-header">결승 (FINAL)</h4>
                                <div className="tree-match-list final-match">
                                    <div className="tree-match-node center-node">
                                        <div className="tree-match-card-wrapper">
                                            <MatchCard match={finals[0]} teamA={getTeam(finals[0].team_a_id)} teamB={getTeam(finals[0].team_b_id)} isAdmin={isAdmin} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT HALF (Reverse rendering order for columns) */}
                        <div className="bracket-half right-half">
                            {renderColumn(rightR4, '4강', false)}
                            {renderColumn(rightR8, '8강', false)}
                            {renderColumn(rightR16, '16강', false)}
                            {renderColumn(rightR32, '32강', false)}
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {renderContent}
            <style>{`
            .single-bracket-wrapper {
                background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 100%);
                border-radius: 12px;
                border: 1px solid rgba(255,255,255,0.05);
                margin-top: 1rem;
                display: flex;
                justify-content: center;
                overflow: hidden;
            }
            .single-bracket-scroll {
                overflow-x: auto;
                padding: 2rem 1rem;
                gap: 0;
            }
            .single-center-gap {
                width: 7rem; /* Space between the two halves */
            }

            /* --- CSS DRAWING LINES FOR SINGLE TAB DUAL VIEW --- */
            /* Left Half Lines */
            .single-bracket-wrapper .left-half .tree-match-card-wrapper::after {
                content: ''; position: absolute; right: -1.5rem; top: 50%; width: 1.5rem; height: 2px; background: rgba(255,255,255,0.15);
            }
            .single-bracket-wrapper .left-half .tree-match-node:nth-child(odd):not(:last-child)::before {
                content: ''; position: absolute; right: -1.5rem; top: 50%; height: 100%; width: 2px; background: rgba(255,255,255,0.15);
            }
            .single-bracket-wrapper .left-half .tree-match-node:nth-child(odd):not(:last-child)::after {
                content: ''; position: absolute; right: -2.5rem; top: 100%; width: 1rem; height: 2px; background: rgba(255,255,255,0.15);
            }

            /* Right Half Lines */
            .single-bracket-wrapper .right-half .tree-match-card-wrapper::before {
                content: ''; position: absolute; left: -1.5rem; top: 50%; width: 1.5rem; height: 2px; background: rgba(255,255,255,0.15);
            }
            .single-bracket-wrapper .right-half .tree-match-node:nth-child(odd):not(:last-child)::before {
                content: ''; position: absolute; left: -1.5rem; top: 50%; height: 100%; width: 2px; background: rgba(255,255,255,0.15);
            }
            .single-bracket-wrapper .right-half .tree-match-node:nth-child(odd):not(:last-child)::after {
                content: ''; position: absolute; left: -2.5rem; top: 100%; width: 1rem; height: 2px; background: rgba(255,255,255,0.15);
            }

            /* Adjust margin to match tree node style */
            .single-bracket-wrapper .tree-match-card-wrapper .match-card {
                margin: 0;
                transform: scale(0.95);
                transform-origin: center;
            }

            .dual-bracket-wrapper {
                background: linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%);
                border-radius: 12px;
                border: 1px solid rgba(255,255,255,0.05);
                margin-top: 1rem;
                overflow: hidden;
            }
            .dual-bracket-scroll {
                overflow-x: auto;
                padding: 2rem 1rem;
            }
            .dual-bracket-canvas {
                display: flex;
                min-width: max-content;
                justify-content: center;
                align-items: stretch;
            }
            
            .bracket-half {
                display: flex;
                gap: 0;
            }
            
            .tree-column {
                display: flex;
                flex-direction: column;
                min-width: 250px;
                position: relative;
            }
            
            /* Tighten up cards to fit large brackets */
            .tree-match-card-wrapper .match-card {
                margin: 0;
                transform: scale(0.85);
                transform-origin: center;
                border: 1px solid rgba(213,255,0,0.15);
            }
            
            .tree-round-header {
                text-align: center;
                color: #aaa;
                font-size: 0.9rem;
                margin-bottom: 1rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                border-bottom: 1px solid rgba(255,255,255,0.05);
                padding-bottom: 0.5rem;
            }
            
            .finals-header {
                color: var(--tennis-yellow);
                font-weight: 800;
                font-size: 1.1rem;
            }

            .tree-match-list {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                flex: 1;
                padding: 0 1.5rem;
            }
            
            .tree-match-node {
                position: relative;
                display: flex;
                align-items: center;
                flex: 1;
                width: 100%;
            }
            
            .tree-match-card-wrapper {
                position: relative;
                z-index: 2;
                width: 100%;
            }
            
            .center-align .tree-match-list {
                justify-content: center; /* Center the final match vertically */
            }

            /* --- DRAWING CONNECTOR LINES --- */
            /* LEFT HALF LINES: Branches moving Right */
            .left-half .tree-column:not(:last-child) .tree-match-card-wrapper::after {
                content: ''; position: absolute; right: -1.5rem; top: 50%; width: 1.5rem; height: 2px; background: rgba(255,255,255,0.15);
            }
            .left-half .tree-column:not(:first-child) .tree-match-card-wrapper::before {
                content: ''; position: absolute; left: -1.5rem; top: 50%; width: 1.5rem; height: 2px; background: rgba(255,255,255,0.15);
            }
            .left-half .tree-column:not(:last-child) .tree-match-node:nth-child(odd)::after {
                content: ''; position: absolute; right: -1.5rem; top: 50%; height: 100%; width: 2px; background: rgba(255,255,255,0.15);
            }

            /* RIGHT HALF LINES: Branches moving Left */
            .right-half .tree-column:not(:first-child) .tree-match-card-wrapper::before {
                content: ''; position: absolute; left: -1.5rem; top: 50%; width: 1.5rem; height: 2px; background: rgba(255,255,255,0.15);
            }
            .right-half .tree-column:not(:last-child) .tree-match-card-wrapper::after {
                content: ''; position: absolute; right: -1.5rem; top: 50%; width: 1.5rem; height: 2px; background: rgba(255,255,255,0.15);
            }
            .right-half .tree-column:not(:first-child) .tree-match-node:nth-child(odd)::before {
                content: ''; position: absolute; left: -1.5rem; top: 50%; height: 100%; width: 2px; background: rgba(255,255,255,0.15);
            }

            /* CONNECTIONS TO FINAL */
            .left-half .tree-column:last-child .tree-match-card-wrapper::after {
                content: ''; position: absolute; right: -1.5rem; top: 50%; width: 1.5rem; height: 2px; background: rgba(255,255,255,0.15);
            }
            .center-align .tree-match-card-wrapper::before {
                content: ''; position: absolute; left: -1.5rem; top: 50%; width: 1.5rem; height: 2px; background: rgba(255,255,255,0.15);
            }
            .right-half .tree-column:first-child .tree-match-card-wrapper::before {
                content: ''; position: absolute; left: -1.5rem; top: 50%; width: 1.5rem; height: 2px; background: rgba(255,255,255,0.15);
            }
            .center-align .tree-match-card-wrapper::after {
                content: ''; position: absolute; right: -1.5rem; top: 50%; width: 1.5rem; height: 2px; background: rgba(255,255,255,0.15);
            }
            
            `}</style>
        </>
    );
};

export default KnockoutTree;
"""

with codecs.open(r'c:\Users\USER\.gemini\antigravity\playground\테니스 대회\src\components\KnockoutTree.jsx', 'w', 'utf-8') as f:
    f.write(new_content)
print("Done")
