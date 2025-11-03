import { Calendar, Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FooterProps {
  onNavigate?: (page: string) => void;
  isAuthenticated?: boolean;
}

export function Footer({ onNavigate, isAuthenticated }: FooterProps) {
    const navigate = useNavigate();
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 w-full">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-indigo-600 rounded-xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-white tracking-tight text-lg font-medium">ScheduleBook</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted platform for seamless appointment scheduling across multiple
              departments and companies.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-gray-800 hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              {navigate && (
                <>
                  <li>
                    <button
                      onClick={() => navigate('landing')}
                      className="hover:text-primary transition-colors"
                    >
                      Home
                    </button>
                  </li>
                  {!isAuthenticated && (
                    <>
                      <li>
                        <button
                          onClick={() => navigate('signup')}
                          className="hover:text-primary transition-colors"
                        >
                          Sign Up
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => navigate('login')}
                          className="hover:text-primary transition-colors"
                        >
                          Login
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => navigate('company-login')}
                          className="hover:text-primary transition-colors"
                        >
                          Company Portal
                        </button>
                      </li>
                    </>
                  )}
                  {isAuthenticated && (
                    <>
                      <li>
                        <button
                          onClick={() => navigate('departments')}
                          className="hover:text-primary transition-colors"
                        >
                          Departments
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => navigate('profile')}
                          className="hover:text-primary transition-colors"
                        >
                          My Profile
                        </button>
                      </li>
                    </>
                  )}
                </>
              )}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white mb-4 font-semibold">Resources</h4>
            <ul className="space-y-3">
              {['About Us', 'How It Works', 'FAQs', 'Support Center', 'Blog'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white mb-4 font-semibold">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  123 Business Ave, Suite 100
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:support@schedulebook.com"
                  className="hover:text-primary transition-colors"
                >
                  support@schedulebook.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-center md:text-left">
              &copy; 2025 ScheduleBook. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-gray-400">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, i) => (
                <a key={i} href="#" className="hover:text-primary transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
