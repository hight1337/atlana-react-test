import axios from "axios";
import React from "react";
import { Col, Row, Image, Spinner } from "react-bootstrap";
import { USER_TOKEN } from "../constants";

interface UserCardProps {
  imgUrl: string;
  userName: string;
  userRepoUrl: string;
}

export const UserCard: React.FC<UserCardProps> = ({
  imgUrl,
  userName,
  userRepoUrl,
}) => {
  const [numberOfRepo, setNumberOfRepo] = React.useState<number>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    const source = axios.CancelToken.source();
    const cancelToken = source.token;
    const getNumberOfUserRepos = async () => {
      if (userRepoUrl) {
        try {
          const { data } = await axios.get(userRepoUrl, {
            cancelToken: cancelToken,
            headers: {
              Authorization: `token ${USER_TOKEN}`,
            },
          });
          setNumberOfRepo(data.length);
          setIsLoading(false);
        } catch (error) {
          if (axios.isCancel(error)) {
            return;
          }
          console.log(error);
        }
      }
    };
    getNumberOfUserRepos();
    return () => {
      source.cancel();
    };
  }, [userRepoUrl]);
  return (
    <div className="userCard">
      <Row>
        <Col>
          <Image src={imgUrl} rounded width="60" height="60" />
        </Col>
        <Col>
          <p>{userName}</p>
        </Col>
        <Col>
          {isLoading ? (
            <Spinner animation="border" variant="info" size="sm" />
          ) : (
            <p>{`Repo: ${numberOfRepo}`}</p>
          )}
        </Col>
      </Row>
    </div>
  );
};
