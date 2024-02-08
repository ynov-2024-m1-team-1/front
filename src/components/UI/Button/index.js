const Index = ({ title, onClick }) => {
    return (
      <button
        className="w-full bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none"
        onClick={onClick}
      >
        {title}
      </button>
    );
  };

export default Index;
