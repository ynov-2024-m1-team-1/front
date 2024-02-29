const Index = ({ title, onClick, className }) => {
    return (
      <button
        className={className || "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
        onClick={onClick}
      >
        {title}
      </button>
    );
  };

export default Index;
