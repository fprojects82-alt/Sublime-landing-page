import { BlogPreview } from "@/components/sections/BlogPreview";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Plans } from "@/components/sections/Plans";
import { Services } from "@/components/sections/Services";
import { Ugc } from "@/components/sections/Ugc";
import { getAllPosts } from "@/lib/blog";

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />
      <Services />
      <Ugc />
      <HowItWorks />
      <Plans />
      <BlogPreview posts={latestPosts} />
      <Faq />
      <FinalCta />
    </>
  );
}
