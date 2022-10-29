import { useEffect, useState } from 'react';
import DatePicker, {CalendarContainer} from 'react-datepicker'


export interface IDateTimeField extends React.ComponentPropsWithoutRef<'div'> {
  startDate: object;
  setStartDate: any;
  placeholderText: string;
}

const DateTimeField: React.FC<IDateTimeField> = ({ className, startDate, setStartDate, placeholderText, children, ...divProps }) => {
    // const [startDate, setStartDate] = useState(new Date())

    // useEffect(() => {
    //     console.log(startDate.toString())
    // },[startDate])

    const MyContainer: React.FC<IDateTimeField> = ({ className, children }) => {
        return (
          <div style={{ padding: "16px", background: "#216ba5", color: "#fff" }}>
            <CalendarContainer className={className}>
              <div style={{ background: "#f0f0f0" }}>
                When is your birthday?
              </div>
              <div style={{ position: "relative" }}>{children}</div>
            </CalendarContainer>
          </div>
        );
    };


    return (
        <div className="relative">
            <DatePicker 
                selected={startDate}
                onChange={(date: any) => setStartDate(date)}
                calendarContainer={MyContainer}
                dateFormat="yyyy-MM-dd"
                showYearDropdown
                scrollableMonthYearDropdown
                placeholderText={placeholderText}
                className="w-full h-10 text-gray-900 border-b-2 border-gray-300 peer focus:outline-none focus:border-blue-600 rounded-lg px-5"
            />
            <label
                
                className="absolute bg-white px-4 rounded-sm left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                DOB
            </label>
        </div>
    );
};

export default DateTimeField;