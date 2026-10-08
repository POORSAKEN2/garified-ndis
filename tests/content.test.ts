import { describe, expect, it } from "vitest";
import { teamSizes } from "@/content/enquiry";
import { exploreLabel, serviceHeading, services } from "@/content/services";
import { home } from "@/content/site";
import { richToText } from "@/content/types";

// Guards the punctuation rules from spec 5.1 so a later edit cannot quietly break them.
describe("copy punctuation", () => {
  it("uses curly apostrophes in Let’s and We’ll", () => {
    expect(home.contact.eyebrow).toBe("Let’s find your starting point");
    expect(richToText(home.contact.text)).toContain("We’ll start");
  });

  it("uses straight apostrophes in team's, provider's and home's", () => {
    expect(services[0].page.intro).toContain("team's decision");
    expect(services[3].page.intro).toContain("provider's accountant");
    expect(home.providers.tabs[1].accent).toBe("Scoped around each home's requirements");
  });

  it("uses en dashes in team sizes", () => {
    expect(teamSizes.slice(0, 3)).toEqual(["1–7 workers", "8–15 workers", "16–25 workers"]);
  });
});

describe("services", () => {
  it("numbers the four services in order", () => {
    expect(services.map((s) => s.number)).toEqual(["01", "02", "03", "04"]);
    expect(services.map((s) => s.page.eyebrow)).toEqual([
      "01 / Garified services",
      "02 / Garified services",
      "03 / Garified services",
      "04 / Garified services",
    ]);
  });

  it("builds headings and aria labels from the title", () => {
    expect(serviceHeading(services[3])).toBe("Accounting support.");
    expect(exploreLabel(services[3])).toBe("Explore accounting support");
  });

  it("has five checklist items per service page", () => {
    expect(services.every((s) => s.page.items.length === 5)).toBe(true);
  });
});

describe("richToText", () => {
  it("flattens line breaks and accent words", () => {
    expect(richToText(home.hero.title)).toBe("The business behind better care.");
    expect(richToText(home.services.title)).toBe("Four services. One clear partner.");
  });
});
