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

  function handleOrderingsChange(event) {
    setOrdering(event.target.value);
    setFilters({ ...filters, order: event.target.value });
  }

  function handleFilterChange(c) {
    setFilters({
      ...filters,
      currency: c,
    });
  }
  return (
    <>
      <FiltersWrapper>
        <Orderings>
          <select onChange={handleOrderingsChange} value={ordering}>
            <option value="orderBy=date&orderDirection=desc">
              Sort by Date descending (default)
            </option>
            <option value="orderBy=date&orderDirection=asc">
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
              onClick={() => handleFilterChange("")}
              currencyFilter={filters.currency}
              name=""
            >
              ALL
            </CurrencyButton>
          </li>
          <li>
            <CurrencyButton
              onClick={() => handleFilterChange("HUF")}
              currencyFilter={filters.currency}
              name="HUF"
            >
              HUF
            </CurrencyButton>
          </li>
          <li>
            <CurrencyButton
              onClick={() => handleFilterChange("USD")}
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
