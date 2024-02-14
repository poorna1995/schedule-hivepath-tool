import React from "react";
import AdminLayout from "Layouts/AdminLayout";
import CalendardSection from "sections/adminPageSections/CalendarSection";

const Calendar = () => {
	return (
		<AdminLayout title={`Admin dashboard  `}>
			<CalendardSection />
		</AdminLayout>
	);
};

export default Calendar;
