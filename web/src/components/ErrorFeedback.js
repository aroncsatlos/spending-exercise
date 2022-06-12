import React from "react";
import { ErrorStyles } from "../styles/ErrorStyles";

export default function ErrorFeedback(props) {
  const { errorMessage } = props;
  return errorMessage && <ErrorStyles>{errorMessage}</ErrorStyles>;
}
