export default function Guide() {
  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-32">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Page Title */}
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6 text-blue-900">
            Comprehensive Guide to the Guinea National Police Portal
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            This guide provides step-by-step instructions on how to use the portal, solve common problems, and make the most of the online services. It is designed for both citizens and officers to ensure safety, transparency, and efficiency.
          </p>
        </div>

        {/* Section 1: Why We Created This Portal */}
        <div className="bg-white p-10 rounded-xl shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            1. Why We Created This Portal
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The Guinea National Police Management Portal was created to improve communication and transparency between the police force and the public. Traditionally, accessing police services required physical visits, long waiting times, and manual paperwork. This portal streamlines the process and provides real-time access to critical services.
          </p>
          <p className="text-gray-700 leading-relaxed">
            It also empowers officers to manage reports, track incidents, and collaborate with other departments efficiently. By digitizing key processes, we ensure that citizens receive faster responses while reducing human error and bureaucracy. This platform demonstrates our commitment to modern policing and citizen-centric service.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Furthermore, the portal includes safety features such as secure logins, role-based access, and emergency contact integration. We aim to build trust, improve accountability, and provide a safe environment for all residents of Guinea.
          </p>
          <a
            href="/about"
            className="bg-blue-600 text-white px-8 py-3 text-lg font-semibold hover:bg-blue-700 transition mt-4 inline-block"
          >
            Learn More About the Portal
          </a>
        </div>

        {/* Section 2: Getting Started */}
        <div className="bg-white p-10 rounded-xl shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            2. Getting Started
          </h2>
          <p className="text-gray-700 leading-relaxed">
            To start using the portal, follow these steps carefully:
          </p>
          <ul className="list-decimal list-inside space-y-3 text-gray-700">
            <li>Open your browser and visit the official website.</li>
            <li>Click the <strong>"Access the Portal"</strong> button on the homepage.</li>
            <li>Enter your <strong>username</strong> and <strong>password</strong> in the login form.</li>
            <li>Press the <strong>Login</strong> button to access your dashboard.</li>
            <li>If you are a new user, click <strong>"First-time Login"</strong> for instructions to set up your account.</li>
            <li>After login, explore your dashboard and available services.</li>
          </ul>
          <a
            href="/portal/login"
            className="bg-yellow-400 text-black px-8 py-3 text-lg font-semibold hover:bg-yellow-500 transition mt-4 inline-block"
          >
            Access the Portal
          </a>
        </div>

        {/* Section 3: Using the Dashboard */}
        <div className="bg-white p-10 rounded-xl shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            3. Using the Dashboard
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The dashboard is your central hub for all services. Here’s what you can do:
          </p>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li><strong>View Reports:</strong> Access incident reports, investigation summaries, and statistics.</li>
            <li><strong>File Complaints:</strong> Submit new complaints online with supporting evidence.</li>
            <li><strong>Manage Profile:</strong> Update personal details, emergency contacts, and notification preferences.</li>
            <li><strong>Notifications:</strong> Receive alerts for emergencies, community updates, and new services.</li>
            <li><strong>Secure Logout:</strong> Always log out to maintain security.</li>
          </ul>
          <a
            href="/portal/user/dashboard"
            className="bg-green-600 text-white px-8 py-3 text-lg font-semibold hover:bg-green-700 transition mt-4 inline-block"
          >
            Go to Dashboard
          </a>
        </div>

        {/* Section 4: Fixing Common Problems */}
        <div className="bg-white p-10 rounded-xl shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            4. Fixing Common Problems
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Sometimes, you may face technical issues. Here’s how to resolve them:
          </p>
          <ul className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              <strong>Forgot Password:</strong> Click on <em>"Forgot Password"</em> on the login page and follow instructions to reset.
            </li>
            <li>
              <strong>Login Fails:</strong> Check your username/password and ensure Caps Lock is off.
            </li>
            <li>
              <strong>Page Loading Issues:</strong> Clear your browser cache or try a different browser.
            </li>
            <li>
              <strong>Slow Performance:</strong> Ensure your internet connection is stable.
            </li>
            <li>
              <strong>Other Issues:</strong> Contact support at <a href="/contact" className="text-blue-600 underline">Support Page</a>
            </li>
            <a
            href="/Supports"
            className="bg-yellow-600 text-white px-8 py-3 text-lg font-semibold hover:bg-yellow-700 transition mt-4 inline-block"
          >
            Contact Support
          </a>
          </ul>
        </div>

        {/* Section 5: Best Practices */}
        <div className="bg-white p-10 rounded-xl shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            5. Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Keep your login credentials secure.</li>
            <li>Use only trusted devices to access the portal.</li>
            <li>Always log out after completing your tasks.</li>
            <li>Regularly update your personal and emergency contact information.</li>
            <li>Report any suspicious activity or technical problems immediately.</li>
          </ul>
          <a
            href="/contact"
            className="bg-red-600 text-white px-8 py-3 text-lg font-semibold hover:bg-red-700 transition mt-4 inline-block"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}