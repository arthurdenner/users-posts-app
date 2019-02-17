import React from 'react';

interface EmptyContentProps {
  message: string;
}

const EmptyContent: React.FC<EmptyContentProps> = ({ children, message }) => (
  <div className="empty-content" data-testid="empty-content-message">
    <p>{message}</p>
    {children}
  </div>
);

export { EmptyContent };
