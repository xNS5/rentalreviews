import { Button as ShadButton } from "@/components/ui/button";

export default function Button({
  onClick,
  className,
  children,
  ...props
}: Readonly<{
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}>) {
  return (
    <span className={`${props.disabled ? "cursor-not-allowed" : ""}`}>
      <ShadButton onClick={() => props.disabled === false && onClick ? onClick() : ""} className={`transition-colors ease-in-out duration-400 hover:bg-slate-500 hover:text-white disabled:bg-gray-200 ${className}`} {...props}>
      {children}
    </ShadButton>
    </span>
  );
};
