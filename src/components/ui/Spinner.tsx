import React from 'react';

interface SpinnerProps {
    fullscreen?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ fullscreen }) => {
    if (fullscreen) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }
    return (
        <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
};

export default Spinner;
