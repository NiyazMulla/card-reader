import React, { Component } from "react";
import OtpInput from "react-otp-input";
import { getMembersDetails } from "../../api/rationcard";
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom";
import DialogCustom from "../../components/DialogCustom";
import MemberCard from "../../components/MemberCard";
import PageTitle from "../../components/PageTitle";
class MemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptionToVerify: "",
      openDialog: false,
      memberList: [],
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
              memberList: res.data,
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
  chooseOptionToVerify(selectedOption) {
    console.log(selectedOption);
    this.setState({
      openDialog: true,
    });
  }

  renderMembers = () => {
    return this.state.memberList.length > 0 ? (
      this.state.memberList.map((member, index) => {
        return (
          <div className="w-50 mb-4" key={index}>
            <MemberCard
              name={member["MemberName"]}
              age={parseInt(member["Age"])}
              gender={member["Gender"].toUpperCase()}
              handleChangeForVerify={this.chooseOptionToVerify}
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

  render() {
    return (
      <div className="d-flex flex-column">
        <DialogCustom
          open={this.state.openDialog}
          handleClose={() => {
            this.setState({
              openDialog: false,
            });
          }}
        >
          <div className="w-100 d-flex flex-column align-items-center justify-content-center">
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
              <ButtonCustom label={"Verify"} />
            </div>
          </div>
        </DialogCustom>
        <PageTitle title={"Members "} />
        <div className="w-100 d-flex flex-row flex-wrap">
          {this.renderMembers()}
        </div>
      </div>
    );
  }
}

export default MemberList;
