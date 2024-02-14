import React from "react";
import SelectServiceSections from "sections/userPageSections/SelectServiceSections";
import { Box, Container } from "@mui/material";
import UserLayout from "../../../Layouts/UserLayout";

const SelectServicePage = () => {
	return (
		<UserLayout title="Select service">
			<Box>
				<SelectServiceSections />
			</Box>
		</UserLayout>
	);
};

export default SelectServicePage;
