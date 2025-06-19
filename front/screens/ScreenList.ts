import type { StackNavigationProp } from '@react-navigation/stack';


export enum ScreenList {
    Project = "Project",
    ProjectDetails = "ProjectDetails",
}


export type RootStackParamList = {
  [ScreenList.Project]: undefined;
  [ScreenList.ProjectDetails]: { id: string };
};
export type Navigation = StackNavigationProp<RootStackParamList>;

export type ProjectNavigation = StackNavigationProp<RootStackParamList, ScreenList.Project>;
export type ProjectDetailsNavigation = StackNavigationProp<RootStackParamList, ScreenList.ProjectDetails>;
