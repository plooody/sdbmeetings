import React from "react";
import "./calendar.css";
import { useState, type SetStateAction } from 'react'
import { useEffect } from "react";
import axios from 'axios';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Calendar: React.FC = () => {
  interface Department {
    id: number;
    name: string;
    description:string;
    manager:number;
  }


  let date = Date()
  const [from,setFrom] = React.useState(dayjs(date))
  const [to,setTo] = React.useState(dayjs(date))
  const [day,setDay] = React.useState(dayjs(date))
  const [data, setData] = useState<Department[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/departments/");
        setData(response.data);
        console.log(response.data)
      } catch (err:any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  return(
  <div>
      <div className="container">
        <div className="picker-wrapper">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker onChange={(newvalue:any) => setDay(newvalue)} value={day}  label="Select a day" />
          </LocalizationProvider>
        </div>
      </div>
      <select className="departmentSelect">
        {data.map((x) =>(<option  key={x.id} value="otherOption">{x.name}</option>))}
      </select>
      {[...Array(16)].map((x,i) =>
        <div key={i} className="hours">{i+6}</div>
      )}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker onChange={(newvalue:any) => setFrom(newvalue)} value={from} label="From" />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker onChange={(newvalue:any) => setTo(newvalue)} value={to} label="To" />
        </LocalizationProvider>
  </div>)
};

export default Calendar;