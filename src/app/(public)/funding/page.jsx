
import { getLastThirtyPaymentDetailsForPublic } from '@/lib/api/extra/getPaymentInfo';
import FundingPage from './FundingPage';
import { getSessionInServer } from '@/lib/api/core/session';

const page = async () => {
  const user = await getSessionInServer()
  const datas = await getLastThirtyPaymentDetailsForPublic()
  
  return (
    <div>
      <FundingPage datas={datas} email={user?.email}/>
    </div>
  );
};

export default page;