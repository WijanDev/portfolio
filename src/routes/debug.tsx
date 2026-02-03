import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import JsonCode from '../components/JsonCode'
import { Play, Pause, StepForward, RotateCcw } from 'lucide-react'

export const Route = createFileRoute('/debug')({
    component: Debug,
})

function Debug() {
    const levelOfCoffe = () => {
        const time = new Date().getHours();
        if (time >= 8 && time < 16) {
            return 'full';
        } else if (time >= 16 && time < 20) {
            return 'medium';
        } else {
            return 'low';
        }
    }

    const bugsFixedToday = () => {
        const time = new Date().getHours();
        if (time >= 8 && time < 16) {
            return Math.floor(Math.random() * 10);
        } else if (time >= 16 && time < 20) {
            return Math.floor(Math.random() * 5);
        } else {
            return Math.floor(Math.random() * 2);
        }
    }

    const yearsOfExperience = () => {
        const startingDate = new Date(2016, 1, 15);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate.getTime() - startingDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const years = Math.floor(diffDays / 365);
        return years;
    }

    const getStatus = () => {
        return isRunning ? 'running' : 'paused';
    }

    const [isRunning, setIsRunning] = useState(true)
    const [debugData, setDebugData] = useState({
        nowListening: 'Dani California - Red Hot Chili Peppers',
        levelOfCoffe: levelOfCoffe(),
        bugsFixedToday: bugsFixedToday(),
        yearsOfExperience: yearsOfExperience(),
    });



    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning) {
            interval = setInterval(() => {
                setDebugData({
                    nowListening: 'Dani California - Red Hot Chili Peppers',
                    levelOfCoffe: levelOfCoffe(),
                    bugsFixedToday: bugsFixedToday(),
                    yearsOfExperience: yearsOfExperience(),
                });
            }, 1000);
        } else {
            setDebugData(prev => ({ ...prev, status: getStatus() }));
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    const toggleRun = () => setIsRunning(!isRunning);

    return (
        <div style={{ padding: '32px', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', gap: '16px', padding: '8px', background: '#252526', width: 'fit-content' }}>
                <button
                    onClick={toggleRun}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: isRunning ? '#ebcd28' : '#60d660', display: 'flex' }}
                    title={isRunning ? "Pause" : "Continue"}
                >
                    {isRunning ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#a0a0a0' }} title="Step Over">
                    <StepForward size={20} />
                </button>
                <button
                    onClick={() => {
                        setIsRunning(true);
                        setDebugData(prev => ({ ...prev, activeConnections: 0, memoryUsage: '128 MB' }));
                    }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#569cd6' }}
                    title="Restart"
                >
                    <RotateCcw size={20} />
                </button>
            </div>

            <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '14px', color: '#ccc', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Variables</h2>
                <div style={{ border: '1px solid #3c3c3c', padding: '16px', background: '#1e1e1e' }}>
                    <JsonCode variableName="debugSession" data={debugData} />
                </div>
            </div>

            <div style={{ marginTop: '24px' }}>
                <h2 style={{ fontSize: '14px', color: '#ccc', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Call Stack</h2>
                <div style={{ fontFamily: 'Consolas, monospace', color: '#a0a0a0', fontSize: '13px' }}>
                    <div style={{ padding: '4px 0' }}>RequestController.handle (app.ts:45)</div>
                    <div style={{ padding: '4px 0' }}>Middleware.logger (middleware.ts:12)</div>
                    <div style={{ padding: '4px 0' }}>Server.listen (index.ts:102)</div>
                    <div style={{ padding: '4px 0', opacity: 0.6 }}>Object.wait (native)</div>
                </div>
            </div>
        </div>
    )
}
