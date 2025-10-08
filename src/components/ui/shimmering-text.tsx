'use client';

import { motion, type UseInViewOptions, useInView } from 'motion/react';
import type React from 'react';
import { useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ShimmeringTextProps {
  text: string;
  duration?: number;
  delay?: number;
  repeat?: boolean;
  repeatDelay?: number;
  className?: string;
  startOnView?: boolean;
  once?: boolean;
  inViewMargin?: UseInViewOptions['margin'];
  spread?: number;
  color?: string; // cor base
  shimmerColor?: string; // cor do brilho
  finalColor?: string; // cor sólida final (fallback: shimmerColor -> color)
  fadeDuration?: number; // duração do crossfade (s)
}

export function ShimmeringText({
  text,
  duration = 2,
  delay = 0,
  repeat = true,
  repeatDelay = 0.5,
  className,
  startOnView = true,
  once = false,
  inViewMargin,
  spread = 2,
  color,
  shimmerColor,
  finalColor,
  fadeDuration = 0.35,
}: ShimmeringTextProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(wrapRef, { once, margin: inViewMargin });
  const [finished, setFinished] = useState(false);

  const dynamicSpread = useMemo(() => text.length * spread, [text, spread]);
  const shouldAnimate = !startOnView || isInView;

  const endColor = finalColor ?? shimmerColor ?? color ?? 'currentColor';

  return (
    <span
      ref={wrapRef}
      className={cn('relative inline-block align-middle', className)}
      style={
        {
          '--base-color': color ?? 'var(--color-zinc-400)',
          '--shimmer-color': shimmerColor ?? 'var(--color-zinc-950)',
          '--spread': `${dynamicSpread}px`,
        } as React.CSSProperties
      }
    >
      {/* Camada sólida (final): começa invisível, faz fade-in quando termina */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: finished ? 1 : 0 }}
        transition={{ duration: fadeDuration, ease: 'easeOut' }}
        style={{ color: endColor }}
      >
        {text}
      </motion.span>

      {/* Camada com shimmer (inicial): faz fade-out quando termina */}
      <motion.span
        className={cn(
          'relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent',
          '[background-repeat:no-repeat,padding-box]',
          '[--shimmer-bg:linear-gradient(90deg,transparent_calc(50%-var(--spread)),var(--shimmer-color),transparent_calc(50%+var(--spread)))]',
          'dark:[--base-color:var(--color-zinc-600)] dark:[--shimmer-color:var(--color-white)]'
        )}
        style={{
          backgroundImage:
            'var(--shimmer-bg), linear-gradient(var(--base-color), var(--base-color))',
        }}
        initial={{ backgroundPosition: '100% center', opacity: 0 }}
        animate={
          shouldAnimate
            ? {
                backgroundPosition: '0% center',
                opacity: finished ? 0 : 1,
              }
            : {}
        }
        transition={{
          backgroundPosition: {
            repeat: repeat ? Infinity : 0,
            duration,
            delay,
            repeatDelay,
            ease: 'linear',
          },
          opacity: { duration: fadeDuration, ease: 'easeOut' },
        }}
        onAnimationComplete={() => {
          // Só cruza para o sólido se não for repetir
          if (!repeat) setFinished(true);
        }}
      >
        {text}
      </motion.span>
    </span>
  );
}
