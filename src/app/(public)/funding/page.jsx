
import FundingPage from './FundingPage';
import { getSessionInServer } from '@/lib/api/core/session';

const page = async () => {
  const user = await getSessionInServer()
  
  return (
    <div>
      <FundingPage email={user.email}/>
    </div>
  );
};

export default page;