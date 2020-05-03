/** @jsx jsx */
import React, { useState, useCallback, useMemo } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Day, AvailableDayType } from "./components/Day";
import { Layout, Button } from "element-react";
import { css, jsx } from "@emotion/core";
import moment from "moment";

const headerStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

const weekRangeStyle = css({
  marginLeft: "5px",
});

export const App: React.FC<{}> = ({}) => {
  const [today, setToday] = useState<Date>(new Date());

  const [assignedDate, setAssignedDate] = useState<Date>(new Date());

  const weekStartDate = useMemo(() => {
    return new Date(
      new Date().setDate(assignedDate.getDate() - assignedDate.getDay())
    );
  }, [assignedDate]);

  const weekEndDate = useMemo(() => {
    return new Date(
      new Date().setDate(assignedDate.getDate() + (6 - assignedDate.getDay()))
    );
  }, [assignedDate]);

  // store stubbed data of timeslots within 7 days
  const weekDayAry = useMemo(() => {
    const result: AvailableDayType[] = [];

    for (let i = 0; i < 7; i++) {
      result.push({
        date: new Date(new Date().setDate(weekStartDate.getDate() + i)),
        timeslots: [
          {
            hourMinute: "15:00",
            isAvailable: Math.random() > 0.5 ? true : false,
          },
          {
            hourMinute: "16:00",
            isAvailable: Math.random() > 0.5 ? true : false,
          },
          {
            hourMinute: "17:00",
            isAvailable: Math.random() > 0.5 ? true : false,
          },
          {
            hourMinute: "18:00",
            isAvailable: Math.random() > 0.5 ? true : false,
          },
        ],
      });
    }
    return result;
  }, [weekStartDate, weekEndDate]);

  return (
    <div className="App">
      <div className="header" css={headerStyle}>
        <div className="actions">
          <Button
            disabled={weekStartDate <= today}
            onClick={() => {
              if (
                new Date(new Date().setDate(assignedDate.getDate() - 7)) > today
              ) {
                setAssignedDate(moment(assignedDate).subtract(7, "d").toDate());
              }
            }}
          >
            <i className="el-icon-arrow-left"></i>
          </Button>

          {/* locked if the day greater than 21 days */}
          <Button
            disabled={moment(weekEndDate).diff(moment(today), "days") >= 21}
            onClick={() => {
              setAssignedDate(moment(assignedDate).add(7, "d").toDate());
            }}
          >
            <i className="el-icon-arrow-right"></i>
          </Button>
        </div>
        <div className="weekRange" css={weekRangeStyle}>
          {weekStartDate.toLocaleDateString()} ~{" "}
          {weekEndDate.toLocaleDateString()}
        </div>
      </div>

      <Layout.Row gutter="20">
        {weekDayAry.map((oneDay, index) => {
          return (
            <Day key={index} date={oneDay.date} timeslots={oneDay.timeslots} />
          );
        })}
      </Layout.Row>
    </div>
  );
};

export default App;
