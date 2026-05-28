import CensusPage from './CensusPage';
import { useAuth } from '../context/AuthContext';

export default function WardCensusPage() {
  const { user } = useAuth();
  return (
    <CensusPage
      title="Ward Census"
      endpoint="/api/census/wards"
      allowedWardIds={user?.assignedWardIds ?? []}
      enableWardPicker
      displayMode="ward"
      totalDisplayName="Total"
    />
  );
}
