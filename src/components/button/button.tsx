import { Button as ShadButton } from "@/components/ui/button";

export const Button = ({
  onClickFn,
  className = "",
  children,
}: Readonly<{
  onClickFn: () => void;
  className?: string;
  children: React.ReactNode;
}>) => {
  return (
    <ShadButton onClick={() => onClickFn()} className={`bg-inherit hover:bg-inherit text-black ${className}`}>
      {children}
    </ShadButton>
  );
};
