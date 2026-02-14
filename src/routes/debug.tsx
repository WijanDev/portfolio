import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import JsonCode from '@/components/JsonCode'
import { Play, Pause, StepForward, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

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
        <div className="p-8 h-full flex flex-col">
            <div className="flex items-center mb-6 gap-4 p-2 bg-[var(--vscode-sidebar-bg)] w-fit border border-[var(--vscode-border)]">
                <button
                    onClick={toggleRun}
                    className={cn("bg-transparent border-0 cursor-pointer flex items-center justify-center transition-colors hover:bg-[var(--vscode-hover)] p-1 rounded", isRunning ? "text-[#ebcd28]" : "text-[#60d660]")}
                    title={isRunning ? "Pause" : "Continue"}
                >
                    {isRunning ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button className="bg-transparent border-0 cursor-pointer flex items-center justify-center transition-colors hover:bg-[var(--vscode-hover)] p-1 rounded text-[var(--vscode-fg)] opacity-70" title="Step Over">
                    <StepForward size={20} />
                </button>
                <button
                    onClick={() => {
                        setIsRunning(true);
                        setDebugData(prev => ({ ...prev, activeConnections: 0, memoryUsage: '128 MB' }));
                    }}
                    className="bg-transparent border-0 cursor-pointer flex items-center justify-center transition-colors hover:bg-[var(--vscode-hover)] p-1 rounded text-[var(--vscode-token-keyword)]"
                    title="Restart"
                >
                    <RotateCcw size={20} />
                </button>
            </div>

            <div className="flex-1">
                <h2 className="text-sm text-[var(--vscode-fg)] mb-2 uppercase tracking-[1px] opacity-70">Variables</h2>
                <div className="border border-[var(--vscode-border)] p-4 bg-[var(--vscode-bg)]">
                    <JsonCode variableName="debugSession" data={debugData} />
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-sm text-[var(--vscode-fg)] mb-2 uppercase tracking-[1px] opacity-70">Call Stack</h2>
                <div className="font-mono text-[var(--vscode-fg)] text-[13px] opacity-80">
                    <div className="py-1">RequestController.handle (app.ts:45)</div>
                    <div className="py-1">Middleware.logger (middleware.ts:12)</div>
                    <div className="py-1">Server.listen (index.ts:102)</div>
                    <div className="py-1 opacity-60">Object.wait (native)</div>
                </div>
            </div>
        </div>
    )
}
