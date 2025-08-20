import React, { useState } from "react";
import { Button, Center, Header, Icon } from "decentraland-ui";
import { useNavigate } from "react-router-dom";
import { Props } from "./Home.types";
import "./Home.css";
import Skeleton from "react-loading-skeleton";

const Home: React.FC<Props> = ({
  address,
  isConnected,
  onConnect,
  isConnecting,
  error,
  balance,
  isLoadingBalance,
  onRefreshBalance,
  isMinting,
  mintError,
  onMint,
}) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleTransferClick = () => {
    navigate("/transfer");
  };

  if (!isConnected)
    return (
      <Center className="Home">
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div style={{ maxWidth: "500px" }}>
            <h2 className="Title">Welcome to Dummy Token Manager</h2>
            <p className="Subtitle">
              Connect your wallet to start managing your <br />
              Dummy Tokens
            </p>
            <div className="ButtonContainer">
              <Button primary onClick={onConnect} loading={isConnecting} size="massive">
                Connect Wallet
              </Button>
            </div>
            {error ? <p className="Error">{error}</p> : null}
          </div>
          <img className="Image" src="/decentraland.png" alt="Dummy Token" style={{ maxWidth: "300px", width: "100%", height: "auto" }} />
        </div>
      </Center>
    );

  return (
    <Center className="WalletContainer animate__animated animate__fadeInLeft">
      <div className="Card">
        <p style={{ fontSize: "1.2rem", marginBottom: "1.5rem", display: "flex", gap: "0.5rem" }}>
          <strong>Connected Wallet: </strong>
          {address.slice(0, 6) + "..." + address.slice(-4)}
          <Icon
            name={copied ? "check" : "copy outline"}
            color={copied ? "green" : undefined}
            onClick={() => {
              navigator.clipboard.writeText(address);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
          />
        </p>
        {/* Balance Card */}
        <Header>Token Balance</Header>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            {isLoadingBalance ? (
              <Skeleton baseColor="#151515" highlightColor="#303030" width="150px" height="2.5rem" />
            ) : (
              <p style={{ fontSize: "2.5rem", lineHeight: "1", margin: 0 }}>
                <strong>{balance} DT</strong>
              </p>
            )}
          </div>
          <Button basic onClick={onRefreshBalance} loading={isLoadingBalance}>
            <Icon name="refresh" /> Refresh
          </Button>
        </div>

        {/* Actions Card */}
        <Header>Actions</Header>
        <div
          style={{
            display: "flex",
            width: "500px",
            flexDirection: "row",
            alignItems: "center",
            gap: "1rem",
            justifyContent: "space-between",
          }}
        >
          <Button fluid inverted onClick={onMint} loading={isMinting}>
            <Icon name="plus" /> Mint Dummy Tokens
          </Button>
          <Button fluid primary onClick={handleTransferClick} disabled={parseFloat(balance) === 0}>
            <Icon name="paper plane" /> Transfer Tokens
          </Button>
        </div>

        {mintError && <p className="Error">{mintError}</p>}
      </div>
    </Center>
  );
};

export default Home;
