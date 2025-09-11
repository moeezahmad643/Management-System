import { isLoggedIn } from "../../utils/auth";

export default function Home() {
  const loggedIn = isLoggedIn();

  return (
    <div className="space-y-20 mb-10">
      <section
        className="h-screen bg-cover bg-top-left flex items-center text-white"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <div className="flex w-full h-full flex-col lg:flex-row">
          <div className="flex lg:w-1/2 h-1/3"></div>

          <div className="flex flex-col justify-end p-10 lg:justify-center lg:w-1/2 w-full">
            <h1 className="text-4xl text-shadow-lg lg:text-5xl md:text-4xl font-bold mb-6 leading-tight">
              Guinea National Police <br /> Management System
            </h1>
            <p className="text-lg text-shadow-lg md:text-xl max-w-lg">
              Our mission is to ensure safety, protect citizens, and strengthen
              trust between the police and the community through transparency
              and modern digital services.
            </p>

            {loggedIn ? (
              <span className="flex space-x-4">
                <a
                  href="/portal/login"
                  className="bg-yellow-400 text-black px-6 py-3 text-lg font-semibold hover:bg-yellow-500 transition mt-6 w-fit"
                >
                  Access the Portal
                </a>
                <a
                  href="/Guide"
                  className="bg-yellow-400 text-black px-6 py-3 text-lg font-semibold hover:bg-yellow-500 transition mt-6 w-fit"
                >
                  See Guide
                </a>
              </span>
            ) : (
              <a
                href="/about"
                className="bg-yellow-400 text-black px-6 py-2 text-lg font-semibold hover:bg-yellow-500 transition mt-6 w-fit"
              >
                About Us
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 relative">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="relative -top-1 bg-blue-800 text-white shadow-lg rounded-lg p-8 text-center transition-all duration-300 hover:-top-5 hover:shadow-2xl">
            <h3 className="text-xl font-semibold mb-4">Citizen Safety</h3>
            <p className="text-gray-100">
              Ensuring protection of lives and properties through dedicated
              policing and digital monitoring.
            </p>
          </div>

          <div className="relative -top-1 bg-blue-800 text-white shadow-lg rounded-lg p-8 text-center transition-all duration-300 hover:-top-5 hover:shadow-2xl">
            <h3 className="text-xl font-semibold mb-4">Transparency</h3>
            <p className="text-gray-100">
              Building trust by providing open access to services and
              information through our online portal.
            </p>
          </div>

          <div className="relative -top-1 bg-blue-800 text-white shadow-lg rounded-lg p-8 text-center transition-all duration-300 hover:-top-5 hover:shadow-2xl">
            <h3 className="text-xl font-semibold mb-4">Digital Services</h3>
            <p className="text-gray-100">
              Modern solutions for faster processing of complaints, reports, and
              support queries.
            </p>
          </div>
        </div>
      </section>

      <section className="w-4/5 mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        <img
          src="/community1.jpg"
          alt="Community Policing"
          className="w-full h-80 object-cover rounded-lg shadow-lg"
        />

        <div>
          <h2 className="text-5xl font-bold mb-4">Who We Are</h2>
          <p className="text-gray-700 text-lg mb-4">
            The Guinea National Police is more than just an institution — we are
            a team committed to serving and protecting every citizen. Our
            mission goes beyond security; we aim to build trust, uphold justice,
            and foster unity within communities.
          </p>
          <p className="text-gray-700 mb-6">
            From crime prevention programs to community partnerships, we are
            focused on creating a safer, more transparent, and digitally
            connected nation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/about"
              className="bg-blue-800 text-white px-6 py-3 font-semibold rounded-lg hover:bg-blue-800 transition"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </section>

      <section className="w-4/5 mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-6xl font-bold mb-4">Stay Connected</h2>
          <p className="text-gray-700 text-lg mb-4">
            Whether you have questions, need urgent assistance, or simply want
            to share your feedback, we are here to listen. Your voice matters —
            and it helps us serve you better.
          </p>
          <p className="text-gray-700 mb-6">
            Our support team and officers are available to respond to your
            queries, provide guidance, and ensure that you always feel heard and
            supported.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/contact"
              className="bg-blue-800 text-white px-6 py-3 font-semibold rounded-lg hover:bg-blue-800 transition"
            >
              Contact Us Today
            </a>
          </div>
        </div>

        <img
          src="/background-2.jpg"
          alt="Get in Touch"
          className="w-full h-80 object-cover rounded-lg shadow-lg"
        />
      </section>

      <section className="bg-gray-100 py-20 px-6 text-center">
        <blockquote className="text-2xl md:text-3xl italic font-semibold text-gray-800 max-w-3xl mx-auto">
          "A safe community is built on trust, service, and dedication — we
          stand committed to protecting every citizen."
        </blockquote>
      </section>

      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold">
            Services We Provide to the Public
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            We are committed to delivering efficient, transparent, and
            accessible services to ensure safety, trust, and support for every
            citizen in Guinea.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-black-700 mb-3">
              Complaint Filing
            </h3>
            <p className="text-gray-600">
              Easily file complaints online or in person and track the progress
              of your case.
            </p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-black-700 mb-3">
              Emergency Helpline
            </h3>
            <p className="text-gray-600">
              24/7 helpline for urgent cases such as theft, assault, or public
              safety concerns.
            </p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-black-700 mb-3">
              Lost & Found Assistance
            </h3>
            <p className="text-gray-600">
              Report lost items or recover belongings found and registered in
              our system.
            </p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-black-700 mb-3">
              Verification Services
            </h3>
            <p className="text-gray-600">
              Quick verification for documents, identity, and police clearance
              certificates.
            </p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-black-700 mb-3">
              Community Awareness
            </h3>
            <p className="text-gray-600">
              Educational programs, safety campaigns, and awareness drives for
              citizens.
            </p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-black-700 mb-3">
              Support Requests
            </h3>
            <p className="text-gray-600">
              Dedicated online support system to resolve citizen queries and
              provide guidance.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-blue-800 text-white py-16 px-6 text-center mt-16 rounded-lg shadow-lg max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Need Help or Want to Reach Us?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Our team is available to answer your questions, provide assistance,
          and ensure your concerns are addressed quickly. Don’t hesitate to get
          in touch.
        </p>
        <a
          href="/contact"
          className="bg-yellow-400 text-black px-8 py-3 text-lg font-semibold rounded-lg hover:bg-yellow-500 transition"
        >
          Contact Us Now
        </a>
      </section>

      {loggedIn && (
        <section className="bg-blue-800 text-white py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Us in Building a Safer Community
          </h2>
          <p className="text-lg mb-8">
            Access our services today and help us strengthen trust between
            citizens and the police.
          </p>
          <a
            href="/portal/login"
            className="bg-black text-white-400 px-8 py-3 text-lg font-semibold rounded-lg hover:bg-gray-900 transition"
          >
            Get Started
          </a>
        </section>
      )}
    </div>
  );
}
