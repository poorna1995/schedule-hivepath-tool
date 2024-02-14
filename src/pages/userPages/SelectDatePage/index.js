import React from "react";
import SelectDateSections from "../../../sections/userPageSections/SelectDateSections";
import UserLayout from "../../../Layouts/UserLayout";
import { Container, Box } from "@mui/material";

const SelectDatePage = () => {
  return (
    <UserLayout title="Select Date">
      <Box>
        <SelectDateSections />
      </Box>
    </UserLayout>
  );
};

export default SelectDatePage;
