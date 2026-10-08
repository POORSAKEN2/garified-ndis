import { ServicePage, serviceMetadata } from "@/components/service/ServicePage";

export const metadata = serviceMetadata("rostering");

export default function Page() {
  return <ServicePage id="rostering" />;
}
