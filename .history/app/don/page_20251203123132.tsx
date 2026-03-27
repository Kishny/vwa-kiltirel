export default function DonPage() {
    return (
        <main className="mx-auto max-w-3xl px-4 py-10">
            <header className="mb-6">
                <h1 className="text-2xl font-semibold text-vwa-dark">Faire un don</h1>
                <p className="text-sm text-vwa-dark/70 mt-1">
                    Soutenez nos actions culturelles et solidaires.
                </p>
            </header>

            <section className="space-y-4 text-sm text-vwa-dark/80">
                <p>
                    Votre soutien nous permet d’organiser des ateliers, des événements,
                    des sorties et des actions culturelles accessibles à tous.
                </p>

                <div className="rounded-2xl bg-white/80 p-6 border border-vwa-background text-center">
                    <p className="text-sm text-vwa-dark/70">
                        Le module de don sécurisé sera ajouté prochainement.
                    </p>
                </div>
            </section>
        </main>
    );
}
