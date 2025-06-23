import { defineStore } from "pinia";
import { ref,computed } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { v4 as uuidv4 } from "uuid";

export const useProjectsStore = defineStore("projects", () => {
 const projects = useLocalStorage("projects", [
    {
      id: uuidv4(),
      name: "Project 1",
      tasks: [],
    },
    {
      id: uuidv4(),
      name: "Project 2",
      tasks: [
        {
          id: uuidv4(),
          name: "ir a la playa",
          completed: false,
          completedAt: null,
        },
      ],
    },
  ]);

  function addProject(name) {
    projects.value.push({
      id: uuidv4(),
      name,
      tasks: [],
    });
  }

  function selectProject(id) {
    selectedProjectId.value = id;
  }

  function deselectProject() {
    selectedProjectId.value = null;
  }
  const selectedProjectId = ref(null);

  const selectedProject = computed(() =>
    projects.value.find((p) => p.id === selectedProjectId.value)
  );

  function addTaskToProject(projectId, taskName) {
    const project = projects.value.find((p) => p.id === projectId);
    if (project) {
      project.tasks.push({
        id: uuidv4(),
        name: taskName,
        completed: false,
         completedAt: null,
      });
    }
  }

  function updateProjectName(projectId, newName) {
  const project = projects.value.find((p) => p.id === projectId);
  if (project) {
    project.name = newName;
  }
}

function deleteTaskFromProject(projectId, taskId) {
  const project = projects.value.find((p) => p.id === projectId);
  if (project) {
    project.tasks = project.tasks.filter((task) => task.id !== taskId);
  }
}

function deleteProject(projectId) {
  const updated = projects.value.filter((p) => p.id !== projectId);
  projects.value = [...updated]; 

  if (selectedProjectId.value === projectId) {
    selectedProjectId.value = null;
  }
}




function updateTaskName(projectId, taskId, newName) {
  const project = projects.value.find((p) => p.id === projectId);
  if (project) {
    const task = project.tasks.find((t) => t.id === taskId);
    if (task) {
      task.name = newName;
    }
  }
}


  const progress = computed(() => {
  if (!selectedProject.value) return 0;
  const tasks = selectedProject.value.tasks || [];
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  return total === 0 ? 0 : Math.round((completed / total) * 100);
});

  return {
    projects,
    selectedProjectId,
    progress,
    selectedProject,
    selectProject,
    deselectProject,
    addProject,
    addTaskToProject,
    updateProjectName,
    updateTaskName,
    deleteTaskFromProject,
    deleteProject,
  };
});
