'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, BookOpen } from 'lucide-react';
import { isValidWord, normalizeWord } from '@/lib/utils';

interface WordInputProps {
  onWordSubmit: (word: string) => void;
  isLoading?: boolean;
}

export function WordInput({ onWordSubmit, isLoading }: WordInputProps) {
  const [word, setWord] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedWord = normalizeWord(word);
    
    if (!isValidWord(normalizedWord)) {
      setError('请输入有效的英文单词');
      return;
    }
    
    setError('');
    onWordSubmit(normalizedWord);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          词根分析
        </CardTitle>
        <CardDescription>
          输入一个英文单词，系统将分析其词根并构建词汇网络
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="输入英文单词，如：education"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !word.trim()}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}