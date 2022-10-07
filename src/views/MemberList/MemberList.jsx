import React, { Component } from "react";
import MemberCard from "../../components/MemberCard/MemberCard";
import PageTitle from "../../components/PageTitle/PageTitle";

class MemberList extends Component {
  render() {
    return (
      <div className="d-flex flex-column">
        <PageTitle title={"Members "} />
        <div className="w-100 d-flex flex-row flex-wrap">
          <div className="w-50 mb-4">
            <MemberCard name="Niyaz" age={15} gender={"MALE"} />
          </div>
          <div className="w-50 mb-4">
            <MemberCard name="Niyaz" age={25} gender={"MALE"} />
          </div>
          <div className="w-50 mb-4">
            <MemberCard name="Jhon Deo " age={45} gender={"MALE"} />
          </div>
          <div className="w-50 mb-4">
            <MemberCard name="Jhon Deo Elder " age={62} gender={"MALE"} />
          </div>
          <div className="w-50 mb-4">
            <MemberCard name="Lice Ray" age={40} gender={"FEMALE"} />
          </div>
          <div className="w-50 mb-4">
            <MemberCard name="Zeda" age={56} gender={"FEMALE"} />
          </div>
          <div className="w-50 mb-4">
            <MemberCard name="Zeda Elder" age={65} gender={"FEMALE"} />
          </div>
        </div>
      </div>
    );
  }
}

export default MemberList;
