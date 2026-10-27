import {
  FaChartColumn,
  FaCss3Alt,
  FaFigma,
  FaFileExcel,
  FaGitAlt,
  FaHtml5,
  FaJava,
  FaJs,
  FaNodeJs,
  FaReact,
} from "react-icons/fa6";
import {
  SiFirebase,
  SiFlutter,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiPhp,
  SiTypescript,
} from "react-icons/si";

import type { SkillIcon } from "@/lib/content/schema";

// One icon per value of the skill "icon" field.
export const skillIconMap = {
  html: FaHtml5,
  css: FaCss3Alt,
  javascript: FaJs,
  typescript: SiTypescript,
  react: FaReact,
  nextjs: SiNextdotjs,
  node: FaNodeJs,
  php: SiPhp,
  figma: FaFigma,
  git: FaGitAlt,
  mysql: SiMysql,
  mongodb: SiMongodb,
  firebase: SiFirebase,
  flutter: SiFlutter,
  powerbi: FaChartColumn,
  excel: FaFileExcel,
  java: FaJava,
} satisfies Record<SkillIcon, unknown>;
