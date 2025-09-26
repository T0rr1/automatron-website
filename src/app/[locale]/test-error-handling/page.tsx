'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorBoundary } from '@/components/common/error-boundary';
import { 
  ErrorFallback, 
  NetworkErrorFallback, 
  TimeoutErrorFallback,
  FormSubmissionErrorFallback,
  LoadingFallback,
  EmptyStateFallback 
} from '@/components/common/fallback-ui';
import { 
  LoadingSpinner, 
  LoadingSkeleton, 
  LoadingOverlay, 
  ProgressBar, 
  LoadingButton, 
  PulseLoader, 
  LoadingCard, 
  TimeoutLoader,
  NetworkStatus,
  useNetworkStatus 
} from '@/components/common/loading-states';
import { useFormValidation, useFileUploadValidation } from '@/hooks/use-form-validation';
import { captureError, captureMessage, addBreadcrumb, ErrorType, ErrorSeverity } from '@/lib/error-monitoring';
import { safeAsync, TIMEOUT_CONFIG } from '@/lib/async-utils';
import { z } from 'zod';

// Test schema for form validation
const testSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

// Component that throws an error for testing
const ErrorThrowingComponent: React.FC<{ shouldThrow: boolean }> = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test error from component');
  }
  return <div className="p-4 bg-green-100 rounded">Component loaded successfully!</div>;
};

// Async operation that can fail
const testAsyncOperation = async (shouldFail: boolean, delay: number = 1000) => {
  await new Promise(resolve => setTimeout(resolve, delay));
  if (shouldFail) {
    throw new Error('Async operation failed');
  }
  return { success: true, data: 'Operation completed' };
};

export default function TestErrorHandlingPage() {
  const [componentError, setComponentError] = useState(false);
  const [asyncLoading, setAsyncLoading] = useState(false);
  const [asyncResult, setAsyncResult] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [showTimeout, setShowTimeout] = useState(false);
  const isOnline = useNetworkStatus();

  // Form validation test
  const formValidation = useFormValidation({
    schema: testSchema,
    onSubmit: async (data) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', data);
    },
    onSuccess: () => setAsyncResult('Form submitted successfully!'),
    onError: (error) => setAsyncResult(`Form error: ${error.message}`),
  });

  // File upload test
  const fileUpload = useFileUploadValidation(3, 1024 * 1024); // 3 files, 1MB max

  // Test async operation with error handling
  const testAsync = async (shouldFail: boolean) => {
    setAsyncLoading(true);
    setAsyncResult('');

    const { data, error } = await safeAsync(
      () => testAsyncOperation(shouldFail),
      {
        timeout: TIMEOUT_CONFIG.API_REQUEST,
        retries: 2,
        context: { testOperation: true },
      }
    );

    setAsyncLoading(false);

    if (error) {
      setAsyncResult(`Error: ${error.message}`);
    } else {
      setAsyncResult(`Success: ${data?.data}`);
    }
  };

  // Test progress simulation
  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Test error monitoring
  const testErrorMonitoring = () => {
    addBreadcrumb('User clicked test error monitoring', 'user_action');
    
    captureError(
      new Error('Test error for monitoring'),
      ErrorType.CLIENT,
      ErrorSeverity.LOW,
      { testContext: 'error_handling_page' }
    );

    captureMessage('Test message for monitoring', ErrorSeverity.LOW, {
      feature: 'error_monitoring_test'
    });

    setAsyncResult('Error monitoring test completed - check console/Sentry');
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Error Handling & Monitoring Test Page</h1>
        <p className="text-muted-foreground">
          This page tests all error handling, loading states, and monitoring features.
        </p>
      </div>

      <NetworkStatus isOnline={isOnline} />

      {/* Error Boundary Tests */}
      <Card>
        <CardHeader>
          <CardTitle>Error Boundary Tests</CardTitle>
          <CardDescription>
            Test React error boundaries and fallback UI components
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button 
              onClick={() => setComponentError(!componentError)}
              variant={componentError ? "destructive" : "default"}
            >
              {componentError ? 'Fix Component' : 'Break Component'}
            </Button>
          </div>

          <ErrorBoundary>
            <ErrorThrowingComponent shouldThrow={componentError} />
          </ErrorBoundary>
        </CardContent>
      </Card>

      {/* Fallback UI Tests */}
      <Card>
        <CardHeader>
          <CardTitle>Fallback UI Components</CardTitle>
          <CardDescription>
            Different fallback UI components for various error scenarios
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Generic Error Fallback</h4>
            <ErrorFallback 
              title="Test Error"
              description="This is a test error fallback"
              onRetry={() => alert('Retry clicked')}
            />
          </div>

          <div>
            <h4 className="font-medium mb-2">Network Error Fallback</h4>
            <NetworkErrorFallback onRetry={() => alert('Network retry clicked')} />
          </div>

          <div>
            <h4 className="font-medium mb-2">Timeout Error Fallback</h4>
            <TimeoutErrorFallback onRetry={() => alert('Timeout retry clicked')} />
          </div>

          <div>
            <h4 className="font-medium mb-2">Form Submission Error</h4>
            <FormSubmissionErrorFallback 
              onRetry={() => alert('Form retry clicked')}
              isNetworkError={false}
            />
          </div>

          <div>
            <h4 className="font-medium mb-2">Empty State</h4>
            <EmptyStateFallback
              title="No Data Available"
              description="There's nothing to show here yet"
              action={{
                label: "Add Something",
                onClick: () => alert('Add action clicked')
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Loading States Tests */}
      <Card>
        <CardHeader>
          <CardTitle>Loading States</CardTitle>
          <CardDescription>
            Various loading indicators and states
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium mb-2">Loading Spinner</h4>
              <div className="flex gap-2 items-center">
                <LoadingSpinner size="sm" />
                <LoadingSpinner size="md" />
                <LoadingSpinner size="lg" />
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Pulse Loader</h4>
              <div className="flex gap-2 items-center">
                <PulseLoader size="sm" />
                <PulseLoader size="md" />
                <PulseLoader size="lg" />
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Loading Skeleton</h4>
              <LoadingSkeleton lines={3} />
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Progress Bar</h4>
            <div className="space-y-2">
              <Button onClick={simulateProgress} size="sm">
                Simulate Progress
              </Button>
              <ProgressBar progress={progress} showPercentage />
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Loading Overlay</h4>
            <LoadingOverlay isLoading={asyncLoading} message="Processing...">
              <div className="h-32 bg-muted rounded flex items-center justify-center">
                <p>Content behind overlay</p>
              </div>
            </LoadingOverlay>
          </div>

          <div>
            <h4 className="font-medium mb-2">Loading Card</h4>
            <LoadingCard 
              title="Loading Content"
              description="Please wait while we fetch the data"
              variant="spinner"
            />
          </div>

          <div>
            <h4 className="font-medium mb-2">Timeout Loader</h4>
            <Button onClick={() => setShowTimeout(!showTimeout)} size="sm">
              {showTimeout ? 'Hide' : 'Show'} Timeout Loader
            </Button>
            {showTimeout && (
              <TimeoutLoader
                timeout={10000}
                onTimeout={() => {
                  setShowTimeout(false);
                  alert('Timeout occurred!');
                }}
                message="Loading with timeout..."
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Async Operations Tests */}
      <Card>
        <CardHeader>
          <CardTitle>Async Operations & Error Handling</CardTitle>
          <CardDescription>
            Test async operations with timeout and retry logic
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <LoadingButton
              isLoading={asyncLoading}
              onClick={() => testAsync(false)}
              loadingText="Processing..."
            >
              Test Success
            </LoadingButton>
            
            <LoadingButton
              isLoading={asyncLoading}
              onClick={() => testAsync(true)}
              loadingText="Processing..."
            >
              Test Failure
            </LoadingButton>

            <Button onClick={testErrorMonitoring} variant="outline">
              Test Error Monitoring
            </Button>
          </div>

          {asyncResult && (
            <div className="p-3 bg-muted rounded">
              <p className="text-sm">{asyncResult}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form Validation Tests */}
      <Card>
        <CardHeader>
          <CardTitle>Form Validation & Error Handling</CardTitle>
          <CardDescription>
            Test form validation with comprehensive error handling
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                onChange={(e) => formValidation.validateField('name', e.target.value)}
                placeholder="Enter your name"
              />
              {formValidation.hasError('name') && (
                <p className="text-sm text-red-500 mt-1">
                  {formValidation.getError('name')}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                onChange={(e) => formValidation.validateField('email', e.target.value)}
                placeholder="Enter your email"
              />
              {formValidation.hasError('email') && (
                <p className="text-sm text-red-500 mt-1">
                  {formValidation.getError('email')}
                </p>
              )}
            </div>
          </div>

          <LoadingButton
            isLoading={formValidation.isSubmitting}
            onClick={() => formValidation.submit(formValidation.data)}
            disabled={!formValidation.canSubmit}
            loadingText="Submitting..."
          >
            Submit Form
          </LoadingButton>

          {formValidation.hasAnyError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-sm text-red-600">Please fix the errors above</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* File Upload Tests */}
      <Card>
        <CardHeader>
          <CardTitle>File Upload Validation</CardTitle>
          <CardDescription>
            Test file upload with validation and error handling
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            type="file"
            multiple
            onChange={(e) => {
              if (e.target.files) {
                fileUpload.addFiles(e.target.files);
              }
            }}
            className="w-full p-2 border rounded"
          />

          {fileUpload.files.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Selected Files:</h4>
              {fileUpload.files.map((file, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-sm">{file.name} ({Math.round(file.size / 1024)}KB)</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => fileUpload.removeFile(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}

          {fileUpload.hasErrors && (
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              {fileUpload.errors.map((error, index) => (
                <p key={index} className="text-sm text-red-600">{error}</p>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={() => fileUpload.clearFiles()}
              variant="outline"
              disabled={fileUpload.files.length === 0}
            >
              Clear Files
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}