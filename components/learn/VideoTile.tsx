'use client';

import React, { useState } from 'react';
import { PlayCircle, Clock, ExternalLink } from 'lucide-react';
import { VideoResource } from '@/lib/types/content';

interface VideoTileProps {
  resource: VideoResource;
}

export const VideoTile: React.FC<VideoTileProps> = ({ resource }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Helper to extract YouTube ID from standard or shortened URLs
  const getYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Helper to extract Playlist ID
  const getPlaylistId = (url: string): string | null => {
    const regExp = /[?&]list=([^#&?]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(resource.url);
  const playlistId = getPlaylistId(resource.url);

  // Construct thumbnail URL (use maxresdefault if possible, otherwise mqdefault)
  let thumbnailUrl = '';
  if (videoId) {
    thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  } else if (playlistId) {
    // If it's a playlist without a video ID, we don't have a reliable thumbnail API without an API key,
    // so we'll use a stylized fallback background.
    thumbnailUrl = ''; 
  }

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative w-full rounded-2xl overflow-hidden border border-border bg-bg-surface hover:border-accent-teal transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full bg-bg-base overflow-hidden">
        {thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={thumbnailUrl} 
            alt={resource.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-bg-primary to-bg-surface flex items-center justify-center">
            <PlayCircle className="w-16 h-16 text-text-secondary/30" />
          </div>
        )}
        
        {/* Play Overlay */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <PlayCircle className="w-16 h-16 text-white drop-shadow-lg" />
        </div>

        {/* Duration Badge */}
        {resource.duration && (
          <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-mono font-bold text-white flex items-center gap-1.5 shadow-lg">
            <Clock className="w-3.5 h-3.5" />
            {resource.duration}
          </div>
        )}
        
        {/* Type Badge */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-lg">
          {resource.type === 'playlist' ? 'Playlist' : resource.type === 'youtube' ? 'Video' : 'Link'}
        </div>
      </div>

      {/* Title Container */}
      <div className="p-4 flex items-start justify-between gap-4">
        <h4 className="font-bold text-text-primary text-sm line-clamp-2 leading-tight group-hover:text-accent-teal transition-colors">
          {resource.title}
        </h4>
        <ExternalLink className="w-4 h-4 text-text-secondary shrink-0 group-hover:text-accent-teal transition-colors" />
      </div>
    </a>
  );
};
