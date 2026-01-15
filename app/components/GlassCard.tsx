interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
}: GlassCardProps) {
  return (
    <div
      className={`
        glass-card p-6
        ${hover ? 'hover:border-emerald-400/30' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// Service Card Component
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function ServiceCard({ icon, title, description, className = '' }: ServiceCardProps) {
  return (
    <div className={`glass-card p-8 group ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-emerald-400/10 flex items-center justify-center mb-6 group-hover:bg-emerald-400/20 transition-colors">
        <div className="text-emerald-400 text-2xl">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

// Stats Card Component
interface StatCardProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ value, label, icon, className = '' }: StatCardProps) {
  return (
    <div className={`glass-card p-8 text-center ${className}`}>
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-emerald-400/10 flex items-center justify-center mx-auto mb-4">
          <div className="text-emerald-400">{icon}</div>
        </div>
      )}
      <div className="text-4xl md:text-5xl font-bold emerald-gradient-text mb-2">
        {value}
      </div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}

// Testimonial Card Component
interface TestimonialCardProps {
  quote: string;
  author: string;
  company: string;
  rating: number;
  className?: string;
}

export function TestimonialCard({ quote, author, company, rating, className = '' }: TestimonialCardProps) {
  return (
    <div className={`glass-card p-8 min-w-[350px] md:min-w-[400px] ${className}`}>
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-emerald-400' : 'text-gray-600'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-gray-300 mb-6 leading-relaxed italic">&ldquo;{quote}&rdquo;</p>
      <div>
        <div className="font-semibold">{author}</div>
        <div className="text-emerald-400 text-sm">{company}</div>
      </div>
    </div>
  );
}
