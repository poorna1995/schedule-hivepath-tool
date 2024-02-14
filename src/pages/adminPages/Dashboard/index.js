import React from "react";
import AdminLayout from "Layouts/AdminLayout";
import DashboardSection from "sections/adminPageSections/DashboardSection";

const Dashboard = () => {
	return (
		<AdminLayout title={`Admin dashboard  `}>
			<DashboardSection />
		</AdminLayout>
	);
};

export default Dashboard;
