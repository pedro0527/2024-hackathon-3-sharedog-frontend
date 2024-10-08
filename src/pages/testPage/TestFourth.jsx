import Header from './header/Header';
import { useNavigate } from 'react-router-dom';
import Footer from './footer/testFooter';
import React, { useState } from 'react'; // 상태 관리를 위해 useState를 import합니다.
import styled from "styled-components";
import Test7 from '../../assets/images/test7.jpg';
import Test8 from '../../assets/images/test8.jpg';
import { Wrapper } from './Styled';
import { API } from '../../api';

const Title = styled.div`
  color: var(--Gray-Gray03, #3A3A3C);
  text-align: center;
  font-family: SUIT;
  font-size: 18px;
  font-style: normal;
  font-weight: 800;
  line-height: 30px; /* 166.667% */
`;

const Content = styled.div`
  color: var(--Gray-Gray02, #636366);
  text-align: center;
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 214.286% */
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 88%;
  height: 45vh;
  justify-content: space-evenly;
  gap: 5vw;
`;

const Body = styled.div`
  width: 88%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 5vw;
`;

const SVGWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center; /* 텍스트와 이미지를 수직 중앙에 정렬 */
  justify-content: flex-start; /* 텍스트와 이미지를 수평 중앙에 정렬 */
  padding: 0; /* 패딩을 0으로 설정하여 여백 제거 */
  margin: 0 auto; /* 마진을 0으로 설정하여 여백 제거 */
  gap: 3vw;
  border-radius: 10px;
  background: #FAFAFC;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 11px 22px;
  border-radius: 15px;
  border: ${props => (props.isActive ? '2px solid rgba(255, 105, 105, 0.60)' : 'none')}; /* 클릭 시 보더 색상 */
  background: ${props => (props.isActive ? '#FAFAFC' : 'transparent')}; /* 클릭 시 배경 색상 */
  box-shadow: ${props => (props.isActive ? '0px 0px 10px 0px rgba(255, 105, 105, 0.25)' : '0px 0px 4px 0px rgba(0, 0, 0, 0.25)')}; /* 클릭 시 그림자 */

  cursor: pointer; /* 클릭 가능하다는 것을 나타내기 위해 커서를 포인터로 설정 */

  &:hover {
    border: 3px solid rgba(255, 105, 105, 0.60);
    background: #FAFAFC;
    box-shadow: 0px 0px 10px 0px rgba(255, 105, 105, 0.25);
  }
`;

const SVGContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0;
`;

const TestFourth = () => {
  const navigate = useNavigate();
  const [activeSVG, setActiveSVG] = useState(null); // 클릭된 SVG를 추적할 상태

  const handleFooterClick = async () => {
    if (activeSVG) {
      try {
        await sendDataToAPI();
        navigate('/testFifth'); // 페이지 네비게이션
      } catch (error) {
        console.error('API 요청 실패:', error);
      }
    } else {
      console.log('SVG가 선택되지 않았습니다.');
    }
  };

  const handleSVGClick = (id) => {
    setActiveSVG(id); // 클릭된 SVG의 ID를 상태에 저장
  };

  const sendDataToAPI = async () => {
    const weightGroupMap = {
      'test7': '20kg 이하에요',
      'test8': '20kg 이상이에요'
  };

    const weightGroup = weightGroupMap[activeSVG];

    if (!weightGroup) {
      console.error('유효하지 않은 weight_group 값:', activeSVG);
      return;
    }

    try {
      const response = await API.post('/api/weighttests', { weight_group: weightGroup });
      console.log('API 요청 성공:', response.data);
    } catch (error) {
      console.error('API 요청 실패:', error);
    }
  };

  return (
    <>
      <Header />
      <Wrapper>
        <Wrap>
          <Title>강아지의 몸무게는 <br /> 어디에 해당하나요?</Title>
          <Body>
            <SVGWrapper
              onClick={() => handleSVGClick('test7')}
              isActive={activeSVG === 'test7'}>
              <SVGContainer>
                <img src={Test7} alt="Test7" />
              </SVGContainer>
              <Content>20kg 이하에요</Content>
            </SVGWrapper>
            <SVGWrapper
              onClick={() => handleSVGClick('test8')}
              isActive={activeSVG === 'test8'}>
              <SVGContainer>
                <img src={Test8} alt="Test8" />
              </SVGContainer>
              <Content>20kg 이상이에요</Content>
            </SVGWrapper>
          </Body>
        </Wrap>
      </Wrapper>
      <Footer 
        btnColor={activeSVG ? "#FF6969" : "#C4C4C4"} // 상태에 따라 버튼 색깔 변경
        buttonText="다음"
        onClick={handleFooterClick} // 클릭 핸들러 전달
      />
    </>
  );
};

export default TestFourth;
