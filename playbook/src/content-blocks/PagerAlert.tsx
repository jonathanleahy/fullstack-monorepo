type PagerVariant = 'critical' | 'warning' | 'info' | 'success';

interface PagerAlertProps {
  content: string;
  variant?: PagerVariant;
  time?: string;
  source?: string;
}

const variantConfig: Record<PagerVariant, {
  bg: string;
  headerBg: string;
  border: string;
  iconColor: string;
  titleColor: string;
  textColor: string;
  pulseColor: string;
}> = {
  critical: {
    bg: 'bg-red-50',
    headerBg: 'bg-red-600',
    border: 'border-red-200',
    iconColor: 'text-white',
    titleColor: 'text-red-800',
    textColor: 'text-red-700',
    pulseColor: 'bg-red-400',
  },
  warning: {
    bg: 'bg-amber-50',
    headerBg: 'bg-amber-500',
    border: 'border-amber-200',
    iconColor: 'text-white',
    titleColor: 'text-amber-800',
    textColor: 'text-amber-700',
    pulseColor: 'bg-amber-400',
  },
  info: {
    bg: 'bg-blue-50',
    headerBg: 'bg-blue-500',
    border: 'border-blue-200',
    iconColor: 'text-white',
    titleColor: 'text-blue-800',
    textColor: 'text-blue-700',
    pulseColor: 'bg-blue-400',
  },
  success: {
    bg: 'bg-emerald-50',
    headerBg: 'bg-emerald-500',
    border: 'border-emerald-200',
    iconColor: 'text-white',
    titleColor: 'text-emerald-800',
    textColor: 'text-emerald-700',
    pulseColor: 'bg-emerald-400',
  },
};

export function PagerAlert({
  content,
  variant = 'critical',
  time,
  source = 'ALERT'
}: PagerAlertProps) {
  const config = variantConfig[variant];
  const lines = content.trim().split('\n');
  const title = lines[0];
  const body = lines.slice(1).join('\n').trim();

  return (
    <div className={`my-6 rounded-lg overflow-hidden border-2 ${config.border} ${config.bg}`}
      style={{
        boxShadow: '3px 3px 0 rgba(0,0,0,0.1)',
      }}
    >
      {/* Header bar - like the other components */}
      <div className={`${config.headerBg} px-4 py-2 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          {/* Pulsing dot for critical/warning */}
          {(variant === 'critical' || variant === 'warning') && (
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.pulseColor} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${config.pulseColor}`}></span>
            </span>
          )}
          {/* Bell icon */}
          <svg
            className={`w-4 h-4 ${config.iconColor}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className={`font-medium text-sm ${config.iconColor}`}>{source}</span>
        </div>
        {time && (
          <span className={`text-xs ${config.iconColor} opacity-90 font-mono`}>{time}</span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className={`font-bold ${config.titleColor}`}>{title}</p>
        {body && (
          <p className={`mt-1.5 text-sm ${config.textColor} leading-relaxed`}>{body}</p>
        )}
      </div>

      {/* Rough edge effect - hand-drawn line */}
      <svg className="w-full h-1 -mt-1" viewBox="0 0 400 4" preserveAspectRatio="none">
        <path
          d="M0,2 Q20,0 40,2 T80,2 T120,2 T160,2 T200,2 T240,2 T280,2 T320,2 T360,2 T400,2"
          stroke="currentColor"
          fill="none"
          strokeWidth="0.5"
          className={config.textColor}
          opacity="0.3"
        />
      </svg>
    </div>
  );
}
