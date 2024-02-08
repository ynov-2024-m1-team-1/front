const Index = ({ type, title }) => {
    return (
        <button
            type={type}
            className="w-full bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none"
        >
            {title}
        </button>
    );
};

export default Index;
