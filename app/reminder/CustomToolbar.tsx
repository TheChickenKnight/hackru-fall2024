import React from 'react';
import { ToolbarProps } from 'react-big-calendar';

const CustomToolbar: React.FC<ToolbarProps<{ id: number; title: string; start: Date; end: Date; }, object>> = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate('PREV');
  };

  const goToNext = () => {
    toolbar.onNavigate('NEXT');
  };

  const goToCurrent = () => {
    toolbar.onNavigate('TODAY');
  };

  const goToMonthView = () => {
    toolbar.onView('month');
  };

  const goToWeekView = () => {
    toolbar.onView('week');
  };

  const goToDayView = () => {
    toolbar.onView('day');
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={goToBack}>Back</button>
        <button type="button" onClick={goToCurrent}>Today</button>
        <button type="button" onClick={goToNext}>Next</button>
      </span>
      <span className="rbc-toolbar-label">{toolbar.label}</span>
      <span className="rbc-btn-group">
        <button type="button" onClick={goToMonthView}>Month</button>
        <button type="button" onClick={goToWeekView}>Week</button>
        <button type="button" onClick={goToDayView}>Day</button>
      </span>
    </div>
  );
};

export default CustomToolbar;