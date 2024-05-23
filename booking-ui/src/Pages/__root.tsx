import Navbar from "@/components/Navbar"
import { createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
const isProd = import.meta.env.VITE_DEPLOY_ENV === "PROD"
export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      {!isProd && (
        <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
      )}
    </>
  ),
  notFoundComponent: () => { return (<p className="text-red-500">Root component not Sound</p>) }
})


