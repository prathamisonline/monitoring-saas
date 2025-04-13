"use client";
import React from "react";
import { Card, CardTitle } from "../ui/card";

interface ProjectCardProps {
  title: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title }) => {
  return (
    <>
      <Card className="w-[350px] cursor-pointer">
        <CardTitle className="ml-4">{title}</CardTitle>
      </Card>
    </>
  );
};

export default ProjectCard;
