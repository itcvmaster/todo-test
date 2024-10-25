import { useEffect, useState } from 'react';
import useAlertStore from '@store/alertStore';

const useApi = (asyncApi, initValue, autoRun = false) => {

    const [isPending, setPending] = useState(false);
    const [error, setError] = useState();
    const [data, setData] = useState(initValue);
    const { addAlerts } = useAlertStore();

    useEffect(() => {
        if (autoRun) callApi();
    }, []);

    const callApi = async (...params) => {
        try {
            setPending(true);

            const response = await asyncApi(...params);
            setData(response);

            setPending(false);
            return response;
        } catch (error) {
            setError(error);
            // addAlerts(error.toString());

            setPending(false);
        }
    }

    return { data, setData, isPending, error, callApi };
};

export default useApi;