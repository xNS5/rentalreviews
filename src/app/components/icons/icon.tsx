import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName, IconPrefix, findIconDefinition } from '@fortawesome/fontawesome-svg-core';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(fas, fab);

type IconProps = {
    type: string,
    className?: string
}

const getIcon = (type: string, delimiter: string) => {
    const index: number = type.indexOf("-");
    const nameArr: string[] = [type.slice(0, index), type.slice(index + delimiter.length)];;
    const temp = findIconDefinition({ prefix: nameArr[0] as IconPrefix, iconName: nameArr[1] as IconName });
    return temp;
}

const Icon = (props: IconProps) => {
    const DynamicIcon = getIcon(props.type, "-");
    if (DynamicIcon == null) {
        console.log(DynamicIcon);
        return <FontAwesomeIcon icon={getIcon("fas-xmark", "-")}/>;
    }
    return (
        <FontAwesomeIcon icon={DynamicIcon} className={props?.className} />
    )
}

export default Icon;
