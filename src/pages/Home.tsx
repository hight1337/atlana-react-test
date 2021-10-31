import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { Container, FormControl, InputGroup, Row } from "react-bootstrap";
import Loader from "../components/Loader";
import { NoUsers } from "../components/NoUsers";
import { UserCard } from "../components/UserCard";
import { USER_TOKEN } from "../constants";
import { userApiResponse } from "../interfaces/response";
import { User } from "../interfaces/user";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const [serachValue, setSearchValue] = useState<string>("");
  const [users, setUsers] = useState<User[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: any) => {
    setSearchValue(e.currentTarget.value);
  };

  const getUsers = useCallback(async () => {
    if (serachValue) {
      try {
        setIsLoading(true);
        const { data }: userApiResponse = await axios.get(
          ` https://api.github.com/search/users?q=${serachValue}`,
          {
            headers: {
              Authorization: `token ${USER_TOKEN}`,
            },
          }
        );
        if (data) {
          setUsers(data.items);
          setIsLoading(false);
        }
      } catch (err: any) {
        if (err.response.status === 403) {
          window.alert("The number of requests has run out, reload the page");
          setIsLoading(true);
        }
      }
    }
  }, [serachValue]);

  useEffect(() => {
    getUsers();
  }, [serachValue, getUsers]);

  return (
    <Container>
      <Row>
        <h1>GitHub Searcher</h1>
      </Row>
      <Row>
        <InputGroup size="lg">
          <FormControl
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            value={serachValue}
            onChange={(e) => handleInputChange(e)}
          />
        </InputGroup>
      </Row>
      {isLoading ? (
        <Loader />
      ) : (
        <div style={{ marginTop: 20 }}>
          {users && users.length > 0 ? (
            users.map((user: User) => {
              const { avatar_url, login, id, repos_url } = user;
              return (
                <UserCard
                  key={id}
                  imgUrl={avatar_url}
                  userName={login}
                  userRepoUrl={repos_url}
                />
              );
            })
          ) : (
            <NoUsers />
          )}
        </div>
      )}
    </Container>
  );
};

export default Home;
