import React from 'react';
import styles from './loading.less';

interface LoadingProps {
  message: string;
}

const Loading: React.FC<LoadingProps> = ({ message }) => (
  <div className={styles.container} data-testid="loading-message">
    {message}
  </div>
);

export { Loading };
