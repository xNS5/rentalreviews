import { Button as ShadButton } from "@/components/ui/button"


type ButtonProps = {
    onClickFn: () => void,
    className: string,
    children: React.ReactNode
}

const defaultProps = {
    className: ""
}

export const Button = ({onClickFn, className, children}: ButtonProps) => {
    return (<ShadButton 
    onClick={() => onClickFn()}
    className={`bg-inherit hover:bg-inherit ${className}`}>
        {children}
    </ShadButton>)
}