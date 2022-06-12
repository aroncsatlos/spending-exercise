import React, { useState, useEffect } from "react";
import { FiDollarSign } from "react-icons/fi";
import { DateTime } from "luxon";
import Loader from "./Loader";
import {
  ErrorMessage,
  Spending,
  IconWrapper,
  TextWrapper,
  Amount,
  AmountWrapper,
} from "../styles/ComponentStyles";
import { useApiContext } from "../contexts/ContextProvider";

export default function SpendingList({
  updateList,
  filters,
  spendings,
  setSpendings,
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { apiUrl } = useApiContext();

  useEffect(() => {
    setLoading(true);
    let filterSuffix = "?";
    if (filters.currency) {
      filterSuffix += `&currency=${filters.currency}`;
    }
    if (filters.order) {
      filterSuffix += `&${filters.order}`;
    }
    fetch(`${apiUrl}/spendings${filterSuffix}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        const body = await res.json();
        return {
          status: res.status,
          body,
        };
      })
      .then((response) => {
        if (response.status === 200) {
          setSpendings(response.body);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filters, updateList]);

  if (loading) return <Loader />;

  return (
    <>
      {error && (
        <ErrorMessage>
          The server is probably down. Please try again later.
        </ErrorMessage>
      )}
      {!spendings.length && !error && (
        <h1 style={{ textAlign: "center", marginTop: "4rem" }}>
          Yay!{" "}
          <span role="img" aria-label="jsx-a11y/accessible-emoji">
            🎉
          </span>{" "}
          No spendings!
        </h1>
      )}
      {spendings.length > 0 &&
        spendings.map((spending) => (
          <Spending key={spending.id}>
            <IconWrapper>
              <FiDollarSign color="var(--color-blue)" />
            </IconWrapper>
            <TextWrapper>
              <h3>{spending.description}</h3>
              <p>
                {DateTime.fromISO(spending.spent_at).toFormat(
                  "t - MMMM dd, yyyy"
                )}
              </p>
            </TextWrapper>
            <AmountWrapper>
              <Amount currency={spending.currency}>
                {spending.currency === "USD"
                  ? (spending.amount / 100).toFixed(2)
                  : spending.amount}
              </Amount>
            </AmountWrapper>
          </Spending>
        ))}
    </>
  );
}
