import React, { useEffect } from "react";
import { useCountUp } from "react-countup";

const CountUp = ({ end, isReset }) => {
  const { countUp, update } = useCountUp({
    start: 0,
    end: 0,
    duration: 5,
  });

  useEffect(() => {
    if (isReset) update(end);
    else update(0);
  }, [isReset]);
  return (
    <div>
      <p className="amount">{countUp}</p>
    </div>
  );
};

export default CountUp;
