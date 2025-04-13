import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjects, createProject, removeProject } from "@/services/project.service";

export function useProjects() {
  return useQuery({ queryKey: ["projects"], queryFn: getProjects });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    }
  });
}

export function useDeleteProject(){
  const queryClient =useQueryClient();

  return useMutation({
    mutationFn: removeProject,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["projects"]});
    }
  });
}
