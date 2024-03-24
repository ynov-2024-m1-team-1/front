const Index = ({
    label,
    name,
    value,
    placeholder,
    type,
    onChange,
    isRequired,
    className,
    error
}) => {
    return (
        <>
            {label && <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor={name}>{label} </label>}
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                required={isRequired}
                placeholder={placeholder}
                onChange={onChange}
                className={`${
                    className || "w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 mb-3 focus:outline-none focus:border-blue-500"
                } ${
                    error ? "border-red-500" : "" 
                }`}
            />
            <br />
        </>
    );
};

export default Index;
