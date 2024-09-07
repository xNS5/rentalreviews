import Link from "next/link";

export function NavItem(props: Readonly<{
  [key: string]: any
}>) {
  return (
    <Link
      href={"/"}
      {...props}
    >
     {props.name}
    </Link>
  );
};
