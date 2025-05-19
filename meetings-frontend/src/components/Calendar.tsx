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

  interface Employee {
    id: number;
    name: string;
    email: string;
    position: string;
    department: number;
  }

  let date = Date()
  const [openPopup, setOpenPopup] = useState(false)
  const [from,setFrom] = React.useState(dayjs(date))
  const [to,setTo] = React.useState(dayjs(date))
  const [day,setDay] = React.useState(dayjs(date))
  const [data, setData] = useState<Department[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment,setSelectedDepartment] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/departments/");
        setData(response.data);
      } catch (err:any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/department_employee/"+selectedDepartment.toString());
        setEmployees(response.data)
      } catch (err:any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedDepartment]);

  return(
  <div>
      <div className="container">
        <div className="picker-wrapper">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker slotProps={{ textField: { size: 'small' } }} onChange={(newvalue:any) => setDay(newvalue)} value={day}  label="Select a day" />
          </LocalizationProvider>
        </div>
      </div>
     

      {[...Array(16)].map((x,i) =>
        <div key={i} className="hours">{i+6}</div>
      )}

      <button onClick={()=>{setOpenPopup(true)}} className="new-appointment">
        New Appointment
      </button>
      {
      openPopup &&
      <div className="popup">
        <button className="close" onClick={()=>setOpenPopup(false)}>X</button>
      <div>
        <div className="title">Title:<input type="text" /></div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker slotProps={{ textField: { size: 'small' } }} onChange={(newvalue:any) => setFrom(newvalue)} value={from} label="From" />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker slotProps={{ textField: { size: 'small' } }} onChange={(newvalue:any) => setTo(newvalue)} value={to} label="To" />
        </LocalizationProvider>
        <select onChange={(e)=>{setSelectedDepartment(parseInt(e.target.value))}} className="departmentSelect">
          {data.map((x) =>(<option value={x.id} key={x.id} >{x.name}</option>))}
        </select>
        <div className="participant-list">
         {employees.map((x) =>(<div key={x.id} >{x.name} <button className="removeEmployee">X</button></div>))}
        </div>
        <div><button className="addParticipant">Add Participant</button></div>
      </div>
        <button className="save">Save</button>
        <button className="delete">Delete</button>
        <button className="calcel">Cancel</button>
      </div>
      }
  </div>)
};

export default Calendar;