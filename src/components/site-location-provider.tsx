"use client";

import { createContext, useContext } from "react";

// Client components such as the navbar can't read site settings from MongoDB
// themselves, so the root layout passes the location down.
const SiteLocationContext = createContext("Accra, Ghana");

export function SiteLocationProvider({
  location,
  children,
}: {
  location: string;
  children: React.ReactNode;
}) {
  return (
    <SiteLocationContext.Provider value={location}>
      {children}
    </SiteLocationContext.Provider>
  );
}

export function useSiteLocation() {
  return useContext(SiteLocationContext);
}
