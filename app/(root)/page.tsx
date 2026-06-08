import BannerSection from "@/components/BannerSection";
import BooksSection from "@/components/BooksSection";

const page = async ({
  searchParams,
}: {
  searchParams?: { search?: string };
}) => {
  return (
    <>
      <BannerSection />
      <BooksSection searchParams={searchParams} />
    </>
  );
};

export default page;
