/**
 * MDX Components
 * 
 * Custom components for rendering MDX content with consistent styling
 * and enhanced functionality for code blocks, callouts, and interactive elements.
 */

import React from 'react';
import { MDXComponents } from 'mdx/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CodeBlock } from './code-block';
import { Callout } from './callout';
import { MetricsCard } from './metrics-card';
import { BeforeAfterCard } from './before-after-card';

// Custom heading components with anchor links
const createHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
  const Component = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    const id = typeof children === 'string' 
      ? children.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      : undefined;

    const className = cn(
      'scroll-mt-20 font-semibold tracking-tight',
      {
        'text-4xl lg:text-5xl mb-6': level === 1,
        'text-3xl lg:text-4xl mb-5 mt-8': level === 2,
        'text-2xl lg:text-3xl mb-4 mt-6': level === 3,
        'text-xl lg:text-2xl mb-3 mt-5': level === 4,
        'text-lg lg:text-xl mb-2 mt-4': level === 5,
        'text-base lg:text-lg mb-2 mt-3': level === 6,
      }
    );

    return (
      <Tag id={id} className={className} {...props}>
        {children}
      </Tag>
    );
  };

  Component.displayName = `Heading${level}`;
  return Component;
};

// Custom paragraph component
const Paragraph = ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className="mb-4 leading-7 text-muted-foreground" {...props}>
    {children}
  </p>
);

// Custom list components
const UnorderedList = ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
  <ul className="mb-4 ml-6 list-disc space-y-2" {...props}>
    {children}
  </ul>
);

const OrderedList = ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
  <ol className="mb-4 ml-6 list-decimal space-y-2" {...props}>
    {children}
  </ol>
);

const ListItem = ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
  <li className="leading-7" {...props}>
    {children}
  </li>
);

// Custom link component
const Link = ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    href={href}
    className="font-medium text-primary underline underline-offset-4 hover:no-underline"
    {...props}
  >
    {children}
  </a>
);

// Custom blockquote component
const Blockquote = ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
  <blockquote
    className="mb-6 border-l-4 border-primary pl-6 italic text-muted-foreground"
    {...props}
  >
    {children}
  </blockquote>
);

// Custom table components
const Table = ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="mb-6 overflow-x-auto">
    <table className="w-full border-collapse border border-border" {...props}>
      {children}
    </table>
  </div>
);

const TableHeader = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className="bg-muted/50" {...props}>
    {children}
  </thead>
);

const TableBody = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody {...props}>
    {children}
  </tbody>
);

const TableRow = ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className="border-b border-border" {...props}>
    {children}
  </tr>
);

const TableHead = ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
  <th className="border border-border px-4 py-2 text-left font-semibold" {...props}>
    {children}
  </th>
);

const TableCell = ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
  <td className="border border-border px-4 py-2" {...props}>
    {children}
  </td>
);

// Custom horizontal rule
const HorizontalRule = (props: React.HTMLAttributes<HTMLHRElement>) => (
  <Separator className="my-8" {...props} />
);

// Custom strong and emphasis
const Strong = ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <strong className="font-semibold text-foreground" {...props}>
    {children}
  </strong>
);

const Emphasis = ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <em className="italic" {...props}>
    {children}
  </em>
);

// Custom inline code
const InlineCode = ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <code
    className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
    {...props}
  >
    {children}
  </code>
);

// Service-specific components
const ServiceCard = ({ 
  title, 
  description, 
  price, 
  turnaround,
  children 
}: {
  title: string;
  description: string;
  price: string;
  turnaround: string;
  children?: React.ReactNode;
}) => (
  <Card className="mb-6">
    <CardHeader>
      <div className="flex items-start justify-between">
        <div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="mt-2">{description}</CardDescription>
        </div>
        <div className="text-right">
          <Badge variant="secondary" className="mb-1">
            {price}
          </Badge>
          <p className="text-sm text-muted-foreground">{turnaround}</p>
        </div>
      </div>
    </CardHeader>
    {children && (
      <CardContent>
        {children}
      </CardContent>
    )}
  </Card>
);

// CTA component
const CallToAction = ({ 
  title, 
  description, 
  buttonText = "Get Started",
  href = "/contact"
}: {
  title: string;
  description: string;
  buttonText?: string;
  href?: string;
}) => (
  <Card className="my-8 bg-primary/5 border-primary/20">
    <CardContent className="pt-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Button asChild>
          <a href={href}>{buttonText}</a>
        </Button>
      </div>
    </CardContent>
  </Card>
);

// FAQ component
const FAQ = ({ 
  question, 
  children 
}: {
  question: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6">
    <h4 className="text-lg font-semibold mb-2">{question}</h4>
    <div className="text-muted-foreground pl-4 border-l-2 border-muted">
      {children}
    </div>
  </div>
);

// Export MDX components
export const mdxComponents: MDXComponents = {
  // Headings
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  
  // Text elements
  p: Paragraph,
  strong: Strong,
  em: Emphasis,
  
  // Lists
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  
  // Links and media
  a: Link,
  
  // Code
  code: InlineCode,
  pre: CodeBlock,
  
  // Quotes and separators
  blockquote: Blockquote,
  hr: HorizontalRule,
  
  // Tables
  table: Table,
  thead: TableHeader,
  tbody: TableBody,
  tr: TableRow,
  th: TableHead,
  td: TableCell,
  
  // Custom components
  Callout,
  CodeBlock,
  MetricsCard,
  BeforeAfterCard,
  ServiceCard,
  CallToAction,
  FAQ,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Badge,
};

export default mdxComponents;