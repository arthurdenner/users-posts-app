import React from 'react';
import styles from './empty-content.less';

interface EmptyContentProps {
  message: string;
}

const EmptyContent: React.FC<EmptyContentProps> = ({ children, message }) => (
  <div className={styles.container} data-testid="empty-content-message">
    <p>{message}</p>
    {children}
  </div>
);

export { EmptyContent };
