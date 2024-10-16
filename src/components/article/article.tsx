

export default function Article({children, className = '', ...props}: Readonly<{
    children: React.ReactNode;
    className?: string;
    [key: string]: any;
}>){
    return (
        <article className={`flex flex-col ${className}`} {...props}>
            {children}
        </article>
    )
}