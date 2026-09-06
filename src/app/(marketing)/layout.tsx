import { MotionConfig } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No auth backend on the landing — the navbar always shows the logged-out
  // CTAs, which link across to app.{BRANDING.domain}.
  const isAuthenticated = false;

  return (
    // reducedMotion="user" makes every motion.* descendant honor the OS
    // "Reduce Motion" setting (transforms/layout dropped, opacity kept).
    <MotionConfig reducedMotion="user">
      <Navbar isAuthenticated={isAuthenticated} />
      <main className="relative z-10 min-h-screen pt-[100px]">{children}</main>
      <Footer />
    </MotionConfig>
  );
}
