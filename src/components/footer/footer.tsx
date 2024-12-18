import Icon from "@/components/icon/icon";
import Link from "next/link";
import type { FooterItem } from "./footertypes";
import type { Config } from "@/lib/configProvider";

function getConfigEntries(obj: Config[]) {
  return obj.reduce((acc, curr) => {
    if(!acc[curr.row]){
        acc[curr.row] = [];
    }
    acc[curr.row].push(curr);
    return acc;
  }, []);
}

export default function Footer({ data }: Config) {
  const footerData = getConfigEntries(data);

  return (
    <footer className="grid auto-rows-max">
      {footerData &&
        footerData.map((elem: any[], i: number) => (
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
                    <Icon type={item.icon} alttext={item.alt} className="!w-10 !h-10 px-3" />
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

