import { Button as ShadButton } from "@/components/shadcn/button"


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
    className={className}>
        {children}
    </ShadButton>)
}