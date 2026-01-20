import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { MoreHorizontal, Download, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}

export function ChartCard({ title, subtitle, children, className, actions }: ChartCardProps) {
  return (
    <div className={cn('chart-container animate-fade-in', className)}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground">{title}</h3>
          {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-1">
          {actions}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="gap-2">
                <Download className="h-4 w-4" />
                Unduh CSV
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Download className="h-4 w-4" />
                Unduh PDF
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Maximize2 className="h-4 w-4" />
                Perbesar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {children}
    </div>
  );
}
