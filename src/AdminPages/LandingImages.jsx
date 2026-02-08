import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000/api';

const fetchAPI = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers
  };
  
  const response = await fetch(`${API_URL}${url}`, { ...options, headers });
  if (!response.ok) throw new Error('Request failed');
  return response.json();
};

export default function AdminLandingImages() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const data = await fetchAPI('/landing-images');
      setImages(data.images);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/landing-images`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      if (!response.ok) throw new Error('Upload failed');
      fetchImages();
    } catch (err) {
      alert('Upload failed');
    }
    setUploading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return;
    try {
      await fetchAPI(`/landing-images/${id}`, { method: 'DELETE' });
      fetchImages();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Landing Images</h1>
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
      </nav>
      <div className="p-8">
        <div className="mb-6">
          <label className="bg-yellow-500 text-black px-6 py-3 rounded cursor-pointer hover:bg-yellow-600 inline-block">
            {uploading ? 'Uploading...' : 'Upload Image'}
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg">
              <img src={img} alt="Landing" className="w-full h-64 object-cover rounded mb-4" />
              <button
                onClick={() => handleDelete(index + 1)}
                className="w-full bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
