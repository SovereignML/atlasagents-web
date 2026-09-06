import { NotFound } from "@/components/ui/ghost-404-page"

// Landing site has no session — always render the logged-out 404.
export default function NotFoundPage() {
  return <NotFound isLoggedIn={false} />
}
