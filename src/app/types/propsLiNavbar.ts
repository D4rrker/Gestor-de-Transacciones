import { IOptionsNavbar } from "./propsOptionsNavbarTypes";

export interface IPropsLiNavbar {
  object: IOptionsNavbar;
  stateClickNavbar: number | null;
  setStateClickNavbar: React.Dispatch<React.SetStateAction<number | null>>;
  setStateActiveNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}
