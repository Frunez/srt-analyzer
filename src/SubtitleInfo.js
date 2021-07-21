import React from "react";
import { table, row, column, subText } from "./AppStyles";

const SubtitleInfo = ({ sub, prevSub }) => {
  const subDiff = prevSub ? sub.start - prevSub.end : sub.start;
  const errorColor = "rgb(250, 0, 100)";
  const subDiffStatusColor = subDiff < 0 ? errorColor : null;
  const subDurStatusColor = sub.end - sub.start < 0 ? errorColor : null;

  return (
    <div id={sub.number} style={table}>
      <div style={row}>
        <div
          style={{
            ...column,
            color: "white",
            height: "18px",
            minWidth: "10px",
            textAlign: "center",
            backgroundColor: "rgb(100, 100, 150)",
            borderRadius: "50%"
          }}
        >
          {sub.number}
        </div>
        <div style={{ ...column, ...subText }}>{sub.start}</div>
        <div style={{ ...column, ...subText, minWidth: "0" }}>==></div>
        <div style={{ ...column, ...subText }}>{sub.end}</div>
        <div style={{ ...column, ...subText }}>{sub.text}</div>
      </div>
      <div style={row}>
        <div style={{ color: subDiffStatusColor, ...column }}>
          <span
            style={{
              opacity: 0.7,
              fontSize: "12px"
            }}
          >
            diff:{" "}
          </span>
          <span>{subDiff}</span>
          <span style={{ opacity: 0.5, fontSize: "10px" }}>ms</span>
        </div>
        <div style={{ color: subDurStatusColor, ...column }}>
          <span
            style={{
              opacity: 0.7,
              fontSize: "12px"
            }}
          >
            dur:{" "}
          </span>
          <span>{sub.end - sub.start}</span>
          <span style={{ opacity: 0.5, fontSize: "10px" }}>ms</span>
        </div>
      </div>
    </div>
  );
};

export default SubtitleInfo;
