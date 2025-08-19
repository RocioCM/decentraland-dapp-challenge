import React from "react";
import { Button, Card, Center, Header, Loader } from "decentraland-ui";
import { useNavigate } from "react-router-dom";
import { Props } from "./Home.types";
import "./Home.css";

const Home: React.FC<Props> = ({ address, isConnected, onConnect, isConnecting, error, balance, isLoadingBalance, onRefreshBalance }) => {
  const navigate = useNavigate();

  const handleTransferClick = () => {
    navigate("/transfer");
  };

  return (
    <Center>
      {!isConnected ? (
        <>
          <Card>
            <Header>Welcome to Dummy Token Manager</Header>
            <p>Connect your wallet to start managing your Dummy Tokens</p>
            <Button primary onClick={onConnect} loading={isConnecting} fluid>
              Connect Wallet
            </Button>
            {error ? <p className="error">{error}</p> : null}
          </Card>
        </>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", minWidth: "400px" }}>
          {/* Wallet Info Card */}
          <Card>
            <Header>Wallet</Header>
            <p>
              <strong>Address:</strong>&nbsp;
              {address.slice(0, 6) + "..." + address.slice(-4)}
            </p>
          </Card>

          {/* Balance Card */}
          <Card>
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
          </Card>

          {/* Actions Card */}
          <Card>
            <Header>Actions</Header>
            <Button primary fluid onClick={handleTransferClick} disabled={parseFloat(balance) === 0}>
              Transfer Tokens
            </Button>
          </Card>
        </div>
      )}
    </Center>
  );
};

export default Home;
