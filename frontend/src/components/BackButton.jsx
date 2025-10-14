import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = ({ label = 'Back' }) => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate(-1)}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#f3f4f6',
                border: 'none',
                borderRadius: 8,
                padding: '8px 12px',
                color: '#374151',
                fontSize: 14,
                cursor: 'pointer',
                margin: '12px 0'
            }}
        >
            <ArrowLeft size={18} />
            {label}
        </button>
    );
};

export default BackButton;


