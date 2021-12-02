import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Menu } from "antd";
import styled from "styled-components";
import { customMedia } from "../../../GlobalStyles";

import Login from "./login/Login.jsx";
import RegisterForm from "./register/RegisterForm.jsx";
//import logo from "../../../images/icons/logo.png";
import profile from "../../../images/icons/profile.png";
//import add from "../../../images/icons/add.png";

const NavBar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const userId = localStorage.getItem("user_id");
  const userImg = localStorage.getItem("user_image");

  useEffect(() => {
    if (userId) {
      setLoggedIn(true);
      setUserImage(userImg);
    }
  }, [userId, userImg]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_image");
    setLoggedIn(false);
    setUserImage(null);
    window.location.reload();
  };

  return (
    <>
      {!isLoggedIn ? (
        <Nav>
          <Link to="/" style={{ textDecoration: "none" }}>
            <NavLogo>
              <LogoTitle>moDgo</LogoTitle>
            </NavLogo>
          </Link>
          <NavMenu>
            <NavLink to="/board" style={{ textDecoration: "none" }}>
              <NavText>모임 찾기</NavText>
            </NavLink>
            <NavIcon>
              <NavProfile onClick={showModal}>
                <img src={profile} alt="Profile icon" />
              </NavProfile>
              <StyledModal visible={isModalVisible} onCancel={handleCancel}>
                <Title>
                  지금 바로,
                  <br />
                  <strong>moDgo</strong>에서 모여보세요!
                </Title>
                <Login onCancel={handleCancel} setLoggedIn={setLoggedIn} />
              </StyledModal>
            </NavIcon>
          </NavMenu>
        </Nav>
      ) : (
        <Nav>
          <Link to="/" style={{ textDecoration: "none" }}>
            <NavLogo>
              <LogoTitle>moDgo</LogoTitle>
            </NavLogo>
          </Link>
          <NavMenu>
            <NavLink to="/board" style={{ textDecoration: "none" }}>
              <NavText>모임 찾기</NavText>
            </NavLink>

            <NavRegister onClick={showModal}>
              <NavText>모임 생성</NavText>
            </NavRegister>
            <StyledModal visible={isModalVisible} onCancel={handleCancel}>
              <RegisterForm onCancel={handleCancel} />
            </StyledModal>

            <NavLink to="/myPage" style={{ textDecoration: "none" }}>
              <NavText>마이페이지</NavText>
            </NavLink>
            <NavLink onClick={handleLogout} style={{ textDecoration: "none" }}>
              <NavText>로그아웃</NavText>
            </NavLink>
            <NavIcon>
              <NavProfile>
                <img src={userImage} alt="User profile" />
              </NavProfile>
            </NavIcon>
          </NavMenu>
        </Nav>
      )}
    </>
  );
};

export default NavBar;

const Nav = styled.nav`
  width: 1200px;
  height: 80px;
  margin: 40px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${customMedia.lessThan("mobile")`
    width: 295px;
  `}
  ${customMedia.between("mobile", "largeMobile")`
    width: 363px;
  `}
	${customMedia.between("largeMobile", "tablet")`
    width: 610px;
  `}
	${customMedia.between("tablet", "desktop")`
    width: 880px;
  `}
`;

const NavLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// const LogoIcon = styled.div`
//   width: 26px;
//   height: 26px;
//   img {
//     width: 100%;
//   }
//   ${customMedia.lessThan('mobile')`
//     width: 20px;
//     height: 20px;
//   `}
//   ${customMedia.between('mobile', 'largeMobile')`
//     width: 22px;
//     height: 22px;
//   `}
// 	${customMedia.between('largeMobile', 'tablet')`
//     width: 24px;
//     height: 24px;
//   `}
// `;

const LogoTitle = styled.div`
  font-weight: bold;
  font-size: 50px;
  color: #000000;
  ${customMedia.lessThan("mobile")`
    font-size: 20px;
  `}
  ${customMedia.between("mobile", "largeMobile")`
    font-size: 20px;
  `}
	${customMedia.between("largeMobile", "tablet")`
    font-size: 24px;
  `}
`;

const NavMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
  ${customMedia.lessThan("mobile")`
    gap: 20px;
  `}
  ${customMedia.between("mobile", "largeMobile")`
    gap: 30px;
  `}
	${customMedia.between("largeMobile", "tablet")`
    gap: 40px;
  `}
`;

const NavLink = styled(Link)`
  color: black;
  &:hover {
    color: #029400;
  }
`;

const NavText = styled.div`
  font-weight: 500;
  font-size: 18px;
  font-weight: bold;
  ${customMedia.lessThan("mobile")`
    font-size: 14px;
  `}
  ${customMedia.between("mobile", "largeMobile")`
    font-size: 14px;
  `}
	${customMedia.between("largeMobile", "tablet")`
    font-size: 16px;
  `}
`;

const NavIcon = styled.div`
  display: flex;
  gap: 30px;
  ${customMedia.lessThan("mobile")`
    gap: 10px;
  `}
  ${customMedia.between("mobile", "largeMobile")`
    gap: 15px;
  `}
	${customMedia.between("largeMobile", "tablet")`
    gap: 20px;;
  `}
`;

const NavProfile = styled.div`
  width: 48px;
  height: 48px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
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

const Title = styled.div`
  font-size: 26px;
  white-space: pre-wrap;
  ${customMedia.lessThan("mobile")`
    font-size: 18px;
  `}
  ${customMedia.between("mobile", "largeMobile")`
    font-size: 20px;
  `}
	${customMedia.between("largeMobile", "tablet")`
    font-size: 22px;
  `}
`;

const NavRegister = styled.div`
  cursor: pointer;
  &:hover {
    color: #029400;
  }
`;

// const StyledDropdownMenu = styled(Menu)`
//   .ant-dropdown-menu-item,
//   .ant-dropdown-menu-submenu-title {
//     font-size: 16px;
//     padding: 10px 20px;
//     text-align: center;
//     ${customMedia.lessThan('mobile')`
//       font-size: 12px;
//       padding: 5px 10px;
//     `}
//     ${customMedia.between('mobile', 'largeMobile')`
//       font-size: 12px;
//       padding: 5px 10px;
//     `}
// 		${customMedia.between('largeMobile', 'tablet')`
//       font-size: 14px;
//       padding: 8px 13px;
//     `}
//   }
// `;

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
