export default function base64(input: string, action: "encode" | "decode") {
  if (action === "encode") {
    return Buffer.from(input).toString("base64");
  } else {
    return Buffer.from(input, "base64").toString("utf-8");
  }
}
