import { NextAdmin, PromisePageProps } from "@premieroctet/next-admin";
import { getNextAdminProps } from "@premieroctet/next-admin/appRouter";
import prisma from "@/lib/prisma";
import options from "@/lib/next-admin-options";
import { Metadata } from "next";
import { AdminDashboard } from "./admin-dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
}

export default async function AdminPage(props: PromisePageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const nextAdminProps = await getNextAdminProps({
    params: params.nextadmin,
    searchParams,
    basePath: "/admin",
    apiBasePath: "/api/admin",
    prisma,
    options
  });

  return <NextAdmin {...nextAdminProps}
    dashboard={<AdminDashboard />}
    user={{
      data: {
        name: "Ansh yadav",
        picture: "https://avatars.githubusercontent.com/u/113114943?v=4"
      },
      logout: "/api/logout",
    }}
  />;
}
