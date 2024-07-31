import { Link } from 'react-router-dom';

function Button({
    to,
    href,
    children,
    isLoading,
    primary = false,
    outline = false,
    wFull = false,
    disabled = false,
    size,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        ...passProps,
    };
    if (to) {
        Comp = Link;
        props.to = to;
    } else if (href) {
        Comp = 'a';
        props.href = href;
    }
    if (disabled) {
        Object.keys.forEach((key) => {
            if (key.startWith('on') && typeof key === 'function') {
                delete props[key];
            }
        });
    }

    let className = ` flex justify-center rounded-lg text-white  min-w-[100px]  py-2 px-4 hover:opacity-85  border border-transparent 
    ${primary ? 'bg-primary' : '!border-primary !text-primary hover:ring-1 '} 
    ${wFull ? 'w-full py-4' : ''}
    ${disabled ? 'opacity-40 hover:opacity-40 pointer-events-none' : ''}  
    
    `;

    return (
        <Comp className={className} {...props}>
            {children}
        </Comp>
    );
}
export default Button;
