import { useSelector } from "react-redux";
import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";

function App() {
  const isThereCustomer = useSelector((store) => store.customer.fullName);

  console.log(isThereCustomer);
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {isThereCustomer ? (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      ) : (
        <CreateCustomer />
      )}
    </div>
  );
}

export default App;
