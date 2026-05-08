import * as grpc from "@grpc/grpc-js";
import { randomUUID } from "crypto";

// In-memory stats (resets on restart — intentionally simple)
const stats = { total: 0, byEmail: 0, byWhatsapp: 0, byInternal: 0 };

export function handleSend(
  call: grpc.ServerUnaryCall<any, any>,
  callback: grpc.sendUnaryData<any>
) {
  const { recipient, content, channel } = call.request;

  if (!recipient || !content || !channel) {
    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: "recipient, content and channel are required",
    });
  }

  const validChannels = ["EMAIL", "WHATSAPP", "INTERNAL"];
  if (!validChannels.includes(channel.toUpperCase())) {
    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: `Invalid channel. Valid values: ${validChannels.join(", ")}`,
    });
  }

  // Update stats
  stats.total += 1;
  if (channel.toUpperCase() === "EMAIL")    stats.byEmail    += 1;
  if (channel.toUpperCase() === "WHATSAPP") stats.byWhatsapp += 1;
  if (channel.toUpperCase() === "INTERNAL") stats.byInternal += 1;

  console.log(`[notifications] Sent via ${channel} to ${recipient}`);

  callback(null, {
    success: true,
    id: randomUUID(),
    timestamp: new Date().toISOString(),
    message: `Notification sent via ${channel} to ${recipient}`,
  });
}

export function handleGetStats(
  _call: grpc.ServerUnaryCall<any, any>,
  callback: grpc.sendUnaryData<any>
) {
  callback(null, { ...stats });
}
