import React from 'react';

import './LoadingElement.css';

interface LoadingElementType { 
    className?: string
}
export function LoadingElement({ className }: LoadingElementType ) {
    return (
        <div className={className ?? "loading-container"}>
            <div className="loading-spinner" />
        </div>
    )
}