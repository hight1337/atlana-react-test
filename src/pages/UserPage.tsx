import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { UserInfo } from "../components/UserInfo";
import { SERVER_API, USER_TOKEN } from "../constants";
import { iUser, UserResponse } from "../interfaces/user";

interface UserPageProps {}

const UserPage: React.FC<UserPageProps> = () => {
  const [isLoading, setIsloading] = React.useState<boolean>(true);
  const [user, setUser] = React.useState<iUser>();
  const { login } = useParams<{ login?: string }>();

  React.useEffect(() => {
    const getUserData = async () => {
      try {
        const { data }: UserResponse = await axios.get(
          `${SERVER_API}users/${login}`,
          {
            headers: {
              Authorization: `token ${USER_TOKEN}`,
            },
          }
        );
        setUser(data);
        setIsloading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [login]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{user && <UserInfo userData={user} userName={login} />}</>;
};

export default UserPage;
