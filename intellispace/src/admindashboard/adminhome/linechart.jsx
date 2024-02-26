import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const BasicLineChart = () => {
  // Generate dates for the upcoming 7 days
  const today = new Date();
  const upcomingDays = Array.from({ length: 7 }, (_, index) => {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + index);
    return nextDay;
  });

  const data = upcomingDays.map((date, index) => ({
    date: date.toISOString().split('T')[0],
    value: [12, 5, 6, 8, 7, 9, 11][index],
  }));

  return (
    <ResponsiveContainer width="95%" height={400}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Line type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BasicLineChart;
