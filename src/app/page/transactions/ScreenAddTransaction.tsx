import { Dispatch } from "react";
import ScreenContentTransaction from "./ScreenContentTransaction";

export default function ScreenAddTransaction({
  state,
  setState,
}: {
  state: boolean;
  setState: Dispatch<boolean>;
}) {
  return state ? <ScreenContentTransaction dispatch={setState} /> : null;
}
