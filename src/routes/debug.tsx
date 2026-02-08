import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import JsonCode from '@components/JsonCode'
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
        status: getStatus(),
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
                    status: getStatus(),
                });
            }, 1000);
        } else {
            setDebugData(prev => ({ ...prev, status: getStatus() }));
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    const toggleRun = () => setIsRunning(!isRunning);

    return (
        <div className="debug-container">
            <div className="debug-toolbar">
                <button
                    onClick={toggleRun}
                    className={`debug-btn ${isRunning ? 'debug-btn-pause' : 'debug-btn-play'}`}
                    title={isRunning ? "Pause" : "Continue"}
                >
                    {isRunning ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button className="debug-btn debug-btn-step" title="Step Over">
                    <StepForward size={20} />
                </button>
                <button
                    onClick={() => {
                        setIsRunning(true);
                        setDebugData(prev => ({ ...prev, activeConnections: 0, memoryUsage: '128 MB' }));
                    }}
                    className="debug-btn debug-btn-restart"
                    title="Restart"
                >
                    <RotateCcw size={20} />
                </button>
            </div>

            <div style={{ flex: 1 }}>
                <h2 className="debug-section-title">Variables</h2>
                <div className="debug-variables-panel">
                    <JsonCode variableName="debugSession" data={debugData} />
                </div>
            </div>

            <div style={{ marginTop: '24px' }}>
                <h2 className="debug-section-title">Call Stack</h2>
                <div className="debug-callstack">
                    <div className="callstack-item">RequestController.handle (app.ts:45)</div>
                    <div className="callstack-item">Middleware.logger (middleware.ts:12)</div>
                    <div className="callstack-item">Server.listen (index.ts:102)</div>
                    <div className="callstack-item" style={{ opacity: 0.6 }}>Object.wait (native)</div>
                </div>
            </div>
        </div>
    )
}
