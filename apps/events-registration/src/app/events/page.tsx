import { eventsData } from '../../data/events';
import { StaggeredFadeIn } from '../../components/FadeIn';
import { Card } from '@repo/ui/event-card';

const EventsHubPage = () => {
  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="font-title text-5xl md:!text-7xl text-primary">
          Events & Competitions
        </h1>
        <p className="text-lg text-secondary mt-2 max-w-2xl mx-auto">
          The stage is set. The challenges await. Find your fire and compete with the best across a spectrum of cultural showcases.
        </p>

        <StaggeredFadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {eventsData.map((event) => (
              <Card
                key={event.slug}
                href={`/events/${event.slug}`}
                title={event.title}
                subtitle={event.category}
                imageUrl={event.imageUrl}
              />
            ))}
          </div>
        </StaggeredFadeIn>
      </div>
    </section>
  );
};

export default EventsHubPage;
