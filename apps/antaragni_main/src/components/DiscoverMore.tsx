"use client";

interface DiscoverItem {
  pic: { content: { url: string } };
  Link: { content: string };
}

const DiscoverMore = ({ data }: { data: DiscoverItem[] }) => {
  return (
    <section className="px-6 py-16 bg-[#101028] text-white">
      <h2 className="text-2xl font-bold text-yellow-400 text-center mb-10">
        Discover More
      </h2>

      {/* Grid of 3 items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {data.slice(0, 3).map((item, index) => (
          <a
            key={index}
            href={item.Link.content}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg overflow-hidden border border-yellow-400 shadow-lg block hover:scale-105 transition"
          >
            <img
              src={item.pic.content.url}
              alt={`Discover ${index + 1}`}
              className="w-full h-64 object-cover"
            />
          </a>
        ))}
      </div>
    </section>
  );
};

export default DiscoverMore;
