module.exports = {
  testEnvironment: "node", // Use Node.js environment for backend testing
  transform: {
   '^.+\\.js?$': require.resolve('babel-jest'), // Transpile JS, JSX, TS, TSX files using Babel
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Optional setup file
  moduleDirectories: ["node_modules", "<rootDir>"], // Add this line
};
  
