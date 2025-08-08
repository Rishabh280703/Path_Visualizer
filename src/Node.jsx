import React from "react";
import "./Node.css"; // Styling ke liye

import "./Node.css"; // ✅ CSS file import kari styling ke liye

// ✅ Functional Component banaya jiska naam hai Node
// Props ke through row, col, isStart, isEnd, isWall aur mouse events aaye hain
const Node = ({
  row,
  col,
  isStart,
  isEnd,
  onClick, // Ye ab use nahi ho raha, optional hai (chahe toh hata bhi sakta hai)
  onMouseDown, // ✅ Jab mouse ka button dabate hai
  onMouseEnter, // ✅ Jab mouse kisi doosre box par le jaate ho drag karte time
  onMouseUp, // ✅ Jab mouse ka button chhod dete ho
  isWall, // ✅ Ye batata hai kya ye box ek wall hai ya nahi
}) => {
  // ✅ Class name decide karna: agar start node hai toh 'node-start'
  // agar end node hai toh 'node-end'
  // agar wall hai toh 'node-wall'
  // warna empty string
  const extraClassName = isStart
    ? "node-start"
    : isEnd
    ? "node-end"
    : isWall
    ? "node-wall"
    : "";

  return (
    <div
      id={`node-${row}-${col}`} // ✅ Unique id de diya har node ko based on row & col
      className={`node ${extraClassName}`} // ✅ className me node ke sath extra class lagayi
      onMouseDown={() => onMouseDown(row, col)} // ✅ Mouse press hote hi function chalega
      onMouseEnter={() => onMouseEnter(row, col)} // ✅ Mouse drag ke waqt function chalega
      onMouseUp={onMouseUp} // ✅ Mouse chhodne par function chalega
    ></div>
  );
};

export default Node; // ✅ Component ko export kar diya taaki App.jsx me use ho sake
