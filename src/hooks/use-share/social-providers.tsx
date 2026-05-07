import { FaFacebookF, FaLinkedinIn, FaSlack } from "react-icons/fa";
import { FaXTwitter, FaThreads } from "react-icons/fa6";

export type ShareConfig = {
  url: string;
  title?: string;
  text?: string;
};

export type SocialProvider =
  | "linkedin"
  | "facebook"
  | "slack"
  | "twitter"
  | "threads"
  | "clipboard";

export const SOCIAL_PROVIDERS = {
  linkedin: {
    name: "Linkedin",
    icon: <FaLinkedinIn className="h-4 w-4" />,
    shareUrl: (config: ShareConfig) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(config.url)}`,
  },
  facebook: {
    name: "Facebook",
    icon: <FaFacebookF className="h-4 w-4" />,
    shareUrl: (config: ShareConfig) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(config.url)}`,
  },
  slack: {
    name: "Slack",
    icon: <FaSlack className="h-4 w-4" />,
    shareUrl: (config: ShareConfig) =>
      `https://slack.com/share?url=${encodeURIComponent(config.url)}&text=${encodeURIComponent(config.title || "")}`,
  },
  twitter: {
    name: "Twitter",
    icon: <FaXTwitter className="h-4 w-4" />,
    shareUrl: (config: ShareConfig) =>
      `https://x.com/intent/tweet?url=${encodeURIComponent(config.url)}&text=${encodeURIComponent(config.title || "")}`,
  },
  threads: {
    name: "Threads",
    icon: <FaThreads className="h-4 w-4" />,
    shareUrl: (config: ShareConfig) =>
      `https://threads.net/intent/post?text=${encodeURIComponent(`${config.title || ""} ${config.url}`)}`,
  },
};
