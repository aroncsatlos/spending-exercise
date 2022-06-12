import React, { useState } from "react";
import { InputStyles } from "../styles/InputStyles";
import { SelectStyles } from "../styles/SelectStyles";
import { FormStyles } from "../styles/ComponentStyles";
import { useApiContext } from "../contexts/ContextProvider";

export default function Form(props) {
  const { apiUrl } = useApiContext();
  const { setErrorMessage, updateList } = props;

  const [state, setState] = useState({
    description: "",
    amount: 0,
    currency: "USD",
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!state.description || !state.amount) {
      alert("Please fill in all fields");
      return;
    }
    fetch(`${apiUrl}/spendings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(response);
        if (response.error) {
          setErrorMessage(response.error);
        } else {
          setErrorMessage("");
          setState({
            description: "",
            amount: 0,
            currency: "USD",
          });
          updateList();
        }
        return;
      });
    // Don't empty the form with .finally(), so the user can correct the issue without retyping
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  }

  return (
    <>
      <FormStyles onSubmit={handleSubmit}>
        <InputStyles
          type="text"
          placeholder="description"
          name="description"
          value={state.description}
          onChange={handleChange}
        />
        <InputStyles
          type="number"
          placeholder="amount"
          name="amount"
          value={state.amount}
          onChange={handleChange}
        />
        <SelectStyles
          name="currency"
          value={state.currency}
          onChange={handleChange}
        >
          <option value="HUF">HUF</option>
          <option value="USD">USD</option>
        </SelectStyles>
        <InputStyles type="submit" value="Save" />
      </FormStyles>
    </>
  );
}
