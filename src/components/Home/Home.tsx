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
        <div className="home">
          <div className="home-content">
            <h2 className="home-title">Welcome to Dummy Token Manager</h2>
            <p className="home-subtitle">
              Connect your wallet to start managing your <br />
              Dummy Tokens
            </p>
            <div className="home-button-container">
              <Button primary onClick={onConnect} loading={isConnecting} size="massive">
                Connect Wallet
              </Button>
            </div>
            {error ? <p className="home-error">An error occurred while connecting your wallet. Please try again.</p> : null}
          </div>
          <img className="home-image" src="/decentraland.png" alt="Dummy Token" />
        </div>
      </Center>
    );

  return (
    <Center>
      <div className="home-wallet-container animate__animated animate__fadeInLeft">
        <p className="home-wallet-address">
          <strong>Connected Wallet: </strong>
          <span className="home-wallet-address-text">
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
        <div className="home-balance-container">
          <div>
            {isLoadingBalance ? (
              <Skeleton baseColor="#151515" highlightColor="#303030" width="150px" height="2.5rem" />
            ) : (
              <p className="home-balance-amount">
                <strong>{balance} DT</strong>
              </p>
            )}
          </div>
          <Button basic onClick={onRefreshBalance} loading={isLoadingBalance}>
            <Icon name="refresh" /> Refresh
          </Button>
        </div>

        <Header>Actions</Header>
        <div className="home-actions-container">
          <Button fluid inverted onClick={onMint} loading={isMinting}>
            <Icon name="plus" /> Mint Dummy Tokens
          </Button>
          <Button fluid primary onClick={handleTransferClick} disabled={parseFloat(balance) === 0}>
            <Icon name="paper plane" /> Transfer Tokens
          </Button>
        </div>

        {mintError && <p className="home-error">An error occurred while minting your tokens. Please try again.</p>}
      </div>
    </Center>
  );
};

export default Home;
