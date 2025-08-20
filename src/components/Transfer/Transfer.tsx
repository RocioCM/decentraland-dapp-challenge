import React, { useEffect, useState } from "react";
import { Button, Center, Field, Icon, Message } from "decentraland-ui";
import { useNavigate } from "react-router-dom";
import { Props } from "./Transfer.types";
import "./Transfer.css";

// Utility function to validate Ethereum address format
const isValidEthereumAddress = (address: string): boolean => {
  // Check if address is a valid Ethereum address format
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  return ethAddressRegex.test(address);
};

const Transfer: React.FC<Props> = ({ isConnected, balance, isTransferring, transferError, transferSuccess, onTransfer }) => {
  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const navigate = useNavigate();

  // Validation states
  const parsedAmount = parseFloat(transferAmount);
  const isAddressValid = !transferTo || isValidEthereumAddress(transferTo);
  const isAmountValid = !transferAmount || (parsedAmount > 0 && parsedAmount <= parseFloat(balance));
  const isFormValid = transferTo && transferAmount && isAddressValid && isAmountValid;

  const handleTransfer = () => {
    if (isFormValid) {
      onTransfer(transferTo, transferAmount);
    }
  };

  useEffect(() => {
    if (!isTransferring && !transferError) {
      // Reset form fields
      setTransferTo("");
      setTransferAmount("");
    }
  }, [isTransferring, transferError]);

  // Handle successful transfer
  useEffect(() => {
    if (transferSuccess) {
      // Show success message
      setShowSuccessToast(true);

      // Clear form
      setTransferTo("");
      setTransferAmount("");

      // Hide success message after some seconds
      const hideMessageTimer = setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);

      // Redirect to home after some seconds
      const redirectTimer = setTimeout(() => {
        navigate("/");
      }, 3200);

      return () => {
        clearTimeout(hideMessageTimer);
        clearTimeout(redirectTimer);
      };
    }
  }, [transferSuccess, navigate]);

  const handleGoBack = () => {
    navigate("/");
  };

  if (!isConnected) {
    return (
      <Center>
        <div className="transfer-not-connected">
          <h2>Wallet Not Connected</h2>
          <p className="transfer-not-connected-subtitle">Please connect your wallet first to transfer Dummy Tokens</p>
          <Button primary onClick={handleGoBack}>
            Go to Home
          </Button>
        </div>
      </Center>
    );
  }

  return (
    <Center className="animate__animated animate__fadeInUp">
      <div className="transfer-container">
        {/* Back Button */}
        <Button basic onClick={handleGoBack} className="transfer-back-button">
          <Icon name="arrow left" /> Back to Home
        </Button>

        {/* Transfer Form Card */}
        <h2 className="transfer-title">Transfer Tokens</h2>
        <div className="transfer-form">
          <Field
            fluid
            label="Recipient Address"
            placeholder="0x1a2b3c..."
            disabled={isTransferring}
            value={transferTo}
            onChange={(_, { value }) => setTransferTo(value)}
            error={transferTo ? !isAddressValid : false}
            message={transferTo && !isAddressValid ? "Please enter a valid Ethereum address" : ""}
          />
          <Field
            fluid
            label="Amount"
            placeholder="0.0"
            value={transferAmount}
            onChange={(_, { value }) => setTransferAmount(value)}
            type="number"
            step="0.01"
            disabled={isTransferring}
            error={transferAmount ? !isAmountValid : false}
            message={
              transferAmount && parsedAmount <= 0
                ? "Amount must be greater than 0"
                : transferAmount && parsedAmount > parseFloat(balance)
                  ? "Insufficient balance"
                  : ""
            }
          />
          <p className="transfer-balance-info">Available balance: {balance} DT</p>

          <Button
            primary
            fluid
            onClick={handleTransfer}
            loading={isTransferring}
            disabled={!isFormValid || isTransferring || parseFloat(balance) === 0}
          >
            <Icon name="paper plane" />
            Transfer Tokens
          </Button>

          {transferError && <p className="transfer-error">An error occurred and the transfer was unsuccessful. Try again later.</p>}
        </div>
      </div>

      {/* Success Message */}
      {showSuccessToast && (
        <Message
          success
          icon="check circle"
          header="Transfer Successful!"
          content="Your tokens have been transferred successfully."
          onClose={() => setShowSuccessToast(false)}
          className="transfer-success-toast"
        />
      )}
    </Center>
  );
};

export default Transfer;
