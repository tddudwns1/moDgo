import { useEffect, useState } from "react";
import styled from "styled-components";
import { customMedia } from "../../GlobalStyles";
import axios from "axios";

import Button from "../common/Button";
import profile from "../../images/icons/profile.png";

const Member = (props) => {
  const [userEvaluation, setUserEvaluation] = useState();

  const getUserEvaluation = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_API_URL + `/users/${props.myMember.userId}`
      );
      console.log(res.data);
      localStorage.setItem("evaluation_good", res.data.totalGoodScore);
      localStorage.setItem("evaluation_normal", res.data.totalNormalScore);
      localStorage.setItem("evaluation_bad", res.data.totalBadScore);
      setUserEvaluation(res.data);
      console.log(props.myMember.userId);
    } catch (err) {
      console.log(err);
    }
  };
  getUserEvaluation();

  const evaluation_good = localStorage.getItem("evaluation_good");
  const evaluation_normal = localStorage.getItem("evaluation_normal");
  const evaluation_bad = localStorage.getItem("evaluation_bad");

  return (
    <MemberBar>
      <MemberProfileIcon>
        {props.myMember.imgUrl ? (
          <img src={props.myMember.imgUrl} alt="Profile icon" />
        ) : (
          <img src={profile} alt="Profile icon" />
        )}
      </MemberProfileIcon>
      <MemberUsername>{props.myMember.name}</MemberUsername>
      <MemberEmail>{props.myMember.email}</MemberEmail>
      <MemberEmail>
        😍
        {evaluation_good}
        🙂
        {evaluation_normal}
        🙁
        {evaluation_bad}
      </MemberEmail>

      {/* <MemberBtn
        onClick={() =>
          props.handleMemberDelete(props.myMember.userId, props.myMember.clubId)
        }
      >
        내보내기
      </MemberBtn> */}
    </MemberBar>
  );
};

const MemberBar = styled.div`
  width: 1200px;
  height: 80px;
  border: 1.5px solid #c4c4c4;
  border-radius: 5px;
  display: flex;
  align-items: center;

  ${customMedia.lessThan("mobile")`
    width: 295px;
    height: 40px;
  `}
  ${customMedia.between("mobile", "largeMobile")`
    width: 363px;
    height: 40px;
  `}
  ${customMedia.between("largeMobile", "tablet")`
    width: 610px;
    height: 60px;
  `}
  ${customMedia.between("tablet", "desktop")`
    width: 880px;
    height: 60px;
  `}
`;

const MemberProfileIcon = styled.div`
  width: 48px;
  height: 48px;
  margin-left: 65px;
  margin-right: 15px;

  ${customMedia.lessThan("mobile")`
    width: 24px;
    height: 24px;
    margin-left: 10px;
    margin-right: 5px;
  `}
  ${customMedia.between("mobile", "largeMobile")`
    width: 24px;
    height: 24px;
    margin-left: 10px;
    margin-right: 5px;
  `}
  ${customMedia.between("largeMobile", "tablet")`
    width: 32px;
    height: 32px;
    margin-left: 25px;
    margin-right: 15px;
  `}
  ${customMedia.between("tablet", "desktop")`
    width: 40px;
    height: 40px;
    margin-left: 45px;
    margin-right: 15px;
  `}
	img {
    width: 100%;
    heigt: 100%;
    border-radius: 50%;
  }
`;

const MemberUsername = styled.div`
  font-size: 20px;
  margin-right: 55px;

  ${customMedia.lessThan("mobile")`
    font-size: 10px;
    margin-right: 15px;
  `}
  ${customMedia.between("mobile", "largeMobile")`
    font-size: 10px;
    margin-right: 15px;
  `}
  ${customMedia.between("largeMobile", "tablet")`
    font-size: 16px;
  `}
  ${customMedia.between("tablet", "desktop")`
    font-size: 18px;
  `}
`;

const MemberEmail = styled.div`
  font-size: 20px;
  flex: 1;

  ${customMedia.lessThan("mobile")`
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
  ${customMedia.between("mobile", "largeMobile")`
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
  ${customMedia.between("largeMobile", "tablet")`
    font-size: 16px;
  `}
  ${customMedia.between("tablet", "desktop")`
    font-size: 18px;
  `}
`;

const MemberBtn = styled(Button)`
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  background-color: #029400;
  border: none;
  border-radius: 6px;
  margin-right: 55px;

  ${customMedia.lessThan("mobile")`
    font-size: 10px;
    padding: 3px 7px;
    margin-right: 7px;
  `}
  ${customMedia.between("mobile", "largeMobile")`
    font-size: 10px;
    padding: 3px 7px;
    margin-right: 7px;
  `}
  ${customMedia.between("largeMobile", "tablet")`
    font-size: 12px;
    padding: 5px 10px;
    margin-right: 15px;
  `}
  ${customMedia.between("tablet", "desktop")`
    font-size: 14px;
    padding: 5px 15px;
    margin-right: 25px;
  `}
`;

export default Member;
