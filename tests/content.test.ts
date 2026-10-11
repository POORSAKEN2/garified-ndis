import { describe, expect, it } from "vitest";
import { teamSizes } from "@/content/enquiry";
import { exampleSheets } from "@/content/examples";
import { exploreLabel, services } from "@/content/services";
import { home } from "@/content/site";
import { richToText } from "@/content/types";

// Guards the punctuation rules from spec 5.1 so a later edit cannot quietly break them.
describe("copy punctuation", () => {
  it("uses curly apostrophes in Let’s and We’ll", () => {
    expect(home.contact.eyebrow).toBe("Let’s find your starting point");
    expect(richToText(home.contact.text)).toContain("We’ll start");
  });

  it("uses straight apostrophes in team's, Garified's and home's", () => {
    expect(services[0].detail.hero.panel.title).toContain("team's approval");
    expect(services[3].detail.faq.items[0].a).toContain("Garified's core offer");
    expect(home.providers.tabs[1].accent).toBe("Scoped around each home's requirements");
  });

  it("keeps the reference's one curly apostrophe in team’s time", () => {
    expect(services[1].detail.included.intro).toContain("team’s time");
    expect(services[1].detail.included.items[2].text).toContain("team's review");
  });

  it("uses en dashes in team sizes", () => {
    expect(teamSizes.slice(0, 3)).toEqual(["1–7 workers", "8–15 workers", "16–25 workers"]);
  });
});

describe("services", () => {
  it("numbers the four services in order", () => {
    expect(services.map((s) => s.number)).toEqual(["01", "02", "03", "04"]);
    expect(services.map((s) => s.detail.included.eyebrow)).toEqual([
      "01 / Your rostering support",
      "01 / Your administration support",
      "01 / Your marketing support",
      "01 / Your accounting support",
    ]);
  });

  it("builds aria labels from the title", () => {
    expect(exploreLabel(services[3])).toBe("Explore accounting support");
  });

  it("matches the reference's item counts on each service page", () => {
    for (const s of services) {
      expect(s.detail.included.items).toHaveLength(6);
      expect(s.detail.handover.prepares).toHaveLength(5);
      expect(s.detail.handover.control).toHaveLength(4);
      expect(s.detail.process.steps).toHaveLength(3);
      expect(s.detail.faq.items).toHaveLength(4);
    }
  });
});

describe("example sheets", () => {
  it("name every sheet and footer after a real handover output", () => {
    for (const s of services) {
      const sheet = exampleSheets[s.id];
      expect(s.detail.handover.prepares[sheet.output]).toBeDefined();
      expect(s.detail.handover.prepares[sheet.footer.output]).toBeDefined();
    }
  });
});

describe("richToText", () => {
  it("flattens line breaks and accent words", () => {
    expect(richToText(home.hero.title)).toBe("The business behind better care.");
    expect(richToText(home.services.title)).toBe("Four services. One clear partner.");
  });
});
