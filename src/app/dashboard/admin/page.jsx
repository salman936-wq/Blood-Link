import { getSessionInServer } from '@/lib/api/core/session';
import { getAllPaymentDetailsForAdmin } from '@/lib/api/extra/getPaymentInfo';
import { getAdminBlodDonetionWithFilter, getAdminUsersWithFilter } from '@/lib/api/getDatas/getBlodDonetion';
import React from 'react';
import AdminDesignComponent from './all-blood-donation-request/AdminDesignComponent';

const page = async () => {
  const queryString = "";

  const adminPersonalInfo = await getSessionInServer();
  const paymentsData = await getAllPaymentDetailsForAdmin();
  const { datas:users, total:toalUserAdmin } = await getAdminUsersWithFilter(queryString);
  const { datas:blodReq, total:totalDatasAdmin } = await getAdminBlodDonetionWithFilter(queryString);

  return (
    <AdminDesignComponent toalUserAdmin={toalUserAdmin} totalDatasAdmin={totalDatasAdmin} adminPersonalInfo={adminPersonalInfo} paymentsData={paymentsData} users={users} blodReq={blodReq} />
  );
};

export default page;