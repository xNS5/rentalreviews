import * as faIcons from "react-icons/fa";


export const getIcon = (icon: string, {...props}) => {
     switch(icon.toLowerCase()){
        case "git":
            return <faIcons.FaGithub {...props}/>;
     }
}