interface IOSButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function IOSButton({ children, ...props }: IOSButtonProps) {
  return (
    <button
      {...props}
      className={`text-sm font-medium text-blue-500 hover:opacity-70 transition-opacity`}
    >
      {children}
    </button>
  );
}
