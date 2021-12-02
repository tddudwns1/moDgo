import React from "react";
import { useHistory } from "react-router-dom";
import { Card, message, Skeleton } from "antd";
import styled from "styled-components";
import { customMedia } from "../../GlobalStyles";

import SmallTag from "../common/SmallTag";
import ExpiredTag from "../common/ExpiredTag";
import WaitingTag from "../common/WaitingTag";
import unfilledHeart from "../../images/icons/unfilled_heart.png";
import filledHeart from "../../images/icons/filled_heart.png";

const JoinedClubCard = (props) => {
  const history = useHistory();

  return (
    <StyledCard
      hoverable
      cover={
        props.club.imgUrl ? (
          <img src={props.club.imgUrl} alt="Clubcard thumbnail" />
        ) : (
          <SkeletonImg />
        )
      }
      onClick={() => history.push(`/detail/${props.club.clubId}`)}
    >
      <Meta title={props.club.title} description={props.club.contents} />
      <>
        {(() => {
          if (props.club.clubStatus === "EXPIRED")
            return <ClubExpiredTag>마감</ClubExpiredTag>;
          else if (props.club.approvalStatus === "WAITING")
            return <ClubWaitingTag>대기중</ClubWaitingTag>;
          else return "";
        })()}
      </>
      <TagContainer>
        {props.club.tags.split(", ").map((tag, i) => (
          <ClubTag key={i}>{tag}</ClubTag>
        ))}
      </TagContainer>
    </StyledCard>
  );
};

export default JoinedClubCard;

const { Meta } = Card;

const StyledCard = styled(Card)`
  width: 255px;
  height: 320px;
  border: 2px solid #e5e5e5;
  border-radius: 10px;
  position: relative;
  ${customMedia.lessThan("mobile")`
    width: 295px;
    height: 333px;
  `}
  ${customMedia.between("mobile", "largeMobile")`
    width: 363px;
    height: 401px;
  `}
	${customMedia.between("largeMobile", "tablet")`
    width: 285px;
    height: 323px;
  `}
	${customMedia.between("tablet", "desktop")`
    width: 212.5px;
    height: 250.5px;
  `}
  
	.ant-card-cover img {
    height: 150px;

    ${customMedia.lessThan("mobile")`
      height: 166.5px;
    `}
    ${customMedia.between("mobile", "largeMobile")`
      height: 200.5px;
    `}
    ${customMedia.between("largeMobile", "tablet")`
      height: 161.5px;
    `}
    ${customMedia.between("tablet", "desktop")`
    height: 125.25px;
    `}
  }
  .ant-card-body {
    height: 160px;
    padding: 20px;
    position: relative;

    ${customMedia.lessThan("mobile")`
      height: 166.5px;
      padding: 20px;
    `}
    ${customMedia.between("mobile", "largeMobile")`
      height: 200.5px;
      padding: 30px;
    `}
    ${customMedia.between("largeMobile", "tablet")`
      height: 161.5px;
      padding: 20px;
    `}
    ${customMedia.between("tablet", "desktop")`
      height: 125.25px;
      padding: 15px;
    `}
  }
  .ant-card-meta-title {
    font-weight: bold;
    font-size: 20px;

    ${customMedia.lessThan("mobile")`
      font-size: 18px;
    `}
    ${customMedia.between("mobile", "largeMobile")`
      font-size: 20px;
    `}
    ${customMedia.between("largeMobile", "tablet")`
      font-size: 18px;
    `}
    ${customMedia.between("tablet", "desktop")`
      font-size: 16px;
    `}
  }
  .ant-card-meta-description {
    font-size: 14px;
    color: black;

    ${customMedia.lessThan("mobile")`
      font-size: 14px;
    `}
    ${customMedia.between("mobile", "largeMobile")`
      font-size: 16px;
    `}
    ${customMedia.between("largeMobile", "tablet")`
      font-size: 14px;
    `}
    ${customMedia.between("tablet", "desktop")`
      font-size: 12px;
    `}
  }
`;

const TagContainer = styled.div`
  display: flex;
  gap: 5px;
  position: absolute;
  bottom: 20px;

  ${customMedia.lessThan("mobile")`
    bottom: 20px;
  `}
  ${customMedia.between("mobile", "largeMobile")`
    bottom: 25px;
  `}
	${customMedia.between("largeMobile", "tablet")`
    bottom: 20px;
  `}
	${customMedia.between("tablet", "desktop")`
    bottom: 15px;
  `}
`;

const ClubTag = styled(SmallTag)`
  & {
    font-size: 12px;
    padding: 5px 10px;

    ${customMedia.lessThan("mobile")`
    font-size: 12px;
    padding: 5px 10px;
  `}
    ${customMedia.between("mobile", "largeMobile")`
    font-size: 14px;
    padding: 5px 13px;
  `}
  ${customMedia.between("largeMobile", "tablet")`
    font-size: 12px;
    padding: 5px 10px;
  `}
  ${customMedia.between("tablet", "desktop")`
    font-size: 10px;
    padding: 3px 6px;
  `}
  }
`;

const LikeIcon = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
	position: absolute;
	right: 20px;
  bottom: 25px;
  
  ${customMedia.lessThan("mobile")`
    bottom: 15px;  
  `}
  ${customMedia.between("mobile", "largeMobile")`
    bottom: 20px;
  `}
	${customMedia.between("largeMobile", "tablet")`
    bottom: 15px;
  `}
	${customMedia.between("tablet", "desktop")`
    bottom: 15px;
  `}
  img {
		width: 24px;
    height: 22px;
  ${customMedia.lessThan("mobile")`
    width: 22px;
    height: 20px;
  `}
  ${customMedia.between("mobile", "largeMobile")`
    width: 24px;
    height: 22px;
  `}
	${customMedia.between("largeMobile", "tablet")`
    width: 20px;
    height: 18px;
  `}
	${customMedia.between("tablet", "desktop")`
    width: 20px;
    height: 18px;
  `}
`;

const LikeNum = styled.span`
  ${customMedia.lessThan("mobile")`
    font-size: 14px;
  `}
  ${customMedia.between("mobile", "largeMobile")`
    font-size: 16px;
  `}
	${customMedia.between("largeMobile", "tablet")`
    font-size: 12px;
  `}
	${customMedia.between("tablet", "desktop")`
    font-size: 12px;
  `}
`;

const ClubExpiredTag = styled(ExpiredTag)`
  & {
    font-size: 14px;
    padding: 5px;
    position: absolute;
    top: 5%;
    right: 3%;

    ${customMedia.lessThan("mobile")`
      top: 5%;
      right: 3%;
    `}
    ${customMedia.between("mobile", "tablet")`
      top: 5%;
      right: 3%;
    `}
    ${customMedia.between("tablet", "desktop")`
      font-size: 14px;
      padding: 3px;
      top: 7%;
      right: 5%;
    `}
  }
`;

const ClubWaitingTag = styled(WaitingTag)`
  & {
    font-size: 13px;
    padding: 5px;
    position: absolute;
    top: 5%;
    right: 3%;

    ${customMedia.lessThan("mobile")`
      top: 5%;
      right: 3%;
    `}
    ${customMedia.between("mobile", "largeMobile")`
      top: 5%;
      right: 3%;
    `}
    ${customMedia.between("largeMobile", "tablet")`
      top: 5%;
      right: 3%;
    `}
    ${customMedia.between("tablet", "desktop")`
      font-size: 14px;
      padding: 3px;
      top: 7%;
      right: 5%;
    `}
  }
`;

const SkeletonImg = styled(Skeleton.Image)`
  .ant-skeleton-image {
    width: 360px;
    height: 192.5px;

    ${customMedia.lessThan("mobile")`
      width: 295px;
      height: 160px;
    `}
    ${customMedia.between("mobile", "largeMobile")`
      width: 363px;
      height: 194px;
    `}
    ${customMedia.between("largeMobile", "tablet")`
      width: 295px;
      height: 160px;
    `}
    
    ${customMedia.between("tablet", "desktop")`
      width: 280px;
      height: 152.5px;
    `}
  }
`;
