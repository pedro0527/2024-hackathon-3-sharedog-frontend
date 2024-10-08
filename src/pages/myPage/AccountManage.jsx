import React, { useEffect, useState } from "react";
import {
  Wrapper,
  InfoList2,
  InfoListItem,
  ItemDetail,
  GoMyPageSVG,
  GoBtn,
  EmailText,
} from "./Styled";
import Header from "./header/Header";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 가져오기
import Modal from "../../components/myPageComponent/Modal";
import { API } from "../../api"; // API import

const AccountManage = () => {
  const navigate = useNavigate(); // useNavigate 훅 초기화

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleDeleteClick = () => setShowDeleteModal(true);
  const handleCloseModal = () => {
    setShowLogoutModal(false);
    setShowDeleteModal(false);
  };

  const [profiles, setProfiles] = useState([]);

  const fetchData = async () => {
    try {
      const response = await API.get("/api/users/myprofile");
      console.log("진우데이터:", response.data);
      setProfiles(response.data); // 데이터 배열로 설정
    } catch (error) {
      console.error("에러입니당:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header title="계정 관리" />
      <Wrapper>
        {profiles.map((profile, index) => (
          <InfoList2 key={index}>
            <InfoListItem>
              계정 정보
              <ItemDetail>
                카카오 로그인
                <EmailText>{profile.email}</EmailText>
              </ItemDetail>
              계정 관리
              <ItemDetail onClick={handleLogoutClick}>
                로그아웃
                <GoBtn onClick={handleLogoutClick}>
                  <GoMyPageSVG />
                </GoBtn>
              </ItemDetail>
              <ItemDetail onClick={handleDeleteClick}>
                회원 탈퇴
                <GoBtn onClick={handleDeleteClick}>
                  <GoMyPageSVG />
                </GoBtn>
              </ItemDetail>
            </InfoListItem>
          </InfoList2>
        ))}
      </Wrapper>

      {showLogoutModal && (
        <Modal
          onClose={handleCloseModal}
          text1="로그아웃 하시겠습니까?"
          text2="언제든지 다시 로그인하실 수 있어요."
          btn1Text="취소하기"
          btn2Text="로그아웃"
          onConfirm={() => {
            // Add your logout logic here
            handleCloseModal();
          }}
        />
      )}

      {showDeleteModal && (
        <Modal
          onClose={handleCloseModal}
          text1="회원 탈퇴 하시겠습니까?"
          text2="정말 회원 탈퇴 하시겠습니까?"
          btn1Text="취소하기"
          btn2Text="탈퇴하기"
          onConfirm={() => {
            // Add your delete account logic here
            handleCloseModal();
          }}
        />
      )}
    </>
  );
};

export default AccountManage;
