import { IPropsLiNavbar } from "@/app/types/propsLiNavbar";

export default function LiNavbar({
  object: { title, id, icon: Icon },
  stateClickNavbar,
  setStateClickNavbar,
  setStateActiveNavbar,
}: IPropsLiNavbar) {
  const handleClickNavbar = () => {
    setStateClickNavbar(id);
  };

  return (
    <li
      onClick={() => {
        handleClickNavbar();
        setStateActiveNavbar(false);
      }}
      className={`${
        stateClickNavbar === id ? "bg-[#1e1e1e]" : ""
      } flex items-center justify-start p-4 ${
        stateClickNavbar !== id ? "hover:bg-gray-200" : ""
      }`}
    >
      <div
        className={`flex items-center gap-x-4 ${
          stateClickNavbar === id ? "text-white" : "text-gray-500"
        }`}
      >
        <Icon />
        <span>{title}</span>
      </div>
    </li>
  );
}
