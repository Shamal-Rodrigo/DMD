import { useState, useEffect } from 'react';
import { Home, ArrowLeft, FileText, Users, Settings, Search } from 'lucide-react';

export default function NotFoundPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const quickLinks = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'Invoices', path: '/invoices' },
    { icon: Users, label: 'Clients', path: '/clients' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className={`max-w-2xl w-full text-center transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 text-9xl font-bold text-blue-100 -z-10 blur-sm">
            404
          </div>
        </div>

        {/* Main message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-slate-600 mb-2">
            Oops! The page you're looking for doesn't exist in your DMD application.
          </p>
          <p className="text-slate-500">
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Search suggestion */}
        <div className="mb-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">
            Looking for something specific?
          </h3>
          <p className="text-slate-600 text-sm">
            Try using the navigation menu or search functionality in your DMD dashboard.
          </p>
        </div>

        {/* Quick links */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">
            Quick Navigation
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              <button
                key={link.label}
                className={`p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group ${
                  isVisible ? 'animate-fade-in' : ''
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
                onClick={() => {
                  // In a real app, you'd use your router here
                  console.log(`Navigate to ${link.path}`);
                }}
              >
                <link.icon className="w-6 h-6 mx-auto mb-2 text-blue-600 group-hover:text-indigo-600 transition-colors" />
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                  {link.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            onClick={() => {
              // In a real app, navigate to home
              console.log('Navigate to home');
            }}
          >
            <Home className="w-5 h-5" />
            Go to Dashboard
          </button>
          
          <button
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/70 backdrop-blur-sm text-slate-700 rounded-xl font-semibold border border-white/30 hover:bg-white/90 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            onClick={() => {
              // In a real app, go back in history
              window.history.back();
            }}
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Brand footer */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              DMD
            </span>
          </div>
          <p className="text-slate-500 text-sm">
            Invoicing & Management Application
          </p>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-purple-200/25 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}