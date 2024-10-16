import { Button as ShadButton } from "@/components/ui/button";

export const Button = ({
  onClick,
  className = "",
  children,
  ...props
}: Readonly<{
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}>) => {
  return (
    <span className={`${props.disabled ? "cursor-not-allowed" : ""}`}>
      <ShadButton onClick={() => props.disabled === false ? onClick() : ""} className={`transition-colors ease-in-out duration-400 hover:bg-slate-300 disabled:bg-gray-200 ${className}`} {...props}>
      {children}
    </ShadButton>
    </span>
  );
};
