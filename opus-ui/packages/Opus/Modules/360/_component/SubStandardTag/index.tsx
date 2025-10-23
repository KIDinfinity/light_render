import classnames from 'classnames';
import styles from './index.less';

export default ({ value, subStandard }: any) => {
  const icon =
    subStandard === 'Y' ? (
      <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.77529 6.99932L0.925293 4.14932L1.63779 3.43682L3.77529 5.57432L8.36279 0.986816L9.07529 1.69932L3.77529 6.99932Z" />
      </svg>
    ) : (
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.707 0.896313L7.53025 0.719563C7.2375 0.426812 6.7625 0.426812 6.46975 0.719563L3.8535 3.33581L1.2375 0.719563C0.9445 0.426812 0.4695 0.426812 0.17675 0.719563L0 0.896313L3.1465 4.04281L0 7.18931L0.17675 7.36606C0.4695 7.65881 0.9445 7.65881 1.2375 7.36606L3.8535 4.74981L6.46975 7.36606C6.7625 7.65881 7.2375 7.65881 7.53025 7.36606L7.707 7.18931L4.5605 4.04281L7.707 0.896313Z"
        />
      </svg>
    );

  return (
    <span
      className={classnames(styles.tag, {
        [styles.error]: subStandard === 'Y',
        [styles.safe]: subStandard === 'N',
      })}
    >
      <span>{icon}</span>
      <span>{value}</span>
    </span>
  );
};
