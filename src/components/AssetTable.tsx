import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

interface Asset {
  grade: string;
  lastSeen: number;
  name: string;
  total_vuls: number;
  type: string;
}

interface AssetTableProps {
  assets: Asset[];
}

const AssetTable: React.FC<AssetTableProps> = ({ assets }) => {
  const formatDateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()} at ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ marginTop: "20px", backgroundColor: "#1D1E2C" }}
    >
      <Table sx={{ borderCollapse: "separate" }}>
        <TableHead sx={{ backgroundColor: "#464660" }}>
          <TableRow>
            <TableCell
              sx={{ borderBottom: "none", color: "rgba(255, 255, 255, 0.9)" }}
            >
              Grade
            </TableCell>
            <TableCell
              sx={{ borderBottom: "none", color: "rgba(255, 255, 255, 0.9)" }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{ borderBottom: "none", color: "rgba(255, 255, 255, 0.9)" }}
            >
              Total Vulnerabilities
            </TableCell>
            <TableCell
              sx={{ borderBottom: "none", color: "rgba(255, 255, 255, 0.9)" }}
            >
              Last Seen
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assets.map((asset, index) => (
            <TableRow
              key={index}
              sx={{
                borderCollapse: "0 8px",
                backgroundColor: "#2a2b3f",
                borderBottom: "none",
              }}
            >
              <TableCell
                sx={{
                  fontWeight: 500,
                  padding: "6px",
                  color: "rgba(255, 255, 255, 0.9)",
                  border: "0",
                  position: "relative",
                  width: "40px",
                  height: "44px",
                  "&:before, &:after": {
                    content: '""',
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "inherit",
                    height: "inherit",
                    backgroundColor: "#780120",
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  },
                  "&:before": {
                    zIndex: 1,
                  },
                  "&:after": {
                    zIndex: 2,
                  },
                  "& > span": {
                    position: "relative",
                    zIndex: 3,
                  },
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                    lineHeight: "55px",
                  }}
                >
                  {asset.grade}
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 500,
                  padding: "16px",
                  color: "rgba(255, 255, 255, 0.9)",
                  border: "0",
                }}
              >
                {asset.name}
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 500,
                  padding: "16px",
                  color: "rgba(255, 255, 255, 0.9)",
                  border: "0",
                }}
              >
                {asset.total_vuls}
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 500,
                  padding: "16px",
                  color: "rgba(255, 255, 255, 0.9)",
                  border: "0",
                }}
              >
                {formatDateTime(asset.lastSeen)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AssetTable;
