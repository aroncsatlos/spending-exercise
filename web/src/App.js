import React, { useState, useReducer } from "react";
import ErrorFeedback from "./components/ErrorFeedback";
import Form from "./components/Form";
import FiltersAndOrderings from "./components/FiltersAndOrderings";
import SpendingList from "./components/SpendingList";
import Layout from "./components/Layout";
import { ContextProvider } from "./contexts/ContextProvider";

export default function App() {
  const [spendings, setSpendings] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [filters, setFilters] = useState({
    currency: "",
    order: "",
  });

  // It is not the most efficient way to do this, but it is the easiest way to
  const [updateList, forceUpdate] = useReducer((x) => x + 1, 0);

  return (
    <ContextProvider>
      <Layout>
        <ErrorFeedback errorMessage={errorMessage} />
        <Form setErrorMessage={setErrorMessage} updateList={forceUpdate} />
        <FiltersAndOrderings filters={filters} setFilters={setFilters} />
        <SpendingList
          updateList={updateList}
          filters={filters}
          spendings={spendings}
          setSpendings={setSpendings}
        />
      </Layout>
    </ContextProvider>
  );
}
