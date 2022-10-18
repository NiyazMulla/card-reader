import React, { Component } from "react";
import OtpInput from "react-otp-input";
import {
  generateOTP,
  getMembersDetails,
  verifyOTP,
} from "../../api/rationcard";
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom";
import DialogCustom from "../../components/DialogCustom";
import MemberCard from "../../components/MemberCard";
import PageTitle from "../../components/PageTitle";
import { LINK_CARD_LIST } from "../../routes";
import CircularProgress from "@mui/material/CircularProgress";
class MemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rationCardNo: "",
      selectedOptionToVerify: "",
      openDialog: false,
      optData: false,
      irisData: false,
      bioMetric: false,
      memberList: [],
      isErrorInOTP: false,
      errorVerifyOTP: false,
      selectedAdharNo: "",
      otp: "",
      loader: true,
    };
    this.chooseOptionToVerify = this.chooseOptionToVerify.bind(this);
  }

  componentDidMount() {
    this.init();
  }
  init = () => {
    if (this.props.location.state?.rationCardNo) {
      getMembersDetails(this.props.location.state?.rationCardNo)
        .then((res) => {
          if (res.status) {
            this.setState({
              loader: false,
              memberList: res.data,
              rationCardNo: this.props.location.state?.rationCardNo,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  handleChange = (otp) => {
    this.setState({
      otp: otp,
    });
  };
  chooseOptionToVerify(index, selectedOption) {
    if (selectedOption === "OTP") {
      generateOTP(this.state.memberList[index]["AadharNumber"])
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.setState({
              openDialog: true,
              optData: true,
              irisData: false,
              bioMetric: false,
              selectedAdharNo: this.state.memberList[index]["AadharNumber"],
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (selectedOption === "IRIS") {
      this.setState({
        openDialog: true,
        optData: false,
        irisData: true,
        bioMetric: false,
        selectedAdharNo: this.state.memberList[index]["AadharNumber"],
      });
    } else if (selectedOption === "BIOMETRIC") {
      this.setState({
        openDialog: true,
        bioMetric: true,
        irisData: false,
        optData: false,
        selectedAdharNo: this.state.memberList[index]["AadharNumber"],
      });
    }
  }

  sendOTP = () => {
    let payload = {
      aadharcard: this.state.selectedAdharNo,
      otpValue: this.state.otp,
    };
    verifyOTP(payload)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.props.history.push({
            pathname: LINK_CARD_LIST,
            state: {
              rationCardNo: this.state.rationCardNo,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          errorVerifyOTP: err.message,
        });
        this.props.history.push({
          pathname: LINK_CARD_LIST,
          state: {
            rationCardNo: this.state.rationCardNo,
          },
        });
      });
  };
  scanIRis = () => {};
  scanBioMetric = () => {};

  renderMembers = () => {
    if (this.state.loader) {
      return (
        <div className="w-100 d-flex align-items-center justify-content-center">
          <CircularProgress />
        </div>
      );
    }
    return this.state.memberList.length > 0 ? (
      this.state.memberList.map((member, index) => {
        return (
          <div className="w-50 mb-4" key={index}>
            <MemberCard
              name={member["MemberName"]}
              age={parseInt(member["Age"])}
              gender={member["Gender"].toUpperCase()}
              handleChangeForVerify={(option) => {
                this.chooseOptionToVerify(index, option);
              }}
              adharNo={member["AadharNumber"]}
              relationShip={member["RelationWithFamilyHead"]}
              mobileNumber={member["Mobilenumber"]}
              // verified
            />
          </div>
        );
      })
    ) : this.state.memberList.length === 0 ? (
      <>No Members Found</>
    ) : (
      <></>
    );
  };
  renderDialogContent = () => {
    if (this.state.optData) {
      return (
        <>
          <p className="fs-4 text-primary">
            OTP sent to registered mobile number
          </p>
          <OtpInput
            value={this.state.otp}
            onChange={this.handleChange}
            numInputs={6}
            inputStyle={{ width: "30px", height: "40px", outline: "none" }}
            separator={<span>-</span>}
          />
          <p className="fs-6 mt-4 ">
            Not Received ?{" "}
            <span
              className="text-decoration-underline"
              style={{ cursor: "pointer" }}
            >
              Resend OTP
            </span>
          </p>
          <div className="mt-2">
            <ButtonCustom label={"Verify"} onClick={this.sendOTP} />
          </div>
          <div style={{ height: "20px", color: "red" }}>
            {this.state.errorVerifyOTP ? this.state.errorVerifyOTP : ""}
          </div>
        </>
      );
    } else if (this.state.irisData) {
      return (
        <>
          <p className="fs-4 text-primary">Scan the image</p>
          <ButtonCustom label={"Process Scan"} />
        </>
      );
    } else if (this.state.bioMetric) {
      return (
        <>
          <p className="fs-4 text-primary">Read BioMetric</p>
          <ButtonCustom label={"Process Scan"} />
        </>
      );
    }
  };
  renderDialogHeader = () => {
    const { optData, irisData, bioMetric } = this.state;
    if (optData) {
      return "Verify OTP";
    } else if (irisData) {
      return "Verify Member With IRIS";
    } else if (bioMetric) {
      return "Verify Member With Biometric";
    }
  };

  render() {
    return (
      <div className="d-flex flex-column">
        {this.state.openDialog ? (
          <DialogCustom
            open={this.state.openDialog}
            handleClose={() => {
              this.setState({
                openDialog: false,
              });
            }}
            headerData={this.renderDialogHeader()}
          >
            <div className="w-100 d-flex flex-column align-items-center justify-content-center">
              {this.renderDialogContent()}
            </div>
          </DialogCustom>
        ) : (
          <></>
        )}
        <PageTitle
          title={`Member details Search Result for ${this.state.rationCardNo}`}
        />
        <div className="w-100 d-flex flex-row flex-wrap">
          {this.renderMembers()}
        </div>
      </div>
    );
  }
}

export default MemberList;
