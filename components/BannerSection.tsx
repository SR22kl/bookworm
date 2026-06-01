
const BannerSection = () => {
  return (
    <>
      <main className="wrapper pt-27.5">
        <section className="hero-card overflow-hidden rounded-[2rem] border border-[#e7d8ba] bg-[#f5ead5] px-6 py-10 shadow-soft-lg lg:px-12 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[1.7fr_1.4fr_1fr] lg:items-center">
            <div className="space-y-8">
              <div className="text-sm uppercase tracking-[0.28em] text-[#7c5c3f]">
                SpokenPages
              </div>
              <div>
                <p className="text-[2.5rem] font-semibold leading-tight text-[#1d293b] md:text-[3.1rem]">
                  Your Library
                </p>
                <p className="mt-5 max-w-xl text-base leading-7 text-[#3e4b5e] sm:text-lg">
                  Convert your books into interactive AI conversations. Listen,
                  learn, and discuss your favorite reads with a beautifully
                  curated library experience.
                </p>
              </div>
              <button className="inline-flex h-14 items-center justify-center rounded-3xl bg-[#1f2937] px-6 text-base font-semibold text-white shadow-[0_10px_30px_rgba(31,41,55,0.18)] transition hover:bg-[#111827]">
                + Add new book
              </button>
            </div>

            <div className="hero-illustration">
              <img
                src="/assets/hero-illustration.png"
                alt="hero illustration"
                className="w-full"
              />
            </div>

            <div className="rounded-[1.75rem] bg-white p-6 shadow-soft-md border border-[#ece3d3] lg:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#7c5c3f]">
                Getting started
              </p>
              <div className="mt-6 space-y-4">
                <div className="step-card">
                  <div className="step-badge">1</div>
                  <div>
                    <p className="text-base font-semibold text-[#1f2937]">
                      Upload PDF
                    </p>
                    <p className="mt-1 text-sm text-[#536278]">
                      Add your book file
                    </p>
                  </div>
                </div>
                <div className="step-card">
                  <div className="step-badge">2</div>
                  <div>
                    <p className="text-base font-semibold text-[#1f2937]">
                      AI Processing
                    </p>
                    <p className="mt-1 text-sm text-[#536278]">
                      We analyze the content
                    </p>
                  </div>
                </div>
                <div className="step-card">
                  <div className="step-badge">3</div>
                  <div>
                    <p className="text-base font-semibold text-[#1f2937]">
                      Voice Chat
                    </p>
                    <p className="mt-1 text-sm text-[#536278]">
                      Discuss with AI
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default BannerSection;
