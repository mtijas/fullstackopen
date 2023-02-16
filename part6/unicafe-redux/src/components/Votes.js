import { React } from "react";

export default function Votes({ votes }) {
  return (
    <>
      <div>Good: {votes.good}</div>
      <div>OK: {votes.ok}</div>
      <div>Bad: {votes.bad}</div>
    </>
  );
}
