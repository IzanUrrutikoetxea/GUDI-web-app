import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { handleSend, handleGetStats } from "./handlers/notifications";

const PROTO_PATH = path.join(__dirname, "../proto/notifications.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = grpc.loadPackageDefinition(packageDef) as any;

function main() {
  const server = new grpc.Server();

  server.addService(proto.notifications.NotificationsService.service, {
    Send: handleSend,
    GetStats: handleGetStats,
  });

  const port = process.env.GRPC_PORT || "50051";
  const addr = `0.0.0.0:${port}`;

  server.bindAsync(addr, grpc.ServerCredentials.createInsecure(), (err, boundPort) => {
    if (err) {
      console.error("Failed to start gRPC server:", err);
      process.exit(1);
    }
    console.log(`gRPC notifications service running on port ${boundPort}`);
  });
}

main();
