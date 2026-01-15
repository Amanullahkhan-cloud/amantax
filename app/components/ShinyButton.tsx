import Link from 'next/link';

interface ShinyButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export default function ShinyButton({
  children,
  href,
  onClick,
  className = '',
  variant = 'primary',
}: ShinyButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    px-6 py-3 rounded-full font-medium text-sm
    transition-all duration-300 cursor-pointer
  `;

  const variantStyles = {
    primary: 'shiny-button text-black',
    secondary: `
      bg-transparent border border-white/20
      hover:border-emerald-400/50 hover:bg-white/5
      text-white
    `,
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
}
