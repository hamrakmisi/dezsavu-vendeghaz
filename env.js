#!/usr/bin/env node

/**
 * docker-cli.js
 * Usage:
 *   node docker-cli.js run      -> starts docker-compose and opens bash in the web container
 *   node docker-cli.js status   -> shows docker-compose ps
 *   node docker-cli.js down     -> stops containers
 *   node docker-cli.js logs     -> shows logs of the dev Next.js container
 */

const { exec, spawn } = require("child_process");

const command = process.argv[2];

if (!command) {
  console.log("Please provide a command: run | status | down | logs");
  process.exit(1);
}

const COMPOSE_FILE = "docker-compose.yml";
const WEB_SERVICE_NAME = "web";

switch (command) {
  case "run":
    console.log("Starting docker-compose in detached mode...");

    const up = spawn("docker", ["compose", "-f", COMPOSE_FILE, "up", "-d"], { stdio: "inherit" });

    up.on("close", (code) => {
      if (code === 0) {
        console.log(`Opening bash in ${WEB_SERVICE_NAME} container...`);
        const shell = spawn("docker", ["compose", "-f", COMPOSE_FILE, "exec", WEB_SERVICE_NAME, "sh"], { stdio: "inherit" });
        shell.on("close", () => process.exit(0));
      } else {
        console.error("Failed to start docker-compose");
        process.exit(code);
      }
    });
    break;

  case "status":
    exec(`docker compose -f ${COMPOSE_FILE} ps`, (err, stdout, stderr) => {
      if (err) {
        console.error("Error:", stderr);
        process.exit(1);
      }
      console.log(stdout);
    });
    break;

  case "down":
    exec(`docker compose -f ${COMPOSE_FILE} down`, (err, stdout, stderr) => {
      if (err) {
        console.error("Error:", stderr);
        process.exit(1);
      }
      console.log(stdout);
    });
    break;

  case "logs":
    const logs = spawn("docker", ["compose", "-f", COMPOSE_FILE, "logs", "-f", WEB_SERVICE_NAME], { stdio: "inherit" });
    logs.on("close", () => process.exit(0));
    break;

  default:
    console.log("Unknown command. Available: run | status | down | logs");
    process.exit(1);
}
