const Index = ({
    label,
    name,
    value,
    placeholder,
    type,
    onChange,
    isRequired,
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
                className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <br />
        </>
    );
};

export default Index;
