import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  variant?: 'default' | 'primary' | 'accent';
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  variant = 'default',
  className 
}: StatCardProps) {
  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend.value > 0) return <TrendingUp className="h-3 w-3" />;
    if (trend.value < 0) return <TrendingDown className="h-3 w-3" />;
    return <Minus className="h-3 w-3" />;
  };

  const getTrendColor = () => {
    if (!trend) return '';
    if (trend.value > 0) return 'text-emerald-600 bg-emerald-50';
    if (trend.value < 0) return 'text-red-600 bg-red-50';
    return 'text-muted-foreground bg-muted';
  };

  return (
    <div
      className={cn(
        'stat-card animate-fade-in',
        variant === 'primary' && 'bg-primary text-primary-foreground',
        variant === 'accent' && 'bg-gradient-to-br from-accent to-amber-500 text-accent-foreground',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className={cn(
            'text-sm font-medium',
            variant === 'default' ? 'text-muted-foreground' : 'opacity-90'
          )}>
            {title}
          </p>
          <p className="text-3xl font-display font-bold tracking-tight">{value}</p>
          {subtitle && (
            <p className={cn(
              'text-sm',
              variant === 'default' ? 'text-muted-foreground' : 'opacity-80'
            )}>
              {subtitle}
            </p>
          )}
        </div>
        {icon && (
          <div className={cn(
            'flex h-12 w-12 items-center justify-center rounded-xl',
            variant === 'default' 
              ? 'bg-primary/10 text-primary' 
              : 'bg-white/20 text-current'
          )}>
            {icon}
          </div>
        )}
      </div>
      
      {trend && (
        <div className="mt-4 pt-4 border-t border-current/10">
          <div className="flex items-center gap-2">
            <span className={cn(
              'flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
              variant === 'default' ? getTrendColor() : 'bg-white/20'
            )}>
              {getTrendIcon()}
              {Math.abs(trend.value)}%
            </span>
            <span className={cn(
              'text-xs',
              variant === 'default' ? 'text-muted-foreground' : 'opacity-80'
            )}>
              {trend.label}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
