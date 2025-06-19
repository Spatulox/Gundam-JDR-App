import { useRoute } from '@react-navigation/native';

export default function ProjectDetail() {
  const route = useRoute();
  const { id } = route.params as { id: string };

  return <h1>Project Details</h1>
}