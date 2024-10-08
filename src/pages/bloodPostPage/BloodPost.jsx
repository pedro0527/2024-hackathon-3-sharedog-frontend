// 긴급헌혈페이지 담당자: 이동건
import React, { useEffect, useState } from 'react';
import {
    Wrapper,DropdownWrapper
} from './Styled';
import Header from './header/Header';
// import dummyBloodPost from "../../data/dummyBloodPost";
import BloodPostCard from '../../components/bloodPostCard/BloodPostCard';
import Dropdown from './DropDown';
import {API} from '../../api'
const regions = ["지역", "서울", "인천", "경기", "강원", "경상", "충청", "전라", "제주"];
const bloodTypes = ["혈액형", "DEA 1-", "DEA 1.1", "DEA 1.2", "DEA 3", "DEA 4", "DEA 5", "DEA 7"];

const BloodPost = () => {
  const [posts, setPosts] = useState([]);
  //필터사용을위한 useState훅
  const [selectedRegion, setSelectedRegion] = useState("지역");
  const [selectedBloodType, setSelectedBloodType] = useState("혈액형");

  const [searchQuery, setSearchQuery] = useState("");
  // 초기에는 더미 데이터를 사용
  // setPosts(dummyBloodPost);
  // 실제 API 호출이 필요한 경우, 아래 코드를 사용
   // 백엔드에서 게시물 데이터를 가져오는 함수
   const fetchPosts = async () => {
    try {
        // 선택된 필터 값을 쿼리 파라미터로 포함하여 API 요청
        let url = '/api/community/posts'; // 기본 URL 설정
        const params = {};
    
        if (searchQuery) {
          // 검색어가 있는 경우 검색 엔드포인트 사용
          url = '/api/community/posts';
          params.q = searchQuery;
        } else {
          // 검색어가 없는 경우 필터 엔드포인트 사용
          url = '/api/community/posts/filter';
          if (selectedRegion !== "지역") {
            params.region = selectedRegion;
          }
          if (selectedBloodType !== "혈액형") {
            params.blood = selectedBloodType;
          }
        }
    
        console.log('Fetching posts from:', url, 'with params:', params); // 필터링된 파라미터 콘솔 로그
    
        // API 요청을 통해 데이터를 가져옴
        const response = await API.get(url, { params });
        console.log('받아온헌혈글들:', response.data); // API 응답 데이터 콘솔 로그
    
        // 받아온 데이터를 상태에 저장
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

// 선택된 필터가 변경될 때마다 데이터를 다시 가져오기 위해 useEffect 훅 사용
useEffect(() => {
    fetchPosts();
}, [selectedRegion, selectedBloodType,searchQuery]); // 의존성 배열에 필터 상태 추가

return (
    <>
        <Header onSearch={setSearchQuery} />
        <Wrapper>
            <DropdownWrapper>
                {/* 지역 선택 드롭다운 */}
                <Dropdown
                    label="지역"
                    options={regions}
                    selectedOption={selectedRegion}
                    onSelect={setSelectedRegion} // 선택된 지역 상태 업데이트
                />
                {/* 혈액형 선택 드롭다운 */}
                <Dropdown
                    label="혈액형"
                    options={bloodTypes}
                    selectedOption={selectedBloodType}
                    onSelect={setSelectedBloodType} // 선택된 혈액형 상태 업데이트
                />
            </DropdownWrapper>
            {/* 게시물 카드 목록 */}
            {posts && posts.map(post => (
                <BloodPostCard
                key={post.id}
                id={post.id} // 수정됨: 게시글 ID를 prop으로 전달
                image={post.image_1}//첫번째 사진으로 썸네일 지정
                title={post.title}
                content={post.content}
                date={post.created_at}
                commentsCount={post.comments_cnt}
                likes={post.like_num}
                bloodType={post.blood}
                region={post.region}
                writer={post.writer}
                is_liked={post.is_liked}

                />
            ))}
        </Wrapper>
    </>
)
};

export default BloodPost;

