import React from "react";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import {
  faGlobe,
  faBolt,
  faBug,
  faCloud,
  faArrowUpLong,
} from "@fortawesome/free-solid-svg-icons";

ChartJS.register(BarElement, CategoryScale, LinearScale);

interface AssetBoxProps {
  type: string;
  name: string;
  total: number;
  live: number[];
  monitored: number[];
  ips: number;
  ports: number;
  vulns: number;
  onClick: () => void;
}

const AssetBox: React.FC<AssetBoxProps> = ({
  type,
  name,
  total,
  live,
  monitored,
  ips,
  ports,
  vulns,
  onClick,
}) => {
  const liveSum = live.reduce((a, b) => a + b, 0);
  const monitoredSum = monitored.reduce((a, b) => a + b, 0);

  let backgroundColor;
  let icon;
  if (type === "Domain") {
    backgroundColor = "#df6710"; // Blue background for domain
    icon = (
      <FontAwesomeIcon
        icon={faGlobe}
        style={{ fontSize: "2rem", color: "#ffffff" }}
      />
    );
  } else if (type === "IP") {
    backgroundColor = "#565392"; // Green background for IP
    icon = (
      <FontAwesomeIcon
        icon={faGlobe}
        style={{ fontSize: "2rem", color: "#ffffff" }}
      />
    );
  } else if (type === "Cloud") {
    backgroundColor = "#d1b003"; // Yellow background for cloud
    icon = (
      <FontAwesomeIcon
        icon={faCloud}
        style={{ fontSize: "2rem", color: "#ffffff" }}
      />
    );
  }

  const liveData = {
    labels: live.map((_, index) => `Data ${index + 1}`),
    datasets: [
      {
        data: live,
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const monitoredData = {
    labels: monitored.map((_, index) => `Data ${index + 1}`),
    datasets: [
      {
        data: monitored,
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Card
      sx={{
        borderRadius: "5px",
        backgroundColor: "#1E2229",
        color: "#ffffff",
        cursor: "pointer",
        position: "relative",

        "&:hover": {
          backgroundColor: "#37474f",
        },
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "90px",
            height: "90px",
            backgroundColor: "#a22626",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "80%",
              backgroundColor: backgroundColor,
            }}
          >
            {icon}
          </Box>
          <Typography
            sx={{
              backgroundColor: "white",
              padding: "2px",
              color: "black",
              width: "100%",
              textAlign: "center",
            }}
          >
            {total}
          </Typography>
          <IconButton
            sx={{
              position: "absolute",
              top: "4px",
              right: "4px",
              color: "#ffffff",
              transform: "rotate(45deg)",
            }}
          >
            <FontAwesomeIcon icon={faArrowUpLong} />
          </IconButton>
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            borderBottom: "2px solid #c7c7ca",
            display: "block",
            marginTop: "12px",
            fontSize: "14px",
          }}
        >
          {name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px",
            borderBottom: "2px solid #c7c7ca",
            marginTop: "15px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginBottom: "8px",
            }}
          >
            <Typography>Live</Typography>
            <Typography sx={{ marginLeft: "8px" }}>{liveSum}</Typography>
          </Box>
          <Box
            sx={{
              width: "80px",
              height: "40px",
            }}
          >
            <Bar data={liveData} options={chartOptions} />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginBottom: "8px",
            }}
          >
            <Typography>Monitored</Typography>
            <Typography sx={{ marginLeft: "8px" }}>{monitoredSum}</Typography>
          </Box>
          <Box
            sx={{
              width: "80px",
              height: "40px",
            }}
          >
            <Bar data={monitoredData} options={chartOptions} />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "15px",
            borderRadius: "8px",
            padding: "16px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#327794",
              padding: "8px",
              marginRight: "8px",
              borderRadius: "6px",
            }}
          >
            <FontAwesomeIcon icon={faGlobe} style={{ fontSize: "24px" }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginRight: "10px",
            }}
          >
            <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
              IPs
            </Typography>
            <Typography
              sx={{ marginLeft: "8px", fontSize: "13px", fontWeight: "bold" }}
            >
              {ips}
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: "#327794",
              padding: "8px",
              marginRight: "8px",
              borderRadius: "6px",
            }}
          >
            <FontAwesomeIcon icon={faBolt} style={{ fontSize: "24px" }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginBottom: "8px",
              marginRight: "10px",
            }}
          >
            <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
              Ports
            </Typography>
            <Typography
              sx={{ marginLeft: "8px", fontSize: "13px", fontWeight: "bold" }}
            >
              {ports}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#327794",
              padding: "8px",
              marginRight: "8px",
              borderRadius: "6px",
            }}
          >
            <FontAwesomeIcon icon={faBug} style={{ fontSize: "24px" }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginBottom: "8px",
            }}
          >
            <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
              Vulns
            </Typography>
            <Typography
              sx={{ marginLeft: "8px", fontSize: "13px", fontWeight: "bold" }}
            >
              {vulns}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AssetBox;
