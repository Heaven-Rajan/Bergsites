export default function Legal() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto prose prose-slate">
        <h1 className="text-4xl font-bold mb-8">Impressum</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Angaben gemäß § 5 TMG</h2>
          <p>
            Bergsites IT-Consulting & Web-Development<br />
            Musterstraße 123<br />
            51702 Deutschland
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Kontakt</h2>
          <p>
            Telefon: +49 (0) 123 456789<br />
            E-Mail: hallo@bergsites.de
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Umsatzsteuer-ID</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
            DE123456789
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">EU-Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
              https://ec.europa.eu/consumers/odr/
            </a>.
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>
      </div>
    </div>
  );
}
