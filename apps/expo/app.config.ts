import type { ConfigContext, ExpoConfig } from "expo/config";

const isAndroidBuild = process.env.HARK_BUILD_PLATFORM === "android";
const googleServicesFile = "./google-services.json";
const hasGoogleServices = process.env.GOOGLE_SERVICES_JSON_CONFIGURED === "true";

export default ({ config: _config }: ConfigContext): ExpoConfig => ({
  name: "Hark",
  slug: "hark",
  version: "1.2",
  icon: "./assets/icon.png",
  scheme: "hark",
  orientation: "portrait",
  userInterfaceStyle: "light",
  platforms: ["ios", "android"],
  ios: {
    bundleIdentifier: "ceo.ryan.hark",
    usesAppleSignIn: true,
    icon: "./assets/icon.png",
    supportsTablet: false,
    // Communication Notifications + SiriKit. `aps-environment` is managed by
    // EAS capability sync but included so bare prebuilds get push entitlements.
    entitlements: {
      "aps-environment": "development",
      "com.apple.developer.usernotifications.communication": true,
      "com.apple.developer.siri": true,
    },
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      NSUserActivityTypes: ["INSendMessageIntent"],
    },
  },
  android: {
    package: process.env.ANDROID_PACKAGE ?? "club.touchtech.hark",
    icon: "./assets/icon.png",
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#035B49",
    },
    ...(hasGoogleServices ? { googleServicesFile } : {}),
  },
  plugins: [
    ...(isAndroidBuild ? [] : ["./plugins/with-ios-scene-delegate", "expo-apple-authentication"]),
    "expo-router",
    "expo-secure-store",
    [
      "expo-alternate-app-icons",
      [
        {
          name: "Teal",
          ios: "./assets/app-icons/teal.png",
          android: {
            foregroundImage: "./assets/app-icons/teal.png",
            backgroundColor: "#09606B",
          },
        },
        {
          name: "Blue",
          ios: "./assets/app-icons/blue.png",
          android: {
            foregroundImage: "./assets/app-icons/blue.png",
            backgroundColor: "#245493",
          },
        },
        {
          name: "Indigo",
          ios: "./assets/app-icons/indigo.png",
          android: {
            foregroundImage: "./assets/app-icons/indigo.png",
            backgroundColor: "#414781",
          },
        },
        {
          name: "Violet",
          ios: "./assets/app-icons/violet.png",
          android: {
            foregroundImage: "./assets/app-icons/violet.png",
            backgroundColor: "#66437D",
          },
        },
        {
          name: "Rose",
          ios: "./assets/app-icons/rose.png",
          android: {
            foregroundImage: "./assets/app-icons/rose.png",
            backgroundColor: "#84465F",
          },
        },
        {
          name: "Red",
          ios: "./assets/app-icons/red.png",
          android: {
            foregroundImage: "./assets/app-icons/red.png",
            backgroundColor: "#8D403D",
          },
        },
        {
          name: "Orange",
          ios: "./assets/app-icons/orange.png",
          android: {
            foregroundImage: "./assets/app-icons/orange.png",
            backgroundColor: "#925134",
          },
        },
        {
          name: "Gold",
          ios: "./assets/app-icons/gold.png",
          android: {
            foregroundImage: "./assets/app-icons/gold.png",
            backgroundColor: "#80651F",
          },
        },
        {
          name: "Black",
          ios: "./assets/app-icons/black.png",
          android: {
            foregroundImage: "./assets/app-icons/black.png",
            backgroundColor: "#292D2C",
          },
        },
      ],
    ],
    [
      "expo-notifications",
      {
        enableBackgroundRemoteNotifications: true,
      },
    ],
    "expo-web-browser",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#035B49",
      },
    ],
    [
      "expo-build-properties",
      {
        ios: {
          deploymentTarget: "16.4",
        },
      },
    ],
    ...(isAndroidBuild
      ? []
      : [
          [
            "expo-widgets",
            {
              bundleIdentifier: "ceo.ryan.hark.widgets",
              groupIdentifier: "group.ceo.ryan.hark",
              enablePushNotifications: true,
              frequentUpdates: true,
            },
          ] as [string, Record<string, unknown>],
          [
            "@bacons/apple-targets",
            {
              appleTeamId: process.env.APPLE_TEAM_ID ?? "9G68SMNHEU",
            },
          ] as [string, Record<string, unknown>],
        ]),
  ],
  extra: {
    eas: {
      projectId:
        process.env.EAS_PROJECT_ID ??
        (isAndroidBuild
          ? "245beaff-53e2-4a14-a314-8b7e78a3fc40"
          : "0fce08a7-f312-4b58-a907-85a648113946"),
    },
  },
});
