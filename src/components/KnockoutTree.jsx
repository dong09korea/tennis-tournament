import React from 'react';
import MatchCard from './MatchCard';

const KnockoutTree = ({ matches, teams, isAdmin, activeTabId }) => {
    const getTeam = (id) => teams.find(t => t.id === id) || { id: 'TBD', name: 'TBD', player1: '', player2: '' };

    // Get knockout matches 
    // Format assumption: match.id = "ko32_m1", "ko16_m1", etc.
    const getMatchesForRound = (roundId, count, offset = 0) => {
        let roundMatches = matches.filter(m => {
            if (m.group_id === roundId) return true;
            if (roundId === '본선 16강' && m.group_id === '16강') return true;
            return false;
        }).sort((a, b) => {
            const parseMatchNum = id => parseInt(String(id).match(/\d+$/)?.[0] || '0', 10);
            return parseMatchNum(a.id) - parseMatchNum(b.id);
        });

        // Fill with dummies if matches haven't been generated yet
        const result = [];
        for (let i = 0; i < count; i++) {
            const matchIndex = offset + i;
            const existingMatch = roundMatches[matchIndex];
            if (existingMatch) {
                result.push(existingMatch);
            } else {
                result.push({
                    id: `dummy_${roundId}_${matchIndex}`,
                    group_id: roundId,
                    team_a_id: 'TBD',
                    team_b_id: 'TBD',
                    score_a: null,
                    score_b: null,
                    status: 'PENDING',
                    dummy: true
                });
            }
        }
        return result;
    };

    // Construct the halves for full tree
    // Left side counts: 32강:8, 16강:4, 8강:2, 4강:1
    const leftR32 = getMatchesForRound('본선 32강', 8, 0);
    const leftR16 = getMatchesForRound('본선 16강', 4, 0);
    const leftR8 = getMatchesForRound('8강', 2, 0);
    const leftR4 = getMatchesForRound('4강', 1, 0);

    // Right side counts: 32강:8, 16강:4, 8강:2, 4강:1
    const rightR32 = getMatchesForRound('본선 32강', 8, 8);
    const rightR16 = getMatchesForRound('본선 16강', 4, 4);
    const rightR8 = getMatchesForRound('8강', 2, 2);
    const rightR4 = getMatchesForRound('4강', 1, 1);

    const finals = getMatchesForRound('결승', 1, 0);

    const renderColumn = (matches, roundTitle, isLeft, isFinal = false) => (
        <div className={`tree-column ${isLeft ? 'left-align' : 'right-align'} ${isFinal ? 'final-column' : ''}`}>
            <h4 className={`tree-round-header ${isFinal ? 'finals-header' : ''}`}>{roundTitle}</h4>
            <div className={`tree-match-list ${isFinal ? 'final-match' : ''}`}>
                {matches.map((match, mIndex) => (
                    <div key={match.id} className="tree-match-node">
                        <div className="tree-match-card-wrapper">
                            <MatchCard match={match} teamA={getTeam(match.team_a_id)} teamB={getTeam(match.team_b_id)} isAdmin={isAdmin} allMatches={matches} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const getRoundCount = (roundId) => {
        switch (roundId) {
            case '32강': return 16;
            case '16강': return 8;
            case '8강': return 4;
            case '4강': return 2;
            case '결승': return 1;
            default: return 0;
        }
    };

    const getFullRoundId = (shortId) => {
        switch (shortId) {
            case '32강': return '본선 32강';
            case '16강': return '본선 16강';
            case '8강': return '8강';
            case '4강': return '4강';
            case '결승': return '결승';
            default: return shortId;
        }
    }

    // If a specific tab is selected, render just that round
    const isSingleRound = activeTabId && activeTabId !== 'full_tree' && activeTabId !== 'all';
    let renderContent = null;

    if (isSingleRound) {
        const count = getRoundCount(activeTabId);
        const fullRoundId = getFullRoundId(activeTabId);

        if (count > 0) {
            const singleRoundMatches = getMatchesForRound(fullRoundId, count, 0);
            let roundTitle = fullRoundId.replace('본선 ', '');

            if (activeTabId === '결승') {
                renderContent = (
                    <div className="single-bracket-wrapper" style={{ border: 'none', background: 'transparent' }}>
                        <div className="single-bracket-scroll" style={{ display: 'flex', justifyContent: 'center' }}>
                            {renderColumn(singleRoundMatches, '결승 (FINAL)', true, true)}
                        </div>
                    </div>
                );
            } else {
                const halfCount = Math.floor(count / 2);
                const leftMatches = singleRoundMatches.slice(0, halfCount);
                const rightMatches = singleRoundMatches.slice(halfCount);

                renderContent = (
                    <div className="single-bracket-wrapper dual-bracket-canvas" style={{ border: 'none', background: 'transparent' }}>
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
                                            <MatchCard match={finals[0]} teamA={getTeam(finals[0].team_a_id)} teamB={getTeam(finals[0].team_b_id)} isAdmin={isAdmin} allMatches={matches} />
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
                overflow: hidden;
            }
            .single-bracket-scroll {
                overflow-x: auto;
                padding: 1rem 1rem;
                gap: 0;
                display: flex;
                align-items: center;
                min-height: 400px;
                margin: 0 auto;
                width: max-content;
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

            /* Right Half Lines */
            .single-bracket-wrapper .right-half .tree-match-card-wrapper::before {
                content: ''; position: absolute; left: -1.5rem; top: 50%; width: 1.5rem; height: 2px; background: rgba(255,255,255,0.15);
            }
            .single-bracket-wrapper .right-half .tree-match-node:nth-child(odd):not(:last-child)::before {
                content: ''; position: absolute; left: -1.5rem; top: 50%; height: 100%; width: 2px; background: rgba(255,255,255,0.15);
            }

            /* Adjust margin to match tree node style */
            .single-bracket-wrapper .tree-match-card-wrapper .match-card {
                margin: 0 auto;
                transform: scale(0.95); /* ENLARGED */
                transform-origin: center;
                padding: 0.6rem 0.8rem;
            }

            /* --- FLAT GRID VIEW FOR 32-GANG --- */
            .bracket-grid-view {
                margin-top: 1rem;
                padding: 1rem;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .grid-match-list {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 1.5rem;
                width: 100%;
                max-width: 1200px;
            }
            .grid-match-card-wrapper {
                width: 100%;
                max-width: 320px;
            }
            .grid-match-card-wrapper .match-card {
                margin: 0;
                padding: 0.8rem 1rem;
                transform: scale(0.95);
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
                padding: 1rem 1rem;
            }
            .dual-bracket-canvas {
                display: flex;
                min-width: max-content;
                width: max-content;
                margin: 0 auto;
                align-items: center; /* Center vertically */
                min-height: 500px;
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
                justify-content: center; /* Center children */
            }
            
            /* Tighten up cards to fit large brackets */
            .tree-match-card-wrapper .match-card {
                margin: 0 auto;
                transform: scale(0.95); /* ENLARGED */
                transform-origin: center;
                padding: 0.6rem 0.8rem;
                border: 1px solid rgba(213,255,0,0.15);
                transition: transform 0.2s ease;
            }
            
            /* Make final match card much larger */
            .final-match .tree-match-card-wrapper .match-card,
            .single-bracket-wrapper .final-match .tree-match-card-wrapper .match-card {
                transform: scale(1.2) !important;
                border: 2px solid var(--tennis-yellow) !important;
                box-shadow: 0 0 25px rgba(213,255,0,0.15);
                padding: 0.8rem 1rem;
                margin: 1.5rem auto;
            }
            
            .tree-round-header {
                text-align: center;
                color: #aaa;
                font-size: 0.9rem;
                margin-bottom: 0.5rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                border-bottom: 1px solid rgba(255,255,255,0.05);
                padding-bottom: 0.3rem;
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
