"use client";
import { FC, ReactNode, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Grid, Typography, IconButton, Fade, Tooltip } from "@mui/material";
import { Label } from "@/components/ui";
import LaunchIcon from "@mui/icons-material/Launch";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import QrCodeIcon from "@mui/icons-material/QrCode";
import QRCodeStyling from "qr-code-styling";

interface Props {
  children?: ReactNode;
  header: {
    clipBoardValue?: string;
    title: string;
    value: string;
    label: {
      variant: "red" | "green" | "blue";
      value: string | number;
    };
    actionText?: {
      url?: string;
      value: string;
    };
  };
  items: Array<ReactNode | Array<ReactNode>>;
}

export const EntityPageLayout: FC<Props> = ({
  children: entityImage,
  header,
  items,
}) => {
  const [isQrVisible, setIsQrVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(header.clipBoardValue || "")
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  const toggleQrVisibility = () => {
    setIsQrVisible((prev) => !prev);
  };

  const qrRef = useRef<HTMLDivElement>(null);
  const qrInstance = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!header.clipBoardValue) return;

    if (!qrInstance.current) {
      qrInstance.current = new QRCodeStyling({
        width: 150,
        height: 150,
        type: "svg",
        data: header.clipBoardValue,
        image: "/icons/company/CoinIcon.svg",
        imageOptions: {
          margin: 2,
        },
        dotsOptions: {
          color: "#000000",
          type: "classy",
        },
        cornersSquareOptions: {
          type: "extra-rounded",
          color: "#000000",
        },
        backgroundOptions: {
          color: "#ffffff",
        },
      });
    }

    if (isQrVisible && qrRef.current) {
      qrRef.current.innerHTML = "";
      qrInstance.current.append(qrRef.current);
    }
  }, [isQrVisible, header.clipBoardValue]);

  const layoutHeader = (
    <Grid item xs={12}>
      <Typography variant="caption">{header.title}</Typography>
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <Typography variant="h1" sx={{ my: 0.25, wordBreak: "break-all" }}>
            {header.value}
          </Typography>
        </Grid>

        <Grid item sx={{ position: "relative" }}>
          <Tooltip title={copied ? "Copied!" : "Click to copy"} placement="top">
            <IconButton onClick={copyToClipboard} size="small">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid
          item
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            minWidth: 0,
          }}
        >
          <Tooltip title="View QR code" placement="top">
            <IconButton onClick={toggleQrVisibility} size="small">
              <QrCodeIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Fade in={isQrVisible}>
            <span
              style={{
                position: "absolute",
                left: "120%",
                top: "50%",
                transform: "translateY(-50%)",
                background: "white",
                padding: isQrVisible ? "8px" : 0,
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                zIndex: 10,
                display: isQrVisible ? "block" : "none",
              }}
            >
              <div ref={qrRef} />
            </span>
          </Fade>
        </Grid>
      </Grid>

      <Label sx={{ marginTop: 2 }} variant={header.label.variant}>
        {header.label.value}
      </Label>
      {header.actionText && (
        <>
          {header.actionText.url ? (
            <Link
              href={header.actionText.url}
              style={{ textDecoration: "none", marginLeft: "1rem" }}
            >
              <Typography variant="caption" color="primary.main">
                <LaunchIcon
                  color="primary"
                  sx={{
                    fontSize: "16px",
                    position: "relative",
                    bottom: "-3px",
                  }}
                />{" "}
                {header.actionText.value}
              </Typography>
            </Link>
          ) : (
            <Typography variant="caption" color="primary.main" sx={{ ml: 1 }}>
              {header.actionText.value}
            </Typography>
          )}
        </>
      )}
    </Grid>
  );

  const withImage = !!entityImage;

  const computeMarginTopForFirstItem = (index: number) =>
    index === 0 ? { mt: 1.5 } : {};
  const computeColumnWidth = (itemsCount: number) =>
    itemsCount > 1
      ? {
          [withImage ? "md" : "lg"]: Number((12 / itemsCount).toFixed(2)),
        }
      : {};

  const layoutContent = items
    .map((item, idx) => {
      const nestedItems = Array.isArray(item) ? item : [item];

      const gridProps = {
        item: true,
        sx: computeMarginTopForFirstItem(idx),
        xs: 12,
        ...computeColumnWidth(nestedItems.length),
      };

      return nestedItems.map((nestedItem, nestedIdx) => (
        <Grid {...gridProps} key={`${idx}${nestedIdx}`}>
          {nestedItem}
        </Grid>
      ));
    })
    .flat();

  const innerLayout = (
    <Grid container spacing={1}>
      {layoutHeader}
      {layoutContent}
    </Grid>
  );

  if (withImage) {
    return (
      <Grid container spacing={8}>
        <Grid item order={{ xs: 2, lg: 1 }} xs={12} lg={8} xl={7}>
          {innerLayout}
        </Grid>

        <Grid
          item
          order={{ xs: 1, lg: 2 }}
          xs={12}
          lg={4}
          xl={5}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {entityImage}
        </Grid>
      </Grid>
    );
  }

  return innerLayout;
};
