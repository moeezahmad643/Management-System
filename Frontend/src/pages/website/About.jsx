export default function About() {
  return (
    <div className="space-y-20 mb-10">
      <section
        className="w-full h-30 relative flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/about.png')", // <-- this is correct for public folder
          backgroundSize: "cover",
          backgroundPosition: "top",
          minHeight: "30vh",
        }}
      >
        <div className=" bg-opacity-50 w-full h-full flex items-center justify-center">
          <h2 className="text-2xl md:text-4xl font-bold text-center px-6">
            Welcome to the Guinea National Police Portal
          </h2>
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center gap-10 px-6 md:px-20">
        <div className="flex-1">
          <img
            src="/history.jpg"
            alt="Guinea Police History"
            className="w-full h-150 object-cover rounded-xl shadow-lg"
          />
        </div>

        <div className="flex-1 text-gray-800">
          <h2 className="text-5xl font-bold mb-4">Our History</h2>
          <p className="mb-3 text-lg py-2">
            Established in the wake of independence, the National Police of
            Guinea has roots deeply intertwined with the country&apos;s journey
            from colonial rule to sovereignty. In the early years, the force
            adapted colonial-era structures into a unified national system
            dedicated to safeguarding communities and public order.
          </p>
          <p className="mb-3 text-lg py-2">
            Throughout the decades that followed, the National Police played a
            critical role in Guinea’s evolving political and social landscape.
            Whether resolving periods of unrest or supporting public health
            efforts, the police became a symbol of stability, molded by reforms
            to enhance accountability and modernize standards of training,
            equipment, and community outreach.
          </p>
          <p className="mb-3 text-lg py-2">
            In recent years, the force has embraced modernization—expanding its
            ranks, introducing specialized units, and integrating contemporary
            policing strategies such as community-focused initiatives. This
            development underlines the commitment to uphold trust, transparency,
            and professionalism in serving citizens nationwide.
          </p>
        </div>
      </section>

      <section className="flex flex-col md:flex-row-reverse items-center gap-10 px-6 md:px-20">
        <div className="flex-1">
          <img
            src="/community.jpg"
            alt="Community Policing"
            className="w-full h-150 object-cover rounded-xl shadow-lg"
          />
        </div>
        <div className="flex-1 text-gray-800">
          <h2 className="text-5xl font-bold mb-4">Community Policing</h2>
          <p className="mb-3 text-lg py-2">
            From 2015 to 2020, the Partners for Security in Guinea project
            brought international support to institutionalize community
            policing—aimed at bridging gaps between law enforcement and
            citizens. Backed by the U.S. Department of State and local
            stakeholders, this initiative fostered engagement through regular
            dialogues, school programs, and public-awareness campaigns.
          </p>
          <p className="mb-3 text-lg py-2">
            This program helped transform the policing model, reinforcing the
            idea that sustainable safety comes from mutual trust. Training
            officers in community-specific needs, emphasizing human rights, and
            creating local forums for reporting and dialogue made policing more
            inclusive and effective.
          </p>
          <p>
            As a result, Guinea’s National Police has increasingly reflected
            these values—implementing outreach programs, civilian advisory
            boards, and preventive campaigns, particularly in neighborhoods
            historically underserved by traditional law enforcement.
          </p>
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center gap-10 px-6 md:px-20">
        <div className="flex-1">
          <img
            src="/partners.jpg"
            alt="Partners and International Cooperation"
            className="w-full h-150 object-cover rounded-xl shadow-lg"
          />
        </div>
        <div className="flex-1 text-gray-800">
          <h2 className="text-5xl font-bold mb-4">Partners & Cooperation</h2>
          <p className="mb-3 text-lg py-2">
            Guinea’s National Police maintains strong ties with international
            partners to bolster capacity and institutional reform. Through
            coordination with Interpol and Africa-wide networks like AFRIPOL,
            the force enhances intelligence sharing and tackles cross-border
            crime, from trafficking to terrorism.
          </p>
          <p className="mb-3 text-lg py-2">
            Collaboration with global entities such as the UK Home Office has
            fostered joint training, strategic guidance, and infrastructure
            improvements. These relationships help the police stay prepared for
            emerging security threats and adopt best practices.
          </p>
          <p>
            At the national level, the Partners for Security in Guinea
            initiative serves as a benchmark for reform, advocating for
            rights-based, community-first policing. Its legacy provides a
            roadmap for other national efforts to improve transparency and
            effectiveness.
          </p>
        </div>
      </section>

      <section className="flex flex-col md:flex-row-reverse items-center gap-10 px-6 md:px-20">
        <div className="flex-1">
          <img
            src="/missopn.jpg"
            alt="Mission & Values"
            className="w-full h-150 object-cover rounded-xl shadow-lg"
          />
        </div>
        <div className="flex-1 text-gray-800">
          <h2 className="text-5xl font-bold mb-4">Mission & Values</h2>
          <p className="mb-3 text-lg py-2">
            The mission of the Guinea National Police is to ensure public
            safety, enforce laws impartially, and foster trust within
            communities. Upholding human rights, transparency, and
            professionalism is central to every police action across the nation.
          </p>
          <p className="mb-3 text-lg py-2">
            Our core values include integrity, service, justice, accountability,
            and innovation. Officers are trained to uphold these values in
            day-to-day operations, building a reliable and community-focused
            force.
          </p>
          <p className="mb-3 text-lg py-2">
            By embedding these principles, the National Police seeks to not only
            prevent crime but also enhance public confidence, providing a safe
            environment for citizens to thrive.
          </p>
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center gap-10 px-6 md:px-20">
        <div className="flex-1">
          <img
            src="/training.jpg"
            alt="Police Training"
            className="w-full h-150 object-cover rounded-xl shadow-lg"
          />
        </div>
        <div className="flex-1 text-gray-800">
          <h2 className="text-5xl font-bold mb-4">Training & Development</h2>
          <p className="mb-3 text-lg py-2">
            Continuous training is essential to maintain a modern, effective
            police force. Guinea National Police invests heavily in officer
            development, covering areas such as criminal investigation,
            emergency response, cybercrime, and leadership.
          </p>
          <p className="mb-3 text-lg py-2">
            Training academies focus on both theoretical knowledge and practical
            exercises, simulating real-world scenarios. This ensures officers
            are equipped to handle diverse challenges, from local incidents to
            national emergencies.
          </p>
          <p className="mb-3 text-lg py-2">
            Additionally, partnerships with international agencies allow for
            advanced courses in forensic science, human rights enforcement, and
            intelligence-led policing—keeping the force updated with global best
            practices.
          </p>
        </div>
      </section>

      <section className="flex flex-col md:flex-row-reverse items-center gap-10 px-6 md:px-20">
        <div className="flex-1">
          <img
            src="/regions.jpg"
            alt="Regional Police Units"
            className="w-full h-150 object-cover rounded-xl shadow-lg"
          />
        </div>
        <div className="flex-1 text-gray-800">
          <h2 className="text-5xl font-bold mb-4">Regional Presence</h2>
          <p className="mb-3 text-lg py-2">
            The Guinea National Police operates across eight regions, each
            managed by a regional command center. This decentralized approach
            allows rapid response to local issues while maintaining national
            coordination.
          </p>
          <p className="mb-3 text-lg py-2">
            Specialized units, such as the Judicial Police, Border Security, and
            Anti-Crime Brigades, are deployed according to regional needs.
            Community liaison officers engage directly with citizens to ensure
            proactive policing.
          </p>
          <p className="mb-3 text-lg py-2">
            Regional presence is further strengthened through mobile units and
            emergency response teams, which can be dispatched swiftly during
            crises or large-scale public events.
          </p>
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center gap-10 px-6 md:px-20">
        <div className="flex-1">
          <img
            src="/community1.jpg"
            alt="Community Programs"
            className="w-full h-150 object-cover rounded-xl shadow-lg"
          />
        </div>
        <div className="flex-1 text-gray-800">
          <h2 className="text-5xl font-bold mb-4">Community Programs</h2>
          <p className="mb-3 text-lg py-2">
            Community engagement is a cornerstone of modern policing. Guinea
            National Police runs a variety of programs targeting youth
            education, neighborhood safety, and citizen awareness. These
            initiatives aim to prevent crime while fostering trust.
          </p>
          <p className="mb-3 text-lg py-2">
            Programs include school workshops, public safety seminars, and
            volunteer initiatives, creating opportunities for citizens to
            participate in security efforts. Advisory boards provide feedback to
            improve service quality.
          </p>
          <p className="mb-3 text-lg py-2">
            By maintaining active communication channels, including hotlines and
            local forums, the police ensure communities are informed, empowered,
            and involved in safeguarding their environment.
          </p>
        </div>
      </section>

      <section className="flex flex-col md:flex-row-reverse items-center gap-10 px-6 md:px-20">
        <div className="flex-1">
          <img
            src="/technology.jpg"
            alt="Technology & Innovation"
            className="w-full h-150 object-cover rounded-xl shadow-lg"
          />
        </div>
        <div className="flex-1 text-gray-800">
          <h2 className="text-5xl font-bold mb-4">Technology & Innovation</h2>
          <p className="mb-3 text-lg py-2">
            Modern technology plays a critical role in enhancing efficiency and
            transparency. The Guinea National Police utilizes digital reporting
            systems, mobile patrol apps, and centralized databases for crime
            tracking and resource management.
          </p>
          <p className="mb-3 text-lg py-2">
            Innovative tools such as GIS mapping, body cameras, and automated
            case management allow for better accountability and informed
            decision-making. Officers receive ongoing training in these
            technologies to optimize daily operations.
          </p>
          <p className="mb-3 text-lg py-2">
            Technology also facilitates public interaction, including online
            reporting portals, real-time alerts, and information campaigns.
            These systems reinforce trust, ensuring citizens can engage with the
            police quickly and efficiently.
          </p>
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center gap-10 px-6 md:px-20">
        <div className="flex-1">
          <img
            src="/partners.jpg"
            alt="International Cooperation"
            className="w-full h-150 object-cover rounded-xl shadow-lg"
          />
        </div>
        <div className="flex-1 text-gray-800">
          <h2 className="text-5xl font-bold mb-4">International Cooperation</h2>
          <p className="mb-3 text-lg py-2">
            The Guinea National Police collaborates with global law enforcement
            agencies to combat transnational crime. Partnerships with Interpol,
            AFRIPOL, and regional bodies ensure information sharing and
            coordinated operations against organized crime networks.
          </p>
          <p className="mb-3 text-lg py-2">
            Joint exercises, training exchanges, and strategic workshops enhance
            the capacity of officers and introduce international best practices.
            This cooperation strengthens the nation’s resilience against
            evolving security threats.
          </p>
          <p className="mb-3 text-lg py-2">
            By participating in multinational initiatives, Guinea contributes to
            regional stability while continuously improving its own policing
            standards.
          </p>
        </div>
      </section>

      <section className="flex flex-col md:flex-row-reverse items-center gap-10 px-6 md:px-20">
        <div className="flex-1">
          <img
            src="/background-2.jpg"
            alt="Specialized Units"
            className="w-full h-150 object-cover rounded-xl shadow-lg"
          />
        </div>
        <div className="flex-1 text-gray-800">
          <h2 className="text-5xl font-bold mb-4">Specialized Units</h2>
          <p className="mb-3 text-lg py-2">
            Guinea National Police operates specialized units to handle complex
            operations. This includes the Judicial Police, Anti-Crime Brigade,
            Counter-Terrorism, and Border Security teams, all equipped with
            specialized training and tools.
          </p>
          <p className="mb-3 text-lg py-2">
            These units operate both independently and in coordination with
            regular patrol forces, addressing crimes that require technical
            expertise, rapid response, or intelligence-driven interventions.
          </p>
          <p className="mb-3 text-lg py-2">
            The existence of these units ensures a multi-layered policing
            strategy capable of protecting citizens against modern threats while
            maintaining high professional standards.
          </p>
        </div>
      </section>
    </div>
  );
}
