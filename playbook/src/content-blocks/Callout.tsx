type CalloutVariant = 'info' | 'warning' | 'tip' | 'danger';

interface CalloutProps {
  content: string;
  variant?: CalloutVariant;
  title?: string;
}

const variantConfig: Record<CalloutVariant, {
  gradient: string;
  bgGradient: string;
  border: string;
  iconBg: string;
  iconColor: string;
  title: string;
  iconPath: string;
  defaultTitle: string;
}> = {
  info: {
    gradient: 'from-blue-500 to-indigo-500',
    bgGradient: 'from-blue-50 to-indigo-50',
    border: 'border-blue-100',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: 'text-blue-900',
    iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    defaultTitle: 'Info',
  },
  warning: {
    gradient: 'from-amber-500 to-orange-500',
    bgGradient: 'from-amber-50 to-orange-50',
    border: 'border-amber-100',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    title: 'text-amber-900',
    iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    defaultTitle: 'Warning',
  },
  tip: {
    gradient: 'from-violet-500 to-purple-500',
    bgGradient: 'from-violet-50 to-purple-50',
    border: 'border-violet-100',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    title: 'text-violet-900',
    iconPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    defaultTitle: 'Pro Tip',
  },
  danger: {
    gradient: 'from-red-500 to-rose-500',
    bgGradient: 'from-red-50 to-rose-50',
    border: 'border-red-100',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    title: 'text-red-900',
    iconPath: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    defaultTitle: 'Important',
  },
};

export function Callout({ content, variant = 'info', title }: CalloutProps) {
  const config = variantConfig[variant];
  const displayTitle = title || config.defaultTitle;

  return (
    <div className={`my-6 rounded-xl overflow-hidden shadow-sm border ${config.border} bg-gradient-to-br ${config.bgGradient}`}>
      {/* Accent bar */}
      <div className={`h-1 bg-gradient-to-r ${config.gradient}`} />

      <div className="p-5">
        <div className="flex items-start gap-4">
          <span className={`flex-shrink-0 w-8 h-8 rounded-lg ${config.iconBg} flex items-center justify-center`}>
            <svg
              className={`w-5 h-5 ${config.iconColor}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={config.iconPath}
              />
            </svg>
          </span>
          <div className="flex-1 min-w-0">
            <p className={`font-semibold ${config.title}`}>
              {displayTitle}
            </p>
            <div className="mt-1.5 text-gray-700 leading-relaxed">
              {content.split('\n').map((line, index) => (
                <p key={index} className={index > 0 ? 'mt-2' : ''}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
