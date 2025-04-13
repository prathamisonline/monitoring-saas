"use client"
import ProjectCard from "@/components/project/projectCard";
import { useProjects } from "@/hooks/useProjects";
import React from "react";

// Define the Project type
type Project = {
  name: string;
};

export default function DashboardPage() {
    const { data: projects, isLoading, error } = useProjects();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading projects</p>;
  return (
    <div className="p-8 grid grid-cols-4 gap-2">
      {projects.map((project: Project) => (
      <div key={project.name}>
        <ProjectCard title={project.name} id={project?.id} />
      </div>
      ))}
    </div>
  );
}
