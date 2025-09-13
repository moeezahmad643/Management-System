export default function About() {
  return (
    <div className="space-y-20 mb-10">
      <section
        className="w-full h-30 relative flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/about.png')",
          backgroundSize: "cover",
          backgroundPosition: "top",
          minHeight: "30vh",
        }}
      >
        <div className=" bg-opacity-50 w-full h-full flex items-center justify-center">
          <h2 className="text-2xl md:text-4xl font-bold text-center px-6">
            Bienvenue sur le Portail de la Police Nationale de Guinée
          </h2>
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center gap-10 px-6 md:px-20">
        <div className="flex-1">
          <img
            src="/history.jpg"
            alt="Histoire de la Police Guinéenne"
            className="w-full h-150 object-cover rounded-xl shadow-lg"
          />
        </div>

        <div className="flex-1 text-gray-800">
          <h2 className="text-5xl font-bold mb-4">Notre Histoire</h2>
          <p className="mb-3 text-lg py-2">
            Créée au lendemain de l’indépendance, la Police Nationale de Guinée
            est intimement liée au parcours du pays, de la colonisation à la
            souveraineté. Dans ses premières années, elle a transformé les
            structures héritées de l’époque coloniale en un système national
            unifié, dédié à la protection des communautés et au maintien de
            l’ordre public.
          </p>
          <p className="mb-3 text-lg py-2">
            Au fil des décennies, la Police Nationale a joué un rôle crucial
            dans l’évolution politique et sociale du pays. Qu’il s’agisse de
            gérer des périodes de troubles ou de soutenir des efforts de santé
            publique, elle est devenue un symbole de stabilité, renforcé par des
            réformes visant à améliorer la transparence et à moderniser la
            formation, l’équipement et l’engagement communautaire.
          </p>
          <p className="mb-3 text-lg py-2">
            Ces dernières années, la force s’est modernisée — augmentation des
            effectifs, création d’unités spécialisées, intégration de nouvelles
            stratégies de police de proximité — afin de renforcer la confiance,
            la transparence et le professionnalisme au service des citoyens.
          </p>
        </div>
      </section>

      <section className="flex flex-col md:flex-row-reverse items-center gap-10 px-6 md:px-20">
        <div className="flex-1">
          <img
            src="/community.jpg"
            alt="Police de Proximité"
            className="w-full h-150 object-cover rounded-xl shadow-lg"
          />
        </div>
        <div className="flex-1 text-gray-800">
          <h2 className="text-5xl font-bold mb-4">Police de Proximité</h2>
          <p className="mb-3 text-lg py-2">
            De 2015 à 2020, le projet « Partners for Security in Guinea » a
            soutenu l’institutionnalisation de la police de proximité, visant à
            rapprocher les forces de l’ordre des citoyens. Financé par le
            Département d’État américain et des partenaires locaux, ce projet a
            encouragé le dialogue, les programmes scolaires et les campagnes de
            sensibilisation.
          </p>
          <p className="mb-3 text-lg py-2">
            Ce programme a transformé le modèle policier, mettant l’accent sur
            la confiance mutuelle comme condition essentielle de sécurité
            durable. La formation adaptée aux besoins locaux, le respect des
            droits humains et la création de forums communautaires ont rendu la
            police plus inclusive et efficace.
          </p>
          <p>
            Ainsi, la Police Nationale de Guinée reflète de plus en plus ces
            valeurs, à travers des programmes de sensibilisation, des conseils
            citoyens et des campagnes de prévention, notamment dans les zones
            historiquement moins desservies.
          </p>
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center gap-10 px-6 md:px-20">
        <div className="flex-1">
          <img
            src="/partners.jpg"
            alt="Partenaires et Coopération"
            className="w-full h-150 object-cover rounded-xl shadow-lg"
          />
        </div>
        <div className="flex-1 text-gray-800">
          <h2 className="text-5xl font-bold mb-4">Partenaires & Coopération</h2>
          <p className="mb-3 text-lg py-2">
            La Police Nationale de Guinée entretient des relations solides avec
            des partenaires internationaux afin de renforcer ses capacités et
            ses réformes institutionnelles. Grâce à la coopération avec Interpol
            et des réseaux africains comme AFRIPOL, elle améliore le partage
            d’informations et lutte contre la criminalité transfrontalière.
          </p>
          <p className="mb-3 text-lg py-2">
            La collaboration avec des institutions telles que le Home Office du
            Royaume-Uni a favorisé la formation conjointe, les conseils
            stratégiques et l’amélioration des infrastructures, préparant la
            police aux menaces émergentes.
          </p>
          <p>
            Au niveau national, l’initiative « Partners for Security in Guinea »
            constitue une référence en matière de réforme, prônant une police
            fondée sur les droits humains et la proximité avec les citoyens.
          </p>
        </div>
      </section>

      <section className="flex flex-col md:flex-row-reverse items-center gap-10 px-6 md:px-20">
        <div className="flex-1">
          <img
            src="/missopn.jpg"
            alt="Mission et Valeurs"
            className="w-full h-150 object-cover rounded-xl shadow-lg"
          />
        </div>
        <div className="flex-1 text-gray-800">
          <h2 className="text-5xl font-bold mb-4">Mission & Valeurs</h2>
          <p className="mb-3 text-lg py-2">
            La mission de la Police Nationale de Guinée est d’assurer la
            sécurité publique, de faire respecter les lois de manière impartiale
            et de renforcer la confiance des citoyens. Le respect des droits
            humains, la transparence et le professionnalisme sont au cœur de
            chaque action policière.
          </p>
          <p className="mb-3 text-lg py-2">
            Nos valeurs fondamentales incluent l’intégrité, le service, la
            justice, la responsabilité et l’innovation. Les agents sont formés à
            incarner ces valeurs dans leurs activités quotidiennes.
          </p>
          <p className="mb-3 text-lg py-2">
            En intégrant ces principes, la Police Nationale vise à prévenir la
            criminalité tout en renforçant la confiance publique et en offrant
            un environnement sûr aux citoyens.
          </p>
        </div>
      </section>

      {/* --- je continue --- */}
      <section className="flex flex-col md:flex-row items-center gap-10 px-6 md:px-20">
        <div className="flex-1">
          <img
            src="/training.jpg"
            alt="Formation et Professionnalisme"
            className="w-full h-150 object-cover rounded-xl shadow-lg"
          />
        </div>
        <div className="flex-1 text-gray-800">
          <h2 className="text-5xl font-bold mb-4">Formation & Professionnalisme</h2>
          <p className="mb-3 text-lg py-2">
            La formation est une pierre angulaire de la modernisation de la Police Nationale. 
            Les académies et écoles de police en Guinée se concentrent sur le développement 
            de compétences techniques, la gestion des droits humains et la police de proximité.
          </p>
          <p className="mb-3 text-lg py-2">
            Les programmes de formation abordent des thèmes essentiels tels que 
            la gestion des foules, l’enquête criminelle, la cybercriminalité 
            et la lutte contre le terrorisme, tout en mettant l’accent sur 
            le respect des normes internationales.
          </p>
          <p>
            Ces efforts visent à produire une police professionnelle, responsable 
            et proche des citoyens, capable de répondre aux défis sécuritaires 
            modernes de manière efficace et transparente.
          </p>
        </div>
      </section>

      <section className="flex flex-col md:flex-row-reverse items-center gap-10 px-6 md:px-20">
        <div className="flex-1">
          <img
            src="public.jpg"
            alt="Présence Régionale"
            className="w-full h-150 object-cover rounded-xl shadow-lg"
          />
        </div>
        <div className="flex-1 text-gray-800">
          <h2 className="text-5xl font-bold mb-4">Présence Régionale</h2>
          <p className="mb-3 text-lg py-2">
            La Police Nationale est représentée dans toutes les régions du pays 
            à travers des commissariats, des brigades spécialisées et des postes 
            de police de proximité. Cette présence permet une couverture nationale 
            et garantit un accès à la sécurité pour tous les citoyens.
          </p>
          <p className="mb-3 text-lg py-2">
            Chaque région bénéficie de programmes adaptés à ses réalités locales, 
            renforçant ainsi l’efficacité des interventions et le lien avec les communautés.
          </p>
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center gap-10 px-6 md:px-20">
        <div className="flex-1">
          <img
            src="/community.jpg"
            alt="Programmes Communautaires"
            className="w-full h-150 object-cover rounded-xl shadow-lg"
          />
        </div>
        <div className="flex-1 text-gray-800">
          <h2 className="text-5xl font-bold mb-4">Programmes Communautaires</h2>
          <p className="mb-3 text-lg py-2">
            La Police de Guinée met en place des initiatives communautaires 
            telles que des campagnes de sensibilisation, des ateliers dans 
            les écoles et des partenariats avec des organisations civiles.
          </p>
          <p className="mb-3 text-lg py-2">
            Ces programmes visent à prévenir la criminalité, à sensibiliser 
            sur des thèmes comme la sécurité routière, la lutte contre les 
            drogues, et à promouvoir la collaboration entre la police et 
            les jeunes générations.
          </p>
        </div>
      </section>

      <section className="flex flex-col md:flex-row-reverse items-center gap-10 px-6 md:px-20">
        <div className="flex-1">
          <img
            src="technology.jpg"
            alt="Vision d'Avenir"
            className="w-full h-150 object-cover rounded-xl shadow-lg"
          />
        </div>
        <div className="flex-1 text-gray-800">
          <h2 className="text-5xl font-bold mb-4">Vision d’Avenir</h2>
          <p className="mb-3 text-lg py-2">
            La Police Nationale de Guinée s’engage à poursuivre ses réformes 
            et à devenir une institution moderne, transparente et proche des citoyens.
          </p>
          <p className="mb-3 text-lg py-2">
            Les objectifs futurs incluent l’intégration des nouvelles technologies, 
            l’amélioration de la cybersécurité, le renforcement de la coopération 
            internationale et l’élargissement des programmes de police de proximité.
          </p>
          <p>
            L’avenir de la Police guinéenne repose sur la confiance, la 
            transparence et l’engagement à protéger chaque citoyen, partout sur le territoire.
          </p>
        </div>
      </section>
    </div>
  );
}
