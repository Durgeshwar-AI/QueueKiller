import { Shield, Lock, Eye, Database, UserCheck, Mail, FileText } from 'lucide-react';
import { Footer } from '../components/Footer';
import Navbar from '../components/Navbar';

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          text: "When you create an account, we collect your name, email address, phone number, and other contact details necessary for booking appointments."
        },
        {
          subtitle: "Usage Data",
          text: "We collect information about how you interact with our service, including booking history, preferences, and device information."
        },
        {
          subtitle: "Location Data",
          text: "With your permission, we may collect location data to help you find nearby departments and services."
        }
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Service Delivery",
          text: "We use your information to process bookings, send confirmations, and provide customer support."
        },
        {
          subtitle: "Communication",
          text: "We may send you appointment reminders, service updates, and important notifications about your bookings."
        },
        {
          subtitle: "Improvement",
          text: "We analyze usage patterns to improve our platform and develop new features that better serve your needs."
        },
        {
          subtitle: "Security",
          text: "We use your data to detect and prevent fraud, abuse, and security incidents."
        }
      ]
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        {
          subtitle: "Encryption",
          text: "All data transmitted between your device and our servers is encrypted using industry-standard SSL/TLS protocols."
        },
        {
          subtitle: "Access Controls",
          text: "We implement strict access controls to ensure only authorized personnel can access user data."
        },
        {
          subtitle: "Regular Audits",
          text: "Our security practices are regularly reviewed and updated to protect against emerging threats."
        }
      ]
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: [
        {
          subtitle: "Access",
          text: "You have the right to access and review the personal information we hold about you."
        },
        {
          subtitle: "Correction",
          text: "You can update or correct your personal information at any time through your account settings."
        },
        {
          subtitle: "Deletion",
          text: "You may request deletion of your account and associated data. Some information may be retained for legal compliance."
        },
        {
          subtitle: "Data Portability",
          text: "You can request a copy of your data in a machine-readable format."
        }
      ]
    },
    {
      icon: FileText,
      title: "Data Sharing",
      content: [
        {
          subtitle: "Service Providers",
          text: "We share data with trusted third-party service providers who help us operate our platform, such as cloud hosting and payment processors."
        },
        {
          subtitle: "Departments",
          text: "When you book an appointment, necessary information is shared with the relevant department to fulfill your booking."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose information when required by law or to protect our rights and the safety of our users."
        },
        {
          subtitle: "No Selling",
          text: "We do not sell your personal information to third parties for marketing purposes."
        }
      ]
    },
    {
      icon: Mail,
      title: "Cookies and Tracking",
      content: [
        {
          subtitle: "Essential Cookies",
          text: "We use cookies necessary for the platform to function, such as keeping you logged in."
        },
        {
          subtitle: "Analytics",
          text: "We use analytics tools to understand how users interact with our service and improve performance."
        },
        {
          subtitle: "Your Control",
          text: "You can manage cookie preferences through your browser settings. Note that disabling cookies may affect functionality."
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
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-indigo-100 text-lg">
            Last updated: December 26, 2025
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <p className="text-gray-700 mb-4">
            At QueueKiller, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our appointment booking platform.
          </p>
          <p className="text-gray-700">
            By using QueueKiller, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our service.
          </p>
        </div>

        {/* Policy Sections */}
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

        {/* Children's Privacy */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Our service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
          </p>
        </div>

        {/* Changes to Policy */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
          <p className="text-gray-600 leading-relaxed">
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about this Privacy Policy or our data practices, please contact us:
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