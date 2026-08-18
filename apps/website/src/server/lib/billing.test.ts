import { beforeEach, describe, expect, it, vi } from "vitest";

process.env.NODE_ENV = "test";
process.env.DATABASE_URL = ":memory:";
process.env.SELF_HOSTED_PRO = "true";
delete process.env.AUTUMN_API_KEY;

const user = {
  id: "self_hosted_user",
  name: "Self Hoster",
  email: "self-hosted@example.com",
};

describe("self-hosted billing", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("grants permanent Pro entitlements without configuring checkout", async () => {
    const { getBilling, hasAutumn } = await import("./billing");

    expect(hasAutumn()).toBe(false);
    await expect(getBilling(user)).resolves.toEqual({
      configured: false,
      plan: "pro",
      priceMonthly: 8,
      features: { deviceRouting: true },
      limits: {
        devices: null,
        notificationsPerMonth: 100_000,
        servicePerMinute: 300,
        accountPerMinute: 1500,
      },
      usage: { notificationsRemaining: null },
    });
  });

  it("allows notifications without a billing provider", async () => {
    const { checkNotificationAllowance, trackNotification } = await import("./billing");

    await expect(checkNotificationAllowance(user.id)).resolves.toBe(true);
    await expect(trackNotification(user.id, "evt_self_hosted")).resolves.toBeUndefined();
  });
});
