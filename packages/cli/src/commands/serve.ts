import { Command } from "commander";
import { serve } from "local-api";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing.")
  .option("-p, --port <number>", "Port to run server on", "4005")
  .action(async (filename = "notebook.js", options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      console.info(
        `Opened ${filename}. Navigate to http://localhost:${options.port} to edit.`
      );
    } catch (error: any) {
      if (error.code === "EADDRINUSE")
        console.error("Port is in use. Try a different port.");
      else console.log("Error serving notebook: ", error);
      process.exit(1);
    }
  });
