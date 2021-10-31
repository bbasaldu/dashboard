import classes from "./SideBar.module.css";
import GridViewIcon from "@mui/icons-material/GridView";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import PeopleIcon from "@mui/icons-material/GroupsOutlined";
import AssignmentIcon from "@mui/icons-material/AssignmentOutlined";
import BookmarkIcon from "@mui/icons-material/TurnedInNotOutlined";
import LibraryIcon from "@mui/icons-material/LocalLibraryOutlined";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import HelpCenterIcon from "@mui/icons-material/HelpCenterOutlined";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import SideButton from "./SideButton";
import Logo from "./Logo";
import { useState } from "react";
const SideBar = () => {
  const [selected, setSelected] = useState(0);
  const handleChange = (index) => {
    setSelected(index);
  };
  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <Logo />
        <SideButton
          icon={GridViewIcon}
          selected={selected}
          index={0}
          onClick={handleChange}
        >
          Overview
        </SideButton>
        <SideButton
          icon={PollOutlinedIcon}
          selected={selected}
          index={1}
          onClick={handleChange}
        >
          Analytics
        </SideButton>
        <SideButton
          icon={PeopleIcon}
          selected={selected}
          index={3}
          onClick={handleChange}
        >
          Strategy
        </SideButton>
        <SideButton
          icon={AssignmentIcon}
          selected={selected}
          index={4}
          onClick={handleChange}
        >
          Briefs
        </SideButton>
        <SideButton
          icon={BookmarkIcon}
          selected={selected}
          index={5}
          onClick={handleChange}
        >
          Saved
        </SideButton>
        <SideButton
          icon={LibraryIcon}
          selected={selected}
          index={6}
          onClick={handleChange}
        >
          Library
        </SideButton>
      </div>
      <div className={classes.bottom}>
        <SideButton icon={SettingsIcon} selected={false}>
          Settings
        </SideButton>
        <SideButton icon={HelpCenterIcon} selected={false}>
          Help
        </SideButton>
        <SideButton
          icon={LogoutIcon}
          selected={false}
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          Logout
        </SideButton>
      </div>
    </div>
  );
};
export default SideBar;
