import GenresSection from "@/components/GenresSection";
import Banner from "@/components/Banner";
import FeaturedEbooks from "@/components/Featuredebooks";
import TopWriters from "@/components/Topwriters";
import { getFeaturedBooks, getTopWriters } from "@/lib/api/books";

export default async function Home() {
  const [featuredBooks, topWriters] = await Promise.all([
    getFeaturedBooks(),
    getTopWriters(),
  ]);

  return (
    <div>
      <Banner />
      <FeaturedEbooks books={featuredBooks} />
      <TopWriters writers={topWriters} />
      <GenresSection />
    </div>
  );
}