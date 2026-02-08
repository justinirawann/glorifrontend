import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000/api';

export default function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      console.log('Attempting login with:', { email, password });
      
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error response:', errorData);
        setError('Invalid credentials');
        return;
      }
      
      const data = await response.json();
      console.log('Login successful:', data);
      localStorage.setItem('token', data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-white mb-6">Admin Login</h2>
        {error && <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black font-bold py-2 rounded hover:bg-yellow-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
