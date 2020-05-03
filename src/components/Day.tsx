/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Layout } from "element-react";
import "element-theme-default";
import { Timeslot, HourType } from "./Timeslot";
import moment from "moment";

export type AvailableDayType = {
  date: Date;
  timeslots: HourType[];
};

export const Day: React.FC<AvailableDayType> = ({
  date,
  timeslots,
}: AvailableDayType) => {
  const dayStyle = css({
    display: "flex",
    flexDirection: "column",
    paddingTop: "10px",
  });
  const weekdayStyle = css({
    boxSizing: "border-box",
    borderTop:
      date > moment(new Date(), "YYYY-MM-DD").toDate()
        ? "20px solid rgb(0, 210, 188)"
        : "20px solid rgb(210, 210, 210)",
    paddingTop: "10px",
  });

  const genHumanReadableDay = (date: Date) => {
    switch (date.getDay()) {
      case 0:
        return "日";
      case 1:
        return "一";
      case 2:
        return "二";
      case 3:
        return "三";
      case 4:
        return "四";
      case 5:
        return "五";
      case 6:
        return "六";
      default:
        return "";
    }
  };

  return (
    <Layout.Col span="3" css={dayStyle}>
      <div className="weekday" css={weekdayStyle}>
        {genHumanReadableDay(date)}
      </div>
      <div className="date">{date.getDate()}</div>
      {timeslots.map((element, index) => {
        return (
          <Timeslot
            key={index}
            hourMinute={element.hourMinute}
            isAvailable={
              date > moment(new Date(), "YYYY-MM-DD").toDate()
                ? element.isAvailable
                : false
            }
          />
          // When the time is passed, force isAvailable of timeslot to false
        );
      })}
    </Layout.Col>
  );
};
