import React from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface HighlightedCalendarProps {
  selectedDates: Date[];
}

const StyledCalendar = styled(Calendar)`
  && {
    font-family: 'Inter', sans-serif;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    padding: 0 12px 12px;
    margin-bottom: 34px;
    background-color: rgb(255, 255, 255);
    border-radius: 12px;
    border: none;
    color: rgba(40, 43, 46, 1);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    .react-calendar__navigation {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 0 12px;

      .react-calendar__navigation__label {
        order: -1;
        font-size: 20px;
        font-style: normal;
        font-weight: 550;
        line-height: normal;
        margin-right: 85px;
      }

      button {
        background: none;
        border: none;
        font-size: 32px;
      }

      .react-calendar__navigation__prev-button,
      .react-calendar__navigation__next-button {
        margin: 0 10px;
      }

      .react-calendar__navigation__prev2-button,
      .react-calendar__navigation__next2-button {
        display: none;
      }
    }
    .react-calendar__month-view__weekdays {
      text-align: center;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: rgba(142, 142, 142, 1);
      margin: 0;
      abbr {
        text-decoration: none;
        border: none;
      }

      .react-calendar__month-view__weekdays__weekday {
        padding: 10px 0 10px;
        border: none;
        font-size: 18px;
      }
    }

    .react-calendar__month-view__days {
      .react-calendar__tile {
        max-width: 100%;
        padding: 10px 0;
        font-size: 18px;
        font-style: normal;
        font-weight: 550;
        line-height: normal;
        background-color: rgb(255, 255, 255);
        color: rgba(40, 43, 46, 1);
        border-radius: 50%;
        border: none;

        &:hover {
          background-color: #e6e6e6;
          border-radius: 50%;
        }
      }

      .react-calendar__tile--now {
        background-color: rgb(230, 230, 230);
        color: rgba(40, 43, 46, 1);
      }

      .react-calendar__tile--active,
      .react-calendar__tile--highlight {
        background-color: rgb(208, 208, 208);
        color: rgba(40, 43, 46, 1);
        border-radius: 50%;
      }
    }
  }
`;
const HighlightedCalendar: React.FC<HighlightedCalendarProps> = ({
  selectedDates,
}) => {
  const isHighlighted = (date: Date) => {
    return selectedDates.some(
      selectedDate =>
        date.getFullYear() === selectedDate.getFullYear() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getDate() === selectedDate.getDate()
    );
  };

  const formatMonthYear = (_locale: string | undefined, date: Date) => {
    return format(date, 'LLLL yyyy', { locale: ru }).replace(' г.', '');
  };

  return (
    <StyledCalendar
      showNeighboringMonth={false}
      formatMonthYear={formatMonthYear}
      tileClassName={({ date, view }) =>
        view === 'month' && isHighlighted(date)
          ? 'react-calendar__tile--highlight'
          : ''
      }
    />
  );
};

export default HighlightedCalendar;
