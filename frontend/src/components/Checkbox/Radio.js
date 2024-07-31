import { useController } from 'react-hook-form';

function Radio({ children, name, checked, control, ...rest }) {
    const { field } = useController({
        control,
        name
    });
    return (
        <label >
            <input  type="radio" checked={checked} {...field} {...rest} className='hidden' />
            <div className="flex items-center gap-x-3 font-medium cursor-pointer transition-all">
                <div
                    className={`w-7 h-7 rounded-full border flex items-center justify-center p-1  ${
                        checked ? 'bg-primary border-primary text-white ' : 'border-gray-200 text-transparent'
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <span>{children}</span>
            </div>
        </label>
    );
}

export default Radio;
