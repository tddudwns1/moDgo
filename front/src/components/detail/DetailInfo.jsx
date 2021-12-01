import React from "react";
import { useState } from "react";
import { Divider, Button, Modal } from "antd";
import styled from "styled-components";
import { customMedia } from "../../GlobalStyles";

const DetailInfo = ({ ...props }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [memberId, setMemberId] = useState();
  const [voteCount, setVoteCount] = useState(0);
  const [evaluation, setEvaluation] = useState();
  const userId = localStorage.getItem("user_id");
  const confirmedIdArr = [];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  for (let i = 0; i < props.confirmedUser.length; i++) {
    confirmedIdArr.push(props.confirmedUser[i].userId);
  }

  return (
    <DetailInfoContainer>
      <Title>상세 설명</Title>
      <TextBox>
        <SubTitle>{props.club.contents}</SubTitle>
        <Contents>{props.club.description}</Contents>
      </TextBox>
      <Title>참여 회원</Title>
      <TextBox>
        <Contents>
          {props.confirmedUser.map((user, i) => (
            <img
              src={props.confirmedUser[i].imgUrl}
              alt="User profile"
              onClick={() => {
                setMemberId(props.confirmedUser[i].id);
                props.handleGetEvaluation(memberId);
                setEvaluation(props.getEvaluation);
                console.log("evaluation");
                console.log(evaluation);
                // if (evaluation.evaluationStatus !== "CLEAR") {
                //   showModal();
                // }
              }}
            />
          ))}
        </Contents>
        {confirmedIdArr.includes(userId) ? (
          voteCount !== 1 ? (
            <StyledModal visible={isModalVisible} onCancel={handleCancel}>
              <Title>
                <strong>회원 평가</strong>
                <hr />
                <h1
                  onClick={() => {
                    props.handleEvaluation("GOOD", memberId);
                    // setVoteCount(1);
                  }}
                >
                  😍
                </h1>
                <h1
                  onClick={() => {
                    props.handleEvaluation("NORMAL", memberId);
                    // setVoteCount(1);
                  }}
                >
                  🙂
                </h1>
                <h1
                  onClick={() => {
                    props.handleEvaluation("BAD", memberId);
                    // setVoteCount(1);
                  }}
                >
                  🙁
                </h1>
              </Title>
              <SubmitButton
                onClick={() => {
                  handleCancel();
                }}
              >
                확인
              </SubmitButton>
            </StyledModal>
          ) : null
        ) : null}
      </TextBox>
      <Divider />
    </DetailInfoContainer>
  );
};

export default DetailInfo;

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  .ant-modal-content {
    padding: 30px 55px;
    display: flex;
    align-items: center;
    ${customMedia.lessThan("mobile")`
      padding: 10px;
    `}
    ${customMedia.between("mobile", "largeMobile")`
      padding: 10px 15px;
    `}
    ${customMedia.between("largeMobile", "tablet")`
      padding: 20px 35px;
    `}
  }
  .ant-modal-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 48px;
    ${customMedia.lessThan("mobile")`
      gap: 24px;
      padding: 15px;
    `}
    ${customMedia.between("mobile", "largeMobile")`
      gap: 26px;
    `}
    ${customMedia.between("largeMobile", "tablet")`
      gap: 32px;
    `}
  }
  .ant-modal-footer {
    display: none;
  }
`;

const SubmitButton = styled.button`
  width: 100px;
  height: 50px;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  background-color: #029400;
  border: none;
  border-radius: 5px;
  outline: none;
  text-align: center;
  cursor: pointer;
  position: relative;
  ${customMedia.lessThan("mobile")`
    font-size: 14px;
    width: 220px;
  `}
  ${customMedia.between("mobile", "tablet")`
    font-size: 16px;
    width: 240px;
  `}
`;

const DetailInfoContainer = styled.div`
  margin: 60px 0;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  h1 {
    display: flex;
    margin: auto;
  }

  ${customMedia.lessThan("mobile")`
    font-size: 18px;
  `}
  ${customMedia.between("mobile", "largeMobile")`
    font-size: 18px;
  `}
	${customMedia.between("largeMobile", "tablet")`
    font-size: 20px;
  `}
	${customMedia.between("tablet", "desktop")`
    font-size: 22px;
  `}
`;

const SubTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;

  ${customMedia.lessThan("mobile")`
    font-size: 16px;
  `}
  ${customMedia.between("mobile", "largeMobile")`
    font-size: 16px;
  `}
	${customMedia.between("largeMobile", "tablet")`
    font-size: 18px;
  `}
	${customMedia.between("tablet", "desktop")`
    font-size: 18px;
  `}
`;

const Contents = styled.div`
  font-size: 16px;
  white-space: pre-wrap;
  img {
    width: 32px;
    height: 32px;
    margin: auto 20px auto 20px;
  }

  ${customMedia.lessThan("mobile")`
    font-size: 14px;
  `}
  ${customMedia.between("mobile", "largeMobile")`
    font-size: 14px;
  `}
	${customMedia.between("largeMobile", "tablet")`
    font-size: 14px;
  `}
	${customMedia.between("tablet", "desktop")`
    font-size: 14px;
  `}
`;

const TextBox = styled.div`
  margin-bottom: 40px;
`;

const NavProfile = styled.div`
  width: 48px;
  height: 48px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
  margin-bottom: 40px;
  ${customMedia.lessThan("mobile")`
    width: 28px;
    height: 28px;
  `}
  ${customMedia.between("mobile", "largeMobile")`
    width: 30px;
    height: 30px;
  `}
	${customMedia.between("largeMobile", "tablet")`
    width: 32px;
    height: 32px;
  `}
`;
