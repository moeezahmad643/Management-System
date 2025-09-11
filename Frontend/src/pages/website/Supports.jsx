import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

export default function SupportFAQs() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I log in to the portal?",
      answer:
        "Go to the login page and enter your registered email and password. If you are a first-time user, check your email for an activation link or contact support.",
    },
    {
      question: "I forgot my password, what should I do?",
      answer:
        "Click on 'Forgot Password' on the login page. Enter your registered email address, and you will receive a link to reset your password.",
    },
    {
      question: "How do I update my personal information?",
      answer:
        "After logging in, go to the 'Profile' section. You can update your contact details, address, or other personal information from there.",
    },
    {
      question: "The portal is not loading properly, what can I try?",
      answer:
        "First, refresh the page or clear your browser cache. Make sure your internet connection is stable. If the problem persists, try using another browser or device.",
    },
    {
      question: "How can I check the status of my support request?",
      answer:
        "After submitting a support request, log in and navigate to the 'My Support Tickets' section. There you can see the status (Unread, In Progress, Resolved).",
    },
    {
      question: "I submitted a form but did not get confirmation.",
      answer:
        "Please check your spam or junk mail folder for the confirmation email. If you still don’t see it, contact support directly with your details.",
    },
    {
      question: "How can I contact support directly?",
      answer:
        "You can use the support form above or email us at support@guineapolice.gov. Our team typically replies within 24–48 hours.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Find quick answers to common issues. Use the search bar or expand a
        question to see more details.
      </p>

      {/* Search Bar */}
      <div className="relative mb-8 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search your issue..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring focus:ring-blue-300"
        />
        <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-800"
              >
                {faq.question}
                {openIndex === index ? (
                  <ChevronUp size={20} className="text-gray-500" />
                ) : (
                  <ChevronDown size={20} className="text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-4 border-t border-gray-200 text-gray-600 bg-gray-50">
                  {faq.answer}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No results found ❌</p>
        )}
      </div>
    </div>
  );
}