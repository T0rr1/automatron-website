'use client';

import { useEffect } from 'react';

interface StructuredDataProps {
  data: Record<string, any> | Record<string, any>[];
  id?: string;
}

/**
 * Component to inject JSON-LD structured data into the page head
 * Supports both single objects and arrays of structured data
 */
export function StructuredData({ data, id = 'structured-data' }: StructuredDataProps) {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    
    // Handle both single objects and arrays
    const jsonData = Array.isArray(data) ? data : [data];
    script.textContent = JSON.stringify(jsonData, null, 2);
    
    // Remove existing script with same ID if it exists
    const existingScript = document.getElementById(id);
    if (existingScript) {
      existingScript.remove();
    }
    
    // Add to head
    document.head.appendChild(script);
    
    // Cleanup on unmount
    return () => {
      const scriptToRemove = document.getElementById(id);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [data, id]);

  return null; // This component doesn't render anything visible
}

// Convenience components for common structured data types
export function OrganizationStructuredData({ data }: { data: Record<string, any> }) {
  return <StructuredData data={data} id="organization-structured-data" />;
}

export function ServiceStructuredData({ data }: { data: Record<string, any> }) {
  return <StructuredData data={data} id="service-structured-data" />;
}

export function FAQStructuredData({ data }: { data: Record<string, any> }) {
  return <StructuredData data={data} id="faq-structured-data" />;
}

export function CaseStudyStructuredData({ data }: { data: Record<string, any> }) {
  return <StructuredData data={data} id="case-study-structured-data" />;
}

export function WebsiteStructuredData({ data }: { data: Record<string, any> }) {
  return <StructuredData data={data} id="website-structured-data" />;
}