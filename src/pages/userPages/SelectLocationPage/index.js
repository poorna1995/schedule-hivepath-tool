import { Container, Box } from "@mui/material";
import React from "react";
import UserLayout from "Layouts/UserLayout";
import SelectLocationPageSections from "sections/userPageSections/SelectLocationPageSections";

const SelectLocationPage = () => {
  return (
    <UserLayout title={"Select branch"}>
      <Box>
        <SelectLocationPageSections />
      </Box>
    </UserLayout>
  );
};

export default SelectLocationPage;
