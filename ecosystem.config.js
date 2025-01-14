module.exports = {
  apps: [
    {
      name: "moospire-frontend",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
      },
      autorestart: true, // Automatically restart the app if it crashes
      watch: false, // Set to true to watch for file changes and restart
      ignore_watch: ["node_modules", "logs"], // Ignore specific files/directories
      max_memory_restart: "1G", // Restart if memory usage exceeds 1GB
      instances: 1, // Number of instances to run (1 for single instance)
      exec_mode: "fork", // Use 'fork' mode for Node.js applications
    },
  ],
};
