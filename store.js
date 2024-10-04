import { create } from "zustand";
import exerciseList from "./db.json";
import routineList from "./routines.json";

const getExMap = () => {
  const map = {};
  exerciseList.forEach((item) => {
    map[item.id] = item;
  });
  return map;
};

const exerciseMap = getExMap(exerciseList);

const useStore = create((set) => ({
  exerciseList,
  exerciseMap,
  routineList,
  // setJsonData: (newData) => set(() => ({ jsonData: newData })),
  saveRoutines: [],

  addRoutine: (newRoutine) =>
    set((state) => ({ saveRoutines: [...state.saveRoutines, newRoutine] })),

  getSaveRoutines: () => set((state) => state.saveRoutines),
}));

export default useStore;
