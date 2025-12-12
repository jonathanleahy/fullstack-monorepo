type EmailVariant = 'info' | 'warning' | 'critical' | 'success';

interface EmailPreviewProps {
  content: string;
  variant?: EmailVariant;
}

const variantConfig: Record<EmailVariant, {
  bg: string;
  headerBg: string;
  border: string;
  iconColor: string;
  fromColor: string;
  subjectColor: string;
  textColor: string;
  metaColor: string;
}> = {
  info: {
    bg: 'bg-slate-50',
    headerBg: 'bg-slate-600',
    border: 'border-slate-200',
    iconColor: 'text-white',
    fromColor: 'text-slate-800',
    subjectColor: 'text-slate-900',
    textColor: 'text-slate-700',
    metaColor: 'text-slate-500',
  },
  warning: {
    bg: 'bg-amber-50',
    headerBg: 'bg-amber-500',
    border: 'border-amber-200',
    iconColor: 'text-white',
    fromColor: 'text-amber-800',
    subjectColor: 'text-amber-900',
    textColor: 'text-amber-700',
    metaColor: 'text-amber-600',
  },
  critical: {
    bg: 'bg-red-50',
    headerBg: 'bg-red-600',
    border: 'border-red-200',
    iconColor: 'text-white',
    fromColor: 'text-red-800',
    subjectColor: 'text-red-900',
    textColor: 'text-red-700',
    metaColor: 'text-red-600',
  },
  success: {
    bg: 'bg-emerald-50',
    headerBg: 'bg-emerald-500',
    border: 'border-emerald-200',
    iconColor: 'text-white',
    fromColor: 'text-emerald-800',
    subjectColor: 'text-emerald-900',
    textColor: 'text-emerald-700',
    metaColor: 'text-emerald-600',
  },
};

interface ParsedEmail {
  from?: string;
  to?: string;
  subject?: string;
  date?: string;
  body: string;
}

function parseEmailContent(content: string): ParsedEmail {
  const lines = content.trim().split('\n');
  const result: ParsedEmail = { body: '' };

  let bodyStartIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for separator line (--- or empty line after headers)
    if (line.trim() === '---' || (line.trim() === '' && bodyStartIndex > 0)) {
      bodyStartIndex = i + 1;
      break;
    }

    // Parse header lines
    const fromMatch = line.match(/^From:\s*(.+)$/i);
    const toMatch = line.match(/^To:\s*(.+)$/i);
    const subjectMatch = line.match(/^Subject:\s*(.+)$/i);
    const dateMatch = line.match(/^Date:\s*(.+)$/i);

    if (fromMatch) {
      result.from = fromMatch[1];
      bodyStartIndex = i + 1;
    } else if (toMatch) {
      result.to = toMatch[1];
      bodyStartIndex = i + 1;
    } else if (subjectMatch) {
      result.subject = subjectMatch[1];
      bodyStartIndex = i + 1;
    } else if (dateMatch) {
      result.date = dateMatch[1];
      bodyStartIndex = i + 1;
    } else if (!line.match(/^[A-Za-z-]+:\s/)) {
      // Not a header line, treat as body start
      bodyStartIndex = i;
      break;
    }
  }

  result.body = lines.slice(bodyStartIndex).join('\n').trim();
  return result;
}

export function EmailPreview({
  content,
  variant = 'info',
}: EmailPreviewProps) {
  const config = variantConfig[variant];
  const email = parseEmailContent(content);

  return (
    <div
      className={`my-6 rounded-lg overflow-hidden border-2 ${config.border} ${config.bg}`}
      style={{
        boxShadow: '3px 3px 0 rgba(0,0,0,0.1)',
      }}
    >
      {/* Email header bar */}
      <div className={`${config.headerBg} px-4 py-2 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          {/* Email icon */}
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
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span className={`font-medium text-sm ${config.iconColor}`}>
            {variant === 'critical' ? 'URGENT' : variant === 'warning' ? 'IMPORTANT' : 'EMAIL'}
          </span>
        </div>
        {email.date && (
          <span className={`text-xs ${config.iconColor} opacity-90`}>{email.date}</span>
        )}
      </div>

      {/* Email metadata */}
      <div className="px-4 pt-3 pb-2 border-b border-current/10">
        {email.from && (
          <div className="flex items-baseline gap-2 text-sm">
            <span className={`${config.metaColor} font-medium w-14`}>From:</span>
            <span className={`${config.fromColor} font-medium`}>{email.from}</span>
          </div>
        )}
        {email.to && (
          <div className="flex items-baseline gap-2 text-sm mt-0.5">
            <span className={`${config.metaColor} font-medium w-14`}>To:</span>
            <span className={`${config.textColor}`}>{email.to}</span>
          </div>
        )}
        {email.subject && (
          <div className="flex items-baseline gap-2 text-sm mt-1">
            <span className={`${config.metaColor} font-medium w-14`}>Subject:</span>
            <span className={`${config.subjectColor} font-semibold`}>{email.subject}</span>
          </div>
        )}
      </div>

      {/* Email body */}
      {email.body && (
        <div className="p-4">
          <p className={`text-sm ${config.textColor} leading-relaxed whitespace-pre-wrap`}>
            {email.body}
          </p>
        </div>
      )}

      {/* Hand-drawn line effect */}
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
