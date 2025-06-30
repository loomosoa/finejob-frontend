import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { FrameworksEnum, ProgLangsEnum, TechnologiesEnum } from "./skillsTypes";

type TSkills = {
  skills: (ProgLangsEnum | TechnologiesEnum | FrameworksEnum)[];
};

const initialState: TSkills = {
  skills: [],
};

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    setSkills(
      state,
      action: PayloadAction<
        (ProgLangsEnum | TechnologiesEnum | FrameworksEnum)[]
      >
    ) {
      state.skills = action.payload;
    },
    pushSkill(
      state,
      action: PayloadAction<ProgLangsEnum | TechnologiesEnum | FrameworksEnum>
    ) {
      state.skills.push(action.payload);
    },
    pullSkill(
      state,
      action: PayloadAction<ProgLangsEnum | TechnologiesEnum | FrameworksEnum>
    ) {
      state.skills = state.skills.filter((item) => item !== action.payload);
    },
  },
});

export const skillsSelector = (state: RootState) => state.skills;

export const { setSkills, pushSkill, pullSkill } = skillsSlice.actions;

export default skillsSlice.reducer;
