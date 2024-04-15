import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CustomDate = ({ date, dateStyle }) => {
  const formatDateToWord = (date) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthsOfYear = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get day of the month
    const dayOfMonth = date.getDate();
    // Get month index (0-indexed)
    const monthIndex = date.getMonth();
    // Get day of the week index (0-indexed)
    const dayOfWeekIndex = date.getDay();

    // Function to add appropriate suffix to day of the month
    const addSuffix = (day) => {
      if (day >= 11 && day <= 13) {
        return `${day}th`;
      }
      switch (day % 10) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    };

    // Construct the formatted date string
    const formattedDate = `${addSuffix(dayOfMonth)} ${
      monthsOfYear[monthIndex]
    }, ${daysOfWeek[dayOfWeekIndex]}`;

    return formattedDate;
  };

  return <Text style={dateStyle}>{formatDateToWord(new Date(date))}</Text>;
};

export default CustomDate;

const styles = StyleSheet.create({});
