import {useEffect, useRef, useState} from 'react';
import { useRouter } from 'next/navigation';
import InactivityModal from './InactivityModal';

const InactivityRedirect = ({ timeout = 120_000, warningTime = 10_000 }) => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const inactivityTimer = useRef(null);
    const warningTimer = useRef(null);

    const resetTimer = () => {
        clearTimeout(inactivityTimer.current);
        clearTimeout(warningTimer.current);
        setShowModal(false);

        warningTimer.current = setTimeout(() => {
            setShowModal(true);
        }, timeout - warningTime);

        inactivityTimer.current = setTimeout(() => {
            handleLogout();
        }, timeout);
    };

    const handleStay = () => {
        resetTimer();
    };

    const handleLogout = () => {
        setShowModal(false);
        clearTimeout(inactivityTimer.current);
        clearTimeout(warningTimer.current);
        router.push('/');
    };

    useEffect(() => {
        if (router.pathname === '/' || router.pathname === '') {
            setShowModal(false);
            clearTimeout(inactivityTimer.current);
            clearTimeout(warningTimer.current);
            return;
        }

        const events = ['click'];

        events.forEach(event => {
            window.addEventListener(event, resetTimer);
        });

        resetTimer();

        return () => {
            events.forEach(event => {
                window.removeEventListener(event, resetTimer);
            });
            clearTimeout(inactivityTimer.current);
            clearTimeout(warningTimer.current);
        };
    }, [router.pathname]);

    return (
        <InactivityModal
            open={showModal}
            onStay={handleStay}
            onLogout={handleLogout}
            leftInSecond={Math.trunc(warningTime / 1000)}
        />
    );
};

export default InactivityRedirect;
