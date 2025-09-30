'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { USER_LEVELS, type UserLevel } from '@/lib/utils';

interface UserLevelSelectorProps {
  onLevelSelect: (level: UserLevel) => void;
  selectedLevel?: UserLevel;
}

export function UserLevelSelector({ onLevelSelect, selectedLevel }: UserLevelSelectorProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>选择你的英语水平</CardTitle>
        <CardDescription>
          选择你当前的英语水平，系统会根据你的水平智能筛选单词难度
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(USER_LEVELS).map(([key, level]) => (
            <Button
              key={key}
              variant={selectedLevel === key ? "default" : "outline"}
              className="h-auto p-4 flex flex-col items-start"
              onClick={() => onLevelSelect(key as UserLevel)}
            >
              <div className="font-semibold text-left">{level.name}</div>
              <div className="text-sm opacity-70 text-left">{level.description}</div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}