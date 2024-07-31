import { useController } from 'react-hook-form';

function Input({ label, errors, control, ...rest }) {
    const { field } = useController({ control, name: rest.name });
    return (
        <div className="flex flex-col gap-3 mb-5 w-full ">
            <label htmlFor={rest.id || rest.name}>{label}</label>
            <input
                id={rest.id || rest.name}
                className="p-3 w-full rounded-lg  border  transition-all ring-1 border-gray-100 outline-none  focus:border-primary placeholder:text-placeholder placeholder:text-[15px]  "
                {...field}
                {...rest}
            />
        </div>
    );
}

export default Input;
