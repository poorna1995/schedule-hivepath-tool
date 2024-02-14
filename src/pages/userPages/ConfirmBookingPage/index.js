import React from "react";
import ConfirmBookingPageSections from "sections/userPageSections/ConfirmBookingPageSections";
import UserLayout from "Layouts/UserLayout";
import { Box, Container } from "@mui/material";

const ConfirmBookingPage = () => {
	return (
		<UserLayout title="Confirm booking">
			<Box>
				<ConfirmBookingPageSections />
			</Box>
		</UserLayout>
	);
};

export default ConfirmBookingPage;
