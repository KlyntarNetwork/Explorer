"use client";
import { FC, useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { CodeSnippet } from "@/components/ui";
import { decodeCalldata } from "@/helpers";

interface Props {
  bytecode: string;
}

interface DecodedCalldata {
  funcProto?: string;
  funcId?: string;
  parameters?: Array<{
    index: string;
    value: string;
  }>;
  error?: string;
}

export const ParsedBytecodeDisplay: FC<Props> = ({ bytecode }) => {
  const isEmpty = bytecode === "0x";
  const [functionData, setFunctionData] = useState<DecodedCalldata | null>(
    null
  );

  useEffect(() => {
    if (isEmpty) {
      setFunctionData(null);
      return;
    }

    let isMounted = true;

    (async () => {
      const parsedData = await decodeCalldata(bytecode);

      if (isMounted) {
        setFunctionData(parsedData);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [bytecode, isEmpty]);

  if (isEmpty) {
    return <CodeSnippet>No bytecode provided</CodeSnippet>;
  }

  return (
    <CodeSnippet>
      {functionData ? (
        functionData.error ? (
          <Typography variant="monospace">{functionData.error}</Typography>
        ) : (
          <>
            <Typography variant="monospace">
              Function: {functionData.funcProto}
            </Typography>
            <br />
            <Typography variant="monospace">
              MethodID: {functionData.funcId}
            </Typography>
            {functionData.parameters?.map((param) => (
              <Box key={param.index}>
                <Typography variant="monospace">
                  {param.index}: {param.value}
                </Typography>
              </Box>
            ))}
          </>
        )
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "65vh",
          }}
        >
          <CircularProgress
            sx={{
              color: "white",
              animation: "rotate 1.5s linear infinite",
              width: "50px",
              height: "50px",
            }}
          />
        </Box>
      )}
    </CodeSnippet>
  );
};
