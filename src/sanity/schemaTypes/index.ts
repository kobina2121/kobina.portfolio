import { certification } from "@/sanity/schemaTypes/certification";
import { education } from "@/sanity/schemaTypes/education";
import { experience } from "@/sanity/schemaTypes/experience";
import { project } from "@/sanity/schemaTypes/project";
import { projectLink } from "@/sanity/schemaTypes/objects/projectLink";
import { projectMedia } from "@/sanity/schemaTypes/objects/projectMedia";
import { service } from "@/sanity/schemaTypes/service";
import { siteSettings } from "@/sanity/schemaTypes/siteSettings";
import { skill } from "@/sanity/schemaTypes/skill";
import { testimonial } from "@/sanity/schemaTypes/testimonial";

export const schemaTypes = [
  siteSettings,
  project,
  experience,
  skill,
  service,
  education,
  certification,
  testimonial,
  projectLink,
  projectMedia,
];
