import React from "react";
import { Button, Center, Header, Loader } from "decentraland-ui";
import { useNavigate } from "react-router-dom";
import { Props } from "./Home.types";
import "./Home.css";

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
  const navigate = useNavigate();

  const handleTransferClick = () => {
    navigate("/transfer");
  };

  if (!isConnected)
    return (
      <Center className="Home">
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
      </Center>
    );

  return (
    <Center className="Home">
      <Header>Wallet</Header>
      <p>
        <strong>Address: </strong>
        {address.slice(0, 6) + "..." + address.slice(-4)}
      </p>
      {/* Balance Card */}
      <Header>Token Balance</Header>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          {isLoadingBalance ? (
            <Loader active size="small" />
          ) : (
            <p style={{ fontSize: "24px", margin: 0 }}>
              <strong>{balance} DT</strong>
            </p>
          )}
        </div>
        <Button basic onClick={onRefreshBalance} loading={isLoadingBalance}>
          Refresh
        </Button>
      </div>

      {/* Actions Card */}
      <Header>Actions</Header>
      <Button primary onClick={handleTransferClick} disabled={parseFloat(balance) === 0}>
        Transfer Tokens
      </Button>
      <Button secondary onClick={onMint} loading={isMinting}>
        Mint 1000 DT Tokens
      </Button>
      {mintError && <p className="Error">{mintError}</p>}
    </Center>
  );
};

export default Home;
