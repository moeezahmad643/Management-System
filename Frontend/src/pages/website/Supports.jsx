import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

export default function SupportFAQs() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Comment puis-je me connecter au portail ?",
      answer:
        "Allez sur la page de connexion et entrez votre adresse e-mail et votre mot de passe enregistrés. Si vous êtes un nouvel utilisateur, vérifiez votre e-mail pour un lien d’activation ou contactez le support.",
    },
    {
      question: "J’ai oublié mon mot de passe, que dois-je faire ?",
      answer:
        "Cliquez sur « Mot de passe oublié » sur la page de connexion. Entrez votre adresse e-mail enregistrée et vous recevrez un lien pour réinitialiser votre mot de passe.",
    },
    {
      question: "Comment puis-je mettre à jour mes informations personnelles ?",
      answer:
        "Après vous être connecté, allez dans la section « Profil ». Vous pouvez y mettre à jour vos coordonnées, votre adresse ou d’autres informations personnelles.",
    },
    {
      question: "Le portail ne se charge pas correctement, que puis-je essayer ?",
      answer:
        "Commencez par actualiser la page ou vider le cache de votre navigateur. Assurez-vous que votre connexion internet est stable. Si le problème persiste, essayez un autre navigateur ou appareil.",
    },
    {
      question: "Comment puis-je vérifier l’état de ma demande de support ?",
      answer:
        "Après avoir soumis une demande de support, connectez-vous et allez dans la section « Mes Tickets de Support ». Vous pourrez y voir le statut (Non lu, En cours, Résolu).",
    },
    {
      question: "J’ai soumis un formulaire mais je n’ai pas reçu de confirmation.",
      answer:
        "Vérifiez votre dossier spam ou courriers indésirables pour l’e-mail de confirmation. Si vous ne le trouvez toujours pas, contactez directement le support avec vos informations.",
    },
    {
      question: "Comment puis-je contacter le support directement ?",
      answer:
        "Vous pouvez utiliser le formulaire de support ci-dessus ou nous écrire à support@guineapolice.gov. Notre équipe répond généralement sous 24 à 48 heures.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Foire Aux Questions (FAQ)
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Retrouvez rapidement des réponses aux problèmes les plus courants.
        Utilisez la barre de recherche ou cliquez sur une question pour voir les détails.
      </p>

      {/* Barre de recherche */}
      <div className="relative mb-8 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Recherchez votre problème..."
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
          <p className="text-center text-gray-500">Aucun résultat trouvé ❌</p>
        )}
      </div>
    </div>
  );
}