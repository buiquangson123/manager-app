import { user } from "../../stores/sliceMemberInfor";


export const handleCurrentPage = (currPage: number, data: user[], PageSize: number) => {
    const firstPageIndex = (currPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if (data.slice(firstPageIndex, lastPageIndex).length) {
        return data.slice(firstPageIndex, lastPageIndex);
    } else {
        return data.slice((currPage - 2) * PageSize, (currPage - 2) * PageSize + PageSize)
    }
};