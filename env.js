#!/usr/bin/env node

import { exec, spawn } from "child_process";

const command = process.argv[2];
const args = process.argv.slice(3);

if (!command) {
  console.log("Please provide a command: run [--build] | status | down | logs");
  process.exit(1);
}

const COMPOSE_FILE = "docker-compose.yml";
const WEB_SERVICE_NAME = "web";

switch (command) {
  case "run":
    const shouldBuild = args.includes("--build");
    
    if (shouldBuild) {
      console.log("Building and starting docker-compose in detached mode...");
    } else {
      console.log("Starting docker-compose in detached mode...");
    }

    const upArgs = ["compose", "-f", COMPOSE_FILE, "up", "-d"];
    if (shouldBuild) {
      upArgs.push("--build");
    }

    const up = spawn("docker", upArgs, { stdio: "inherit" });

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
