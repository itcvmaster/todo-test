import { atom, useRecoilState } from 'recoil';

export const alertState = atom({
    key: 'alertKey',
    default: [],
});

const useAlertStore = () => {
    const [alerts, setAlerts] = useRecoilState(alertState);

    const addAlert = async (message, severity) => {
        setAlerts((prev) => [
            ...prev,
            { message, severity, id: Date.now() }
        ]);
    };

    const deleteAlert = (id) => {
        setAlerts((prev) => prev.filter((n) => n.id !== id));
    };

    return {
        alerts,
        setAlerts,

        addAlert,
        deleteAlert,
    };
}

export default useAlertStore;