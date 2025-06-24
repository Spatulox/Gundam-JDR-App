import type { StackNavigationProp } from '@react-navigation/stack';
import { ProjectDetailsType } from './ProjectDetailsScreen';


export enum ScreenList {
    Project = "Project",
    ProjectDetails = "ProjectDetails",
}


export type RootStackParamList = {
  [ScreenList.Project]: undefined;
  [ScreenList.ProjectDetails]: ProjectDetailsType;
};
export type Navigation = StackNavigationProp<RootStackParamList>;

export type ProjectNavigation = StackNavigationProp<RootStackParamList, ScreenList.Project>;
export type ProjectDetailsNavigation = StackNavigationProp<RootStackParamList, ScreenList.ProjectDetails>;
