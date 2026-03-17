'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { WorkItem } from '@/lib/work';

interface WorkProjectCardProps {
  item: WorkItem;
  index: number;
}

const extractYouTubeId = (videoUrl?: string) => {
  if (!videoUrl) return null;
  const match = videoUrl.match(/\/embed\/([^?]+)/);
  return match?.[1] ?? null;
};

const buildThumbnailUrls = (item: WorkItem) => {
  const youtubeId = extractYouTubeId(item.videoUrl);
  if (youtubeId) {
    return [
      `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`,
      `https://i.ytimg.com/vi/${youtubeId}/sddefault.jpg`,
      `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
      `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
    ];
  }
  return [item.imageUrl];
};

const parseSummary = (description: string) => {
  const blocks = description
    .split('\n\n')
    .map((block) => block.trim())
    .filter(Boolean);

  const intro = blocks[0] ?? '';
  const bulletItems = description
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('-'))
    .map((line) => line.replace(/^-+\s*/, ''))
    .slice(0, 3);

  return { intro, bulletItems };
};

const WorkProjectCard = ({ item, index }: WorkProjectCardProps) => {
  const { intro, bulletItems } = parseSummary(item.description);
  const isEven = index % 2 === 0;
  const thumbnails = useMemo(() => buildThumbnailUrls(item), [item]);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const thumbnail = thumbnails[thumbnailIndex] ?? thumbnails[0];

  const handleImageError = () => {
    setThumbnailIndex((current) => {
      if (current >= thumbnails.length - 1) {
        return current;
      }
      return current + 1;
    });
  };

  return (
    <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start py-12 border-b border-primary/10 last:border-b-0">
      <div className={isEven ? 'order-1' : 'order-1 lg:order-2'}>
        <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-secondary/40 shadow-lg">
          <div className="relative w-full min-h-[220px]" style={{ aspectRatio: '16 / 9' }}>
            <Image
              src={thumbnail}
              alt={`${item.title} project preview`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              quality={95}
              className="object-cover"
              onError={handleImageError}
            />
          </div>
        </div>
      </div>

      <div className={`space-y-5 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
        <div>
          <h2 className="heading-md font-display mb-3">{item.title}</h2>
          <p className="paragraph text-neutral-800">{intro}</p>
        </div>

        {bulletItems.length > 0 && (
          <ul className="space-y-2">
            {bulletItems.map((point) => (
              <li key={point} className="paragraph text-neutral-800 flex items-start gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}

        {item.technicalInfo && (
          <p className="terminal-text text-sm bg-primary/90 rounded-md px-4 py-3 border border-primary/20">
            {item.technicalInfo}
          </p>
        )}

        <div className="flex flex-wrap gap-3 pt-2">
          <span className="btn-outline opacity-60 cursor-not-allowed">Case Study Coming Soon</span>
          {item.webLink && (
            <Link href={item.webLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {item.buttonText ?? 'Visit Project'}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default WorkProjectCard;
