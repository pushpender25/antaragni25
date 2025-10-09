export interface Roadtrips {
  slug: string;
  title: string;
  category: string;
  imageUrl: string;
}

export const roadtrips: Roadtrips[] = [
  {
    slug: "BattleUnderground",
    title: "Battle Underground",
    category: "Rap",
    imageUrl: "/roadtrips/rap.jpg",
  },
  {
    slug: "synchro",
    title: "Synchronicity",
    category: "Battle of Bands",
    imageUrl: "/roadtrips/synchro.jpg",
  },
  {
    slug: "comickaun",
    title: "ComicKaun",
    category: "Stand-up Comedy",
    imageUrl: "/roadtrips/comickaun.jpg",
  },
  {
    slug: "junoon",
    title: "Junoon",
    category: "Rock",
    imageUrl: "/roadtrips/junoon.jpg",
  },
  {
    slug: "djwar",
    title: "DJ Wars",
    category: "Electronic Music",
    imageUrl: "/roadtrips/dj.jpg",
  },
  {
    slug: "nationals",
    title: "Nationals",
    category: "Grand Finale",
    imageUrl: "/roadtrips/nationals.jpg",
  },
];