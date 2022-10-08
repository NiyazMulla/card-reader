import React, { Component } from "react";
import MemberCard from "../../components/MemberCard";
import PageTitle from "../../components/PageTitle";
import DialogCustom from "../../components/DialogCustom";
import OtpInput from "react-otp-input";
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom";
class MemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptionToVerify: "",
      openDialog: false,
    };
    this.chooseOptionToVerify = this.chooseOptionToVerify.bind(this);
  }

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
          <div className="w-50 mb-4">
            <MemberCard
              name="Niyaz"
              age={15}
              gender={"MALE"}
              handleChangeForVerify={this.chooseOptionToVerify}
              verified
            />
          </div>
          <div className="w-50 mb-4">
            <MemberCard
              name="Niyaz"
              age={25}
              gender={"MALE"}
              handleChangeForVerify={this.chooseOptionToVerify}
            />
          </div>
          <div className="w-50 mb-4">
            <MemberCard
              name="Jhon Deo "
              age={45}
              gender={"MALE"}
              handleChangeForVerify={this.chooseOptionToVerify}
            />
          </div>
          <div className="w-50 mb-4">
            <MemberCard
              name="Jhon Deo Elder "
              age={62}
              gender={"MALE"}
              handleChangeForVerify={this.chooseOptionToVerify}
              verified
            />
          </div>
          <div className="w-50 mb-4">
            <MemberCard
              name="Lice Ray"
              age={40}
              gender={"FEMALE"}
              handleChangeForVerify={this.chooseOptionToVerify}
            />
          </div>
          <div className="w-50 mb-4">
            <MemberCard
              name="Zeda"
              age={56}
              gender={"FEMALE"}
              handleChangeForVerify={this.chooseOptionToVerify}
            />
          </div>
          <div className="w-50 mb-4">
            <MemberCard
              name="Zeda Elder"
              age={65}
              gender={"FEMALE"}
              handleChangeForVerify={this.chooseOptionToVerify}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MemberList;
