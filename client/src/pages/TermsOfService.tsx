import { FileText, UserCheck, AlertCircle, Ban, Scale, CreditCard, RefreshCw } from 'lucide-react';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function TermsOfService() {
  const sections = [
    {
      icon: UserCheck,
      title: "Account Registration",
      content: [
        {
          subtitle: "Eligibility",
          text: "You must be at least 13 years old to use QueueKiller. By creating an account, you confirm that you meet this age requirement and that all information provided is accurate."
        },
        {
          subtitle: "Account Security",
          text: "You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized access to your account."
        },
        {
          subtitle: "Account Termination",
          text: "We reserve the right to suspend or terminate your account if you violate these terms or engage in fraudulent or abusive behavior."
        }
      ]
    },
    {
      icon: FileText,
      title: "Use of Service",
      content: [
        {
          subtitle: "Permitted Use",
          text: "QueueKiller is provided for legitimate appointment booking and scheduling purposes. You agree to use the service only for lawful purposes and in accordance with these terms."
        },
        {
          subtitle: "Booking Responsibility",
          text: "You are responsible for all bookings made through your account. Please ensure all information provided is accurate and complete."
        },
        {
          subtitle: "Cancellation Policy",
          text: "You may cancel bookings according to the cancellation policy of the specific department. Late cancellations or no-shows may be subject to penalties."
        }
      ]
    },
    {
      icon: Ban,
      title: "Prohibited Activities",
      content: [
        {
          subtitle: "Misuse",
          text: "You may not use QueueKiller to make fraudulent bookings, spam departments, or disrupt the service for other users."
        },
        {
          subtitle: "Automated Access",
          text: "You may not use bots, scripts, or automated tools to access the service without our express written permission."
        },
        {
          subtitle: "Data Scraping",
          text: "You may not scrape, copy, or extract data from our platform for commercial purposes or redistribute our content."
        },
        {
          subtitle: "Impersonation",
          text: "You may not impersonate another person or entity, or falsely represent your affiliation with any organization."
        }
      ]
    },
    {
      icon: CreditCard,
      title: "Payments and Fees",
      content: [
        {
          subtitle: "Service Fees",
          text: "Some departments may charge fees for their services. You agree to pay all applicable fees as displayed at the time of booking."
        },
        {
          subtitle: "Payment Processing",
          text: "Payments are processed through secure third-party payment processors. We do not store your complete payment card information."
        },
        {
          subtitle: "Refunds",
          text: "Refund policies vary by department. Please review the specific refund policy before completing your booking."
        }
      ]
    },
    {
      icon: Scale,
      title: "Intellectual Property",
      content: [
        {
          subtitle: "Our Content",
          text: "All content on QueueKiller, including text, graphics, logos, and software, is owned by QueueKiller or its licensors and protected by copyright and trademark laws."
        },
        {
          subtitle: "Limited License",
          text: "We grant you a limited, non-exclusive, non-transferable license to access and use our service for personal, non-commercial purposes."
        },
        {
          subtitle: "User Content",
          text: "By submitting content to our platform, you grant us a worldwide, royalty-free license to use, display, and distribute that content in connection with our service."
        }
      ]
    },
    {
      icon: AlertCircle,
      title: "Disclaimers and Limitations",
      content: [
        {
          subtitle: "Service Availability",
          text: "We strive to maintain 99.9% uptime, but we do not guarantee uninterrupted access. The service is provided 'as is' without warranties of any kind."
        },
        {
          subtitle: "Third-Party Services",
          text: "QueueKiller connects you with third-party departments and services. We are not responsible for the quality, safety, or legality of services provided by these third parties."
        },
        {
          subtitle: "Limitation of Liability",
          text: "To the maximum extent permitted by law, QueueKiller shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service."
        },
        {
          subtitle: "Maximum Liability",
          text: "Our total liability to you for any claims arising from your use of the service shall not exceed the amount you paid to us in the twelve months prior to the claim."
        }
      ]
    },
    {
      icon: RefreshCw,
      title: "Changes to Terms",
      content: [
        {
          subtitle: "Modifications",
          text: "We reserve the right to modify these terms at any time. We will notify users of material changes via email or through the platform."
        },
        {
          subtitle: "Continued Use",
          text: "Your continued use of QueueKiller after changes to these terms constitutes acceptance of the modified terms."
        }
      ]
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
            <FileText className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-indigo-100 text-lg">
            Last updated: December 26, 2025
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
          <p className="text-gray-700 mb-4">
            Welcome to QueueKiller. These Terms of Service govern your access to and use of our appointment booking platform. By accessing or using QueueKiller, you agree to be bound by these terms.
          </p>
          <p className="text-gray-700">
            If you do not agree to these terms, you may not access or use our service. Please read these terms carefully before using QueueKiller.
          </p>
        </div>

        {/* Terms Sections */}
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-8 mb-6">
            <div className="flex items-start mb-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
              <div className="ml-4 flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
              </div>
            </div>
            <div className="space-y-6">
              {section.content.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.subtitle}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Privacy Policy Reference */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy Policy</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Your use of QueueKiller is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Please review our Privacy Policy to understand our practices regarding your data.
          </p>
        </div>

        {/* Dispute Resolution */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Dispute Resolution</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Governing Law</h3>
              <p className="text-gray-600 leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which QueueKiller operates, without regard to its conflict of law provisions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Arbitration</h3>
              <p className="text-gray-600 leading-relaxed">
                Any disputes arising from these terms or your use of the service shall be resolved through binding arbitration, except where prohibited by law.
              </p>
            </div>
          </div>
        </div>

        {/* Severability */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Severability</h2>
          <p className="text-gray-600 leading-relaxed">
            If any provision of these terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className="space-y-2 text-gray-700">
            <p>Email: legal@queuekiller.com</p>
            <p>Address: 123 Business Street, Suite 100, City, State 12345</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>

        {/* Acknowledgment */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
          <div className="flex items-start">
            <AlertCircle className="w-6 h-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Notice</h3>
              <p className="text-gray-700">
                By using QueueKiller, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree, please discontinue use of our service immediately.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
}