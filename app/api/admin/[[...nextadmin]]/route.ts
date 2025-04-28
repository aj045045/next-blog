import prisma from "@/lib/prisma";
import { createHandler } from "@premieroctet/next-admin/appHandler";
import options from "@/lib/next-admin-options";

const { run } = createHandler({
  apiBasePath: "/api/admin",
  prisma,
  options
});

export { run as DELETE, run as GET, run as POST };
