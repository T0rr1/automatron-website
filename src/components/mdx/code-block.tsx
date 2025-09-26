/**
 * Code Block Component
 * 
 * Enhanced code block with syntax highlighting using Shiki,
 * copy-to-clipboard functionality, and language detection.
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  'data-language'?: string;
}

export function CodeBlock({ children, className, 'data-language': dataLanguage }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  
  // Extract language from className (format: language-xxx)
  const language = dataLanguage || className?.replace('language-', '') || 'text';
  
  // Extract code content
  const codeContent = React.Children.toArray(children)
    .map(child => {
      if (typeof child === 'string') return child;
      if (React.isValidElement(child) && child.props.children) {
        return child.props.children;
      }
      return '';
    })
    .join('');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const getLanguageLabel = (lang: string): string => {
    const languageMap: Record<string, string> = {
      'powershell': 'PowerShell',
      'ps1': 'PowerShell',
      'python': 'Python',
      'py': 'Python',
      'javascript': 'JavaScript',
      'js': 'JavaScript',
      'typescript': 'TypeScript',
      'ts': 'TypeScript',
      'bash': 'Bash',
      'sh': 'Shell',
      'json': 'JSON',
      'yaml': 'YAML',
      'yml': 'YAML',
      'xml': 'XML',
      'html': 'HTML',
      'css': 'CSS',
      'sql': 'SQL',
      'vba': 'VBA',
      'batch': 'Batch',
      'cmd': 'Command',
    };
    
    return languageMap[lang.toLowerCase()] || lang.toUpperCase();
  };

  return (
    <div className="group relative mb-6 overflow-hidden rounded-lg border bg-muted/30">
      {/* Header with language and copy button */}
      <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
        <Badge variant="outline" className="text-xs">
          {getLanguageLabel(language)}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {/* Code content */}
      <div className="overflow-x-auto">
        <pre
          className={cn(
            'p-4 text-sm leading-relaxed',
            'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border',
            className
          )}
        >
          <code className="font-mono">{children}</code>
        </pre>
      </div>
      
      {/* Copy success indicator */}
      {copied && (
        <div className="absolute right-4 top-12 rounded bg-green-500 px-2 py-1 text-xs text-white">
          Copied!
        </div>
      )}
    </div>
  );
}

// Simple code block for inline usage
export function InlineCodeBlock({ 
  children, 
  language = 'text' 
}: { 
  children: string; 
  language?: string; 
}) {
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
      {children}
    </code>
  );
}

// Code snippet with title
export function CodeSnippet({
  title,
  language,
  children,
  description,
}: {
  title: string;
  language: string;
  children: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <div className="mb-2">
        <h4 className="text-lg font-semibold">{title}</h4>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <CodeBlock data-language={language}>
        {children}
      </CodeBlock>
    </div>
  );
}