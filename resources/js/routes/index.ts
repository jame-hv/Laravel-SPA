import { useLang } from "@/hooks/use-lang";
import {
  BookOpen,
  GalleryVerticalEnd,
  SquareTerminal,
  User,
} from "lucide-react";

export const data = {
  company: {
    name: "ABC Inc",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
  navMain: [
    {
      title: ".dashboard",
      url: route("dashboard"),
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: ".users",
      url: route("users.index"),
      icon: User,
    },

    {
      title: ".documentation.title",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: ".documentation.intro",
          url: "#",
        },
        {
          title: ".documentation.installation",
          url: "#",
        },
        {
          title: ".documentation.manual",
          url: "#",
        },
        {
          title: ".documentation.changelog",
          url: "#",
        },
      ],
    },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
};
