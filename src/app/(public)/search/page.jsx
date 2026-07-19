import SearchForm from "@/components/public/SearchForm";
import SectionTitle from "@/components/common/SectionTitle";
import { featuredDonors } from "@/lib/data";
import { MapPin, Droplet, MessageCircle } from "lucide-react";
import PaginationBlodReq from "./searchPaginetion";
import { getAllUserForBlod } from "@/lib/api/action/getAllUserForBlod";
import UserCollection from "./userCollection";

export default async function SearchDonorsPage({searchParams}) {


  const params = await searchParams;
  const queryString = new URLSearchParams(params).toString();
  const {data, totalPage} = await getAllUserForBlod(queryString);


  return (
    <section className="section bg-white my-10">
      <div className="container-app">
        <SectionTitle eyebrow="Search" title="Find a donor near you" desc="Filter by blood group and district to see eligible, verified donors." />
        <div className="mb-14">
          <SearchForm paginationPage={params.page}/>
        </div>



          <UserCollection data={data}/>



        <PaginationBlodReq totalPages={totalPage}/>
      </div>
    </section>
  );
}
