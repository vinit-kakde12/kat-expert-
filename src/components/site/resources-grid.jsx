import { PdfViewerCard } from "./pdf-viewer-card";

function ResourcesGrid({ resources }) {
  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="container-x mx-auto max-w-6xl">
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {resources.map((resource) => (
            <PdfViewerCard
              key={resource.id}
              title={resource.title}
              subtitle={resource.subtitle}
              pdfUrl={resource.pdfUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export { ResourcesGrid };
