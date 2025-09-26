/**
 * Content Renderer Component
 * 
 * Renders MDX content with proper styling and component integration.
 * Handles both static content and dynamic content loading.
 */

'use client';

import React from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { mdxComponents } from '@/components/mdx/mdx-components';
import { cn } from '@/lib/utils';

interface ContentRendererProps {
  content: string;
  className?: string;
  components?: Record<string, React.ComponentType<any>>;
}

interface SerializedContentRendererProps {
  serializedContent: MDXRemoteSerializeResult;
  className?: string;
  components?: Record<string, React.ComponentType<any>>;
}

/**
 * Render MDX content from string
 */
export async function ContentRenderer({ 
  content, 
  className,
  components = {}
}: ContentRendererProps) {
  const serializedContent = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }]
      ],
    },
  });

  return (
    <SerializedContentRenderer
      serializedContent={serializedContent}
      className={className}
      components={components}
    />
  );
}

/**
 * Render pre-serialized MDX content
 */
export function SerializedContentRenderer({
  serializedContent,
  className,
  components = {}
}: SerializedContentRendererProps) {
  const combinedComponents = {
    ...mdxComponents,
    ...components,
  };

  return (
    <div className={cn('prose prose-slate dark:prose-invert max-w-none', className)}>
      <MDXRemote 
        {...serializedContent} 
        components={combinedComponents}
      />
    </div>
  );
}

/**
 * Content wrapper with proper styling for different content types
 */
export function ContentWrapper({
  children,
  type = 'default',
  className
}: {
  children: React.ReactNode;
  type?: 'service' | 'case-study' | 'blog' | 'default';
  className?: string;
}) {
  const typeStyles = {
    service: 'prose-lg',
    'case-study': 'prose-lg',
    blog: 'prose-base',
    default: 'prose-base',
  };

  return (
    <div className={cn(
      'prose prose-slate dark:prose-invert max-w-none',
      typeStyles[type],
      className
    )}>
      {children}
    </div>
  );
}

export default ContentRenderer;