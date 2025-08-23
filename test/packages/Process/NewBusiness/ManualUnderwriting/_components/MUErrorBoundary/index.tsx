import React from 'react';
type IErrorBoundaryProps = {
  panelName: string;
  children?: React.ReactNode;
};
type IErrorBoundaryState = {
  hasError: boolean;
};
class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps | Readonly<IErrorBoundaryProps>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.error(`MenuUnderWriting ${this.props.panelName} Error Info: `, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'var(--claim-card-1-bg-color)',
            marginBottom: '16px',
            paddingTop: '16px',
            paddingBottom: '16px',
            borderRadius: '4px',
          }}
        >
          <h1>{this.props.panelName} panel went wrong.</h1>{' '}
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
