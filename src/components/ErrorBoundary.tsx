import React from 'react';

import { ErrorView } from 'views/error';

export class ErrorBoundary extends React.Component<
  {},
  {
    hasError: boolean;
    error: Error;
  }
> {
  constructor(props: any) {
    super(props);

    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error(error);
    console.error(errorInfo);
    this.setState({ hasError: true, error: error });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorView error={this.state.error} />;
    }

    return this.props.children;
  }
}
