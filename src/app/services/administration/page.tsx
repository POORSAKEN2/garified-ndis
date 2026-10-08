import { ServicePage, serviceMetadata } from "@/components/service/ServicePage";

export const metadata = serviceMetadata("administration");

export default function Page() {
  return <ServicePage id="administration" />;
}
