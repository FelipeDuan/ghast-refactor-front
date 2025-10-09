'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import type * as React from 'react';
import { useEffect, useState } from 'react';
import {
  type Resolved,
  type ThemeSelection,
  ThemeToggler as ThemeTogglerPrimitive,
  type ThemeTogglerProps as ThemeTogglerPrimitiveProps,
} from '@/components/animate-ui/primitives/effects/theme-toggler';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const getIcon = (
  effective: ThemeSelection,
  resolved: Resolved,
  modes: ThemeSelection[]
) => {
  const theme = modes.includes('system') ? effective : resolved;
  return theme === 'system' ? (
    <Monitor />
  ) : theme === 'dark' ? (
    <Moon />
  ) : (
    <Sun />
  );
};

const getNextTheme = (
  effective: ThemeSelection,
  modes: ThemeSelection[]
): ThemeSelection => {
  const i = modes.indexOf(effective);
  if (i === -1) return modes[0];
  return modes[(i + 1) % modes.length];
};

type ThemeTogglerButtonProps = React.ComponentProps<typeof Button> & {
  modes?: ThemeSelection[];
  onImmediateChange?: ThemeTogglerPrimitiveProps['onImmediateChange'];
  direction?: ThemeTogglerPrimitiveProps['direction'];

  /** ---- opções de layout/UX ---- */
  withLabel?: boolean; // mostra texto ao lado do ícone
  label?: React.ReactNode; // texto custom
  fullWidth?: boolean; // w-full
  alignStart?: boolean; // justify-start
  iconOnly?: boolean; // força modo ícone apenas
};

function ThemeTogglerButton({
  variant = 'ghost',
  size = 'default',
  modes = ['light', 'dark'],
  direction = 'ltr',
  onImmediateChange,
  onClick,
  className,

  withLabel = true,
  label = 'Alterar tema',
  fullWidth = true,
  alignStart = true,
  iconOnly = false,

  ...props
}: ThemeTogglerButtonProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();

  // evita hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // quando iconOnly = true, força size "icon" e sem label
  const effectiveSize = iconOnly ? ('icon' as const) : size;
  const showLabel = withLabel && !iconOnly;

  const layoutClasses = cn(
    fullWidth && 'w-full',
    'flex items-center gap-2',
    alignStart ? 'justify-start' : 'justify-center'
  );

  return (
    <ThemeTogglerPrimitive
      theme={theme as ThemeSelection}
      resolvedTheme={resolvedTheme as Resolved}
      setTheme={setTheme}
      direction={direction}
      onImmediateChange={onImmediateChange}
    >
      {({ effective, resolved, toggleTheme }) => (
        <Button
          type="button"
          variant={variant}
          size={effectiveSize}
          className={cn(layoutClasses, className)}
          onClick={e => {
            onClick?.(e);
            toggleTheme(getNextTheme(effective, modes));
          }}
          aria-label={!showLabel ? 'Alterar tema' : undefined}
          {...props}
        >
          {mounted ? (
            getIcon(effective, resolved, modes)
          ) : (
            <Monitor aria-hidden className="size-4" />
          )}

          {showLabel && <span>{label}</span>}
        </Button>
      )}
    </ThemeTogglerPrimitive>
  );
}

export { ThemeTogglerButton, type ThemeTogglerButtonProps };
