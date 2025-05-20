import { useNavigate } from 'react-router-dom';
import codingImg from '../assets/clubImages/coding.jpeg';
import musicImg from '../assets/clubImages/music.jpeg';
import dramaImg from '../assets/clubImages/drama.jpeg';
import phtotoImg from '../assets/clubImages/photo.jpeg';
import robotImg from '../assets/clubImages/robot.jpeg';
import danceImg from '../assets/clubImages/dance.jpeg';
import natureImg from '../assets/clubImages/nature.jpeg';

export default function clubList() {
  const navigate = useNavigate();

  const clubs = [
    'Coding Club',
    'Music Club',
    'Drama Club',
    'Photography Club',
    'Robotics Club',
    'Dance Club',
    'Nature Club',
  ];

  const clubImages = {
  'Coding Club': codingImg,
    'Music Club': musicImg,
    'Drama Club': dramaImg,
    'Photography Club': phtotoImg,
    'Robotics Club': robotImg,
    'Dance Club': danceImg,
    'Nature Club':natureImg,
  };

  const handleClick = (clubName) => {
    navigate(`/clubfeedback?club=${encodeURIComponent(clubName)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-slate-800 to-gray-700 text-gray-100 p-8 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-emerald-400">
           Select a Club Activity to Give Feedback
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubs.map((club, index) => (
            <div
              key={index}
              onClick={() => handleClick(club)}
              className="cursor-pointer bg-white bg-opacity-5 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-emerald-400/40"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
            >
              <img
                src={clubImages[club]}
                alt={club}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold text-emerald-300">{club}</h2>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 1.2s ease-in forwards;
          }
        `}</style>
      </div>
    </div>
  );
}
