import { ErrorBoundary } from 'components/ErrorBoundary';
import { ErrorView } from 'views/error';

type PageLayoutProps = {
  error: {
    status: number;
    message: string;
  };
};

export const PageLayout: React.FC<PageLayoutProps> = ({ error, children }) =>
  error ? (
    <ErrorView error={error} />
  ) : (
    <ErrorBoundary>{children}</ErrorBoundary>
  );
