import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft} from "lucide-react";
import { getBookBySlug } from "@/lib/actions/book.actions";
import VapiControls from "@/components/VapiControls";

const BookDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  // Check authentication
  const session = await auth();
  if (!session?.userId) {
    redirect("/sign-in");
  }

  // Fetch book by slug
  const resolvedParams = await params;
  const result = await getBookBySlug(resolvedParams.slug);

  // Redirect to home if book not found
  if (!result.success) {
    redirect("/");
  }

  const book = result.data;

  return (
    <div className="book-page-container min-h-screen bg-background pt-20 pb-12">
      {/* Floating Back Button */}
      <Link
        href="/"
        className="back-btn-floating fixed top-24 left-6 z-40 w-12 h-12 rounded-full bg-white border border-(--border-medium) shadow-(--shadow-soft-lg) flex items-center justify-center hover:shadow-(--shadow-soft-lg) transition-all"
      >
        <ArrowLeft className="w-5 h-5 text-(--text-primary)" />
      </Link>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        {/* VAPI Controls */}
        <VapiControls book={book} />
      </div>
    </div>
  );
};

export default BookDetailsPage;
