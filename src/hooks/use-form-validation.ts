'use client';

import { useState, useCallback } from 'react';
import { z } from 'zod';
import * as Sentry from '@sentry/nextjs';
import { safeValidate, formatZodError, ERROR_MESSAGES } from '@/lib/validations/common';
import { safeAsync, TIMEOUT_CONFIG } from '@/lib/async-utils';

interface FormValidationOptions<T> {
  schema: z.ZodSchema<T>;
  onSubmit: (data: T) => Promise<void>;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  timeout?: number;
  retries?: number;
}

interface FormState<T> {
  data: Partial<T>;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isValid: boolean;
  submitCount: number;
  lastSubmitTime: number | null;
}

export function useFormValidation<T>({
  schema,
  onSubmit,
  onSuccess,
  onError,
  timeout = TIMEOUT_CONFIG.FORM_SUBMISSION,
  retries = 1,
}: FormValidationOptions<T>) {
  const [state, setState] = useState<FormState<T>>({
    data: {},
    errors: {},
    isSubmitting: false,
    isValid: false,
    submitCount: 0,
    lastSubmitTime: null,
  });

  // Validate a single field
  const validateField = useCallback((name: string, value: any) => {
    try {
      // Create a partial schema for the specific field - simplified validation
      const result = safeValidate(schema, { [name]: value });
      
      setState(prev => ({
        ...prev,
        data: { ...prev.data, [name]: value },
        errors: {
          ...prev.errors,
          [name]: result.success ? '' : result.error.message,
        },
      }));

      return result.success;
    } catch (error) {
      // Fallback validation
      setState(prev => ({
        ...prev,
        data: { ...prev.data, [name]: value },
        errors: {
          ...prev.errors,
          [name]: '',
        },
      }));
      return true;
    }
  }, [schema]);

  // Validate all fields
  const validateAll = useCallback((data: Partial<T>) => {
    const result = safeValidate(schema, data);
    
    if (result.success) {
      setState(prev => ({
        ...prev,
        data,
        errors: {},
        isValid: true,
      }));
      return { success: true, data: result.data };
    } else {
      const errors = result.error.field 
        ? { [result.error.field]: result.error.message }
        : { general: result.error.message };

      setState(prev => ({
        ...prev,
        data,
        errors,
        isValid: false,
      }));
      
      return { success: false, errors };
    }
  }, [schema]);

  // Submit form with comprehensive error handling
  const submit = useCallback(async (data: Partial<T>) => {
    // Prevent rapid successive submissions
    const now = Date.now();
    if (state.lastSubmitTime && now - state.lastSubmitTime < 1000) {
      return;
    }

    setState(prev => ({
      ...prev,
      isSubmitting: true,
      lastSubmitTime: now,
    }));

    try {
      // Validate data
      const validation = validateAll(data);
      if (!validation.success) {
        setState(prev => ({
          ...prev,
          isSubmitting: false,
          submitCount: prev.submitCount + 1,
        }));
        return;
      }

      // Submit with timeout and retry logic
      const { error } = await safeAsync(
        () => onSubmit(validation.data as T),
        {
          timeout,
          retries,
          context: {
            formSubmission: true,
            submitCount: state.submitCount + 1,
            dataKeys: Object.keys(data),
          },
        }
      );

      if (error) {
        // Handle specific error types
        let errorMessage: string = ERROR_MESSAGES.SERVER_ERROR;
        
        if (error.message.toLowerCase().includes('network')) {
          errorMessage = ERROR_MESSAGES.NETWORK_ERROR;
        } else if (error.message.toLowerCase().includes('timeout')) {
          errorMessage = 'Request timed out. Please try again.';
        } else if (error.message.toLowerCase().includes('rate limit')) {
          errorMessage = ERROR_MESSAGES.RATE_LIMIT_ERROR;
        }

        setState(prev => ({
          ...prev,
          isSubmitting: false,
          submitCount: prev.submitCount + 1,
          errors: { general: errorMessage },
        }));

        onError?.(error);
      } else {
        // Success
        setState(prev => ({
          ...prev,
          isSubmitting: false,
          submitCount: prev.submitCount + 1,
          errors: {},
        }));

        onSuccess?.(validation.data as T);
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(String(error));
      
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        submitCount: prev.submitCount + 1,
        errors: { general: ERROR_MESSAGES.SERVER_ERROR },
      }));

      // Report unexpected errors to Sentry
      Sentry.captureException(errorObj, {
        tags: {
          section: 'form_validation',
        },
        extra: {
          formData: Object.keys(data),
          submitCount: state.submitCount + 1,
        },
      });

      onError?.(errorObj);
    }
  }, [state.lastSubmitTime, state.submitCount, validateAll, onSubmit, timeout, retries, onSuccess, onError]);

  // Clear errors
  const clearErrors = useCallback(() => {
    setState(prev => ({
      ...prev,
      errors: {},
    }));
  }, []);

  // Clear specific field error
  const clearFieldError = useCallback((field: string) => {
    setState(prev => ({
      ...prev,
      errors: {
        ...prev.errors,
        [field]: '',
      },
    }));
  }, []);

  // Reset form state
  const reset = useCallback(() => {
    setState({
      data: {},
      errors: {},
      isSubmitting: false,
      isValid: false,
      submitCount: 0,
      lastSubmitTime: null,
    });
  }, []);

  // Set form data
  const setData = useCallback((data: Partial<T>) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, ...data },
    }));
  }, []);

  return {
    // State
    data: state.data,
    errors: state.errors,
    isSubmitting: state.isSubmitting,
    isValid: state.isValid,
    submitCount: state.submitCount,
    
    // Actions
    validateField,
    validateAll,
    submit,
    clearErrors,
    clearFieldError,
    reset,
    setData,
    
    // Helpers
    hasError: (field: string) => Boolean(state.errors[field]),
    getError: (field: string) => state.errors[field] || '',
    hasAnyError: Object.keys(state.errors).some(key => Boolean(state.errors[key])),
    canSubmit: state.isValid && !state.isSubmitting,
  };
}

// Hook for handling file uploads with validation
export function useFileUploadValidation(
  maxFiles: number = 5,
  maxSize: number = 5 * 1024 * 1024, // 5MB
  acceptedTypes: string[] = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
  ]
) {
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const validateFiles = useCallback((fileList: FileList | File[]) => {
    const newErrors: string[] = [];
    const validFiles: File[] = [];
    const fileArray = Array.from(fileList);

    // Check total number of files
    if (fileArray.length > maxFiles) {
      newErrors.push(`Maximum ${maxFiles} files allowed`);
      return { validFiles: [], errors: newErrors };
    }

    fileArray.forEach((file, index) => {
      // Check file size
      if (file.size > maxSize) {
        newErrors.push(`File "${file.name}" is too large (max ${Math.round(maxSize / 1024 / 1024)}MB)`);
        return;
      }

      // Check file type
      if (!acceptedTypes.includes(file.type)) {
        newErrors.push(`File "${file.name}" type not supported`);
        return;
      }

      validFiles.push(file);
    });

    return { validFiles, errors: newErrors };
  }, [maxFiles, maxSize, acceptedTypes]);

  const addFiles = useCallback((fileList: FileList | File[]) => {
    const { validFiles, errors: validationErrors } = validateFiles(fileList);
    
    setFiles(prev => [...prev, ...validFiles]);
    setErrors(validationErrors);
    
    return validFiles.length > 0;
  }, [validateFiles]);

  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setErrors([]);
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
    setErrors([]);
  }, []);

  return {
    files,
    errors,
    isUploading,
    setIsUploading,
    addFiles,
    removeFile,
    clearFiles,
    hasErrors: errors.length > 0,
    canUpload: files.length > 0 && errors.length === 0 && !isUploading,
  };
}