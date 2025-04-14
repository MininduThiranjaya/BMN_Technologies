import './App.css'
import './index.css';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-center bg-white p-10 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">🎉 Tailwind is working!</h1>
        <p className="text-lg text-gray-600">You can now build your UI with utility-first classes.</p>
        <button className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>
    </div>
  )
}

export default App
