import { Link } from 'react-router-dom';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-slate-900 to-black text-white px-4">
      <div className="text-center animate-fadeIn">
        <h1 className="text-6xl md:text-7xl font-extrabold text-teal-400 tracking-widest mb-6 drop-shadow-lg">
          THANK YOU.
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-10">
          Your feedback has been successfully submitted.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-full shadow-md transition-transform hover:scale-105"
        >
          Submit Another Feedback
        </Link>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 1.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
