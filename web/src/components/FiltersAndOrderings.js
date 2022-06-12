import React from "react";

import {
  FiltersWrapper,
  Orderings,
  CurrencyFilters,
  CurrencyButton,
} from "../styles/ComponentStyles";

export default function CurrencyFilter(props) {
  const { filters, setFilters } = props;
  const [ordering, setOrdering] = React.useState("");

  function handleOrderingsChange(e) {
    setOrdering(e.target.value);
    setFilters({ ...filters, order: e.target.value });
  }

  function handleCurrencyFilterChange(currency) {
    setFilters({
      ...filters,
      currency: currency,
    });
  }
  return (
    <>
      <FiltersWrapper>
        <Orderings>
          <select onChange={handleOrderingsChange} value={ordering}>
            <option value="orderBy=spent_at&orderDirection=desc">
              Sort by Date descending (default)
            </option>
            <option value="orderBy=spent_at&orderDirection=asc">
              Sort by Date ascending
            </option>
            <option value="orderBy=amount&orderDirection=desc">
              Sort by Amount descending
            </option>
            <option value="orderBy=amount&orderDirection=asc">
              Sort by Amount ascending
            </option>
          </select>
        </Orderings>
        <CurrencyFilters>
          <li>
            <CurrencyButton
              onClick={() => handleCurrencyFilterChange("")}
              currencyFilter={filters.currency}
              name=""
            >
              ALL
            </CurrencyButton>
          </li>
          <li>
            <CurrencyButton
              onClick={() => handleCurrencyFilterChange("HUF")}
              currencyFilter={filters.currency}
              name="HUF"
            >
              HUF
            </CurrencyButton>
          </li>
          <li>
            <CurrencyButton
              onClick={() => handleCurrencyFilterChange("USD")}
              currencyFilter={filters.currency}
              name="USD"
            >
              USD
            </CurrencyButton>
          </li>
        </CurrencyFilters>
      </FiltersWrapper>
    </>
  );
}
