import { globalNetworkData } from "../data";
import { assetUrl } from "../lib/assetUrl";

const railImages = [
  { src: "/poster/nyc-sunset.jpg", alt: "New York skyline at sunset" },
  { src: "/poster/cinema-red.jpg", alt: "Red-lit cinema auditorium" },
  ...globalNetworkData
    .filter((item) => item.imageUrl)
    .map((item) => ({ src: item.imageUrl!, alt: item.title })),
];

export default function ImageScrollRail() {
  return (
    <section className="border-y border-brand-line bg-brand-surface/30" aria-label="Festival photo scroll">
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-16 md:py-10">
        <div className="mb-4 flex items-end justify-between gap-4">
          <span className="label text-[10px] text-brand-muted">Festival frames</span>
          <span className="font-mono text-[10px] tracking-[0.18em] text-brand-muted/80">Scroll →</span>
        </div>
        <div className="image-scroll-rail">
          {railImages.map((image) => (
            <figure key={image.src} className="image-scroll-slide">
              <img src={assetUrl(image.src)} alt={image.alt} loading="lazy" className="image-scroll-photo" referrerPolicy="no-referrer" />
              <figcaption className="image-scroll-caption">{image.alt}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
