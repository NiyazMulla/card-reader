import ErrorIcon from "@mui/icons-material/Error";
import CircularProgress from "@mui/material/CircularProgress";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import axios from "axios";
import queryString from "query-string";
import React, { Component } from "react";
import OtpInput from "react-otp-input";
import {
  generateOTP,
  getMembersDetails,
  getStatus,
  redirectToOdishaOne,
  verifyIRIS,
  verifyOTP
} from "../../api/rationcard";
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom";
import DialogCustom from "../../components/DialogCustom";
import ErrorCard from "../../components/ErrorCard/ErrorCard";
import MemberCard from "../../components/MemberCard";
import PageTitle from "../../components/PageTitle";
import { LINK_CARD_LIST, LINK_NEW_CARD, LINK_PRINT_CARD } from "../../routes";
import { REQUEST_TYPES } from "../../util/constant";
import { parseAPIErrorMessage } from "../../util/helper";
class MemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rationCardNo: "",
      requestType: "",
      requestId: "",
      selectedOptionToVerify: "",
      dialogLoader: true,
      openDialog: false,
      optData: false,
      irisData: false,
      bioMetric: false,
      verifiedOTP: false,
      memberList: [],
      isErrorInOTP: false,
      errorVerifyOTP: false,
      selectedAdharNo: "",
      otp: "",
      loader: true,
      errorMessage: "",
      showError: false,
      errorObj: {
        heading: '',
        subHeading: '',
        message: '',
      },
      isDelivery: false,
      isRequestTypeDelivery: false,
      noRequestRaised: false,
      cardDelivered: false,
      requestRaised: false,

      errorMessageVerifyOtp: "",
      verifyBtnLoader: false,
      errorMessageVerifyIris: "",
      verifyIRISLoader: false,
    };
    this.chooseOptionToVerify = this.chooseOptionToVerify.bind(this);
  }

  componentDidMount() {
    this.init();
  }
  init = () => {
    let parsed = queryString.parse(this.props.location.search);
    if (parsed.rationCardNo) {

      if (parsed.REQUESTTYPE === REQUEST_TYPES.DELIVERY) {
        this.getCardStatus(parsed.rationCardNo)
      } else {
        this.getMemberList(parsed)
      }
    } else {
      this.setState({
        loader: false,
        errorMessage: "Invalid Request, Please contact admin",
      });
    }
  };


  getMemberList = (queryParam) => {

    getMembersDetails(queryParam.rationCardNo)
      .then((res) => {
        if (res.status && res.data[0]?.status !== "RECORDNOTEXISTS") {
          this.setState(
            {
              loader: false,
              memberList: res.data,
              rationCardNo: queryParam.rationCardNo,
              requestId: queryParam["REQUESTID"],
              requestType: queryParam["REQUESTTYPE"],
            },
            () => {
              sessionStorage.setItem("REQUESTID", this.state.requestId);
              sessionStorage.setItem("REQUESTTYPE", this.state.requestType);
            }
          );
        } else {
          this.setState({
            loader: false,
          });
        }
      })
      .catch((err) => {

        let errorObj = parseAPIErrorMessage(err)
        this.setState({
          loader: false,
          errorObj,
          showError: true,
        });
      });
  }
  getCardStatus = (rationCardNo) => {
    let payload = {
      "rationCardNum": rationCardNo
    }
    getStatus(payload).then(res => {
      console.log(res);
      let parsed = queryString.parse(this.props.location.search);
      if (res.data.StatusCode === "00") {
        this.setState({
          rationCardNo,
          requestRaised: true,
        }, () => {
          this.getMemberList(parsed)
        })
      } else if (res.data.StatusCode === '01') {
        this.setState({
          cardDelivered: true,
          isRequestTypeDelivery: true,
          deliveryDate: res.data.DeliveryDate,
          loader: false,
          rationCardNo,
        });
      } else if (res.data.StatusCode === '02') {
        this.setState({
          noRequestRaised: true,
          isRequestTypeDelivery: true,
          rationCardNo,

          loader: false,
        });
      }
    }).catch(err => {
      console.log(err);
      let errorObj = parseAPIErrorMessage(err)
      this.setState({
        loader: false,
        errorObj,
        showError: true,
      });
    })
  }



  handleChange = (otp) => {
    this.setState({
      otp: otp,
    });
  };
  chooseOptionToVerify(index, selectedOption) {
    this.setState({
      openDialog: true,
      dialogLoader: true,
    });
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
              dialogLoader: false,
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
        dialogLoader: false,
        selectedAdharNo: this.state.memberList[index]["AadharNumber"],
      });
    } else if (selectedOption === "BIOMETRIC") {
      this.setState({
        openDialog: true,
        bioMetric: true,
        irisData: false,
        optData: false,
        dialogLoader: false,
        selectedAdharNo: this.state.memberList[index]["AadharNumber"],
      });
    }
  }

  sendOTP = () => {
    let payload = {
      aadharcard: this.state.selectedAdharNo,
      otpValue: this.state.otp,
    };
    this.setState({
      verifyBtnLoader: true,
    }, () => {
      verifyOTP(payload)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            if (res.data.status === "ERROR") {
              this.setState({
                errorMessageVerifyOtp: res.data.errMsg,
                verifyBtnLoader: false,
              });
            } else {
              this.setState({
                openDialog: false,
                verifyBtnLoader: false,
              }, () => {
                this.navigateOrShowMessage();
              })
            }

          }
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            errorMessageVerifyOtp: err.message,
            verifyBtnLoader: false,
          });
        });
    });

  };
  scanIRis = () => {
    let payload = {
      aadharcard: this.state.selectedAdharNo,
      otpValue: this.state.otp,
    };
    this.setState({
      verifyIRISLoader: true,
    }, () => {
      verifyIRIS(payload).then(res => {
        console.log(res);
        if (res.data.status === "ERROR") {
          this.setState({
            errorMessageVerifyOtp: res.data.errMsg,
            verifyBtnLoader: false,
          });
        } else {
          this.setState({
            verifyIRISLoader: false,
            openDialog: false,
          }, () => {
            this.navigateOrShowMessage();
          }
          )
        }

      }).catch(err => {
        console.log(err);
        this.setState({
          errorMessageVerifyIris: err.message,
          verifyBtnLoader: false,
        });
      })
    });

  };
  scanBioMetric = () => { };

  navigateOrShowMessage = () => {
    if (this.state.requestType === REQUEST_TYPES.UPDATE) {
      this.props.history.push({
        pathname: LINK_CARD_LIST,
        state: {
          rationCardNo: this.state.rationCardNo,
          REQUESTTYPE: this.state.requestType,
          REQUESTID: this.state.requestId,
        },
      });
    } else if (this.state.requestType === REQUEST_TYPES.PRINT) {
      this.setState({
        optData: false,
        verifiedOTP: true,
      });
      this.props.history.push({
        pathname: LINK_PRINT_CARD,
        state: {
          rationCardNo: this.state.rationCardNo
        },
      });
    } else if (this.state.requestType === REQUEST_TYPES.ENROLL) {
      this.props.history.push({
        pathname: LINK_NEW_CARD,
        state: {
          rationCardNo: this.state.rationCardNo,
          REQUESTTYPE: this.state.requestType,
          REQUESTID: this.state.requestId,
        },
      });
    } else if (this.state.requestType === REQUEST_TYPES.DELIVERY) {
      this.setState({
        isDelivery: true,
      })
    }
  };

  renderMembers = () => {
    if (this.state.loader) {
      return (
        <div className="w-100 d-flex align-items-center justify-content-center">
          <CircularProgress />
        </div>
      );
    }
    if (this.state.errorMessage) {
      return (
        <div className="w-100 d-flex align-items-center justify-content-center  ">
          <h3 className="border p-4" style={{ color: "red" }}>
            <ErrorIcon /> {this.state.errorMessage}
          </h3>
        </div>
      );
    }

    if (this.state.showError) {
      const { heading, subHeading, message } = this.state.errorObj;
      return (
        <ErrorCard heading={heading} subHeading={subHeading} message={message} />
      )
    }




    return this.state.memberList.length > 0 ? (
      this.state.memberList.map((member, index) => {
        return (
          <>
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
          </>
        );
      })
    ) : this.state.memberList.length === 0 ? (
      <>No Members Found</>
    ) : (
      <></>
    );
  };
  renderRequestDelivery = () => {
    if (this.state.loader) {
      return (
        <div className="w-100 d-flex align-items-center justify-content-center">
          <CircularProgress />
        </div>
      );
    }


    if (this.state.noRequestRaised) {
      return (

        <div className="w-100 d-flex align-items-center justify-content-center mb-4 ">
          <div className="w-75 d-flex flex-column border justify-content-center align-items-center rounded-pill p-4 bg-Error">
            <div>
              <ContactSupportIcon />
            </div>
            <div className="fw-bold fs-5 ">
              Printing request not raised for Ration Card No {this.state.rationCardNo}
            </div>
          </div>
        </div>
      );
    }

    if (this.state.cardDelivered) {
      return (
        <div className="w-100 d-flex align-items-center justify-content-center mb-4 ">
          <div className="w-75 d-flex flex-column border justify-content-center align-items-center rounded-pill p-4 bg-Success">
            <div>
              <CheckCircleIcon />
            </div>
            <div className="fw-bold fs-5 ">
              Card Printed and Delivered to the RationCard No {this.state.rationCardNo} on {this.state.deliveryDate}
            </div>
          </div>
        </div>

      );
    }

  }


  renderDialogContent = () => {

    if (this.state.dialogLoader) {
      return <>Loading...</>
    }

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
            // on
            >
              Resend OTP
            </span>
          </p>
          <div className="mt-2">
            <ButtonCustom label={"Verify"} showLoader={this.state.verifyBtnLoader} onClick={this.sendOTP} />
          </div>
          <div style={{ height: "20px", color: "red" }}>
            {this.state.errorMessageVerifyOtp ? this.state.errorMessageVerifyOtp : ""}
          </div>
        </>
      );
    } else if (this.state.irisData) {
      return (
        <>
          <p className="fs-4 text-primary">Scan the image</p>
          <ButtonCustom label={"Process Scan"} onClick={this.scanIRis} />
          <div style={{ height: "20px", color: "red" }}>
            {this.state.errorMessageVerifyIris ? this.state.errorMessageVerifyIris : ""}
          </div>
        </>
      );
    } else if (this.state.bioMetric) {
      return (
        <>
          <p className="fs-4 text-primary">Read BioMetric</p>
          <ButtonCustom label={"Process Scan"} />
        </>
      );
    } else if (this.state.verifiedOTP) {
      return (
        <>
          <p className="fs-4 text-primary">
            OTP Verified, Please Print the card
          </p>
          <div className="mt-2">
            <ButtonCustom
              label={"Print"}
              onClick={() => {
                this.setState({
                  verifyOTP: false,
                  openDialog: false,
                });
              }}
            />
          </div>
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


  redirectToOdishaOne = () => {
    let requestId = sessionStorage.getItem("REQUESTID");
    let requestType = sessionStorage.getItem("REQUESTTYPE");
    let payload = {
      requestID: requestId,
      actionType: requestType
    }
    redirectToOdishaOne(payload)
      .then((res) => {
        console.log(res);
        if (res.data) {
          let url = `${res.data.ENDPOINT_URL}`;
          const formData = new FormData();
          formData.append("encData", res.data.encData);
          axios
            .post(url, formData)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="d-flex flex-column">

        {this.state.isDelivery ? (
          <DialogCustom
            open={this.state.isDelivery}
            handleClose={() => {
              this.setState({
                isDelivery: false,
              });
            }}
            hideHeader
          >
            <div className="w-100 d-flex flex-column align-items-center justify-content-center">
              <p>Card is delivered to RationCardHolder Successfully</p>
              <b>Click Here to Re Direct Odishone</b>
              <ButtonCustom
                label={"Click"}
                onClick={this.redirectToOdishaOne}
              />
            </div>
          </DialogCustom>
        ) : (
          <></>
        )}
        {this.state.openDialog ? (
          <DialogCustom
            open={this.state.openDialog}
            handleClose={() => {
              this.setState({
                openDialog: false,
                optData: false,
                irisData: false,
                bioMetric: false,
              });
            }}
            headerData={this.renderDialogHeader()}
          >
            <div className="w-100 d-flex flex-column align-items-center justify-content-center">
              {this.renderDialogContent()}
              <div>
                {this.state.errorMessage ? this.state.errorMessage : ""}
              </div>
            </div>
          </DialogCustom>
        ) : (
          <></>
        )}
        <PageTitle
          title={`Member details Search Result for ${this.state.rationCardNo}`}
        />
        <div className="w-100 d-flex flex-row flex-wrap">
          {
            this.state.requestRaised ? <div className="w-100 d-flex align-items-center justify-content-center mb-4 ">
              <div className="w-75 d-flex flex-column border justify-content-center align-items-center rounded-pill p-4 bg-Warning">
                <div>
                  <VerifiedUserIcon />
                </div>
                <div className="fw-bold fs-5 ">
                  Card Printed, Pending for Delivery, Kindly authenticate RationCard Number {this.state.rationCardNo} for Delivery.
                </div>
              </div>
            </div> : <></>
          }
          {this.state.isRequestTypeDelivery ? this.renderRequestDelivery() : this.renderMembers()}
        </div>
      </div>
    );
  }
}

export default MemberList;
