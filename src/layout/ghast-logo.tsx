import { GalleryVerticalEnd } from 'lucide-react';
import { ShimmeringText } from '@/components/ui/shimmering-text';

export function GhastLogo() {
  return (
    <div className="text-foreground text flex items-center gap-2 self-center py-2 text-lg font-semibold">
      <GalleryVerticalEnd className="size-5" />

      <ShimmeringText
        text="Ghast Consultancy"
        color="var(--color-muted-foreground)"
        shimmerColor="var(--color-foreground)"
        duration={1.5}
        repeatDelay={1}
        repeat={false}
        once
      />
    </div>
  );
}
