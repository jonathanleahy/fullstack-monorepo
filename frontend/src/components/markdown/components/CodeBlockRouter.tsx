/**
 * CodeBlockRouter - Routes code blocks to appropriate components based on language
 */

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { TerminalBlock, MistakeList, CheckList, Callout, PagerAlert, EmailPreview } from '@repo/playbook';
import { EditableDiagram } from './EditableDiagram';

interface CodeBlockProps {
  className?: string;
  children?: React.ReactNode;
}

export function CodeBlockRouter({ className, children, ...props }: CodeBlockProps) {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  const codeString = String(children).replace(/\n$/, '');

  // Mermaid diagrams
  if (language === 'mermaid') {
    return <EditableDiagram chart={codeString} />;
  }

  // Terminal/shell blocks
  if (language === 'terminal' || language === 'bash' || language === 'shell') {
    return <TerminalBlock content={codeString} />;
  }

  // Mistake/error lists
  if (language === 'mistakes' || language === 'errors') {
    return <MistakeList content={codeString} />;
  }

  // Checklist/success lists
  if (language === 'checklist' || language === 'success') {
    return <CheckList content={codeString} />;
  }

  // Info callouts
  if (language === 'info' || language === 'note') {
    return <Callout variant="info" content={codeString} />;
  }

  // Warning callouts
  if (language === 'warning' || language === 'caution') {
    return <Callout variant="warning" content={codeString} />;
  }

  // Tip callouts
  if (language === 'tip' || language === 'hint') {
    return <Callout variant="tip" content={codeString} />;
  }

  // Danger callouts
  if (language === 'danger' || language === 'critical') {
    return <Callout variant="danger" content={codeString} />;
  }

  // Pager/notification alerts
  if (language === 'pager' || language === 'alert' || language === 'notification') {
    const firstLine = codeString.split('\n')[0];
    const metaMatch = firstLine.match(/^@(critical|warning|info|success)(?:\s*\|\s*(.+?))?(?:\s*\|\s*(.+?))?$/);

    if (metaMatch) {
      const variant = metaMatch[1] as 'critical' | 'warning' | 'info' | 'success';
      const time = metaMatch[2]?.trim();
      const source = metaMatch[3]?.trim();
      const alertContent = codeString.split('\n').slice(1).join('\n');
      return <PagerAlert variant={variant} time={time} source={source} content={alertContent} />;
    }

    return <PagerAlert content={codeString} />;
  }

  // Email preview
  if (language === 'email') {
    const firstLine = codeString.split('\n')[0];
    const variantMatch = firstLine.match(/^@(critical|warning|info|success)$/);

    if (variantMatch) {
      const variant = variantMatch[1] as 'critical' | 'warning' | 'info' | 'success';
      const emailContent = codeString.split('\n').slice(1).join('\n');
      return <EmailPreview variant={variant} content={emailContent} />;
    }

    return <EmailPreview content={codeString} />;
  }

  // Inline code (no className)
  const isInline = !className;
  if (isInline) {
    return (
      <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm" {...props}>
        {children}
      </code>
    );
  }

  // Regular code block with syntax highlighting
  return (
    <div className="not-prose my-4">
      <SyntaxHighlighter
        style={oneDark}
        language={language || 'text'}
        PreTag="div"
        customStyle={{
          margin: 0,
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}
