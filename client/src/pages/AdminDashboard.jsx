import { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const sentimentData = [
  { name: 'Positive', value: 60 },
  { name: 'Neutral', value: 25 },
  { name: 'Negative', value: 15 },
];

const COLORS = ['#10B981', '#FBBF24', '#EF4444'];

const Stars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex text-yellow-400 space-x-0.5 drop-shadow-md">
      {Array(fullStars).fill(0).map((_, i) => (
        <span key={'full-' + i} className="text-2xl animate-pulse">★</span>
      ))}
      {halfStar && <span className="text-2xl">⯪</span>}
      {Array(emptyStars).fill(0).map((_, i) => (
        <span key={'empty-' + i} className="text-2xl opacity-40">★</span>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => navigate('/login');

  useEffect(() => {
    setTimeout(() => {
      setEvents([
        { id: 1, title: 'Orientation Day', date: '2025-06-15', rating: 4.5, feedback: 'Attendees loved the keynote speech and workshops!' },
        { id: 2, title: 'Tech Fest', date: '2025-07-10', rating: 4.0, feedback: 'Great collaboration but some teams wanted longer time.' },
        { id: 3, title: 'Cultural Fest', date: '2025-08-05', rating: 5.0, feedback: 'Highly rated session, very informative and engaging.' },
        { id: 4, title: 'Sports Day', date: '2025-08-20', rating: 4.8, feedback: 'Competitive events with excellent sportsmanship.' },
        { id: 5, title: 'Guest Lecture Series', date: '2025-09-01', rating: 4.7, feedback: 'Inspirational talks by industry experts.' },
        { id: 6, title: 'Hackathon', date: '2025-09-15', rating: 4.9, feedback: 'Innovative solutions and enthusiastic participation.' },
        { id: 7, title: 'Alumni Meet', date: '2025-10-05', rating: 4.6, feedback: 'Great networking opportunities with past graduates.' },
        { id: 8, title: 'Workshop On AI', date: '2025-10-20', rating: 5.0, feedback: 'Cutting-edge insights and hands-on sessions.' },
        { id: 9, title: 'Annual Convocation', date: '2025-12-15', rating: 5.0, feedback: 'Memorable ceremony with great speeches.' },
      ]);

      setClubs([
        { id: 1, name: 'Coding Club', rating: 4.2, feedback: 'Participation increased by 30% this semester.' },
        { id: 2, name: 'Music Club', rating: 4.7, feedback: 'Wonderful performances and increased membership.' },
        { id: 3, name: 'Drama Club', rating: 4.0, feedback: 'Members improved public speaking and acting skills significantly.' },
        { id: 4, name: 'Photography Club', rating: 4.1, feedback: 'Members showcased impressive portfolios.' },
        { id: 5, name: 'Robotics Club', rating: 4.3, feedback: 'Built innovative robots for competitions.' },
        { id: 6, name: 'Dance Club', rating: 4.5, feedback: 'Energetic performances with growing audiences.' },
        { id: 7, name: 'Nature Club', rating: 4.2, feedback: 'Organized successful environmental awareness campaigns.' },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const avgEventRating = useMemo(() => {
    if (!events.length) return 0;
    const total = events.reduce((sum, e) => sum + e.rating, 0);
    return (total / events.length).toFixed(2);
  }, [events]);

  const avgClubRating = useMemo(() => {
    if (!clubs.length) return 0;
    const total = clubs.reduce((sum, c) => sum + c.rating, 0);
    return (total / clubs.length).toFixed(2);
  }, [clubs]);

  const overallAvgRating = useMemo(() => {
    const combined = [...events, ...clubs];
    if (!combined.length) return 0;
    const total = combined.reduce((sum, item) => sum + item.rating, 0);
    return (total / combined.length).toFixed(2);
  }, [events, clubs]);

  const overallFeedbackSummary =
    "Overall, the events and club activities have received positive responses. Attendees appreciated the quality of sessions and active participation, though there's room to improve event duration and engagement for certain activities.";

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-indigo-50 via-blue-50 to-indigo-100">
        <p className="text-2xl text-indigo-700 font-extrabold animate-pulse tracking-wider">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 pb-12">
      <nav className="bg-white shadow-lg px-8 py-5 flex justify-between items-center sticky top-0 z-30 border-b border-indigo-300">
        <h1 className="text-4xl font-extrabold text-indigo-800 tracking-wide select-none drop-shadow-md">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 active:scale-95 transition-transform duration-150 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-red-400 hover:shadow-red-600"
          aria-label="Logout"
          title="Logout"
        >
          Logout
        </button>
      </nav>

      <main className="max-w-7xl mx-auto mt-14 px-6 space-y-20">
        <section className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-12 max-w-4xl mx-auto text-center hover:scale-[1.02] transition-transform duration-300 ease-in-out">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6 drop-shadow-lg">
            Feedback Sentiment Analysis
          </h2>

          <p className="text-xl font-semibold text-gray-700 mb-4 tracking-wide">
            Overall Average Rating: <span className="text-yellow-400 text-3xl font-extrabold">{overallAvgRating} / 5</span>
          </p>
          <div className="flex justify-center mb-7">
            <Stars rating={parseFloat(overallAvgRating)} />
          </div>
          <p className="text-gray-600 italic max-w-xl mx-auto leading-relaxed mb-12 px-4 select-text">
            {overallFeedbackSummary}
          </p>

          <div className="flex justify-center">
            <ResponsiveContainer width={360} height={280}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  dataKey="value"
                  isAnimationActive={true}
                  labelLine={false}
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    return (
                      <text
                        x={x}
                        y={y}
                        fill="#111"
                        textAnchor={x > cx ? 'start' : 'end'}
                        dominantBaseline="central"
                        fontWeight={600}
                        fontSize={14}
                      >
                        {`${sentimentData[index].name} ${(percent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 12px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#111' }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  wrapperStyle={{ fontWeight: '600', fontSize: 14, color: '#555' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-bold text-indigo-700 mb-10 text-center tracking-wide drop-shadow-md">
            My Events
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {events.map(({ id, title, date, rating, feedback }) => (
              <li
                key={id}
                className="bg-gradient-to-tr from-blue-100 to-blue-50 border border-blue-300 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300 cursor-pointer"
              >
                <h3 className="text-3xl font-semibold text-blue-800 mb-3">{title}</h3>
                <p className="text-blue-700 font-medium mb-2">
                  Date: <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
                </p>
                <div className="flex items-center mb-4 space-x-4">
                  <Stars rating={rating} />
                  <span className="text-blue-900 font-semibold text-xl">{rating} / 5</span>
                </div>
                <p className="text-blue-900 italic leading-relaxed select-text">{feedback}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center font-semibold text-indigo-700 text-xl tracking-wide">
            Average Event Rating: <span className="text-yellow-400 font-extrabold">{avgEventRating} / 5</span>
          </p>
        </section>

        <section>
          <h2 className="text-4xl font-bold text-yellow-700 mb-10 text-center tracking-wide drop-shadow-md">
            Club Activities
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {clubs.map(({ id, name, rating, feedback }) => (
              <li
                key={id}
                className="bg-gradient-to-tr from-yellow-50 to-yellow-100 border border-yellow-300 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300 cursor-pointer"
              >
                <h3 className="text-3xl font-semibold text-yellow-900 mb-3">{name}</h3>
                <div className="flex items-center mb-4 space-x-4">
                  <Stars rating={rating} />
                  <span className="text-yellow-900 font-semibold text-xl">{rating} / 5</span>
                </div>
                <p className="text-yellow-900 italic leading-relaxed select-text">{feedback}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center font-semibold text-yellow-700 text-xl tracking-wide">
            Average Club Rating: <span className="text-yellow-500 font-extrabold">{avgClubRating} / 5</span>
          </p>
        </section>
      </main>
    </div>
  );
}
