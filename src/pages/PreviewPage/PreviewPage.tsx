import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EAppRoutes } from 'routes/config';

export default function PreviewPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(EAppRoutes.TASKS);
  }, [navigate]);

  return <div>Preview Page</div>;
}
