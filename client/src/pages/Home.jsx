import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      navigate('/login');
    }
  }, [navigate]);

  return (
    <main className="relative min-h-screen text-white overflow-hidden animate-gradientCycle bg-gradient-to-br from-indigo-900 via-purple-900 to-black">

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center px-6 py-4 bg-black bg-opacity-40 shadow-md">
        <div className="flex items-center space-x-4 animate-slideDown">
          {/* Inline Star Logo */}
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm p-1 border border-white/30 shadow-md hover:scale-105 transition-transform duration-300">
            <svg
              viewBox="0 0 24 24"
              fill="url(#grad)"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#facc15" />
                  <stop offset="100%" stopColor="#f472b6" />
                </linearGradient>
              </defs>
              <path d="M12 2L14.09 8.26L20.5 9.27L15.5 13.97L17 20.5L12 17.27L7 20.5L8.5 13.97L3.5 9.27L9.91 8.26L12 2Z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Event & Club Activity Feedback Portal</h1>
        </div>
        <nav className="space-x-4">
          <Link
            to="/login"
            className="group relative px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md transition duration-300 transform hover:scale-105 animate-bounce"
          >
            Admin
            <span className="tooltip">Admin Dashboard</span>
          </Link>
        </nav>
      </header>

      {/* Main Section */}
      <section className="relative z-10 flex flex-col items-center justify-center px-4 text-center mt-20">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fadeIn">
          Welcome to the College Event Feedback Portal
        </h2>
        <p className="text-lg mb-6 max-w-2xl animate-fadeIn delay-300">
          Share your thoughts on campus activities. Help us make events better with your feedback!
        </p>
        <p className="text-base mb-12 max-w-xl animate-fadeIn delay-500">
          Participate in surveys, explore community sentiment, and support meaningful changes at your college.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <Link
            to="/feedback/events"
            className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-8 text-left transition duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-glow backdrop-blur-md shadow-lg animate-slideInUp"
          >
            <h3 className="text-2xl font-bold mb-2">Feedback for Events</h3>
            <p>Rate and share your experience from recent college events.</p>
          </Link>

          <Link
            to="/feedback/clubs"
            className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-8 text-left transition duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-glow backdrop-blur-md shadow-lg animate-slideInUp delay-200"
          >
            <h3 className="text-2xl font-bold mb-2">Feedback for Club Activities</h3>
            <p>Let us know how our clubs are doing and how we can improve this.</p>
          </Link>
        </div>
      </section>

      {/* Custom CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradientCycle {
          0% {
            background-image: linear-gradient(to bottom right, #4f46e5, #9333ea, #000000);
          }
          25% {
            background-image: linear-gradient(to bottom right, #ec4899, #8b5cf6, #000000);
          }
          50% {
            background-image: linear-gradient(to bottom right, #3b82f6, #06b6d4, #000000);
          }
          75% {
            background-image: linear-gradient(to bottom right, #10b981, #6366f1, #000000);
          }
          100% {
            background-image: linear-gradient(to bottom right, #4f46e5, #9333ea, #000000);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }
        .animate-fadeIn.delay-300 {
          animation-delay: 0.3s;
        }
        .animate-fadeIn.delay-500 {
          animation-delay: 0.5s;
        }
        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
        }
        .animate-slideInUp.delay-200 {
          animation-delay: 0.2s;
        }
        .animate-slideDown {
          animation: slideDown 0.5s ease forwards;
        }
        .animate-gradientCycle {
          animation: gradientCycle 32s ease infinite;
        }
        .hover\\:shadow-glow:hover {
          box-shadow: 0 0 12px 4px rgba(255, 255, 255, 0.4);
        }
        .tooltip {
          visibility: hidden;
          opacity: 0;
          position: absolute;
          bottom: -1.5rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.8);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          white-space: nowrap;
          transition: opacity 0.3s ease;
        }
        .group:hover .tooltip {
          visibility: visible;
          opacity: 1;
        }
      `}</style>
    </main>
  );
}
