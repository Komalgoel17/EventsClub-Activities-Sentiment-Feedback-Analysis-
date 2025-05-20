import { useState } from 'react';
import { useLocation ,useNavigate} from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

export default function EventFeedback() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const selectedEvent = queryParams.get('event');

  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    department: '',
    yearSem: '',
    feedback: '',
    rating: 0,
  });

  const [hoverRating, setHoverRating] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Feedback:', { event: selectedEvent, ...formData });
    navigate('/thank-you');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-500 px-4">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden md:flex">
        {/* Left - Bold message area */}
        <div className="bg-yellow-500 text-black p-8 md:w-1/3 flex items-center justify-center flex-col">
          <div className="text-left">
            <h1 className="text-3xl font-extrabold leading-tight mb-2">
              WE WANT<br />
              <span className="text-4xl text-white">YOUR</span><br />
              FEEDBACK
            </h1>
            <div className="w-20 h-1 bg-black mt-2"></div>
          </div>
        </div>

        {/* Right - Feedback form in speech bubble style */}
        <div className="relative md:w-2/3 p-8 bg-white rounded-l-none rounded-3xl md:rounded-l-[100px]">
          <h2 className="text-2xl font-bold text-center mb-6 text-orange-600">
            Feedback for: {selectedEvent}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="p-3 border rounded-lg w-full"
              />
              <input
                type="text"
                name="rollNumber"
                placeholder="Roll Number"
                value={formData.rollNumber}
                onChange={handleChange}
                required
                className="p-3 border rounded-lg w-full"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="p-3 border rounded-lg w-full"
              />
              <input
                type="text"
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                required
                className="p-3 border rounded-lg w-full"
              />
              <input
                type="text"
                name="yearSem"
                placeholder="Year/Sem"
                value={formData.yearSem}
                onChange={handleChange}
                required
                className="p-3 border rounded-lg w-full"
              />
            </div>

            {/* Feedback Text */}
            <textarea
              name="feedback"
              placeholder={`Your feedback for ${selectedEvent}`}
              value={formData.feedback}
              onChange={handleChange}
              rows={4}
              required
              className="w-full p-3 border rounded-lg"
            />

            {/* Star Rating */}
            <div className="text-center space-y-1">
              <p className="font-semibold text-gray-700">Rate the Event</p>
              <div className="flex justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={28}
                    className={`cursor-pointer transition-transform ${
                      (hoverRating || formData.rating) >= star
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    } hover:scale-110`}
                    onClick={() => setFormData({ ...formData, rating: star })}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition-transform hover:scale-105"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
