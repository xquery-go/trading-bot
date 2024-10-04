const reportStatus = (status) => {
  const { balance, stockOwned, stockPriceAtBuy } = status;

  console.log("=== Trading Bot Status ===");
  console.log(`Current Balance: $${balance}`);
  console.log(`Stock Owned: ${stockOwned ? "Yes" : "No"}`);

  if (stockOwned) {
    console.log(`Price at Purchase: $${stockPriceAtBuy}`);
  }

  console.log("===========================");
};

export default reportStatus;
