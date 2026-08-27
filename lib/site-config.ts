export const siteConfig = Object.freeze({
  productName: "PrepMate",
  manifestUrl:
    process.env.NEXT_PUBLIC_PREPMATE_RELEASE_MANIFEST_URL?.trim() || "/latest.json",
  supportEmail:
    process.env.NEXT_PUBLIC_PREPMATE_SUPPORT_EMAIL?.trim() ||
    "support@example.invalid",
  securityEmail:
    process.env.NEXT_PUBLIC_PREPMATE_SECURITY_EMAIL?.trim() ||
    "security@example.invalid",
});
