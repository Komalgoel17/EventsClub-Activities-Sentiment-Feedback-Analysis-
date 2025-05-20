import { useState } from 'react';

export default function Login({ onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email || !password || !confirmPwd) {
      setError('Please fill all fields.');
      return;
    }
    if (password !== confirmPwd) {
      setError('Passwords do not match.');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    if (existingUsers.find(user => user.email === email)) {
      setError('Email already registered. Please login.');
      return;
    }

    existingUsers.push({ email, password });
    localStorage.setItem('users', JSON.stringify(existingUsers));

    setSuccess('Account created successfully! You can now log in.');
    setEmail('');
    setPassword('');
    setConfirmPwd('');
    setMode('login');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    const user = existingUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setSuccess('Login successful!');
      setEmail('');
      setPassword('');
      onLoginSuccess();  // call this to update login state in App.js
    } else {
      setError('Invalid email or password.');
    }
  };

  // ...rest of your form JSX here as you provided, unchanged
  // just make sure to pass the form submit to handleLogin or handleSignup

  return (
    <main className="relative min-h-screen text-white overflow-hidden animate-gradientCycle bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex items-center justify-center px-6">
      <section className="relative z-10 bg-black bg-opacity-40 backdrop-blur-md rounded-xl shadow-lg max-w-md w-full p-8 animate-fadeIn">
        <h1 className="text-3xl font-extrabold mb-6 text-center">
          {mode === 'login' ? 'Admin Login' : 'Create an Account'}
        </h1>

        <form onSubmit={mode === 'login' ? handleLogin : handleSignup} className="space-y-6">
          {/* Email input */}
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-md bg-white/10 border border-white/30 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password input */}
          <div className="relative">
            <label htmlFor="password" className="block mb-1 font-semibold">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="w-full rounded-md bg-white/10 border border-white/30 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-purple-400 hover:text-purple-600 focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {/* eye icons */}
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.1.188-2.155.525-3.145m3.18-2.54A9.955 9.955 0 0112 5c5.523 0 10 4.477 10 10 0 1.1-.188 2.155-.525 3.145m-1.343 2.588L4.222 4.222" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Confirm password for signup */}
          {mode === 'signup' && (
            <div className="relative">
              <label htmlFor="confirmPwd" className="block mb-1 font-semibold">
                Confirm Password
              </label>
              <input
                id="confirmPwd"
                type={showConfirmPassword ? 'text' : 'password'}
                className="w-full rounded-md bg-white/10 border border-white/30 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                placeholder="Confirm password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-8 text-purple-400 hover:text-purple-600 focus:outline-none"
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.1.188-2.155.525-3.145m3.18-2.54A9.955 9.955 0 0112 5c5.523 0 10 4.477 10 10 0 1.1-.188 2.155-.525 3.145m-1.343 2.588L4.222 4.222" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          )}

          {error && <p className="text-red-400 font-semibold">{error}</p>}
          {success && <p className="text-green-400 font-semibold">{success}</p>}

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-black font-semibold rounded-md py-3 text-lg transition duration-300 transform hover:scale-105"
          >
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-white/70">
          {mode === 'login' ? (
            <>
              Don&apos;t have an account?{' '}
              <button
                onClick={() => {
                  setError('');
                  setSuccess('');
                  setMode('signup');
                }}
                className="text-pink-400 hover:text-pink-500 font-semibold focus:outline-none"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={() => {
                  setError('');
                  setSuccess('');
                  setMode('login');
                }}
                className="text-pink-400 hover:text-pink-500 font-semibold focus:outline-none"
              >
                Login
              </button>
            </>
          )}
        </p>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
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
          animation: fadeIn 0.6s ease forwards;
        }
        .animate-gradientCycle {
          animation: gradientCycle 32s ease infinite;
        }
      `}</style>
    </main>
  );
}
