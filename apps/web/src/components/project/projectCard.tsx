"use client";
import React from "react";
import { Card, CardTitle } from "../ui/card";
import { useDeleteProject } from "@/hooks/useProjects";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

interface ProjectCardProps {
  title: string;
  id: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, id }) => {
  const { mutate: deleteProject } = useDeleteProject();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event from triggering
    deleteProject(id);
  };

  return (
    <Card className="w-[350px] cursor-pointer flex flex-row items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <CardTitle className="text-lg font-medium">{title}</CardTitle>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
      >
        <Trash2 className="h-5 w-5" />
        <span className="sr-only">Delete project</span>
      </Button>
    </Card>
  );
};

export default ProjectCard;
