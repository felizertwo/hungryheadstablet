import React from 'react';
import {GridLoader} from 'react-spinners';

const LoadingSpinner = ({ loading }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <GridLoader color="black" loading={loading} size={50} />
        </div>
    );
};

export default LoadingSpinner;
