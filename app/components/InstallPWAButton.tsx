import React, { useEffect, useState } from 'react';

declare global {
    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent;
    }

    interface BeforeInstallPromptEvent extends Event {
        readonly platforms: Array<string>;
        readonly userChoice: Promise<{
            outcome: 'accepted' | 'dismissed',
            platform: string
        }>;
        prompt(): Promise<void>;
    }
}

let deferredPrompt: BeforeInstallPromptEvent | null;

const InstallPWAButton: React.FC = () => {
    const [isPromptReady, setPromptReady] = useState(false);

    useEffect(() => {
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        if (!isStandalone) {
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                deferredPrompt = e;
                setPromptReady(true);
            });
        }
    }, []);

      const promptInstall = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    deferredPrompt = null;
                    setPromptReady(false);
                }
            });
        }
    };

    return (
        isPromptReady && (
            <button
                className="border-orange-500 hover:border-orange-700 border-solid border-2 bg-transparent hover:text-orange-700 text-orange-500 font-bold py-1 px-2 rounded mr-3"
                onClick={promptInstall}
                disabled={!isPromptReady}>
                Install App
            </button>
        )
    );
};

export default InstallPWAButton;