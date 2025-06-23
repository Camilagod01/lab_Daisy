<template>
  <div class="p-6">
    <div class="overflow-x-auto">
      <!-- Mostrar tareas del proyecto seleccionado -->
      <template v-if="projectsStore.selectedProject">
        <h2 class="text-xl font-bold mb-4">
          Tareas de: {{ projectsStore.selectedProject.name }}
        </h2>

        <table class="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Completado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(task, index) in projectsStore.selectedProject.tasks"
              :key="task.id"
            >
              <td>{{ index + 1 }}</td>
              <td @dblclick="startEditingTask(task)">
                <template v-if="editingTaskId === task.id">
                  <input
                    v-model="editedTaskName"
                    @keyup.enter="saveTaskEdit(task)"
                    @blur="cancelTaskEdit"
                    class="input input-sm input-bordered w-full"
                  />
                </template>
                <template v-else>
                  {{ task.name }}
                </template>
              </td>

              <td>
                <input
                  type="checkbox"
                  class="checkbox checkbox-success"
                  :checked="task.completed"
                  @change="toggleTaskCompletion(task)"
                />
              </td>

              <td>
                <span v-if="task.completedAt">
                  {{ formatDate(task.completedAt) }}
                </span>
                <span v-else class="text-gray-400 italic">—</span>
              </td>

              <td>
                <button @click="deleteTask(task)" class="btn btn-xs btn-error">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <p
          v-if="projectsStore.selectedProject.tasks.length === 0"
          class="text-gray-500 mt-2"
        >
          Sin tareas
        </p>

        <!-- Agregar nueva tarea -->
        <div class="flex items-center gap-2 mt-4">
          <input
            v-model="newTaskName"
            type="text"
            placeholder="Nombre de la nueva tarea"
            class="input input-bordered w-full max-w-xs"
            @keyup.enter="addTask"
          />
          <button class="btn btn-primary" @click="addTask">Agregar</button>
        </div>

        <button class="btn btn-sm mt-4" @click="projectsStore.deselectProject">
          Volver
        </button>
      </template>

      <!-- Mostrar tabla de proyectos si no hay ninguno seleccionado -->
      <template v-else>
        <table class="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Completado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(project, index) in projectsStore.projects"
              :key="project.id"
            >
              <th>{{ index + 1 }}</th>
              <td>
                <template v-if="editingProjectId === project.id">
                  <input
                    v-model="editedProjectName"
                    @keyup.enter="saveProjectEdit(project)"
                    @blur="cancelProjectEdit"
                    class="input input-sm input-bordered w-full"
                  />
                </template>
                <template v-else>
                  <span @dblclick="startEditingProject(project)">{{
                    project.name
                  }}</span>
                </template>
              </td>
        
                <div class="flex items-center gap-2">
                  <progress
                    class="progress progress-success w-56"
                    :value="getProjectProgress(project)"
                    max="100"
                  ></progress>
                  <span>{{ getProjectProgress(project) }}%</span>
                </div>
             
              <td>
                <button
                  @click="deleteProject(project)"
                  class="btn btn-xs btn-error"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useProjectsStore } from "@/stores/projects";

const projectsStore = useProjectsStore();

const newTaskName = ref("");

const editingTaskId = ref(null);
const editedTaskName = ref("");

const editingProjectId = ref(null);
const editedProjectName = ref("");

function startEditingProject(project) {
  editingProjectId.value = project.id;
  editedProjectName.value = project.name;
}

function saveProjectEdit(project) {
  if (editedProjectName.value.trim()) {
    projectsStore.updateProjectName(project.id, editedProjectName.value.trim());
  }
  editingProjectId.value = null;
}

function cancelProjectEdit() {
  editingProjectId.value = null;
}

function startEditingTask(task) {
  editingTaskId.value = task.id;
  editedTaskName.value = task.name;
}

function saveTaskEdit(task) {
  projectsStore.updateTaskName(
    projectsStore.selectedProjectId,
    task.id,
    editedTaskName.value.trim()
  );
  editingTaskId.value = null;
}

function cancelTaskEdit() {
  editingTaskId.value = null;
}

function addTask() {
  const trimmed = newTaskName.value.trim();
  if (trimmed !== "") {
    projectsStore.addTaskToProject(projectsStore.selectedProjectId, trimmed);
    newTaskName.value = "";
  }
}

function getProjectProgress(project) {
  const tasks = project.tasks || [];
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  return total === 0 ? 0 : Math.round((completed / total) * 100);
}

function toggleTaskCompletion(task) {
  task.completed = !task.completed;
  task.completedAt = task.completed ? new Date().toISOString() : null;
}

function formatDate(isoString) {
  return new Date(isoString).toLocaleString();
}

function deleteTask(task) {
  const confirmDelete = window.confirm(
    `¿Estás seguro de eliminar la tarea: "${task.name}"?`
  );
  if (confirmDelete) {
    projectsStore.deleteTaskFromProject(
      projectsStore.selectedProjectId,
      task.id
    );
  }
}

function deleteProject(project) {
  console.log("Métodos disponibles en store:", Object.keys(projectsStore));

  const confirmDelete = window.confirm(`¿Estás seguro de eliminar el proyecto: "${project.name}"?`);
  if (confirmDelete) {
    projectsStore.deleteProject(project.id);
  }
}


watch(
  () => projectsStore.selectedProjectId,
  (val) => {
    console.log(" selectedProjectId cambió a:", val);
  }
);
</script>
