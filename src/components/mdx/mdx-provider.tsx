/**
 * MDX Provider
 * 
 * Provides MDX components context for rendering MDX content
 * with custom components and styling.
 */

'use client';

import { MDXProvider } from '@mdx-js/react';
import { mdxComponents } from './mdx-components';

interface MDXContentProviderProps {
  children: React.ReactNode;
}

export function MDXContentProvider({ children }: MDXContentProviderProps) {
  return (
    <MDXProvider components={mdxComponents}>
      {children}
    </MDXProvider>
  );
}

export default MDXContentProvider;