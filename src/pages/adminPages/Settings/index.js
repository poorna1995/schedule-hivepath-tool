import React from "react";
import AdminLayout from "Layouts/AdminLayout";
import SettingsSection from "sections/adminPageSections/SettingsSection";

const Settings = () => {
	return (
		<AdminLayout title={`Admin dashboard  `}>
			<SettingsSection />
		</AdminLayout>
	);
};

export default Settings;
