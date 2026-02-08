import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000/api';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
    } catch (err) {
      console.error(err);
    }
    localStorage.removeItem('token');
    navigate('/loginadmin');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </nav>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() => navigate('/admin/landing-images')}
            className="bg-gray-800 p-6 rounded-lg cursor-pointer hover:bg-gray-700"
          >
            <h2 className="text-2xl font-bold mb-2">Landing Images</h2>
            <p className="text-gray-400">Manage landing page images</p>
          </div>
        </div>
      </div>
    </div>
  );
}
