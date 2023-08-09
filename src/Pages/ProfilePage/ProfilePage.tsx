import React, { useState } from "react";

// import redux
import { useAppSelector } from "../../core/hooks/redux/useRedux";

// import local components
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import ButtonLocal from "../../core/Components/Utils/ButtonLocal";
import ProfileForm from "../../core/Components/Forms/ProfileForm";

// import ANTD components
import { Avatar } from "antd";

const ProfilePage = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const user = useAppSelector((state) => state.userReducer.user);
  if (Object.keys(user).length === 0) return null;

  const renderContent = () => (
    <div className="flex justify-center pb-10">
      <div className="w-full md:w-2/3 lg:w-3/5 xl:w-2/5 2xl:w-1/3 px-0 sm:px-10 md:px-0 flex flex-col items-center">
        <Avatar src={user.avatar} size={120} />
        {!isEdit ? (
          <>
            <p className="mt-5 mb-4 text-3xl font-semibold">{user.name}</p>
            <ButtonLocal
              baseColor="gray"
              className="w-full py-2.5 rounded-lg"
              handleOnClick={() => {
                setIsEdit(true);
              }}
            >
              Edit Profile
            </ButtonLocal>
            <div className="w-full text-xl font-semibold">
              <p className="mt-5 mb-4">
                My ID: <span className="font-normal">{user.id}</span>
              </p>
              <p className="my-4">
                Email:{" "}
                <span className="font-normal break-all">{user.email}</span>
              </p>
              <p className="my-4">
                Password:{" "}
                <span className="text-gray-400 font-normal">
                  [Hidden for security reasons]
                </span>
              </p>
              <p className="my-4">
                Phone number:{" "}
                <span className="font-normal break-all">
                  {user.phoneNumber}
                </span>
              </p>
            </div>
          </>
        ) : (
          <div className="w-full">
            <ProfileForm user={user} setIsEdit={setIsEdit} />
          </div>
        )}
      </div>
    </div>
  );

  return <SectionWrapper title="MY PROFILE" content={renderContent()} />;
};

export default ProfilePage;
