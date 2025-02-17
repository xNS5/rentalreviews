import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import {
  IconName,
  IconPrefix,
  findIconDefinition,
} from "@fortawesome/fontawesome-svg-core";

import {far} from '@fortawesome/free-regular-svg-icons';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = true;

library.add(fas, fab, far);

const getIcon = (type: string, delimiter: string) => {
  const index: number = type.indexOf("-");
  const nameArr: string[] = [
    type.slice(0, index),
    type.slice(index + delimiter.length),
  ];
  return findIconDefinition({
    prefix: nameArr[0] as IconPrefix,
    iconName: nameArr[1] as IconName,
  });
};

export default function Icon ({
  type,
  className,
  ...rest
}: Readonly<{
  type: string;
  className?: string;
  [key: string]: any;
}>) {
  const DynamicIcon = getIcon(type, "-");

  if (DynamicIcon == null) {
    return <FontAwesomeIcon title="X icon" icon={getIcon("fas-xmark", "-")} />;
  }

  return (
    <FontAwesomeIcon
      icon={DynamicIcon}
      style={{ height: "inherit" }}
      className={`rounded ${className ?? ""}`}
      title={rest.title}
      aria-hidden="true"
      {...rest}
    />
  );
};
