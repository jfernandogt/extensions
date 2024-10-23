import { ActionPanel, Action, List, Icon, Form, Detail } from "@raycast/api";
import { useMemo, useState } from "react";
import parseJwt from "./utils/jwt";

const INVALID_JWT = "Invalid JWT";

export default function () {
  const [input, setInput] = useState("");

  const jwtParsed = useMemo(() => parseJwt(input), [input]);

  const generateActions = (action: "header" | "payload") => {
    const contentText = action === "header" ? jwtParsed.header : jwtParsed.payload;

    return (
      <ActionPanel>
        <Action.CopyToClipboard title="Copy" content={contentText ?? INVALID_JWT} />
      </ActionPanel>
    );
  };

  return (
    <List
      isShowingDetail
      onSearchTextChange={(value) => setInput(value)}
      searchBarPlaceholder={"Paste your JWT token here..."}
    >
      <List.Item
        key={"header"}
        title={"Header"}
        icon={Icon.Lock}
        actions={generateActions("header")}
        detail={
          <List.Item.Detail
            markdown={
              jwtParsed.header
                ? `### Header\n\`\`\`json\n${JSON.stringify(JSON.parse(jwtParsed.header), null, 2)}\n\`\`\``
                : INVALID_JWT
            }
          />
        }
      />
      <List.Item
        key={"payload"}
        title={"Payload"}
        icon={Icon.LockUnlocked}
        actions={generateActions("payload")}
        detail={
          <List.Item.Detail
            markdown={
              jwtParsed.payload
                ? `### Payload\n\`\`\`json\n${JSON.stringify(JSON.parse(jwtParsed.payload), null, 2)}\n\`\`\``
                : INVALID_JWT
            }
          />
        }
      />
    </List>
  );
}
