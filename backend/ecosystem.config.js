module.exports = {
  apps: [
    {
      name: "socket-server-3000",
      script: "src/index.ts",
      interpreter: "npx",
      interpreterArgs: "ts-node",
      env: {
        PORT: 3000
      }
    },
    {
      name: "socket-server-3001",
      script: "src/index.ts",
      interpreter: "npx",
      interpreterArgs: "ts-node",
      env: {
        PORT: 3001
      }
    },
    {
      name: "socket-server-3002",
      script: "src/index.ts",
      interpreter: "npx",
      interpreterArgs: "ts-node",
      env: {
        PORT: 3002
      }
    }
  ]
};
