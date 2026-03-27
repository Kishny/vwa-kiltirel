export default function MomentsFortsCarousel() {
    const items = [
        { label: "Atelier parents-enfants", color: "bg-vwa-terracotta/15" },
        { label: "Soirée découverte", color: "bg-vwa-blueSoft/15" },
        { label: "Brunch mamans", color: "bg-vwa-green/15" },
        { label: "Cinéma en plein air", color: "bg-vwa-accent/15" },
    ];

    return (
        <section>
            <h2 className="text-lg font-semibold text-vwa-dark mb-3">
                Moments forts
            </h2>

            <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className={`h-32 w-44 rounded-2xl flex items-center justify-center text-xs text-vwa-dark/80 border border-vwa-background ${item.color}`}
                    >
                        <span className="px-3 text-center">{item.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
