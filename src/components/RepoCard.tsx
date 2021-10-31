import React from "react";
import { Col, Row } from "react-bootstrap";

interface RepoCardProps {
  repoUrl: string;
  repoName: string;
  forksCount: number;
  starsCount: number;
}

export const RepoCard: React.FC<RepoCardProps> = ({
  repoUrl,
  repoName,
  forksCount,
  starsCount,
}) => {
  return (
    <a
      href={repoUrl}
      className="main-container"
      target="_blank"
      rel="noreferrer"
    >
      <Row>
        <Col>{repoName}</Col>
        <Col className="repo-card-container">
          <p>{forksCount} Forks</p>
          <p>{starsCount} Stars</p>
        </Col>
      </Row>
    </a>
  );
};
