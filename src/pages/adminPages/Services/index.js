import React from "react";
import AdminLayout from "Layouts/AdminLayout";
import ServicesSection from "sections/adminPageSections/ServicesSection";

const Services = () => {
	return (
		<AdminLayout title={`Admin dashboard  `}>
			<ServicesSection />
		</AdminLayout>
	);
};

export default Services;
