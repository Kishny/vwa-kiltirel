export default function DevenirMembrePage() {
    return (
        <main className="mx-auto max-w-4xl px-4 py-10">
            <header className="mb-6">
                <h1 className="text-2xl font-semibold text-vwa-dark">
                    Devenir membre
                </h1>
                <p className="text-sm text-vwa-dark/70 mt-1">
                    Rejoignez l’association et participez à nos activités.
                </p>
            </header>

            <section className="space-y-5 text-sm text-vwa-dark/80">
                <p>
                    En devenant membre, vous soutenez nos projets culturels, participez à
                    nos ateliers et accédez à des événements exclusifs.
                </p>

                <div className="rounded-2xl bg-white/80 p-6 border border-vwa-background text-center">
                    <p className="text-sm text-vwa-dark/70">
                        Le formulaire d’adhésion et le paiement sécurisé seront ajoutés
                        prochainement.
                    </p>
                </div>
            </section>
        </main>
    );
}
