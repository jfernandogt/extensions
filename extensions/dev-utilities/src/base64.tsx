import { ActionPanel, Action, List, Icon } from "@raycast/api";
import { useMemo, useState } from "react";
import base64 from "./utils/base64";

export default function () {
  const [input, setInput] = useState<string>("");

  const encodedText = useMemo(() => base64(input, "encode"), [input]);
  const decodedText = useMemo(() => base64(input, "decode"), [input]);

  const generateActions = (action: "encode" | "decode") => {
    return (
      <ActionPanel>
        <Action.CopyToClipboard title="Copy" content={action === "encode" ? encodedText : decodedText} />
      </ActionPanel>
    );
  };

  return (
    <List
      onSearchTextChange={(value) => setInput(value)}
      searchBarPlaceholder={"String to encode/decode."}
    >
      <List.Item
        key={"encode"}
        title={"Encoded"}
        subtitle={encodedText}
        actions={generateActions("encode")}
        icon={Icon.Lock}
      />
      <List.Item
        key={"decode"}
        title={"Decoded"}
        subtitle={decodedText}
        actions={generateActions("decode")}
        icon={Icon.LockUnlocked}
      />
    </List>
  );
}
