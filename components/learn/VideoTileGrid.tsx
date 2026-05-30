'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { VideoLesson, getYTThumb, getYTEmbed } from '@/lib/content/videoLessons';
import { Play, X, ExternalLink, Video } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// VideoModal — fullscreen overlay YouTube embed
// ─────────────────────────────────────────────────────────────────────────────
interface VideoModalProps {
  video: VideoLesson;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Playing: ${video.title}`}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 lg:p-10"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(10px)' }}
    >
      {/* Stop click from propagating to backdrop */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl flex flex-col"
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* Modal header */}
        <div
          className="flex items-center justify-between gap-4 px-4 py-3"
          style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)' }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0"
              style={{ background: 'var(--accent-cyan-bg)', color: 'var(--accent-cyan)' }}
            >
              @krishnaik06
            </span>
            <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
              {video.title}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close video"
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-white/10 no-min-h"
            style={{ color: 'var(--text-muted)' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* YouTube Embed */}
        <div style={{ position: 'relative', aspectRatio: '16/9', background: '#000' }}>
          <iframe
            src={getYTEmbed(video.id, video.playlistId)}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          />
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end px-4 py-2"
          style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)' }}
        >
          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold transition-colors hover:opacity-80 no-min-h"
            style={{ color: 'var(--accent-cyan)' }}
          >
            <ExternalLink className="w-3 h-3" />
            Watch on YouTube
          </a>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// VideoCard — single tile
// ─────────────────────────────────────────────────────────────────────────────
interface VideoCardProps {
  video: VideoLesson;
  onClick: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Watch: ${video.title}`}
      className="group text-left w-full rounded-xl overflow-hidden transition-all duration-200 no-min-h"
      style={{
        background: 'var(--bg-surface)',
        border: `1px solid ${hovered ? 'var(--accent-cyan)' : 'var(--border-subtle)'}`,
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 12px 32px rgba(0,229,255,0.08)'
          : '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '16/9',
          overflow: 'hidden',
          background: 'var(--bg-elevated)',
        }}
      >
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getYTThumb(video.id)}
            alt={video.title}
            onError={() => setImgError(true)}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.3s ease',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'var(--bg-elevated)' }}
          >
            <Video className="w-10 h-10" style={{ color: 'var(--text-muted)' }} />
          </div>
        )}

        {/* Play overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.2s ease',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(0,229,255,0.4)',
            }}
          >
            <Play className="w-5 h-5 fill-current" style={{ color: '#000', marginLeft: '2px' }} />
          </div>
        </div>

        {/* @krishnaik06 badge */}
        <div
          style={{
            position: 'absolute',
            top: '6px',
            right: '6px',
            background: 'rgba(0,0,0,0.78)',
            color: '#fff',
            fontSize: '9px',
            fontWeight: 700,
            padding: '2px 7px',
            borderRadius: '4px',
            letterSpacing: '0.02em',
          }}
        >
          @krishnaik06
        </div>

        {/* Duration badge (if available) */}
        {video.duration && (
          <div
            style={{
              position: 'absolute',
              bottom: '6px',
              right: '6px',
              background: 'rgba(0,0,0,0.78)',
              color: '#fff',
              fontSize: '10px',
              fontWeight: 700,
              padding: '2px 6px',
              borderRadius: '4px',
              fontFamily: 'var(--font-jetbrains, monospace)',
            }}
          >
            {video.duration}
          </div>
        )}
      </div>

      {/* Title area — fixed height keeps all cards aligned */}
      <div style={{ padding: '10px 12px 12px', minHeight: '52px' }}>
        <p
          style={{
            fontSize: '12px',
            fontWeight: 600,
            lineHeight: 1.5,
            color: hovered ? 'var(--accent-cyan)' : 'var(--text-primary)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            transition: 'color 0.15s',
            margin: 0,
          }}
        >
          {video.title}
        </p>
      </div>
    </button>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// VideoTileGrid — exported main component
// ─────────────────────────────────────────────────────────────────────────────
interface VideoTileGridProps {
  videos: VideoLesson[];
  title?: string;
}

const VideoTileGrid: React.FC<VideoTileGridProps> = ({
  videos,
  title = 'Video Lessons by Krish Naik',
}) => {
  const [activeVideo, setActiveVideo] = useState<VideoLesson | null>(null);

  const handleOpen = useCallback((video: VideoLesson) => {
    setActiveVideo(video);
  }, []);

  const handleClose = useCallback(() => {
    setActiveVideo(null);
  }, []);

  if (!videos || videos.length === 0) return null;

  // Group videos by their section label
  const sections = videos.reduce<Record<string, VideoLesson[]>>((acc, v) => {
    if (!acc[v.section]) acc[v.section] = [];
    acc[v.section].push(v);
    return acc;
  }, {});

  const sectionKeys = Object.keys(sections);
  const isMultiSection = sectionKeys.length > 1;

  return (
    <div>
      {/* ── Section header — only shown when title is provided ──────────── */}
      {title && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '1rem',
            paddingBottom: '0.875rem',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <span style={{ fontSize: '16px' }}>🎬</span>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            {title}
          </h3>
          <span
            style={{
              padding: '2px 8px',
              borderRadius: '999px',
              background: 'var(--accent-cyan-bg)',
              color: 'var(--accent-cyan)',
              fontSize: '10px',
              fontWeight: 700,
            }}
          >
            {videos.length}
          </span>
        </div>
      )}

      {/* ── Section groups ─────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {sectionKeys.map((sectionName) => (
          <div key={sectionName}>
            {/* Section sub-label (only when multiple sub-sections exist) */}
            {isMultiSection && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '10px',
                }}
              >
                <span
                  style={{
                    width: '20px',
                    height: '1px',
                    background: 'var(--border-subtle)',
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {sectionName}
                </span>
                <span
                  style={{
                    flex: 1,
                    height: '1px',
                    background: 'var(--border-subtle)',
                    display: 'inline-block',
                  }}
                />
              </div>
            )}

            {/* Tile grid — responsive auto-fill */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '14px',
              }}
            >
              {sections[sectionName].map((video) => (
                <VideoCard
                  key={`${video.id}-${video.section}`}
                  video={video}
                  onClick={() => handleOpen(video)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Modal ────────────────────────────────────────────────────────── */}
      {activeVideo && (
        <VideoModal video={activeVideo} onClose={handleClose} />
      )}
    </div>
  );
};

export default VideoTileGrid;
