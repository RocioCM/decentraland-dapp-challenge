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
      <Center>
        <div className="Home" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
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
            {error ? <p className="Error">An error occurred while connecting your wallet. Please try again.</p> : null}
          </div>
          <img className="Image" src="/decentraland.png" alt="Dummy Token" />
        </div>
      </Center>
    );

  return (
    <Center>
      <div className="WalletContainer animate__animated animate__fadeInLeft">
        <p className="WalletAddress">
          <strong>Connected Wallet: </strong>
          <span style={{ fontSize: "1.2rem", marginBottom: "1.5rem", display: "flex", gap: "0.5rem" }}>
            <span>{address.slice(0, 6) + "..." + address.slice(-4)}</span>
            <Icon
              name={copied ? "check" : "copy outline"}
              color={copied ? "green" : undefined}
              onClick={() => {
                navigator.clipboard.writeText(address);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            />
          </span>
        </p>

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

        <Header>Actions</Header>
        <div className="ActionsContainer">
          <Button fluid inverted onClick={onMint} loading={isMinting}>
            <Icon name="plus" /> Mint Dummy Tokens
          </Button>
          <Button fluid primary onClick={handleTransferClick} disabled={parseFloat(balance) === 0}>
            <Icon name="paper plane" /> Transfer Tokens
          </Button>
        </div>

        {mintError && <p className="Error">An error occurred while minting your tokens. Please try again.</p>}
      </div>
    </Center>
  );
};

export default Home;
