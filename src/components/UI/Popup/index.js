import { useState, useEffect } from 'react';

const Popup = ({ message, onClose, duration }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose(); 
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return isVisible ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-lg">{message}</p>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        onClose(); 
                    }}
                    className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                >
                    Fermer
                </button>
            </div>
        </div>
    ) : null;
};

export default Popup;
