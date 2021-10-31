import axios from "axios";
import moment from "moment";
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { SERVER_API } from "../constants";
import { Repo } from "../interfaces/repo";
import { userRepoResponse } from "../interfaces/response";
import { iUser } from "../interfaces/user";
import { HeaderTitle } from "./HeaderTitle";
import { InputComponent } from "./InputComponent";
import { RepoCard } from "./RepoCard";

interface UserInfoProps {
  userData: iUser;
  userName: string | undefined;
}

export const UserInfo: React.FC<UserInfoProps> = ({ userData, userName }) => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [userRepos, setUserRepos] = React.useState<Repo[]>();
  const handleInputChange = (e: any) => {
    setInputValue(e.currentTarget.value);
  };

  React.useEffect(() => {
    const getUserRepo = async () => {
      try {
        const { data }: userRepoResponse = await axios.get(
          `${SERVER_API}users/${userName}/repos`
        );
        setUserRepos(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserRepo();
  }, [userName]);

  const {
    avatar_url,
    email,
    login,
    created_at,
    followers,
    following,
    location,
    bio,
  } = userData;
  return (
    <Container>
      <HeaderTitle />
      <Row className="mb-5 mt-3">
        <Col className="d-flex justify-content-center">
          <Image src={avatar_url} rounded width="350" height="350" />
        </Col>
        <Col>
          <p className="bio-text">UserName: {login}</p>
          <p className="bio-text">Email:{email ? email : " No Email"}</p>
          <p className="bio-text">
            Loaction: {location ? location : " No Location"}
          </p>
          <p className="bio-text">
            Join At: {moment(created_at).format("YYYY-MM-DD")}
          </p>
          <p className="bio-text">{followers} - Followers</p>
          <p className="bio-text">Following - {following}</p>
        </Col>
      </Row>
      <Row>
        <h3>Bio:</h3>
        <p>{bio ? bio : "This user does not have bio"}</p>
      </Row>
      <InputComponent
        inputSize={"sm"}
        inputValue={inputValue}
        onChange={handleInputChange}
        placeholderText={"Input Repo name here..."}
      />
      <div className="mt-3 pb-2">
        {userRepos ? (
          userRepos.map((repo: Repo) => {
            const { id, name, html_url, stargazers_count, forks_count } = repo;
            if (name.includes(inputValue)) {
              return (
                <RepoCard
                  key={id}
                  repoUrl={html_url}
                  repoName={name}
                  starsCount={stargazers_count}
                  forksCount={forks_count}
                />
              );
            }
          })
        ) : (
          <p>No data</p>
        )}
      </div>
    </Container>
  );
};
