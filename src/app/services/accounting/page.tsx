import { ServicePage, serviceMetadata } from "@/components/service/ServicePage";

export const metadata = serviceMetadata("accounting");

export default function Page() {
  return <ServicePage id="accounting" />;
}
