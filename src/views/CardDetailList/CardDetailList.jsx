import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import React, { Component } from "react";
import { getMembersDetails } from "../../api/rationcard";
import AccordinoCustom from "../../components/AccordinoCustom/AccordinoCustom";
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom";
import PageTitle from "../../components/PageTitle/PageTitle";
import SkeltonCustom from "../../components/SkeltonCustom/SkeltonCustom";

class CardDetailList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptionToVerify: "",
      loading: true,
      memberList: [],
      isErrorInOTP: false,
      selectedAdharNo: "",
      otp: "",
      cardList: [],
    };
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
              loading: false,
              memberList: res.data,
              rationCardNo: this.props.location.state?.rationCardNo,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            loading: false,
          });
        });
    }
  };

  getCardDetails = () => {
    getMembersDetails(this.state?.rationCardNo)
      .then((res) => {
        if (res.status) {
          this.setState({
            cardList: res.data,
            loading: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
        });
      });
  };

  renderMembers = () => {
    if (this.state.loading) {
      return (
        <div className="w-100 mb-4">
          <SkeltonCustom variant="rectangular" height={60} />
          <SkeltonCustom variant="rectangular" height={60} />
          <SkeltonCustom variant="rectangular" height={60} />
          <SkeltonCustom variant="rectangular" height={60} />
          <SkeltonCustom variant="rectangular" height={60} />
          <SkeltonCustom variant="rectangular" height={60} />
          <SkeltonCustom variant="rectangular" height={60} />
        </div>
      );
    }
    return this.state.memberList.length > 0 ? (
      this.state.memberList.map((member, index) => {
        return (
          <div className="w-100 mb-4" key={index}>
            <AccordinoCustom
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

  renderCardList = () => {
    const { cardList } = this.state;
    if (cardList.length === 0) {
      return (
        <div className="w-75 d-flex flex-column border justify-content-center align-items-center rounded-pill p-4 bg-Primary">
          <div>
            <HourglassEmptyIcon />
          </div>
          <div className="fw-bold fs-5 ">Click here to get card detail</div>
          <div>
            <ButtonCustom
              label="Click"
              color="white"
              onClick={this.getCardDetails}
            />
          </div>
        </div>
      );
    } else {
      return this.state.cardList.map((member, index) => {
        return (
          <div className="w-100 mb-4" key={index}>
            <AccordinoCustom
              name={member["MemberName"]}
              age={parseInt(member["Age"])}
              gender={member["Gender"].toUpperCase()}
              handleChangeForVerify={(option) => {
                this.chooseOptionToVerify(index, option);
              }}
              adharNo={member["AadharNumber"]}
              relationShip={member["RelationWithFamilyHead"]}
              mobileNumber={member["Mobilenumber"]}
              memberId={"1234"}
              // verified
            />
          </div>
        );
      });
    }
  };

  render() {
    return (
      <div className="d-flex flex-column">
        <PageTitle title={"Card Detail "} />
        <div className="w-100 d-flex  ">
          <div className="w-50 d-flex flex-column border-end p-1">
            <div
              className="mb-2 w-100 bg-Primary p-1"
              style={{ height: "32px" }}
            >
              Ration Card Details from NFSA/SFSA
            </div>
            <div className="w-100 d-flex flex-column">
              {this.renderMembers()}
            </div>
          </div>
          <div className="w-50 d-flex flex-column  p-1">
            <div
              className="mb-2 w-100 bg-Primary p-1"
              style={{ height: "32px" }}
            >
              Card Detail
            </div>
            <div className="w-100 d-flex flex-column justify-content-center align-items-center h-100">
              {this.renderCardList()}
            </div>

            {this.state.cardList.length > 0 ? (
              <div className="w-100 d-flex flex-row justify-content-center">
                <div>
                  <ButtonCustom
                    label="Update Smart Card"
                    onClick={() => {
                      window.alert("Smart Card has been Updated Successfully");
                    }}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CardDetailList;
