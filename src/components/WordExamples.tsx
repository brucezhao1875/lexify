'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { Example } from '@/types';

interface WordExamplesProps {
  examples: Example[];
  className?: string;
}

export function WordExamples({ examples, className = '' }: WordExamplesProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!examples || examples.length === 0) {
    return null;
  }

  const displayExamples = isExpanded ? examples : examples.slice(0, 2);

  return (
    <div className={`mt-3 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="h-4 w-4 text-blue-600" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          例句 ({examples.length})
        </span>
      </div>
      
      <div className="space-y-2">
        {displayExamples.map((example, index) => (
          <div key={index} className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
            <div className="text-gray-800 dark:text-gray-200 mb-1">
              {example.sentence}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-xs">
              {example.translation}
            </div>
            {example.source && (
              <div className="mt-1">
                <Badge variant="outline" className="text-xs">
                  {example.source}
                </Badge>
              </div>
            )}
          </div>
        ))}
      </div>

      {examples.length > 2 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-xs text-blue-600 hover:text-blue-700"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-3 w-3 mr-1" />
              收起
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3 mr-1" />
              查看更多 ({examples.length - 2})
            </>
          )}
        </Button>
      )}
    </div>
  );
}