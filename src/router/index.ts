import { lazy } from "react";
import { createBrowserRouter, redirect, RouteObject } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { ICON, ROUTES } from "./type";

import { generateIcon } from "@/components/base/generateIcon";

// Type definition for the sidebar items
export type CustomeRoute = RouteObject & {
  path: string;
  name?: string;
  redirect?: string;
  meta?: {
    /**
     * A function that returns a JSX.Element representing the icon for the route.
     * Accepts a `color` parameter to dynamically set the icon color,
     * enabling efficient resource management and seamless adaptation to themes like dark mode.
     */
    icon?: (color: string) => JSX.Element;
    displayName?: string;
    slug?: string;
    requireAuth?: boolean; // Specifies if authentication is required for this route
    permissions?: string[]; // Array of permissions required to access this route
  };
  children?: CustomeRoute[];
};

export const routeConfig: CustomeRoute[] = [
  {
    path: ROUTES.Dashboard,
    Component: AppLayout,
    children: [
      {
        index: true,
        path: ROUTES.Dashboard,
        name: "Dashboard",
        meta: {
          icon: generateIcon(ICON.dashboard),
        },
        Component: lazy(() => import("@/pages/Dashboard")),
      },
      {
        name: "Transaction",
        path: ROUTES.Transaction,
        Component: lazy(() => import("@/pages/Transactions")),
        meta: {
          icon: generateIcon(ICON.transaction),
          slug: "transaction",
          requireAuth: true,
          permissions: ["view_transactions", "edit_transactions"],
        },
      },
      {
        name: "Accounts",
        path: ROUTES.Accounts,
        Component: lazy(() => import("@/pages/Accounts")),
        meta: {
          icon: generateIcon(ICON.account),
          slug: "accounts",
          requireAuth: true,
          permissions: ["view_accounts"],
        },
      },
      {
        name: "Investment",
        path: ROUTES.Investments,
        Component: lazy(() => import("@/pages/Investments")),
        meta: {
          icon: generateIcon(ICON.investment),
          slug: "investments",
          requireAuth: true,
          permissions: ["manage_investments"],
        },
      },
      {
        name: "Credit Card",
        path: ROUTES.CreditCard,
        Component: lazy(() => import("@/pages/CreditCards")),
        meta: {
          icon: generateIcon(ICON.credtCard),
          slug: "credit_card",
          requireAuth: true,
          permissions: ["manage_credit_cards"],
        },
      },
      {
        name: "Loans",
        path: ROUTES.Loans,
        Component: lazy(() => import("@/pages/Loans")),
        meta: {
          icon: generateIcon(ICON.loans),
          slug: "loans",
          requireAuth: true,
          permissions: ["manage_loans"],
        },
      },
      {
        name: "Services",
        path: ROUTES.Services,
        Component: lazy(() => import("@/pages/Services")),
        meta: {
          icon: generateIcon(ICON.services),
          slug: "services",
          requireAuth: true,
          permissions: ["access_services"],
        },
      },
      {
        name: "Privileges",
        path: ROUTES.Privileges,
        Component: lazy(() => import("@/pages/Privileges")),
        meta: {
          icon: generateIcon(ICON.privileges),
          slug: "privileges",
          requireAuth: true,
          permissions: ["manage_privileges"],
        },
      },
      {
        name: "Settings",
        path: ROUTES.Settings,
        Component: lazy(() => import("@/pages/Settings")),
        meta: {
          icon: generateIcon(ICON.settings),
          slug: "settings",
          requireAuth: true,
          permissions: ["access_settings"],
        },
        children: [
          {
            path: ROUTES.Settings,
            index: true,
            loader: async () => redirect(`${ROUTES.Settings}/profile`),
          },
          {
            path: "profile",
            Component: lazy(() => import("@/components/settings/EditProfile")),
            meta: {
              slug: "profile",
              requireAuth: true,
              permissions: ["edit_profile"],
            },
          },
          {
            path: "security",
            Component: lazy(() => import("@/components/settings/Security")),
            meta: {
              slug: "security",
              requireAuth: true,
              permissions: ["manage_security"],
            },
          },
          {
            path: "preferences",
            Component: lazy(() => import("@/components/settings/Preferences")),
            meta: {
              slug: "preferences",
              requireAuth: true,
              permissions: ["edit_preferences"],
            },
          },
        ],
      },
      {
        path: "*",
        Component: lazy(() => import("@/pages/NotFound")),
      },
    ],
  },
];

export type SideBarItem = Pick<
  CustomeRoute,
  "name" | "redirect" | "path" | "meta"
> & { children?: SideBarItem[] };

export const getSidebarItems = (routes: SideBarItem[]): SideBarItem[] => {
  const extractNamedItems = (items: SideBarItem[]): SideBarItem[] => {
    return items.reduce<SideBarItem[]>((acc, item) => {
      if (item.name) {
        // Include the current item if it has a name
        acc.push({
          name: item.name,
          path: item.path,
          redirect: item.redirect,
          meta: item.meta,
        });
      }
      // Recursively process children, if any
      if (item.children) {
        acc.push(...extractNamedItems(item.children));
      }
      return acc;
    }, []);
  };

  return extractNamedItems(routes);
};

export const router = createBrowserRouter(routeConfig);
