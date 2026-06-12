import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ' +
  'disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:  'bg-primary text-primary-foreground hover:bg-primary/90',
        navy:     'bg-brand-navy text-white hover:bg-brand-navy-mid dark:bg-white dark:text-brand-navy dark:hover:bg-white/90',
        outline:  'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost:    'hover:bg-accent hover:text-accent-foreground',
        link:     'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-5 py-2.5 text-[14px]',
        sm:      'px-4 py-2 text-[13px]',
        lg:      'px-7 py-3.5 text-[15px]',
        icon:    'w-9 h-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export function Button({ className, variant, size, ...props }) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export { buttonVariants };
