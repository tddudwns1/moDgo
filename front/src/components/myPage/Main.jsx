import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs, Row, Divider, message, Modal } from 'antd';
import styled from 'styled-components';
import { customMedia } from '../../GlobalStyles';

// import MyComment from "./MyComment";
import EditForm from './EditForm';
import LikedClubCard from './LikedClubCard';
import JoinedClubCard from './JoinedClubCard';
import Member from './Member';
import InfoBox from './InfoBox';
import PendingMember from './PendingMember';
import Pagination from '../common/Pagination';
import Button from '../common/Button';
import NotFound from '../common/NotFound';
import Spin from '../common/Spin';
import { useHistory } from 'react-router-dom';
import MyClubCard from './MyClubCard';

const Main = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [myClubs, setMyClubs] = useState([]);
  const [likedClubs, setLikedClubs] = useState([]);
  const [myLikedClubs, setMyLikedClubs] = useState([]);
  const [myJoinedClubs, setMyJoinedClubs] = useState([]);
  const [myPendingMembers, setMyPendingMembers] = useState([]);
  const [myPendingMembersTotal, setMyPendingMembersTotal] = useState(0);
  const [myPendingMembersPage, setMyPendingMembersPage] = useState(1);
  const [myMembers, setMyMembers] = useState([]);
  const [myMembersTotal, setMyMembersTotal] = useState(0);
  const [myMembersPage, setMyMembersPage] = useState(1);
  const [myLikedClubsTotal, setMyLikedClubsTotal] = useState(0);
  const [myLikedClubsPage, setMyLikedClubsPage] = useState(1);
  const [myJoinedClubsTotal, setMyJoinedClubsTotal] = useState(0);
  const [myJoinedClubsPage, setMyJoinedClubsPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('user_id');
  const userImg = localStorage.getItem('user_image');
  const history = useHistory();
  const [visibility, setVisibility] = useState(false);
  const [selectedClubId, setSelectedClubId] = useState(0);
  const [selectedClubTitle, setSelectedClubTitle] = useState('');
  const [selectedClubContents, setSelectedClubContents] = useState('');
  const [selectedClubRequiredPerson, setSelectedClubRequiredPerson] =
    useState(0);
  const [selectedClubStartDate, setSelectedClubStartDate] = useState();
  const [selectedClubEndDate, setSelectedClubEndDate] = useState();
  // const [selectedClubStartDate, setSelectedClubStartDate] = useState();
  // const [selectedClubEndDate, setSelectedClubEndDate] = useState();
  const [userName, setMyName] = useState('');
  const [userEmail, setMyEmail] = useState('');
  const clubIdArr = [];

  useEffect(() => {
    fetchDataFirst();
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedClubId]);

  const fetchDataFirst = async () => {
    try {
      const user = await axios.get(
        process.env.REACT_APP_API_URL + `/users/${userId}`
      );
      setMyName(user.data.name);
      setMyEmail(user.data.email);

      const myClubRes = await axios.get(
        process.env.REACT_APP_API_URL + `/clubs/users/${userId}`
      );

      const clubId = myClubRes.data.clubList;

      for (let i = 0; i < clubId.length; i++) {
        clubIdArr.push(clubId[i]['id']);
      }

      if (myClubRes.data) {
        const pendingMembersRes = await axios.get(
          process.env.REACT_APP_API_URL + '/members',
          {
            params: {
              userId: userId,
              clubId: clubIdArr[0],
              approvalStatus: 'WAITING',
              page: myPendingMembersPage,
            },
          }
        );

        setMyPendingMembers(pendingMembersRes.data.memberList);
        setMyPendingMembersTotal(pendingMembersRes.data.totalCount);

        const memberRes = await axios.get(
          process.env.REACT_APP_API_URL + '/members',
          {
            params: {
              userId: userId,
              clubId: clubIdArr[0],
              approvalStatus: 'CONFIRMED',
              page: myMembersPage,
            },
          }
        );

        setMyMembers(memberRes.data.memberList);
        setMyMembersTotal(memberRes.data.totalCount);

        const selectClubRes = await axios.get(
          process.env.REACT_APP_API_URL + `/clubs/${clubIdArr[0]}`
        );

        setSelectedClubTitle(selectClubRes.data.title);
        setSelectedClubContents(selectClubRes.data.contents);
        setSelectedClubRequiredPerson(selectClubRes.data.requiredPerson);
        setSelectedClubStartDate(selectClubRes.data.startDate);
        setSelectedClubEndDate(selectClubRes.data.endDate);
      }

      const likedClubRes = await axios.get(
        process.env.REACT_APP_API_URL + `/likedClubs/users/${userId}`,
        {
          params: {
            userId: userId,
            page: myLikedClubsPage,
          },
        }
      );
      setMyLikedClubs(likedClubRes.data.likedClubList);
      setMyLikedClubsTotal(likedClubRes.data.totalCount);

      const joinedClubRes = await axios.get(
        process.env.REACT_APP_API_URL + `/members/users/${userId}`,
        {
          params: {
            userId: userId,
            page: myJoinedClubsPage,
          },
        }
      );
      setMyJoinedClubs(joinedClubRes.data.joiningClubList);
      setMyJoinedClubsTotal(joinedClubRes.data.totalCount);

      setMyClubs(myClubRes.data.clubList);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      if (selectedClubId != 0) {
        const pendingMembersRes = await axios.get(
          process.env.REACT_APP_API_URL + '/members',
          {
            params: {
              userId: userId,
              clubId: selectedClubId,
              approvalStatus: 'WAITING',
              page: myPendingMembersPage,
            },
          }
        );

        setMyPendingMembers(pendingMembersRes.data.memberList);
        setMyPendingMembersTotal(pendingMembersRes.data.totalCount);

        const memberRes = await axios.get(
          process.env.REACT_APP_API_URL + '/members',
          {
            params: {
              userId: userId,
              clubId: selectedClubId,
              approvalStatus: 'CONFIRMED',
              page: myMembersPage,
            },
          }
        );

        setMyMembers(memberRes.data.memberList);
        setMyMembersTotal(memberRes.data.totalCount);

        const likedClubRes = await axios.get(
          process.env.REACT_APP_API_URL + `/likedClubs/users/${userId}`,
          {
            params: {
              userId: userId,
              page: myLikedClubsPage,
            },
          }
        );

        setMyLikedClubs(likedClubRes.data.likedClubList);
        setMyLikedClubsTotal(likedClubRes.data.totalCount);

        const selectClubRes = await axios.get(
          process.env.REACT_APP_API_URL + `/clubs/${selectedClubId}`
        );

        setSelectedClubTitle(selectClubRes.data.title);
        setSelectedClubContents(selectClubRes.data.contents);
        setSelectedClubRequiredPerson(selectClubRes.data.requiredPerson);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLikedClubs = (clubId) => {
    let index = likedClubs.indexOf(clubId);

    try {
      if (likedClubs.includes(clubId)) {
        likedClubs.splice(index, 1);
        setLikedClubs([...likedClubs]);
        handleLikeDelete(clubId);
      } else {
        setLikedClubs([...likedClubs, clubId]);
        handleLikePost(clubId);
      }
    } catch (err) {
      console.log(err);
    } finally {
      fetchData();
    }
  };

  const handleLikePost = async (clubId) => {
    try {
      await axios.post(process.env.REACT_APP_API_URL + '/likedClubs', {
        clubId: Number(clubId),
        userId: userId,
      });
    } catch (err) {
      message.error('이미 좋아요한 모임입니다.');
    } finally {
      fetchData();
    }
  };

  const handleLikeDelete = async (clubId) => {
    try {
      axios.delete(process.env.REACT_APP_API_URL + '/likedClubs', {
        params: { userId: userId, clubId: Number(clubId) },
      });
    } catch (err) {
      console.log(err);
    } finally {
      fetchData();
    }
  };

  const handleMemberApproval = async (memberId) => {
    try {
      const res = axios.put(process.env.REACT_APP_API_URL + '/members', {
        memberId: memberId,
      });

      if (res.status === 200) {
        message.success('모임 참여가 승인되었습니다.');
      }
    } catch (err) {
      console.log(err);
    } finally {
      fetchData();
    }
  };

  const handleMemberReject = async (userId, clubId) => {
    try {
      const res = axios.delete(process.env.REACT_APP_API_URL + '/members', {
        params: {
          userId: userId,
          clubId: clubId,
          delete: 'NO',
        },
      });
      if (res.status === 200) {
        message.warning('모임 참여가 거절되었습니다.');
      }
    } catch (err) {
      console.log(err);
    } finally {
      fetchData();
    }
  };
  console.log('title : ' + selectedClubTitle);
  return (
    <Wrapper>
      {loading ? (
        <SpinContainer>
          <Spin />
        </SpinContainer>
      ) : (
        <>
          <InfoBox
            userImg={userImg}
            userName={userName}
            userEmail={userEmail}
          />
          <br />
          <br />
          <StyledTabs defaultActiveKey="1">
            <TabPane tab="좋아요한 모임" key="1">
              {myLikedClubsTotal !== 0 ? (
                <TabContainer>
                  <CardRow>
                    {myLikedClubs.map((likedClub) => (
                      <LikedClubCard
                        key={likedClub.clubId}
                        userId={userId}
                        club={likedClub}
                        handleLikeDelete={handleLikeDelete}
                        like={likedClub.clubId}
                      />
                    ))}
                  </CardRow>
                  <PaginationRow>
                    <Pagination
                      total={myLikedClubsTotal}
                      pageSize={9}
                      current={myLikedClubsPage}
                      onChange={(page) => setMyLikedClubsPage(page)}
                    />
                  </PaginationRow>
                </TabContainer>
              ) : (
                <NotFound> 좋아요한 모임이 존재하지 않습니다 </NotFound>
              )}
            </TabPane>

            <TabPane tab="참여중인 모임" key="2">
              {myJoinedClubsTotal !== 0 ? (
                <TabContainer>
                  <CardRow>
                    {myJoinedClubs.map((joinedClub) => (
                      <JoinedClubCard
                        key={joinedClub.id}
                        userId={userId}
                        club={joinedClub}
                        likedClubs={likedClubs}
                        handleLikedClubs={handleLikedClubs}
                      />
                    ))}
                  </CardRow>
                  <PaginationRow>
                    <Pagination
                      total={myJoinedClubsTotal}
                      pageSize={9}
                      current={myJoinedClubsPage}
                      onChange={(page) => setMyJoinedClubsPage(page)}
                    />
                  </PaginationRow>
                </TabContainer>
              ) : (
                <NotFound> 참여중인 모임이 존재하지 않습니다 </NotFound>
              )}
            </TabPane>

            <TabPane tab="운영중인 모임" key="3">
              {myClubs ? (
                <TabContainer gutter={[0, 100]}>
                  <CardRow>
                    {myClubs.map((club) => (
                      <MyClubCard
                        key={club.id}
                        userId={userId}
                        club={club}
                        selectedClubId={selectedClubId}
                        setSelectedClubId={setSelectedClubId}
                      />
                    ))}
                  </CardRow>

                  <Box>
                    <MidTitle>참여자 관리</MidTitle>
                    <Text>승인 대기자</Text>
                    {myPendingMembers.length !== 0 ? (
                      <>
                        <Row gutter={[0, 16]}>
                          {myPendingMembers.map((member) => (
                            <Row key={member.id}>
                              <PendingMember
                                myPendingMember={member}
                                handleMemberReject={handleMemberReject}
                                handleMemberApproval={handleMemberApproval}
                              />
                            </Row>
                          ))}
                        </Row>
                        <PaginationRow>
                          <Pagination
                            total={myPendingMembersTotal}
                            pageSize={3}
                            current={myPendingMembersPage}
                            onChange={(page) => setMyPendingMembersPage(page)}
                          />
                        </PaginationRow>
                      </>
                    ) : (
                      <MemberNotFound>
                        현재 대기중인 멤버가 없습니다.
                      </MemberNotFound>
                    )}
                    <Divider />
                    <Text>참여자 목록</Text>
                    {myMembers.length !== 0 ? (
                      <>
                        <Row gutter={[0, 16]}>
                          {myMembers.map((member) => (
                            <Row key={member.id}>
                              <Member myMember={member} />
                            </Row>
                          ))}
                        </Row>
                        <PaginationRow>
                          <Pagination
                            total={myMembersTotal}
                            pageSize={3}
                            current={myMembersPage}
                            onChange={(page) => setMyMembersPage(page)}
                          />
                        </PaginationRow>
                      </>
                    ) : (
                      <MemberNotFound>
                        현재 참여중인 멤버가 없습니다.
                      </MemberNotFound>
                    )}
                  </Box>

                  <Box>
                    <MidTitle>정보 수정</MidTitle>
                    <EditForm
                      abc={'dd'}
                      // myClubs={myClubs}
                      // selectedClub={selectedClub}
                      // setSelectedClub={setSelectedClub}
                      selectedClubTitle={selectedClubTitle}
                      selectedClubContents={selectedClubContents}
                      selectedClubRequiredPerson={selectedClubRequiredPerson}
                      selectedClubStartDate={selectedClubStartDate}
                      selectedClubEndDate={selectedClubEndDate}
                    />
                    <Divider />
                  </Box>
                </TabContainer>
              ) : (
                <NotFound>현재 운영중인 모임이 존재하지 않습니다</NotFound>
              )}
            </TabPane>
          </StyledTabs>
        </>
      )}
    </Wrapper>
  );
};

export default Main;

const { TabPane } = Tabs;

const Wrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  flex: 1;
  ${customMedia.lessThan('mobile')`
    width: 295px;
  `}
  ${customMedia.between('mobile', 'largeMobile')`
    width: 363px;
  `}
	${customMedia.between('largeMobile', 'tablet')`
    width: 610px;
  `}
	${customMedia.between('tablet', 'desktop')`
    width: 880px;
  `}
`;

const TabContainer = styled(Row)`
  width: 100%;
  margin-top: 70px;
  padding-bottom: 60px;
  ${customMedia.lessThan('mobile')`
    margin-top: 40px;
  `}
  ${customMedia.between('mobile', 'largeMobile')`
    margin-top: 40px;
  `}
	${customMedia.between('largeMobile', 'tablet')`
    margin-top: 40px;
  `}
`;

const StyledTabs = styled(Tabs)`
  .ant-tabs-tab-btn {
    font-size: 22px;

    ${customMedia.lessThan('mobile')`
      font-size: 14px;
    `}
    ${customMedia.between('mobile', 'largeMobile')`
      font-size: 16px;
    `}
    ${customMedia.between('largeMobile', 'tablet')`
      font-size: 16px;
    `}
    ${customMedia.between('tablet', 'desktop')`
      font-size: 18px;
    `}
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #029400;
    font-weight: bold;
    ${customMedia.lessThan('mobile')`
      font-weight: 500;
    `}
    ${customMedia.between('mobile', 'largeMobile')`
      font-weight: 500;
    `}
    
    ${customMedia.between('largeMobile', 'tablet')`
      font-weight: 500;
    `}
  }
  .ant-tabs-tab:hover {
    color: #029400;
  }
  .ant-tabs-ink-bar {
    border: 2px solid #029400;
    background-color: #029400;
  }
`;

const CardRow = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 60px;
  ${customMedia.between('mobile', 'largeMobile')`
    gap: 40px;
  `}
  ${customMedia.between('largeMobile', 'tablet')`
    gap: 20px;
  `}
	${customMedia.between('tablet', 'desktop')`
    gap: 20px;
  `}
`;

const MidTitle = styled.div`
  width: 100%;
  font-size: 20px;
  margin-bottom: 10px;
  ${customMedia.lessThan('mobile')`
    font-size: 14px;
  `}
  ${customMedia.between('mobile', 'largeMobile')`
  font-size: 14px;
  `}
  ${customMedia.between('largeMobile', 'tablet')`
    font-size: 16px;
  `}
  ${customMedia.between('tablet', 'desktop')`
    font-size: 18px;
  `}
`;

const LargeText = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  ${customMedia.lessThan('mobile')`
    font-size: 12px;
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
`;

const Text = styled.div`
  font-size: 16px;
  margin-bottom: 15px;

  ${customMedia.lessThan('mobile')`
    font-size: 10px;
  `}
  ${customMedia.between('mobile', 'largeMobile')`
    font-size: 10px;
  `}
  ${customMedia.between('largeMobile', 'tablet')`
    font-size: 12px;
  `}
  ${customMedia.between('tablet', 'desktop')`
    font-size: 14px;
  `}
`;

const TextBox = styled.div`
  flex: 1;
`;

const Box = styled.div`
  width: 100%;
`;

const DeleteBtnContainer = styled.div`
  width: 100%;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  padding: 25px;
  display: flex;
  ${customMedia.lessThan('mobile')`
    font-size: 10px;
    padding: 15px;
    flex-direction: column;
  `}
  ${customMedia.between('mobile', 'largeMobile')`
    font-size: 10px;
    padding: 15px;
    flex-direction: column;
  `}
  ${customMedia.between('largeMobile', 'tablet')`
    font-size: 14px;
  `}
  
  ${customMedia.between('tablet', 'desktop')`
    font-size: 18px;
  `}
`;

const DeleteBtn = styled(Button)`
  width: 140px;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  background-color: #ff0000;
  border: none;
  padding: 0 20px;
  border-radius: 6px;
  text-align: center;
  flex: 0.1;
  ${customMedia.lessThan('mobile')`
    font-size: 10px;
    padding: 5px 15px;
    align-self: center;
  `}
  ${customMedia.between('mobile', 'largeMobile')`
    font-size: 10px;
    padding: 5px 15px;
    align-self: center;
  `}
  ${customMedia.between('largeMobile', 'tablet')`
    width: 80px;
    font-size: 12px;
  `}
  ${customMedia.between('tablet', 'desktop')`
    width: 120px;
    font-size: 16px;
  `}
`;

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  .ant-modal-content {
    padding: 30px 55px;
    display: flex;
    align-items: center;

    ${customMedia.lessThan('mobile')`
      padding: 3px 7px;
    `}
    ${customMedia.between('mobile', 'largeMobile')`
      padding: 5px 10px;
    `}
    ${customMedia.between('largeMobile', 'tablet')`
      padding: 10px 25px;
    `}
    ${customMedia.between('tablet', 'desktop')`
      padding: 30px 55px;
    `}
  }
  .ant-modal-body {
    text-align: center;

    ${customMedia.lessThan('mobile')`
      padding: 30px 55px;
    `}
    ${customMedia.between('mobile', 'largeMobile')`
      padding: 30px 55px;
    `}
    ${customMedia.between('largeMobile', 'tablet')`
      padding: 30px 55px;
    `}
    ${customMedia.between('tablet', 'desktop')`
      padding: 30px 55px;
    `}
  }
  .ant-modal-footer {
    display: none;
  }
`;

const ModalTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  ${customMedia.lessThan('mobile')`
    font-size: 14px;
  `}
  ${customMedia.between('mobile', 'largeMobile')`
    font-size: 16px;
  `}
  ${customMedia.between('largeMobile', 'tablet')`
    font-size: 18px;
  `}
  ${customMedia.between('tablet', 'desktop')`
    font-size: 20px;
  `}
`;

const ButtonRow = styled(Row)`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 50px;

  ${customMedia.lessThan('mobile')`
    margin-top: 15px;
  `}
  ${customMedia.between('mobile', 'largeMobile')`
    margin-top: 15px;
  `}
  ${customMedia.between('largeMobile', 'tablet')`
    margin-top: 20px;
  `}
`;

const FilledBtn = styled(Button)`
  & {
    color: #ffffff;
    background-color: #029400;
    border: none;
    border-radius: 6px;
    outline: none;
    cursor: pointer;

    ${customMedia.lessThan('mobile')`
      font-size: 10px;
    `}
    ${customMedia.between('mobile', 'largeMobile')`
      font-size: 12px;
    `}
    ${customMedia.between('largeMobile', 'tablet')`
      font-size: 14px;
    `}
    ${customMedia.between('tablet', 'desktop')`
      font-size: 16px;
    `}
  }
`;

const UnfilledBtn = styled(Button)`
  & {
    color: #029400;
    background-color: #ffffff;
    border: 2px solid #029400;
    border-radius: 6px;
    cursor: pointer;

    ${customMedia.lessThan('mobile')`
      font-size: 10px;
    `}
    ${customMedia.between('mobile', 'largeMobile')`
      font-size: 12px;
    `}
    ${customMedia.between('largeMobile', 'tablet')`
      font-size: 14px;
    `}
    ${customMedia.between('tablet', 'desktop')`
      font-size: 16px;
    `}
  }
`;

const PaginationRow = styled(Row)`
  width: 100%;
  margin: 30px auto;
  justify-content: center;
  ${customMedia.lessThan('mobile')`
    margin: 20px auto;
  `}
  ${customMedia.between('mobile', 'largeMobile')`
    margin: 20px auto;
  `}
	${customMedia.between('largeMobile', 'tablet')`
    margin: 20px auto;
  `}
`;

const SpinContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  ${customMedia.lessThan('mobile')`
    height: 40vh;
  `}
  ${customMedia.between('mobile', 'largeMobile')`
    height: 40vh;
  `}
	${customMedia.between('largeMobile', 'tablet')`
    height: 40vh;
  `}
`;

const MemberNotFound = styled(NotFound)`
  & {
    height: 100px;
    font-size: 16px;
    ${customMedia.lessThan('mobile')`
      font-size: 10px;
    `}
    ${customMedia.between('mobile', 'largeMobile')`
      font-size: 10px;
    `}
    ${customMedia.between('largeMobile', 'tablet')`
      font-size: 12px;
    `}
    ${customMedia.between('tablet', 'desktop')`
      font-size: 14px;
    `}
  }
`;
