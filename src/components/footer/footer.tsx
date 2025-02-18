import Icon from "@/components/icon/icon";
import Link from "next/link";
import type { FooterItem } from "@/lib/types";

function getConfigEntries(obj: FooterItem[]) {
  return obj.reduce((acc, curr) => {
    const { row } = curr;
    if(!acc[row]){
        acc[row] = [];
    }
    acc[row].push(curr);
    return acc;
  }, {} as Record<number, FooterItem[]>);
}

export default function Footer({ data }: {data: FooterItem[]}) {
  const footerData = getConfigEntries(data);

  return (
    <footer className="grid auto-rows-max">
      {footerData &&
        Object.values<FooterItem[]>(footerData).map((elem, i: number) => (
          <div key={i} className="my-1 flex inline-flex items-center justify-center">
            {elem.map((item: FooterItem, j: number) => {
              if (item.type === "text") {
                return (
                  <span className={"rounded"} key={j}>
                    {item.text}
                  </span>
                );
              }
              return (
                <Link key={j} href={item?.url ?? ""} target={item.target} className={"mx-1"}>
                  {item.icon && item.icon.length > 0 ? (
                    <Icon type={item.icon} aria-label={item.alt} className="!w-10 !h-10 px-3" />
                  ) : (
                    <span className="rounded">{item.text}</span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
    </footer>
  );
}

