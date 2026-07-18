import BloodCard from "@/components/public/BloodCard";
import SectionTitle from "@/components/common/SectionTitle";
import { getAllPendingBlodRequest } from "@/lib/api/getDatas/getBlodDonetion";
import FilterBlodRequest from "./FilterBlodRequest";
import PaginationBlodReq from "./PaginationBlodReq";


export default async function DonationRequestsPage({searchParams}) {

  const params = await searchParams;
  const queryString = new URLSearchParams(params).toString();
  const {datas, totalPage} = await getAllPendingBlodRequest(queryString)


  return (
    
    <section className="section bg-white my-10">
      <div className="container-app">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <SectionTitle
            eyebrow="Live requests"
            title="Donation requests"
            desc="Every request here is verified and updated in real time."
            align="left"
          />
          <FilterBlodRequest paginationPage={params.page}/>
        </div>

        {!datas.length < 1 && <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 -mt-10">
          {datas.map((r) => <BloodCard key={r._id} request={r} />)}
        </div>}

        {datas.length < 1 && <div className="flex justify-center items-center p-25 text-6xl bg-primary/10 shadow-2xl rounded-lg">No blod request founded 😊</div> }

        {!datas.length < 1 && <PaginationBlodReq  totalPages={totalPage}/>}
      </div>
    </section>
  );
}
