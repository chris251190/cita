import React, { useEffect } from 'react';

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
    useEffect(() => {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
      });
    }, []);

    const promptInstall = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('Benutzer akzeptierte die A2HS-Aufforderung');
                } else {
                    console.log('Benutzer lehnte die A2HS-Aufforderung ab');
                }
                deferredPrompt = null;
            });
        }
    };

    return (
        <button
            className="border-orange-500 hover:border-orange-700 border-solid border-2 bg-transparent hover:text-orange-700 text-orange-500 font-bold py-1 px-2 rounded mr-3"
            onClick={promptInstall}>
            Install App
        </button>
    );
};

export default InstallPWAButton;