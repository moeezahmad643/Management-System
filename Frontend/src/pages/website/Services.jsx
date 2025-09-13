export default function Services() {
  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Titre principal */}
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6 text-blue-900">
            Nos Services
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            La Police Nationale de Guinée met à votre disposition une variété de
            services modernes et accessibles en ligne. Ces services visent à
            protéger les citoyens, renforcer la transparence et améliorer la
            communication entre la population et les forces de l’ordre.
          </p>
        </div>

        {/* Liste des services */}
        <div className="grid gap-10 md:grid-cols-2">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Dépôt de Plainte
            </h2>
            <p className="text-gray-700">
              Déposez facilement une plainte en ligne et suivez l’évolution de
              votre dossier sans avoir à vous déplacer.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Ligne d’Urgence 24/7
            </h2>
            <p className="text-gray-700">
              Contactez-nous à tout moment pour signaler une urgence liée à la
              sécurité publique, au vol, ou à toute autre situation critique.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Objets Perdus & Retrouvés
            </h2>
            <p className="text-gray-700">
              Déclarez vos objets perdus ou vérifiez si vos biens retrouvés ont
              été enregistrés par la police.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Vérification & Certificats
            </h2>
            <p className="text-gray-700">
              Accédez rapidement aux services de vérification pour les
              documents, l’identité ou les certificats de casier judiciaire.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Sensibilisation Communautaire
            </h2>
            <p className="text-gray-700">
              Participez à nos programmes éducatifs et campagnes de sensibilisation
              pour promouvoir la sécurité et la cohésion sociale.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Assistance & Support
            </h2>
            <p className="text-gray-700">
              Notre équipe est disponible pour répondre à vos questions,
              résoudre vos problèmes et vous guider dans vos démarches.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/contact"
            className="bg-blue-800 text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-blue-900 transition"
          >
            Contactez-nous pour plus d’informations
          </a>
        </div>
      </div>
    </section>
  );
}