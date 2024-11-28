import React, { useEffect } from 'react';
import { syncXp } from '@/hooks/useAPI';

const GlobalSyncManager = ({ userId }: { userId: string }) => {
    useEffect(() => {
        const interval = setInterval(() => {
            syncXp(userId);
        }, 60000);

        return () => clearInterval(interval);
    }, [userId]);

    return null;
};

export default GlobalSyncManager;
