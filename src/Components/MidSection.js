import React, { useEffect, useState } from "react";
import "./MidSection.css";

function ColumnBuilder({ binary, rows }) {
  return binary ? (
    <div>
      <div className="MidBody__Center__Clock__Column">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <Circle
              key={index}
              visible={rows === 4 ? true : index + 1 > rows}
              active={binary[index] === "1"}
            />
          ))}
      </div>
      <span className="MidBody__Center__Clock__Time">
        {parseInt(binary, 2)}
      </span>
    </div>
  ) : (
    <></>
  );
}

function Circle({ active, visible }) {
  return (
    <svg visibility={visible ? "none" : "hidden"} width="50" height="50">
      <circle cx="25" cy="25" r="15" fill={active ? "#FFFBF5" : "#20262E"} />
    </svg>
  );
}

function NumberToBinary(num) {
  let binary = Number(num).toString(2);
  while (binary.length < 4) {
    binary = "0" + binary;
  }
  return binary;
}

export default function MidSection() {
  const [oBinary, setBinary] = useState({}),
    [sGreeting, setGreeting] = useState(""),
    nHours = new Date().getHours();
  setInterval(() => {
    const aNow = new Date().toTimeString().slice(0, 8).replace(/:/g, "");
    setBinary({
      hourTenths: NumberToBinary(aNow[0]),
      hourOnce: NumberToBinary(aNow[1]),
      minuteTenths: NumberToBinary(aNow[2]),
      minuteOnce: NumberToBinary(aNow[3]),
      secondTenths: NumberToBinary(aNow[4]),
      secondOnce: NumberToBinary(aNow[5]),
    });
  }, 1000);

  useEffect(() => {
    if (nHours > 5 && nHours < 12) {
      setGreeting("Good Morning");
    } else if (nHours > 12 && nHours < 16) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, [nHours]);

  return (
    <div className="MidBody">
      <div className="MidBody__Top"></div>
      <div className="MidBody__Center">
        <div className="MidBody__Center__Clock">
          <ColumnBuilder binary={oBinary.hourTenths} rows={2} />
          <ColumnBuilder binary={oBinary.hourOnce} rows={4} />
          <ColumnBuilder binary={oBinary.minuteTenths} rows={4} />
          <ColumnBuilder binary={oBinary.minuteOnce} rows={4} />
          <ColumnBuilder binary={oBinary.secondTenths} rows={4} />
          <ColumnBuilder binary={oBinary.secondOnce} rows={4} />
        </div>
        <div>{sGreeting}, Varun Gaikwad</div>
      </div>
      <div className="MidBody__Bottom">Motivation Qoute</div>
    </div>
  );
}
