/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["**/*.ts", "!**/node_modules/**"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  preset: "@shelf/jest-mongodb",
};
