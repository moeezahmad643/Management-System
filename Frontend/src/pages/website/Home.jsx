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
              Système de Gestion de la Police Nationale <br /> de Guinée
            </h1>
            <p className="text-lg text-shadow-lg md:text-xl max-w-lg">
              Notre mission est d’assurer la sécurité, de protéger les citoyens
              et de renforcer la confiance entre la police et la communauté grâce
              à la transparence et aux services numériques modernes.
            </p>

            {loggedIn ? (
              <span className="flex space-x-4">
                <a
                  href="/portal/login"
                  className="bg-yellow-400 text-black px-6 py-3 text-lg font-semibold hover:bg-yellow-500 transition mt-6 w-fit"
                >
                  Accéder au Portail
                </a>
                <a
                  href="/Guide"
                  className="bg-yellow-400 text-black px-6 py-3 text-lg font-semibold hover:bg-yellow-500 transition mt-6 w-fit"
                >
                  Voir le Guide
                </a>
              </span>
            ) : (
              <a
                href="/about"
                className="bg-yellow-400 text-black px-6 py-2 text-lg font-semibold hover:bg-yellow-500 transition mt-6 w-fit"
              >
                À Propos de Nous
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 relative">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="relative -top-1 bg-blue-800 text-white shadow-lg rounded-lg p-8 text-center transition-all duration-300 hover:-top-5 hover:shadow-2xl">
            <h3 className="text-xl font-semibold mb-4">Sécurité des Citoyens</h3>
            <p className="text-gray-100">
              Protection des vies et des biens grâce à un service de police
              dédié et une surveillance numérique.
            </p>
          </div>

          <div className="relative -top-1 bg-blue-800 text-white shadow-lg rounded-lg p-8 text-center transition-all duration-300 hover:-top-5 hover:shadow-2xl">
            <h3 className="text-xl font-semibold mb-4">Transparence</h3>
            <p className="text-gray-100">
              Renforcer la confiance en offrant un accès ouvert aux services et
              aux informations via notre portail en ligne.
            </p>
          </div>

          <div className="relative -top-1 bg-blue-800 text-white shadow-lg rounded-lg p-8 text-center transition-all duration-300 hover:-top-5 hover:shadow-2xl">
            <h3 className="text-xl font-semibold mb-4">Services Numériques</h3>
            <p className="text-gray-100">
              Solutions modernes pour un traitement plus rapide des plaintes,
              rapports et demandes de support.
            </p>
          </div>
        </div>
      </section>

      <section className="w-4/5 mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        <img
          src="/community1.jpg"
          alt="Police Communautaire"
          className="w-full h-80 object-cover rounded-lg shadow-lg"
        />

        <div>
          <h2 className="text-5xl font-bold mb-4">Qui Nous Sommes</h2>
          <p className="text-gray-700 text-lg mb-4">
            La Police Nationale de Guinée est plus qu’une institution — nous
            sommes une équipe engagée à servir et protéger chaque citoyen. Notre
            mission va au-delà de la sécurité ; nous visons à instaurer la
            confiance, défendre la justice et renforcer l’unité au sein des
            communautés.
          </p>
          <p className="text-gray-700 mb-6">
            Des programmes de prévention de la criminalité aux partenariats
            communautaires, nous travaillons à créer une nation plus sûre, plus
            transparente et numériquement connectée.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/about"
              className="bg-blue-800 text-white px-6 py-3 font-semibold rounded-lg hover:bg-blue-800 transition"
            >
              En Savoir Plus
            </a>
          </div>
        </div>
      </section>

      <section className="w-4/5 mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-6xl font-bold mb-4">Restez Connectés</h2>
          <p className="text-gray-700 text-lg mb-4">
            Que vous ayez des questions, besoin d’une assistance urgente ou
            simplement envie de partager vos retours, nous sommes à votre
            écoute. Votre voix compte — et elle nous aide à mieux vous servir.
          </p>
          <p className="text-gray-700 mb-6">
            Notre équipe de support et nos agents sont disponibles pour répondre
            à vos demandes, vous guider et s’assurer que vous soyez toujours
            entendus et soutenus.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/contact"
              className="bg-blue-800 text-white px-6 py-3 font-semibold rounded-lg hover:bg-blue-800 transition"
            >
              Contactez-Nous
            </a>
          </div>
        </div>

        <img
          src="/background-2.jpg"
          alt="Nous Contacter"
          className="w-full h-80 object-cover rounded-lg shadow-lg"
        />
      </section>

      <section className="bg-gray-100 py-20 px-6 text-center">
        <blockquote className="text-2xl md:text-3xl italic font-semibold text-gray-800 max-w-3xl mx-auto">
          "Une communauté sûre se construit sur la confiance, le service et la
          détermination — nous restons engagés à protéger chaque citoyen."
        </blockquote>
      </section>

      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold">
            Services Que Nous Offrons au Public
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Nous nous engageons à fournir des services efficaces, transparents
            et accessibles afin de garantir la sécurité, la confiance et le
            soutien de chaque citoyen en Guinée.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-black-700 mb-3">
              Dépôt de Plaintes
            </h3>
            <p className="text-gray-600">
              Déposez facilement vos plaintes en ligne ou en personne et suivez
              l’évolution de votre dossier.
            </p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-black-700 mb-3">
              Ligne d’Urgence
            </h3>
            <p className="text-gray-600">
              Ligne d’assistance disponible 24/7 pour les cas urgents comme le
              vol, l’agression ou les problèmes de sécurité publique.
            </p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-black-700 mb-3">
              Objets Perdus & Retrouvés
            </h3>
            <p className="text-gray-600">
              Signalez les objets perdus ou récupérez vos biens enregistrés dans
              notre système.
            </p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-black-700 mb-3">
              Services de Vérification
            </h3>
            <p className="text-gray-600">
              Vérification rapide des documents, identités et certificats de
              casier judiciaire.
            </p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-black-700 mb-3">
              Sensibilisation Communautaire
            </h3>
            <p className="text-gray-600">
              Programmes éducatifs, campagnes de sécurité et actions de
              sensibilisation pour les citoyens.
            </p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-black-700 mb-3">
              Demandes d’Assistance
            </h3>
            <p className="text-gray-600">
              Système de support en ligne dédié pour répondre aux demandes des
              citoyens et fournir des conseils.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-blue-800 text-white py-16 px-6 text-center mt-16 rounded-lg shadow-lg max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Besoin d’Aide ou Envie de Nous Contacter ?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Notre équipe est disponible pour répondre à vos questions, vous aider
          et s’assurer que vos préoccupations soient prises en charge
          rapidement. N’hésitez pas à nous contacter.
        </p>
        <a
          href="/contact"
          className="bg-yellow-400 text-black px-8 py-3 text-lg font-semibold rounded-lg hover:bg-yellow-500 transition"
        >
          Contactez-Nous Maintenant
        </a>
      </section>

      {loggedIn && (
        <section className="bg-blue-800 text-white py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Rejoignez-Nous pour Construire une Communauté Plus Sûre
          </h2>
          <p className="text-lg mb-8">
            Accédez à nos services dès aujourd’hui et contribuez à renforcer la
            confiance entre les citoyens et la police.
          </p>
          <a
            href="/portal/login"
            className="bg-black text-white-400 px-8 py-3 text-lg font-semibold rounded-lg hover:bg-gray-900 transition"
          >
            Commencer
          </a>
        </section>
      )}
    </div>
  );
}