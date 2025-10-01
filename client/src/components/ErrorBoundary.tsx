import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, Button, Stack, Text, Title } from '@mantine/core';
import { IconAlertCircle, IconRefresh } from '@tabler/icons-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
    
    // Log error to backend in production
    if (process.env.NODE_ENV === 'production') {
      this.logErrorToBackend(error, errorInfo);
    }
  }

  private logErrorToBackend = async (error: Error, errorInfo: ErrorInfo) => {
    try {
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href
        })
      });
    } catch (logError) {
      console.error('Failed to log error to backend:', logError);
    }
  };

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Something went wrong"
          color="red"
          variant="light"
          style={{ margin: '20px' }}
        >
          <Stack gap="md">
            <Text size="sm">
              An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
            </Text>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ marginTop: '10px' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  Error Details (Development)
                </summary>
                <pre style={{ 
                  marginTop: '10px', 
                  padding: '10px', 
                  backgroundColor: '#f5f5f5', 
                  borderRadius: '4px',
                  fontSize: '12px',
                  overflow: 'auto'
                }}>
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            
            <Button
              leftSection={<IconRefresh size={16} />}
              onClick={this.handleRetry}
              size="sm"
              variant="light"
            >
              Try Again
            </Button>
          </Stack>
        </Alert>
      );
    }

    return this.props.children;
  }
}
