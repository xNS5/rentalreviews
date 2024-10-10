

export default function Article({children, className = ''}: Readonly<{
    children: React.ReactNode;
    className?: string;
}>){
    return (
        <article className={`flex flex-col ${className}`}>
            {children}
        </article>
    )
}