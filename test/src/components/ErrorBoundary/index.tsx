import React from 'react';
import styles from './index.less';

type IErrorBoundaryProps = {
  panelName: string;
  children?: React.ReactNode;
};
type IErrorBoundaryState = {
  hasError: boolean;
  errorReason: string;
  errorsInfo: string;
};
class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps | Readonly<IErrorBoundaryProps>) {
    super(props);
    this.state = {
      hasError: false,
      errorReason: '',
      errorsInfo: '',
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    const isRouteError =
      typeof error?.message === 'string' && error.message.match(/Loading chunk (\d)+ failed/g);
    if (isRouteError) {
      window.location.replace(window.location.href);
    } else {
      this.setState({
        errorReason: error?.message,
        errorsInfo: errorInfo?.componentStack,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundaryWrap}>
          <div className={styles.topTitle}>
            <h1>{this.props.panelName} panel went wrong.</h1>
          </div>
          <div className={styles.reasonWrap}>
            <span className={styles.title}>Error Reason:</span>
            {this.state?.errorReason}
          </div>
          <div className={styles.infoWrap}>
            <span className={styles.title}>Errors Info:</span>
            {this.state?.errorsInfo}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
