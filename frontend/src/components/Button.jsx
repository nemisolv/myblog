import { Link } from 'react-router-dom';
import Loading from './shared/Loading';

function Button({
    to,
    href,
    children,
    loading,
    primary = false,
    outline = false,
    wFull = false,
    disabled = false,
    className,
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

    let classname = ` flex justify-center items-center gap-4 rounded-lg text-white  min-w-[100px]  h-[60px] px-4 hover:opacity-85  border border-transparent 
    ${primary ? 'bg-primary' : '!border-primary !text-primary hover:ring-1 '} 
    ${wFull ? 'w-full py-4' : ''}
    ${disabled ? 'opacity-40 hover:opacity-40 pointer-events-none' : ''}  
    
    `;

    return (
        <Comp className={classname} {...props}>
            {loading && <Loading />}
            {children}
        </Comp>
    );
}
export default Button;
