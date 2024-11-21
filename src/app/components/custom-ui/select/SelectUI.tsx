// "use client";

// import { ArrowDown } from "lucide-react";
// import { useState } from "react";

// Prueba de valores options
// const options = ["asd", "estatuas", "microondas", "mesa", "cuarto"];

// export default function SelectUI() {
//   const [selectClicked, setSelectClicked] = useState(false);
//   const [placeHolder, setPlaceHolder] = useState("Placeholder");

//   const minWidth = options
//     .map((item) => {
//       return item.length * 8;
//     })
//     .sort((a, b) => b - a);

//   return (
//     <div className="rounded-sm select-none relative bg-orange-500">
//       <div
//         className="h-full flex items-center gap-x-2 py-1 pl-3 pr-1 "
//         onClick={() => setSelectClicked(!selectClicked)}
//       >
//         <span style={{ minWidth: placeHolder.length * 8 }}>{placeHolder}</span>
//         <span>
//           <ArrowDown
//             size={16}
//             className={`${
//               selectClicked ? "rotate-0" : "rotate-180"
//             } transition-transform`}
//           />
//         </span>
//       </div>
//       <div
//         className={`${
//           selectClicked ? "block opacity-100" : "opacity-0"
//         } absolute top-full left-0 mt-2 z-50 outline outline-1 outline-slate-300 rounded-sm hover:cursor-pointer transition-all bg-white`}
//         style={{ minWidth: minWidth[0] }}
//       >
//         <ul>
//           {options.map((item, index) => {
//             return (
//               <li
//                 key={index}
//                 className="py-1 px-3 hover:bg-gray-200 transition-all"
//                 onClick={(e) => {
//                   setPlaceHolder((e.target as HTMLLIElement).textContent || "");
//                   setSelectClicked(false);
//                 }}
//               >
//                 {item}
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// }
