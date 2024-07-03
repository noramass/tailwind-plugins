import { resolve } from "node:path";

export default () => ({
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transform: {
    "^.+\\.tsx?$": "@swc/jest",
  },
  moduleNameMapper: {
    "src/(.*)": resolve("src/$1"),
    "test/(.*)": resolve("test/$1"),
  },
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts", "!**/node_modules/**"],
  coverageReporters: ["lcovonly"],
});
