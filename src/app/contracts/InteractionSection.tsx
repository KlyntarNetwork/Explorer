"use client";

import { ethers } from "ethers";
import { Button, TextField, Typography, Box, Divider } from "@mui/material";
import { useState } from "react";

export const InteractionSection = ({ abi, address }: { abi: any[]; address: string }) => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [inputs, setInputs] = useState<Record<string, string[]>>({});
  const [outputs, setOutputs] = useState<Record<string, string>>({});


  const handleInputChange = (fnName: string, index: number, value: string) => {
    const current = inputs[fnName] || [];
    current[index] = value;
    setInputs({ ...inputs, [fnName]: current });
  };

  const callMethod = async (fn: any, isWrite: boolean) => {
    if (!contract) return;
    const fnName = fn.name;
    const args = inputs[fnName] || [];

    try {
      const result = isWrite
        ? await (await contract[fnName](...args)).wait()
        : await contract[fnName](...args);

      setOutputs({ ...outputs, [fnName]: JSON.stringify(result, null, 2) });
    } catch (err: any) {
      setOutputs({ ...outputs, [fnName]: err.message });
    }
  };

  const readFns = abi.filter((f: any) => f.type === "function" && (f.stateMutability === "view" || f.stateMutability === "pure"));
  const writeFns = abi.filter((f: any) => f.type === "function" && (f.stateMutability === "nonpayable" || f.stateMutability === "payable"));

  return (
    <Box>
      <Button variant="outlined" sx={{ mb: 3 }}>
        Connect Wallet
      </Button>

      <Typography variant="h5" sx={{ mt: 4, mb:2 }}>Read Contract</Typography>
      {readFns.map((fn: any) => (
        <FunctionForm key={fn.name} fn={fn} inputs={inputs} outputs={outputs} onChange={handleInputChange} onCall={callMethod} isWrite={false} />
      ))}

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" sx={{ mt: 4, mb:2 }}>Write Contract</Typography>
      {writeFns.map((fn: any) => (
        <FunctionForm key={fn.name} fn={fn} inputs={inputs} outputs={outputs} onChange={handleInputChange} onCall={callMethod} isWrite={true} />
      ))}
    </Box>
  );
}

function FunctionForm({
    fn,
    inputs,
    outputs,
    onChange,
    onCall,
    isWrite
  }: {
    fn: any;
    inputs: Record<string, string[]>;
    outputs: Record<string, string>;
    onChange: (fnName: string, index: number, value: string) => void;
    onCall: (fn: any, isWrite: boolean) => void;
    isWrite: boolean;
  }) {
    return (
      <Box sx={{ mb: 4, p: 3, border: "1px solid #333", borderRadius: 3, backgroundColor: "#0a0a0a" }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          {fn.name}
        </Typography>
  
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 2,
            mb: 2,
          }}
        >
          {fn.inputs.map((input: any, idx: number) => (
            <TextField
              key={idx}
              fullWidth
              margin="dense"
              label={`${input.name || "param" + idx} (${input.type})`}
              value={inputs[fn.name]?.[idx] || ""}
              onChange={(e) => onChange(fn.name, idx, e.target.value)}
              size="small"
              variant="outlined"
              InputProps={{
                sx: {
                  backgroundColor: "#1a1a1a",
                  borderRadius: 2,
                  color: "#fff"
                }
              }}
              InputLabelProps={{
                sx: { color: "#aaa" }
              }}
            />
          ))}
        </Box>
  
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onCall(fn, isWrite)}
          sx={{ mt: 1 }}
        >
          {isWrite ? "Send Transaction" : "Call"}
        </Button>
  
        {outputs[fn.name] && (
          <Box sx={{ mt: 2, backgroundColor: "#111", p: 2, borderRadius: 2 }}>
            <Typography variant="caption" color="gray">Result:</Typography>
            <Typography
              fontFamily="monospace"
              fontSize={14}
              sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word", color: "lightgreen" }}
            >
              {outputs[fn.name]}
            </Typography>
          </Box>
        )}
      </Box>
    );
  }
  