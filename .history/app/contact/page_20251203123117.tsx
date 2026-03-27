export default function ContactPage() {
    return (
        <main className="mx-auto max-w-3xl px-4 py-10">
            <header className="mb-6">
                <h1 className="text-2xl font-semibold text-vwa-dark">Contact</h1>
                <p className="text-sm text-vwa-dark/70 mt-1">
                    Une question ? Une proposition ? Contactez-nous.
                </p>
            </header>

            <form className="space-y-5">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-vwa-dark">Nom</label>
                    <input
                        type="text"
                        className="px-4 py-2 rounded-xl border border-vwa-background bg-white text-sm text-vwa-dark focus:outline-none focus:ring-2 focus:ring-vwa-primary/50"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-vwa-dark">Email</label>
                    <input
                        type="email"
                        className="px-4 py-2 rounded-xl border border-vwa-background bg-white text-sm text-vwa-dark focus:outline-none focus:ring-2 focus:ring-vwa-primary/50"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-vwa-dark">
                        Message
                    </label>
                    <textarea
                        rows={4}
                        className="px-4 py-2 rounded-xl border border-vwa-background bg-white text-sm text-vwa-dark focus:outline-none focus:ring-2 focus:ring-vwa-primary/50"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-vwa-primary text-white text-sm font-medium shadow-md hover:bg-vwa-dark transition"
                >
                    Envoyer
                </button>
            </form>
        </main>
    );
}
