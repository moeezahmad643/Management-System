export default function Policy() {
  return (
    <div className="max-w-5xl mx-auto p-8 text-gray-800 leading-relaxed">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-800">
        Politique de Confidentialité
      </h1>

      <p className="mb-6">
        La présente Politique de Confidentialité décrit la manière dont la
        Police Nationale de Guinée recueille, utilise, protège et partage les
        informations personnelles des citoyens qui accèdent à notre système en
        ligne. Nous nous engageons à protéger vos données et à garantir une
        utilisation transparente et sécurisée de vos informations.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-blue-700">
        1. Informations que nous recueillons
      </h2>
      <p className="mb-4">
        Nous pouvons recueillir les informations suivantes lorsque vous utilisez
        notre plateforme :
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>Données personnelles (nom, prénom, date de naissance, etc.)</li>
        <li>Coordonnées (adresse, numéro de téléphone, e-mail)</li>
        <li>Informations liées à vos requêtes (plaintes, signalements, demandes)</li>
        <li>Informations techniques (adresse IP, type d’appareil, navigateur)</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-blue-700">
        2. Utilisation des informations
      </h2>
      <p className="mb-6">
        Les données collectées sont utilisées exclusivement pour :
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>Fournir et améliorer nos services en ligne</li>
        <li>Assurer la sécurité et la protection des citoyens</li>
        <li>Traiter vos plaintes, demandes et signalements</li>
        <li>Garantir la transparence et la communication avec le public</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-blue-700">
        3. Partage des informations
      </h2>
      <p className="mb-6">
        Nous ne partageons vos informations personnelles qu’avec les autorités
        compétentes et uniquement lorsque cela est nécessaire pour des raisons
        de sécurité publique, de respect de la loi ou pour le traitement de vos
        demandes.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-blue-700">
        4. Protection des données
      </h2>
      <p className="mb-6">
        Nous mettons en œuvre des mesures techniques et organisationnelles afin
        de protéger vos données personnelles contre tout accès non autorisé,
        perte ou divulgation. Toutefois, aucun système n’est totalement
        sécurisé, et nous ne pouvons garantir une sécurité absolue.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-blue-700">
        5. Vos droits
      </h2>
      <p className="mb-6">
        Vous disposez des droits suivants concernant vos données personnelles :
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>Droit d’accès à vos informations</li>
        <li>Droit de rectification ou de suppression</li>
        <li>Droit d’opposition à certains traitements</li>
        <li>Droit de déposer une réclamation auprès des autorités compétentes</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-blue-700">
        6. Modifications de cette politique
      </h2>
      <p className="mb-6">
        Nous nous réservons le droit de modifier cette Politique de
        Confidentialité à tout moment. Toute mise à jour sera publiée sur cette
        page avec une nouvelle date de révision.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-blue-700">7. Contact</h2>
      <p className="mb-6">
        Pour toute question concernant cette Politique de Confidentialité ou vos
        données personnelles, vous pouvez nous contacter via notre{" "}
        <a href="/contact" className="text-blue-600 underline">
          page de contact
        </a>
        .
      </p>

      <p className="text-sm text-gray-600 text-center mt-10">
        Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
      </p>
    </div>
  );
}