import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Ellipsis, Home, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate, useLocation } from "@tanstack/react-router";

// Simple route name mapping for PavRisk CRM
const ROUTE_NAMES = {
  "/": "",
  "/dashboard": "Dashboard",
  "/analytics": "Analytics",
  "/reports": "Reports",
  "/collections": "Collections",
  "/payments": "Payments",
  "/invoices": "Invoices",
  "/receipts": "Receipts",
  "/customers": "Customers",
  "/customer-groups": "Customer Groups",
  "/communication": "Communication",
  "/users": "Users",
  "/roles": "Roles",
  "/ussd-logs": "USSD Logs",
  "/web-logs": "Web Logs",
};

// Convert path to readable label
const getPageLabel = (path) => {
  if (ROUTE_NAMES[path]) {
    return ROUTE_NAMES[path];
  }

  // Fallback: convert path segments to readable text
  const segments = path.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];

  return lastSegment
    ? lastSegment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "Home";
};

export const BreadCrumbs = () => {
  const [showAllCrumbs, setShowAllCrumbs] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = React.useCallback(
    (path) => {
      try {
        navigate({ to: path });
      } catch (error) {
        console.error("Navigation error:", error);
      }
    },
    [navigate],
  );

  // Generate breadcrumb path from current location
  const crumbs = React.useMemo(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs = [];

    // Always include home if we're not on home page
    if (location.pathname !== "/" && location.pathname !== "/dashboard") {
      breadcrumbs.push({
        path: "/dashboard",
        label: "Dashboard", // Empty for home icon
        isCurrent: false,
      });
    }

    // Build breadcrumbs from path segments
    let currentPath = "";
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;

      breadcrumbs.push({
        path: currentPath,
        label: getPageLabel(currentPath),
        isCurrent: currentPath === location.pathname,
      });
    });

    return breadcrumbs;
  }, [location.pathname]);

  const getVisibleCrumbs = React.useCallback(() => {
    if (showAllCrumbs) return crumbs;

    const maxVisible = 4;
    if (crumbs.length <= maxVisible) return crumbs;

    // Show first + last few items
    return [crumbs[0], ...crumbs.slice(crumbs.length - (maxVisible - 1))];
  }, [crumbs, showAllCrumbs]);

  const getCollapsedCrumbs = React.useCallback(() => {
    if (showAllCrumbs) return [];

    const maxVisible = 4;
    if (crumbs.length <= maxVisible) return [];

    // Middle items are collapsed
    return crumbs.slice(1, crumbs.length - (maxVisible - 1));
  }, [crumbs, showAllCrumbs]);

  const visibleCrumbs = React.useMemo(
    () => getVisibleCrumbs(),
    [getVisibleCrumbs],
  );
  const collapsedCrumbs = React.useMemo(
    () => getCollapsedCrumbs(),
    [getCollapsedCrumbs],
  );

  if (crumbs.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <Breadcrumb className="flex-1 min-w-0">
          <BreadcrumbList className="flex items-center gap-1 text-base flex-nowrap overflow-x-auto">
            {visibleCrumbs.map((c, idx) => {
              const isLast = idx === visibleCrumbs.length - 1;
              const shouldShowEllipsis =
                !showAllCrumbs && idx === 1 && collapsedCrumbs.length > 0;

              return (
                <React.Fragment key={c.path}>
                  {shouldShowEllipsis && (
                    <>
                      <BreadcrumbItem>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <BreadcrumbEllipsis asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-auto p-1 hover:bg-muted/50"
                                aria-label="Show hidden breadcrumbs"
                              >
                                <Ellipsis className="size-4 text-muted-foreground" />
                              </Button>
                            </BreadcrumbEllipsis>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="start"
                            className="min-w-[200px] max-w-[280px]"
                          >
                            {collapsedCrumbs.map((crumb) => (
                              <DropdownMenuItem
                                key={crumb.path}
                                onClick={() => handleNavigation(crumb.path)}
                                className="cursor-pointer capitalize text-sm flex items-center gap-2"
                              >
                                {crumb.path === "/dashboard" && (
                                  <Home className="size-4 flex-shrink-0" />
                                )}
                                <span className="truncate">
                                  {crumb.label || "Dashboard"}
                                </span>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator>
                        <ChevronRight className="size-4" />
                      </BreadcrumbSeparator>
                    </>
                  )}

                  <BreadcrumbItem
                    className={
                      c.path === "/dashboard" ? "w-auto" : "max-w-[200px]"
                    }
                  >
                    {isLast ? (
                      <BreadcrumbPage className="capitalize font-medium text-foreground truncate flex items-center gap-1">
                        {c.path === "/dashboard" ? (
                          <>
                            {/* <Home className="flex-shrink-0 size-4" /> */}
                            <span className="truncate font-medium">
                              {c.label}
                            </span>
                          </>
                        ) : (
                          <span className="truncate font-medium">
                            {c.label}
                          </span>
                        )}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <button
                          onClick={() => handleNavigation(c.path)}
                          className="capitalize text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-150 truncate inline-flex items-center cursor-pointer rounded-sm gap-1 py-1 px-2"
                          title={
                            c.path === "/dashboard"
                              ? "Go to Dashboard"
                              : `Go to ${c.label}`
                          }
                          aria-label={
                            c.path === "/dashboard"
                              ? "Navigate to Dashboard"
                              : `Navigate to ${c.label}`
                          }
                        >
                          {c.path === "/dashboard" ? (
                            <Home className="flex-shrink-0 size-4" />
                          ) : (
                            <span className="truncate">{c.label}</span>
                          )}
                        </button>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>

                  {!isLast && (
                    <BreadcrumbSeparator className="flex-shrink-0">
                      <ChevronRight className="size-4" />
                    </BreadcrumbSeparator>
                  )}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {collapsedCrumbs.length > 0 && (
        <div className="mt-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAllCrumbs(!showAllCrumbs)}
            className="text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 h-auto p-1 rounded transition-colors"
          >
            {showAllCrumbs
              ? "Show less"
              : `Show ${collapsedCrumbs.length} more`}
          </Button>
        </div>
      )}
    </div>
  );
};
