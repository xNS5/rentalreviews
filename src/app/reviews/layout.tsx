import { getRemoteConfig } from "../utilities/config-provider";


export default async function ReviewLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const config = await getRemoteConfig("reviews");
    return (
        <div>{children}</div>
    );
  }