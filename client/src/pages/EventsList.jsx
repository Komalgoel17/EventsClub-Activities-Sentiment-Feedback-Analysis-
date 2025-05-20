import { useNavigate } from 'react-router-dom';
import orientationImg from '../assets/eventImages/orientation-img.webp';
import techImg from '../assets/eventImages/Tech-Fest.png';
import culturalImg from '../assets/eventImages/cultural-img.jpeg';
import sportImg from '../assets/eventImages/sports-img.jpeg';
import guestImg from '../assets/eventImages/guest.jpeg';
import hackImg from '../assets/eventImages/hack.jpeg';
import alumniImg from '../assets/eventImages/alumni.jpeg';
import aiImg from '../assets/eventImages/ai.jpeg';
import annualImg from '../assets/eventImages/annual.jpeg';
export default function EventList() {
  const navigate = useNavigate();

  const events = [
    'Orientation Day',
    'Tech Fest',
    'Cultural Fest',
    'Sports Day',
    'Guest Lecture Series',
    'Hackathon',
    'Alumni Meet',
    'Workshop on AI',
    'Annual Convocation',
  ];

  const eventImages = {
    'Orientation Day': orientationImg,
    'Tech Fest': techImg,
    'Cultural Fest': culturalImg,
    'Sports Day': sportImg,
    'Guest Lecture Series': guestImg,
    'Hackathon': hackImg,
    'Alumni Meet': alumniImg,
    'Workshop on AI': aiImg,
    'Annual Convocation': annualImg,
  };

  const handleClick = (eventName) => {
    navigate(`/eventfeedback?event=${encodeURIComponent(eventName)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-slate-800 to-gray-700 text-gray-100 p-8 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-emerald-400">
          Select an Event to Give Feedback
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              onClick={() => handleClick(event)}
              className="cursor-pointer bg-white bg-opacity-5 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-emerald-400/40"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
            >
              <img
                src={eventImages[event]}
                alt={event}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold text-emerald-300">{event}</h2>
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
