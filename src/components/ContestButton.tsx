import { Link } from "react-router-dom";

const ContestButton = () => {
  return (
    <Link
      to="/concurso"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 rounded-full shadow-[0_4px_20px_rgba(255,193,7,0.4)] hover:shadow-[0_4px_30px_rgba(255,193,7,0.6)] transition-all duration-300 hover:scale-110 flex items-center justify-center group"
      aria-label="Ir al concurso"
    >
      <svg
        className="w-7 h-7 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    </Link>
  );
};

export default ContestButton;