/** @jsx jsx */

import { css, jsx } from "@emotion/core";

export type HourType = {
  hourMinute: String;
  isAvailable: boolean;
};

export const Timeslot: React.FC<HourType> = ({
  hourMinute,
  isAvailable,
}: HourType) => {
  const HourStyle = css({
    color: isAvailable ? "rgb(0, 210, 188)" : "#ccc",
    marginTop: "10px",
    cursor: isAvailable ? "pointer" : "not-allowed",
  });

  return <div css={HourStyle}> {hourMinute}</div>;
};
