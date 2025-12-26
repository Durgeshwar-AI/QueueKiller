import { Cookie, Settings, BarChart, Shield, Users, Clock, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function CookiePolicy() {
  const cookieTypes = [
    {
      icon: Shield,
      title: "Essential Cookies",
      required: true,
      description: "These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you such as setting your privacy preferences, logging in, or filling in forms.",
      examples: [
        "Session cookies to keep you logged in",
        "Security cookies to protect against fraud",
        "Load balancing cookies for optimal performance",
        "Cookie consent preferences"
      ],
      duration: "Session or up to 1 year"
    },
    {
      icon: Settings,
      title: "Functional Cookies",
      required: false,
      description: "These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings. If you do not allow these cookies, some or all of these services may not function properly.",
      examples: [
        "Language and region preferences",
        "Display settings and customizations",
        "Previously selected departments",
        "Timezone and date format preferences"
      ],
      duration: "Up to 2 years"
    },
    {
      icon: BarChart,
      title: "Analytics Cookies",
      required: false,
      description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our service and user experience.",
      examples: [
        "Google Analytics tracking",
        "Page visit statistics",
        "Feature usage data",
        "Error reporting and diagnostics",
        "Performance monitoring"
      ],
      duration: "Up to 2 years"
    },
    {
      icon: Users,
      title: "Marketing Cookies",
      required: false,
      description: "These cookies are used to track visitors across websites to display relevant advertisements. They may be set by us or by third-party advertising partners.",
      examples: [
        "Targeted advertising cookies",
        "Social media integration cookies",
        "Conversion tracking pixels",
        "Remarketing tags"
      ],
      duration: "Up to 1 year"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar/>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-6">
            <Cookie className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-indigo-100 text-lg">
            Last updated: December 26, 2024
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
          <p className="text-gray-700 mb-4">
            Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, keeping you logged in, and understanding how you use our service.
          </p>
          <p className="text-gray-700">
            This Cookie Policy explains what cookies are, how we use them on QueueKiller, and provides information about the different types of cookies we employ.
          </p>
        </div>

        {/* Cookie Types */}
        {cookieTypes.map((type, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-8 mb-6">
            <div className="flex items-start mb-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <type.icon className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-gray-900">{type.title}</h2>
                  {type.required && (
                    <span className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded">
                      Required
                    </span>
                  )}
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{type.description}</p>
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Examples:</h3>
              <ul className="space-y-1">
                {type.examples.map((example, i) => (
                  <li key={i} className="text-gray-600 text-sm flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    {example}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-sm text-gray-500">
              <strong>Duration:</strong> {type.duration}
            </div>
          </div>
        ))}

        {/* Third-Party Cookies */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-start mb-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <div className="ml-4 flex-1">
              <h2 className="text-2xl font-bold text-gray-900">Third-Party Cookies</h2>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            In addition to our own cookies, we may use various third-party cookies to report usage statistics, deliver advertisements, and provide enhanced functionality.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Google Analytics</h3>
              <p className="text-gray-600 text-sm">Used to track website usage and generate reports about site activity. This helps us understand how users interact with our platform.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Payment Processors</h3>
              <p className="text-gray-600 text-sm">Used to process secure payments when booking appointments. These cookies ensure transaction security and fraud prevention.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Social Media Platforms</h3>
              <p className="text-gray-600 text-sm">Used to enable social media sharing and integration features. These may track your activity across multiple sites.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Content Delivery Networks (CDN)</h3>
              <p className="text-gray-600 text-sm">Used to deliver content efficiently and improve loading times for our platform.</p>
            </div>
          </div>
        </div>

        {/* How We Use Cookies */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-start mb-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <div className="ml-4 flex-1">
              <h2 className="text-2xl font-bold text-gray-900">How We Use Cookies</h2>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            QueueKiller uses cookies for various purposes to enhance your experience and improve our service:
          </p>
          <ul className="space-y-3">
            <li className="text-gray-600 flex items-start">
              <span className="text-indigo-600 mr-2 mt-1">•</span>
              <span><strong>Authentication:</strong> To keep you logged in and verify your identity across pages</span>
            </li>
            <li className="text-gray-600 flex items-start">
              <span className="text-indigo-600 mr-2 mt-1">•</span>
              <span><strong>Preferences:</strong> To remember your settings, language choices, and customizations</span>
            </li>
            <li className="text-gray-600 flex items-start">
              <span className="text-indigo-600 mr-2 mt-1">•</span>
              <span><strong>Analytics:</strong> To understand how you use our platform and identify areas for improvement</span>
            </li>
            <li className="text-gray-600 flex items-start">
              <span className="text-indigo-600 mr-2 mt-1">•</span>
              <span><strong>Security:</strong> To detect and prevent fraudulent activity and protect your account</span>
            </li>
            <li className="text-gray-600 flex items-start">
              <span className="text-indigo-600 mr-2 mt-1">•</span>
              <span><strong>Performance:</strong> To optimize loading times and ensure smooth functionality</span>
            </li>
          </ul>
        </div>

        {/* Browser Controls */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Cookies in Your Browser</h2>
          <p className="text-gray-600 mb-4">
            Most web browsers allow you to control cookies through their settings. You can typically find cookie controls in the "Options" or "Preferences" menu of your browser.
          </p>
          <p className="text-gray-600 mb-4">
            Please note that if you disable certain cookies, some features of QueueKiller may not function properly, and your user experience may be diminished.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
            <p className="text-gray-700">
              <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data
            </p>
            <p className="text-gray-700">
              <strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data
            </p>
            <p className="text-gray-700">
              <strong>Safari:</strong> Preferences → Privacy → Cookies and website data
            </p>
            <p className="text-gray-700">
              <strong>Edge:</strong> Settings → Cookies and site permissions → Manage cookies
            </p>
          </div>
        </div>

        {/* Cookie Duration */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookie Duration</h2>
          <p className="text-gray-600 mb-4">
            Cookies on QueueKiller have different lifespans depending on their purpose:
          </p>
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Session Cookies</h3>
              <p className="text-gray-600 text-sm">These are temporary cookies that expire when you close your browser. They are primarily used for authentication and navigation.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Persistent Cookies</h3>
              <p className="text-gray-600 text-sm">These remain on your device for a set period or until you delete them. They help us remember your preferences across visits.</p>
            </div>
          </div>
        </div>

        {/* Updates to Policy */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Policy</h2>
          <p className="text-gray-600">
            We may update this Cookie Policy from time to time to reflect changes in our practices or for legal or regulatory reasons. We will notify you of any material changes by posting the new policy on this page with an updated "Last updated" date.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Cookies?</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about our use of cookies or this Cookie Policy, please contact us:
          </p>
          <div className="space-y-2 text-gray-700">
            <p>Email: privacy@queuekiller.com</p>
            <p>Address: 123 Business Street, Suite 100, City, State 12345</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
}