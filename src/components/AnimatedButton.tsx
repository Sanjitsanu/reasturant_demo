import React from 'react';
import { Loader2, ArrowRight, Check } from 'lucide-react';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isSuccess?: boolean;
  showArrow?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isSuccess = false,
  showArrow = false,
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed group select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-2.5 gap-2',
    lg: 'text-base px-8 py-3.5 gap-2.5 shadow-lg',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-stone-950 font-semibold hover:from-amber-400 hover:to-amber-600 shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5 border border-amber-400/30',
    gold:
      'bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold shadow-md hover:shadow-amber-400/30 hover:-translate-y-0.5',
    secondary:
      'bg-stone-800/80 hover:bg-stone-700/80 text-zinc-100 border border-stone-700/60 hover:border-amber-500/40 backdrop-blur-md hover:-translate-y-0.5 dark:bg-stone-900/80 dark:hover:bg-stone-800/90',
    outline:
      'border border-amber-500/50 hover:border-amber-400 text-amber-500 dark:text-amber-400 hover:bg-amber-500/10 hover:-translate-y-0.5',
    ghost:
      'text-zinc-300 hover:text-amber-400 hover:bg-white/5 dark:hover:bg-white/5',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-current" />
          <span>Processing...</span>
        </>
      ) : isSuccess ? (
        <>
          <Check className="w-4 h-4 text-emerald-500 animate-in zoom-in" />
          <span>Done</span>
        </>
      ) : (
        <>
          {icon && <span className="transition-transform group-hover:scale-110">{icon}</span>}
          <span>{children}</span>
          {showArrow && (
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </>
      )}
    </button>
  );
};
