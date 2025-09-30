'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Pronunciation } from '@/types';
import { PronunciationService } from '@/lib/pronunciation';

interface PronunciationPlayerProps {
  word: string;
  className?: string;
}

export function PronunciationPlayer({ word, className = '' }: PronunciationPlayerProps) {
  const [pronunciations, setPronunciations] = useState<{
    us?: Pronunciation;
    uk?: Pronunciation;
  }>({});
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState<'us' | 'uk' | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPronunciations = async () => {
      if (!word) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await PronunciationService.getCachedPronunciation(word);
        setPronunciations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load pronunciation');
      } finally {
        setLoading(false);
      }
    };

    fetchPronunciations();
  }, [word]);

  const handlePlay = async (accent: 'us' | 'uk') => {
    const pronunciation = pronunciations[accent];
    if (!pronunciation?.audio) {
      setError('No audio available for this pronunciation');
      return;
    }

    setPlaying(accent);
    setError(null);

    try {
      await PronunciationService.playPronunciation(pronunciation.audio);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to play audio');
    } finally {
      setPlaying(null);
    }
  };

  if (loading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="animate-pulse">
          <Volume2 className="h-4 w-4 text-gray-400" />
        </div>
        <span className="text-sm text-gray-500">Loading pronunciation...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <VolumeX className="h-4 w-4 text-red-500" />
        <span className="text-sm text-red-500">{error}</span>
      </div>
    );
  }

  if (!pronunciations.us && !pronunciations.uk) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <VolumeX className="h-4 w-4 text-gray-400" />
        <span className="text-sm text-gray-500">No pronunciation available</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {pronunciations.us && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            US {pronunciations.us.phonetic}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handlePlay('us')}
            disabled={playing !== null}
            className="h-6 w-6 p-0"
            title="Play US pronunciation"
          >
            {playing === 'us' ? (
              <div className="animate-pulse">
                <Volume2 className="h-3 w-3 text-blue-600" />
              </div>
            ) : (
              <Volume2 className="h-3 w-3" />
            )}
          </Button>
        </div>
      )}

      {pronunciations.uk && (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            UK {pronunciations.uk.phonetic}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handlePlay('uk')}
            disabled={playing !== null}
            className="h-6 w-6 p-0"
            title="Play UK pronunciation"
          >
            {playing === 'uk' ? (
              <div className="animate-pulse">
                <Volume2 className="h-3 w-3 text-green-600" />
              </div>
            ) : (
              <Volume2 className="h-3 w-3" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

// 简化版本，只显示一个播放按钮
interface SimplePronunciationProps {
  word: string;
  accent?: 'us' | 'uk';
  className?: string;
}

export function SimplePronunciation({ 
  word, 
  accent = 'us', 
  className = '' 
}: SimplePronunciationProps) {
  const [pronunciation, setPronunciation] = useState<Pronunciation | null>(null);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPronunciation = async () => {
      if (!word) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await PronunciationService.getCachedPronunciation(word);
        setPronunciation(data[accent] || data.us || data.uk || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load pronunciation');
      } finally {
        setLoading(false);
      }
    };

    fetchPronunciation();
  }, [word, accent]);

  const handlePlay = async () => {
    if (!pronunciation?.audio) {
      setError('No audio available');
      return;
    }

    setPlaying(true);
    setError(null);

    try {
      await PronunciationService.playPronunciation(pronunciation.audio);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to play audio');
    } finally {
      setPlaying(false);
    }
  };

  if (loading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !pronunciation) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <VolumeX className="h-4 w-4 text-gray-400" />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={handlePlay}
        disabled={playing}
        className="h-8 w-8 p-0 rounded-full"
        title={`Play ${accent.toUpperCase()} pronunciation`}
      >
        {playing ? (
          <div className="animate-pulse">
            <Volume2 className="h-4 w-4 text-blue-600" />
          </div>
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </Button>
      <span className="text-sm text-gray-600">
        {pronunciation.phonetic}
      </span>
    </div>
  );
}