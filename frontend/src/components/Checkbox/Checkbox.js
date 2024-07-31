import { useController } from "react-hook-form";

function Checkbox({checked,children, name,control,...rest}) {
    const {field} = useController({
        control,
        name,
        defaultValue: ""
    })

    return <label>
        <input type="checkbox" checked={checked} {...field} {...rest} />
        <div className={`w-7 h-7 rounded flex items-center font-medium ${checked ?'bg-primary':' bg-gray-200'}`}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>


        </div>
            <span>{children}</span>
    </label>

}
export default Checkbox;