export default function Guide() {
  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-32">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Titre de la page */}
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6 text-blue-900">
            Guide Complet du Portail de la Police Nationale de Guinée
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Ce guide fournit des instructions étape par étape sur l’utilisation
            du portail, la résolution des problèmes courants et l’optimisation
            des services en ligne. Il est conçu à la fois pour les citoyens et
            les agents afin de garantir sécurité, transparence et efficacité.
          </p>
        </div>

        {/* Section 1 : Pourquoi nous avons créé ce portail */}
        <div className="bg-white p-10 rounded-xl shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            1. Pourquoi nous avons créé ce portail
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Le Portail de Gestion de la Police Nationale de Guinée a été créé
            pour améliorer la communication et la transparence entre la police
            et le public. Traditionnellement, accéder aux services de police
            nécessitait des visites physiques, de longs temps d’attente et des
            formalités administratives. Ce portail simplifie le processus et
            offre un accès en temps réel aux services essentiels.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Il permet également aux agents de gérer les rapports, suivre les
            incidents et collaborer efficacement avec d’autres départements.
            Grâce à la numérisation des processus clés, les citoyens reçoivent
            des réponses plus rapides tout en réduisant les erreurs humaines et
            la bureaucratie. Cette plateforme illustre notre engagement envers
            une police moderne et un service centré sur le citoyen.
          </p>
          <p className="text-gray-700 leading-relaxed">
            De plus, le portail intègre des fonctionnalités de sécurité telles
            que des connexions sécurisées, un accès basé sur les rôles et une
            intégration des contacts d’urgence. Nous visons à instaurer la
            confiance, renforcer la responsabilité et offrir un environnement
            sûr à tous les habitants de la Guinée.
          </p>
          <a
            href="/about"
            className="bg-blue-600 text-white px-8 py-3 text-lg font-semibold hover:bg-blue-700 transition mt-4 inline-block"
          >
            En savoir plus sur le portail
          </a>
        </div>

        {/* Section 2 : Commencer */}
        <div className="bg-white p-10 rounded-xl shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            2. Commencer
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Pour commencer à utiliser le portail, suivez attentivement ces étapes :
          </p>
          <ul className="list-decimal list-inside space-y-3 text-gray-700">
            <li>Ouvrez votre navigateur et accédez au site officiel.</li>
            <li>Cliquez sur le bouton <strong>"Accéder au Portail"</strong> sur la page d’accueil.</li>
            <li>Entrez votre <strong>nom d’utilisateur</strong> et <strong>mot de passe</strong> dans le formulaire de connexion.</li>
            <li>Appuyez sur le bouton <strong>Connexion</strong> pour accéder à votre tableau de bord.</li>
            <li>Si vous êtes un nouvel utilisateur, cliquez sur <strong>"Première Connexion"</strong> pour configurer votre compte.</li>
            <li>Après connexion, explorez votre tableau de bord et les services disponibles.</li>
          </ul>
          <a
            href="/portal/login"
            className="bg-yellow-400 text-black px-8 py-3 text-lg font-semibold hover:bg-yellow-500 transition mt-4 inline-block"
          >
            Accéder au Portail
          </a>
        </div>

        {/* Section 3 : Utilisation du tableau de bord */}
        <div className="bg-white p-10 rounded-xl shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            3. Utilisation du Tableau de Bord
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Le tableau de bord est votre espace central pour tous les services. Voici ce que vous pouvez faire :
          </p>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li><strong>Consulter les Rapports :</strong> Accéder aux rapports d’incidents, résumés d’enquêtes et statistiques.</li>
            <li><strong>Déposer des Plaintes :</strong> Soumettre de nouvelles plaintes en ligne avec preuves à l’appui.</li>
            <li><strong>Gérer le Profil :</strong> Mettre à jour vos informations personnelles, contacts d’urgence et préférences de notification.</li>
            <li><strong>Notifications :</strong> Recevoir des alertes pour les urgences, actualités communautaires et nouveaux services.</li>
            <li><strong>Déconnexion Sécurisée :</strong> Toujours vous déconnecter pour maintenir la sécurité.</li>
          </ul>
          <a
            href="/portal/user/dashboard"
            className="bg-green-600 text-white px-8 py-3 text-lg font-semibold hover:bg-green-700 transition mt-4 inline-block"
          >
            Aller au Tableau de Bord
          </a>
        </div>

        {/* Section 4 : Résolution des problèmes courants */}
        <div className="bg-white p-10 rounded-xl shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            4. Résolution des Problèmes Courants
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Parfois, vous pouvez rencontrer des problèmes techniques. Voici comment les résoudre :
          </p>
          <ul className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              <strong>Mot de passe oublié :</strong> Cliquez sur <em>"Mot de passe oublié"</em> sur la page de connexion et suivez les instructions pour réinitialiser.
            </li>
            <li>
              <strong>Échec de Connexion :</strong> Vérifiez votre nom d’utilisateur/mot de passe et assurez-vous que la touche Maj n’est pas activée.
            </li>
            <li>
              <strong>Problèmes de Chargement :</strong> Videz le cache de votre navigateur ou essayez un autre navigateur.
            </li>
            <li>
              <strong>Performance Lente :</strong> Assurez-vous que votre connexion Internet est stable.
            </li>
            <li>
              <strong>Autres Problèmes :</strong> Contactez le support sur la <a href="/contact" className="text-blue-600 underline">Page de Support</a>
            </li>
            <a
              href="/Supports"
              className="bg-yellow-600 text-white px-8 py-3 text-lg font-semibold hover:bg-yellow-700 transition mt-4 inline-block"
            >
              Contacter le Support
            </a>
          </ul>
        </div>

        {/* Section 5 : Bonnes pratiques */}
        <div className="bg-white p-10 rounded-xl shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            5. Bonnes Pratiques
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Gardez vos identifiants de connexion en sécurité.</li>
            <li>N’utilisez que des appareils de confiance pour accéder au portail.</li>
            <li>Déconnectez-vous toujours après avoir terminé vos tâches.</li>
            <li>Mettez régulièrement à jour vos informations personnelles et vos contacts d’urgence.</li>
            <li>Signalez immédiatement toute activité suspecte ou problème technique.</li>
          </ul>
          <a
            href="/contact"
            className="bg-red-600 text-white px-8 py-3 text-lg font-semibold hover:bg-red-700 transition mt-4 inline-block"
          >
            Nous Contacter
          </a>
        </div>
      </div>
    </section>
  );
}