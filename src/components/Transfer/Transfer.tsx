import React, { useState } from "react";
import { Button, Card, Center, Header, Field, Loader } from "decentraland-ui";
import { useNavigate } from "react-router-dom";
import { Props } from "./Transfer.types";
import "./Transfer.css";

const Transfer: React.FC<Props> = ({ isConnected, balance, isLoadingBalance, isTransferring, transferError, onTransfer }) => {
  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const navigate = useNavigate();

  const handleTransfer = () => {
    if (transferTo && transferAmount) {
      onTransfer(transferTo, transferAmount);
      setTransferTo("");
      setTransferAmount("");
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  if (!isConnected) {
    return (
      <Center>
        <Card>
          <Header>Wallet Not Connected</Header>
          <p>Please connect your wallet first to transfer tokens.</p>
          <Button primary onClick={handleGoBack}>
            Go to Home
          </Button>
        </Card>
      </Center>
    );
  }

  return (
    <Center>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", minWidth: "400px" }}>
        {/* Back Button */}
        <Button basic onClick={handleGoBack} style={{ alignSelf: "flex-start" }}>
          ← Back to Home
        </Button>

        {/* Balance Info Card */}
        <Card>
          <Header>Available Balance</Header>
          {isLoadingBalance ? (
            <Loader active size="small" />
          ) : (
            <p style={{ fontSize: "24px", margin: 0, textAlign: "center" }}>
              <strong>{balance} DT</strong>
            </p>
          )}
        </Card>

        {/* Transfer Form Card */}
        <Card>
          <Header>Transfer Tokens</Header>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <Field label="Recipient Address" placeholder="0x..." value={transferTo} onChange={(_, { value }) => setTransferTo(value)} />
            <Field
              label="Amount"
              placeholder="0.0"
              value={transferAmount}
              onChange={(_, { value }) => setTransferAmount(value)}
              type="number"
              step="0.01"
            />
            <p style={{ fontSize: "12px", color: "#666", margin: "5px 0" }}>Available balance: {balance} DT</p>

            <Button
              primary
              fluid
              onClick={handleTransfer}
              loading={isTransferring}
              disabled={
                !transferTo ||
                !transferAmount ||
                parseFloat(transferAmount) <= 0 ||
                parseFloat(transferAmount) > parseFloat(balance) ||
                parseFloat(balance) === 0
              }
            >
              Transfer Tokens
            </Button>

            {transferError && (
              <p className="error" style={{ textAlign: "center", margin: "10px 0 0 0" }}>
                {transferError}
              </p>
            )}
          </div>
        </Card>
      </div>
    </Center>
  );
};

export default Transfer;
