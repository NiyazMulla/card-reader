import BoyIcon from "@mui/icons-material/Boy";
import ElderlyIcon from "@mui/icons-material/Elderly";
import ElderlyWomanIcon from "@mui/icons-material/ElderlyWoman";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import GirlIcon from "@mui/icons-material/Girl";
import ManIcon from "@mui/icons-material/Man";
import Man2Icon from "@mui/icons-material/Man2";
import MessageIcon from "@mui/icons-material/Message";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Person2Icon from "@mui/icons-material/Person2";
import VerifiedIcon from "@mui/icons-material/Verified";
import WomanIcon from "@mui/icons-material/Woman";
import Woman2Icon from "@mui/icons-material/Woman2";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import React from "react";
const AGE_MAP = {
  MALE: {
    15: BoyIcon,
    30: ManIcon,
    59: Man2Icon,
    100: ElderlyIcon,
  },
  FEMALE: {
    15: GirlIcon,
    30: WomanIcon,
    59: Woman2Icon,
    100: ElderlyWomanIcon,
  },
};

function MemberCard(props) {
  const getIconImage = () => {
    const { age, gender } = props;
    let IconToReturn = "";

    if (age <= 15) {
      IconToReturn = AGE_MAP[gender][15];
    } else if (age <= 30) IconToReturn = AGE_MAP[gender][30];
    else if (age <= 59) IconToReturn = AGE_MAP[gender][59];
    else if (age <= 100) IconToReturn = AGE_MAP[gender][100];

    return IconToReturn;
  };

  const { name, gender, age, adharNo, mobileNumber, relationShip, verified } =
    props;
  let Icon = getIconImage();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="border d-flex flex-column border w-full">
      <div className="d-flex flex-row px-2 justify-content-between align-items-center fs-3 border-bottom border-2 mb-4">
        <div>
          {Icon ? (
            <Icon style={{ fontSize: "50px", color: "#00B16A" }} />
          ) : (
            <Person2Icon />
          )}
          <span>
            {name}
            {verified ? (
              <sup>
                <VerifiedIcon style={{ color: "#00F966" }} />
              </sup>
            ) : (
              <></>
            )}
          </span>
        </div>
        <div>
          <div
            style={{ cursor: "pointer" }}
            aria-describedby={id}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>Verify Adhar</Typography>
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    handleClose();
                    props.handleChangeForVerify("OTP");
                  }}
                >
                  <ListItemIcon>
                    <MessageIcon />
                  </ListItemIcon>
                  <ListItemText primary="OTP" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    handleClose();
                    props.handleChangeForVerify("IRIS");
                  }}
                >
                  <ListItemIcon>
                    <RemoveRedEyeIcon />
                  </ListItemIcon>
                  <ListItemText primary="IRIS" />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
          </Popover>
        </div>
      </div>

      <div className="w-100 d-flex flex-column px-2">
        <div className="w-100 d-flex flex-row justify-content-start mb-2">
          <div className="w-50 fs-6">Gender: {gender ?? "N/A"}</div>
          <div className="w-50 fs-6">Age: {age ?? "N/A"}</div>
        </div>
        <div className="d-flex flex-row justify-content-start mb-2">
          <div className="w-50 fs-6">Adhar Number: {adharNo ?? "N/A"}</div>
          <div className="w-50 fs-6">
            Mobile Number: {mobileNumber ?? "N/A"}
          </div>
        </div>
        <div className="d-flex flex-row justify-content-start mb-2">
          <div className="w-50 fs-6">R/F: {relationShip ?? "N/A"}</div>
        </div>
      </div>
    </div>
  );
}

export default MemberCard;
