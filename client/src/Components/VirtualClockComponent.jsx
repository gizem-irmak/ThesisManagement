import React, { useEffect, useState } from "react";
import { Clock } from "react-bootstrap-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import DateAPI from "../APIs/DateAPI";

function VirtualClockComponent() {
    const [selectedDate, setSelectedDate] = useState(dayjs().toDate());
    const [resetButton, showResetButton] = useState(false);
    useEffect(() => {
        async function getDateOnStart() {
            const serverDate = (await DateAPI.getDate()).date;
            setSelectedDate(dayjs(serverDate)["$d"]);
        }
        getDateOnStart();
    }, []);

    async function setDate(newDate) {
        const formattedDate = dayjs(newDate).format("YYYY-MM-DD");
        const response = await DateAPI.setDate(formattedDate);
        if (response.status === 200) {
            setSelectedDate(newDate);
            window.location.reload(false);
        }
        else console.log(response);
    }

    return (
        <>
            <DatePicker
                selected={selectedDate}
                todayButton={"Today  " + dayjs().format("YYYY-MM-DD")}
                onChange={(date) => setDate(date)}
                customInput={
                    <div className="sided-items">
                        <Clock className="icon-item" />
                        <div>{dayjs(selectedDate).format("YYYY-MM-DD")}</div>
                    </div>
                }
            />{'  '}
        </>
    );
}

export default VirtualClockComponent;
