import React, { useEffect, useState } from "react";
import { Container, CircularProgress, Grid } from "@mui/material";
import AssetBox from "./components/AssetBox";
import AssetTable from "./components/AssetTable";

interface Asset {
  grade: string;
  lastSeen: number;
  name: string;
  total_vuls: number;
  type: string;
}

interface AssetData {
  assets: Asset[];
  cloud: {
    ips: number;
    live: number[];
    monitored: number[];
    ports: number;
    total: number;
    total_live: number;
    total_monitored: number;
    vulns: number;
  };
  domain: {
    ips: number;
    live: number[];
    monitored: number[];
    ports: number;
    total: number;
    total_live: number;
    total_monitored: number;
    vulns: number;
  };
  ip: {
    ips: number;
    live: number[];
    monitored: number[];
    ports: number;
    total: number;
    total_live: number;
    total_monitored: number;
    vulns: number;
  };
}

const App: React.FC = () => {
  const [data, setData] = useState<AssetData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://run.mocky.io/v3/cf756b59-d746-4518-8221-55de4a7a8611"
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <CircularProgress />
      </div>
    );
  }

  if (!data) {
    return <div>Error loading data</div>;
  }

  const filteredAssets = selectedType
    ? data.assets.filter((asset) => asset.type === selectedType.toLowerCase())
    : data.assets;

  return (
    <main>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <AssetBox
              type="Domain"
              name="Domains"
              total={data.domain.total}
              live={data.domain.live}
              monitored={data.domain.monitored}
              ips={data.domain.ips}
              ports={data.domain.ports}
              vulns={data.domain.vulns}
              onClick={() => setSelectedType("domain")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <AssetBox
              type="IP"
              name="IP Addresses"
              total={data.ip.total}
              live={data.ip.live}
              monitored={data.ip.monitored}
              ips={data.ip.ips}
              ports={data.ip.ports}
              vulns={data.ip.vulns}
              onClick={() => setSelectedType("ip")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <AssetBox
              type="Cloud"
              name="Cloud Accounts"
              total={data.cloud.total}
              live={data.cloud.live}
              monitored={data.cloud.monitored}
              ips={data.cloud.ips}
              ports={data.cloud.ports}
              vulns={data.cloud.vulns}
              onClick={() => setSelectedType("cloud")}
            />
          </Grid>
        </Grid>
        <AssetTable assets={filteredAssets} />
      </Container>
    </main>
  );
};

export default App;
