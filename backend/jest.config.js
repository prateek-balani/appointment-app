module.exports = {
  testEnvironment: "node", // Use Node.js environment for backend testing
  setupFilesAfterEnv: ["<rootDir>/backend/jest.setup.js"], // Optional setup file
  moduleDirectories: ["node_modules", "<rootDir>"], // Add this line
};
  
