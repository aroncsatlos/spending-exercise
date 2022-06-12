import React, { useState } from "react";
import { InputStyles } from "../styles/InputStyles";
import { SelectStyles } from "../styles/SelectStyles";
import { FormStyles } from "../styles/ComponentStyles";
import { useApiContext } from "../contexts/ContextProvider";

export default function Form(props) {
  const { apiUrl } = useApiContext();
  const { setErrorMessage, updateList } = props;

  const initState = {
    description: "",
    amount: 0,
    currency: "USD",
  };

  const [formdata, setFormdata] = useState(initState);

  function handleSubmit(e) {
    e.preventDefault();
    if (!formdata.description || !formdata.amount) {
      alert("Please fill in all fields");
      return;
    }
    fetch(`${apiUrl}/spendings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
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
          setFormdata(initState);
          updateList();
        }
        return;
      });
    // Don't empty the form with .finally(), so the user can correct the issue without retyping
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormdata({
      ...formdata,
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
          value={formdata.description}
          onChange={handleChange}
        />
        <InputStyles
          type="number"
          placeholder="amount"
          name="amount"
          value={formdata.amount}
          onChange={handleChange}
        />
        <SelectStyles
          name="currency"
          value={formdata.currency}
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
