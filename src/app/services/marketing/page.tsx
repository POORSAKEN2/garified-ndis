import { ServicePage, serviceMetadata } from "@/components/service/ServicePage";

export const metadata = serviceMetadata("marketing");

export default function Page() {
  return <ServicePage id="marketing" />;
}
