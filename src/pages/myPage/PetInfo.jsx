import { Wrapper, PlusBtn } from "./Styled";
import Header from "./header/Header";
import React, { useState, useEffect } from "react";
import PetInfoCard from "../../components/myPageComponent/PetInfoCard";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";

const PetInfo = () => {
  const [dogname, setDogname] = useState("");
  const [gender, setGender] = useState("");
  const [dog_age, setDogAge] = useState("");
  const [dog_weight, setDogWeight] = useState("");
  const [dog_blood, setDogBlood] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [dogInfo, setDogInfo] = useState([]); // 추가된 상태

  const navigate = useNavigate();

  // 등록 버튼 클릭 핸들러
  const handleRegisterClick = () => {
    navigate("/PetRegister");
  };

  // 모든 필드가 입력되었는지 확인
  useEffect(() => {
    if (dogname && gender && dog_age && dog_weight && dog_blood) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [dogname, gender, dog_age, dog_weight, dog_blood]);

  // 컴포넌트가 마운트될 때 서버로부터 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/api/users/dogprofiles");
        setDogInfo(response.data);
        console.log("가져온 데이터 petinfo:", response.data);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = (id) => {
    navigate(`/PetEdit/${id}`);
  };

  return (
    <>
      <Wrapper>
        <Header title="반려견 정보" />
        {dogInfo.map((dog) => (
          <PetInfoCard
            key={dog.id}
            dogname={dog.dogname}
            gender={dog.gender}
            dog_age={dog.dog_age}
            dog_weight={dog.dog_weight}
            dog_blood={dog.dog_blood}
            kingdog={dog.kingdog}
            image={dog.image}
            onEditClick={() => handleEditClick(dog.id)}
            setDogname={setDogname}
            setGender={setGender}
            setDogAge={setDogAge}
            setDogWeight={setDogWeight}
            setDogBlood={setDogBlood}
          />
        ))}
        <PlusBtn onClick={handleRegisterClick}>등록하기</PlusBtn>
      </Wrapper>
    </>
  );
};

export default PetInfo;