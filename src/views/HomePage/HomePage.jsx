import React, { Component } from "react";
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom";
import PageTitle from "../../components/PageTitle/PageTitle";
import SearchBox from "../../components/SearchBox/SearchBox";
import { LINK_MEMBER_LIST } from "../../routes";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: "",
    };
  }

  render() {
    return (
      <div className="d-flex flex-column">
        <PageTitle title={"Customer Search "} />

        <div className="w-100  d-flex flex-column align-items-center justify-content-center ">
          <div className="search-container">
            <SearchBox />
            <div className="my-4 d-flex flex-column align-items-center  ">
              <div className="fs-3 text-primary">
                Enter ration card number to be looking for
              </div>
              <div className="fs-6">Click button to see the result</div>
            </div>
            <div className="">
              <ButtonCustom
                label={"Search"}
                onClick={() => {
                  this.props.history.push(LINK_MEMBER_LIST);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
