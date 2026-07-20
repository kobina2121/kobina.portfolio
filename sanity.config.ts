"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import {
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
  sanityStudioBasePath,
} from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";

export default defineConfig({
  name: "kobina-portfolio",
  title: "Kobina Portfolio Admin",
  basePath: sanityStudioBasePath,
  projectId: sanityProjectId!,
  dataset: sanityDataset,
  plugins: [
    structureTool(),
    visionTool({
      defaultApiVersion: sanityApiVersion,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
