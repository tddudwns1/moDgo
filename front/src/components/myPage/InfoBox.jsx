
import React from "react";
import styled from "styled-components";
import { Skeleton, Modal, Row, message } from "antd";
import { customMedia } from "../../GlobalStyles";

import SmallTag from "../common/SmallTag";
import Button from "../common/Button";
import unfilledHeart from "../../images/icons/unfilled_heart.png";
import filledHeart from "../../images/icons/filled_heart.png";


const InfoBox = (props) => {
  return (
    <InfoBoxContainer>
      <ProfileIcon>

        <img src={props.userImg} alt={"User Image"} />

      </ProfileIcon>
      <ClubInfo>
        {/* <Title>{props.userId}</Title> */}
        <InfoRow>
          <SubTitle>이름</SubTitle> <Text>{props.userName}</Text>
        </InfoRow>
        <InfoRow>
          <SubTitle>이메일</SubTitle> <Text>{props.userEmail}</Text>
        </InfoRow>


      </ClubInfo>
    </InfoBoxContainer>
  );
};

export default InfoBox;

const ProfileIcon = styled.div`
  width: 150px;
  height: 150px;
  padding: auto;
  margin: auto;
<<<<<<< HEAD
  ${customMedia.lessThan('mobile')`
    width: 56px;
    height: 56px;
  `}
  ${customMedia.between('mobile', 'largeMobile')`
    width: 56px;
    height: 56px;
  `}
  ${customMedia.between('largeMobile', 'tablet')`
    width: 64px;
    height: 64px;
  `}
    ${customMedia.between('tablet', 'desktop')`
    width: 80px;
    height: 80px;
  `}
    img {
=======
  ${customMedia.lessThan("mobile")`
      width: 56px;
      height: 56px;
    `}
  ${customMedia.between("mobile", "largeMobile")`
      width: 56px;
      height: 56px;
    `}
    ${customMedia.between("largeMobile", "tablet")`
      width: 64px;
      height: 64px;
    `}
      ${customMedia.between("tablet", "desktop")`
      width: 80px;
      height: 80px;
    `}
      img {
>>>>>>> d50cacbb35b9f482322e47b7c3e490b28f965cb1
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
`;

const InfoBoxContainer = styled.div`
  width: 100%;
  height: 332px;
  border: 1.5px solid #e5e5e5;
  border-radius: 10px;
  display: flex;

<<<<<<< HEAD
  ${customMedia.lessThan('mobile')`
    flex-direction: column;
    height: 372px;
  `}
  ${customMedia.between('mobile', 'largeMobile')`
    flex-direction: column;
    height: 340px;
  `}
  ${customMedia.between('largeMobile', 'tablet')`
    height: 203px;
  `}
  ${customMedia.between('tablet', 'desktop')`
    height: 293px;
  `}
=======
  ${customMedia.lessThan("mobile")`
      flex-direction: column;
      height: 372px;
    `}
  ${customMedia.between("mobile", "largeMobile")`
      flex-direction: column;
      height: 340px;
    `}
    ${customMedia.between("largeMobile", "tablet")`
      height: 203px;
    `}
    ${customMedia.between("tablet", "desktop")`
      height: 293px;
    `}
>>>>>>> d50cacbb35b9f482322e47b7c3e490b28f965cb1
`;

const ClubThumbnail = styled.div`
  width: 150px;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px 0 0 10px;

<<<<<<< HEAD
    ${customMedia.lessThan('mobile')`
      border-radius: 10px 10px 0 0;
    `}
    ${customMedia.between('mobile', 'largeMobile')`
      border-radius: 10px 10px 0 0;
    `}
  }

  ${customMedia.lessThan('mobile')`
    width: 295px;
    height: 50%;
  `}
  ${customMedia.between('mobile', 'largeMobile')`
    width: 363px;
    height: 50%;
  `}
  ${customMedia.between('largeMobile', 'tablet')`
    width: 305px;
  `}
  ${customMedia.between('tablet', 'desktop')`
    width: 440px;
  `}
=======
    ${customMedia.lessThan("mobile")`
        border-radius: 10px 10px 0 0;
      `}
    ${customMedia.between("mobile", "largeMobile")`
        border-radius: 10px 10px 0 0;
      `}
  }

  ${customMedia.lessThan("mobile")`
      width: 295px;
      height: 50%;
    `}
  ${customMedia.between("mobile", "largeMobile")`
      width: 363px;
      height: 50%;
    `}
    ${customMedia.between("largeMobile", "tablet")`
      width: 305px;
    `}
    ${customMedia.between("tablet", "desktop")`
      width: 440px;
    `}
>>>>>>> d50cacbb35b9f482322e47b7c3e490b28f965cb1
`;

const ClubInfo = styled.div`
  width: 50%;
  padding: 0 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
<<<<<<< HEAD
  ${customMedia.lessThan('mobile')`

    width: 100%;
    height: 50%;
    padding: 5px 17px;
  `}
  ${customMedia.between('mobile', 'largeMobile')`
    width: 100%;
    padding: 17px 25px;
  `}
  ${customMedia.between('largeMobile', 'tablet')`
    padding: 10px 20px;
  `}
=======
  ${customMedia.lessThan("mobile")`

      width: 100%;
      height: 50%;
      padding: 5px 17px;
    `}
  ${customMedia.between("mobile", "largeMobile")`
      width: 100%;
      padding: 17px 25px;
    `}
    ${customMedia.between("largeMobile", "tablet")`
      padding: 10px 20px;
    `}
>>>>>>> d50cacbb35b9f482322e47b7c3e490b28f965cb1
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 16px;

<<<<<<< HEAD
  ${customMedia.lessThan('mobile')`
    font-size: 16px;
    margin-bottom: 8px;
  `}
  ${customMedia.between('mobile', 'largeMobile')`
    font-size: 16px;
    margin-bottom: 8px;
  `}
  ${customMedia.between('largeMobile', 'tablet')`
    font-size: 18px;
  `}
  ${customMedia.between('tablet', 'desktop')`
    font-size: 24px;
  `}
=======
  ${customMedia.lessThan("mobile")`
      font-size: 16px;
      margin-bottom: 8px;
    `}
  ${customMedia.between("mobile", "largeMobile")`
      font-size: 16px;
      margin-bottom: 8px;
    `}
    ${customMedia.between("largeMobile", "tablet")`
      font-size: 18px;
    `}
    ${customMedia.between("tablet", "desktop")`
      font-size: 24px;
    `}
>>>>>>> d50cacbb35b9f482322e47b7c3e490b28f965cb1
`;

const SubTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #000000;

<<<<<<< HEAD
  ${customMedia.lessThan('mobile')`
    font-size: 14px;
  `}
  ${customMedia.between('mobile', 'largeMobile')`
    font-size: 12px;
  `}
  ${customMedia.between('largeMobile', 'tablet')`
    font-size: 14px;
  `}
  ${customMedia.between('tablet', 'desktop')`
    font-size: 18px;
  `}
=======
  ${customMedia.lessThan("mobile")`
      font-size: 14px;
    `}
  ${customMedia.between("mobile", "largeMobile")`
      font-size: 12px;
    `}
    ${customMedia.between("largeMobile", "tablet")`
      font-size: 14px;
    `}
    ${customMedia.between("tablet", "desktop")`
      font-size: 18px;
    `}
>>>>>>> d50cacbb35b9f482322e47b7c3e490b28f965cb1
`;

const Text = styled.div`
  font-size: 20px;
<<<<<<< HEAD
  ${customMedia.lessThan('mobile')`

    font-size: 14px;
  `}
  ${customMedia.between('mobile', 'largeMobile')`
    font-size: 12px;
  `}
  ${customMedia.between('largeMobile', 'tablet')`
    font-size: 14px;
  `}
  ${customMedia.between('tablet', 'desktop')`
    font-size: 18px;
  `}
=======
  ${customMedia.lessThan("mobile")`

      font-size: 14px;
    `}
  ${customMedia.between("mobile", "largeMobile")`
      font-size: 12px;
    `}
    ${customMedia.between("largeMobile", "tablet")`
      font-size: 14px;
    `}
    ${customMedia.between("tablet", "desktop")`
      font-size: 18px;
    `}
>>>>>>> d50cacbb35b9f482322e47b7c3e490b28f965cb1
`;

const TagContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
<<<<<<< HEAD
  ${customMedia.between('mobile', 'largeMobile')`

    margin-top: 5px;
  `}
=======
  ${customMedia.between("mobile", "largeMobile")`

      margin-top: 5px;
    `}
>>>>>>> d50cacbb35b9f482322e47b7c3e490b28f965cb1
`;

const Tag = styled(SmallTag)`
  & {
    font-size: 16px;
    padding: 7px 25px;

<<<<<<< HEAD
    ${customMedia.lessThan('mobile')`
      font-size: 10px;
      padding: 5px 10px;
      margin-top: 0;
    `}
    ${customMedia.between('mobile', 'largeMobile')`
      font-size: 10px;
      padding: 5px 10px;
      margin-top: 0;
    `}
    ${customMedia.between('largeMobile', 'tablet')`
      font-size: 12px;
      padding: 7px 13px;
    `}
    ${customMedia.between('tablet', 'desktop')`
      font-size: 16px;
      padding: 7px 20px;
    `}
=======
    ${customMedia.lessThan("mobile")`
        font-size: 10px;
        padding: 5px 10px;
        margin-top: 0;
      `}
    ${customMedia.between("mobile", "largeMobile")`
        font-size: 10px;
        padding: 5px 10px;
        margin-top: 0;
      `}
      ${customMedia.between("largeMobile", "tablet")`
        font-size: 12px;
        padding: 7px 13px;
      `}
      ${customMedia.between("tablet", "desktop")`
        font-size: 16px;
        padding: 7px 20px;
      `}
>>>>>>> d50cacbb35b9f482322e47b7c3e490b28f965cb1
  }
`;

const BtnRow = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 40px;
<<<<<<< HEAD
  ${customMedia.lessThan('mobile')`

    gap: 10px;
    margin-top: 10px;
  `}
  ${customMedia.between('mobile', 'largeMobile')`
    gap: 10px;
    margin-top: 10px;
  `}
  ${customMedia.between('largeMobile', 'tablet')`
    gap: 20px;
    margin-top: 15px;
  `}
=======
  ${customMedia.lessThan("mobile")`

      gap: 10px;
      margin-top: 10px;
    `}
  ${customMedia.between("mobile", "largeMobile")`
      gap: 10px;
      margin-top: 10px;
    `}
    ${customMedia.between("largeMobile", "tablet")`
      gap: 20px;
      margin-top: 15px;
    `}
>>>>>>> d50cacbb35b9f482322e47b7c3e490b28f965cb1
`;

const LikeIconContainer = styled.div`
  width: 50px;
  height: 50px;
  border: 2px solid #e5e5e5;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
<<<<<<< HEAD
  ${customMedia.lessThan('mobile')`
>>>>>>> 8681664341ffce947f8cfce9b786a27422db5900
    width: 40px;
    height: 40px;
  `}
  ${customMedia.between('mobile', 'largeMobile')`
    width: 30px;
    height: 30px;
    padding-bottom: 8px;
  `}
  ${customMedia.between('largeMobile', 'tablet')`
    width: 40px;
    height: 40px;
  `}
=======
  ${customMedia.lessThan("mobile")`
  >>>>>>> 8681664341ffce947f8cfce9b786a27422db5900
      width: 40px;
      height: 40px;
    `}
  ${customMedia.between("mobile", "largeMobile")`
      width: 30px;
      height: 30px;
      padding-bottom: 8px;
    `}
    ${customMedia.between("largeMobile", "tablet")`
      width: 40px;
      height: 40px;
    `}
>>>>>>> d50cacbb35b9f482322e47b7c3e490b28f965cb1
`;

const LikeIcon = styled.div`
  width: 32px;
  height: 30px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
<<<<<<< HEAD
  ${customMedia.lessThan('mobile')`
>>>>>>> 8681664341ffce947f8cfce9b786a27422db5900
    width: 24px;
    height: 22px;
  `}
  ${customMedia.between('mobile', 'largeMobile')`
    width: 18px;
    height: 16px;
  `}
  ${customMedia.between('largeMobile', 'tablet')`
    width: 24px;
    height: 22px;
  `}
  ${customMedia.between('tablet', 'desktop')`
    width: 28px;
    height: 26px;
  `}
=======
  ${customMedia.lessThan("mobile")`
  >>>>>>> 8681664341ffce947f8cfce9b786a27422db5900
      width: 24px;
      height: 22px;
    `}
  ${customMedia.between("mobile", "largeMobile")`
      width: 18px;
      height: 16px;
    `}
    ${customMedia.between("largeMobile", "tablet")`
      width: 24px;
      height: 22px;
    `}
    ${customMedia.between("tablet", "desktop")`
      width: 28px;
      height: 26px;
    `}
>>>>>>> d50cacbb35b9f482322e47b7c3e490b28f965cb1
`;

const ApplyBtn = styled(Button)`
  width: 300px;
  height: 50px;
  color: #ffffff;
  background-color: #029400;
  border-radius: 5px;
  padding: 0;
  text-align: center;

  &:disabled {
    opacity: 60%;
    cursor: not-allowed;
  }

<<<<<<< HEAD
  ${customMedia.lessThan('mobile')`

    width: 200px;
    height: 40px;
    font-size: 14px;
  `}
  ${customMedia.between('mobile', 'largeMobile')`
    width: 250px;
    height: 30px;
    font-size: 12px;
  `}
  ${customMedia.between('largeMobile', 'tablet')`
    width: 200px;
    height: 40px;
    font-size: 16px;
  `}
  ${customMedia.between('tablet', 'desktop')`
    width: 250px;
    height: 50px;
    font-size: 18px;
  `}
=======
  ${customMedia.lessThan("mobile")`

      width: 200px;
      height: 40px;
      font-size: 14px;
    `}
  ${customMedia.between("mobile", "largeMobile")`
      width: 250px;
      height: 30px;
      font-size: 12px;
    `}
    ${customMedia.between("largeMobile", "tablet")`
      width: 200px;
      height: 40px;
      font-size: 16px;
    `}
    ${customMedia.between("tablet", "desktop")`
      width: 250px;
      height: 50px;
      font-size: 18px;
    `}
>>>>>>> d50cacbb35b9f482322e47b7c3e490b28f965cb1
`;

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  .ant-modal-content {
    padding: 30px 55px;
    display: flex;
    align-items: center;
<<<<<<< HEAD
    ${customMedia.lessThan('mobile')`
      padding: 15px 25px;
    `}
    ${customMedia.between('mobile', 'tablet')`
      padding: 25px 50px;
    `}
=======
    ${customMedia.lessThan("mobile")`
        padding: 15px 25px;
      `}
    ${customMedia.between("mobile", "tablet")`
        padding: 25px 50px;
      `}
>>>>>>> d50cacbb35b9f482322e47b7c3e490b28f965cb1
  }
  .ant-modal-body {
    text-align: center;
  }
  .ant-modal-footer {
    display: none;
  }
`;

const ModalTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
<<<<<<< HEAD
  ${customMedia.lessThan('mobile')`
    font-size: 14px;
  `}
  ${customMedia.between('mobile', 'tablet')`
>>>>>>> 8681664341ffce947f8cfce9b786a27422db5900
    font-size: 18px;
  `}
=======
  ${customMedia.lessThan("mobile")`
      font-size: 14px;
    `}
  ${customMedia.between("mobile", "tablet")`
  >>>>>>> 8681664341ffce947f8cfce9b786a27422db5900
      font-size: 18px;
    `}
>>>>>>> d50cacbb35b9f482322e47b7c3e490b28f965cb1
`;

const ButtonRow = styled(Row)`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 50px;
`;

const FilledBtn = styled(Button)`
  & {
    color: #ffffff;
    background-color: #029400;
    border: none;
    border-radius: 6px;
    outline: none;
    cursor: pointer;
<<<<<<< HEAD
    ${customMedia.lessThan('mobile')`
      font-size: 14px;
    `}
    ${customMedia.between('mobile', 'tablet')`
      font-size: 18px;
    `}
=======
    ${customMedia.lessThan("mobile")`
        font-size: 14px;
      `}
    ${customMedia.between("mobile", "tablet")`
        font-size: 18px;
      `}
>>>>>>> d50cacbb35b9f482322e47b7c3e490b28f965cb1
  }
`;

const SkeletonImg = styled(Skeleton.Image)`
  .ant-skeleton-image {
    width: 493px;
    height: 332px;

<<<<<<< HEAD
    ${customMedia.lessThan('mobile')`
      width: 295px;
      height: 186px;
    `}
    ${customMedia.between('mobile', 'largeMobile')`
      width: 363px;
      height: 170px;
    `}
    ${customMedia.between('largeMobile', 'tablet')`
      width: 305px;
      height: 203px;
    `}
    ${customMedia.between('tablet', 'desktop')`
      width: 440px;
      height: 293px;
    `}
=======
    ${customMedia.lessThan("mobile")`
        width: 295px;
        height: 186px;
      `}
    ${customMedia.between("mobile", "largeMobile")`
        width: 363px;
        height: 170px;
      `}
      ${customMedia.between("largeMobile", "tablet")`
        width: 305px;
        height: 203px;
      `}
      ${customMedia.between("tablet", "desktop")`
        width: 440px;
        height: 293px;
      `}
>>>>>>> d50cacbb35b9f482322e47b7c3e490b28f965cb1
  }
`;
