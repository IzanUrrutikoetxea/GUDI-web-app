import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const PROTO_PATH = path.join(__dirname, "../../proto/notifications.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = grpc.loadPackageDefinition(packageDef) as any;

const NOTIFICATIONS_URL =
  process.env.NOTIFICATIONS_SERVICE_URL || "notifications-service:50051";

export const notificationsClient = new proto.notifications.NotificationsService(
  NOTIFICATIONS_URL,
  grpc.credentials.createInsecure()
);

export function sendNotification(
  recipient: string,
  content: string,
  channel: string
): Promise<{ success: boolean; id: string; timestamp: string; message: string }> {
  return new Promise((resolve, reject) => {
    notificationsClient.Send({ recipient, content, channel }, (err: any, response: any) => {
      if (err) return reject(err);
      resolve(response);
    });
  });
}

export function getNotificationStats(): Promise<{
  total: number;
  byEmail: number;
  byWhatsapp: number;
  byInternal: number;
}> {
  return new Promise((resolve, reject) => {
    notificationsClient.GetStats({}, (err: any, response: any) => {
      if (err) return reject(err);
      resolve(response);
    });
  });
}
