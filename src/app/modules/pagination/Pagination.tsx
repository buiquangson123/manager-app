import { DOTS, usePagination } from "./hooks/usePagination";


interface Pagination {
    onPageChange: (current:number) => void,
    totalCount: number,  //số lượng row
    siblingCount: number,
    currentPage: number,
    pageSize: number
}

const Pagination = ({ 
    onPageChange,
    totalCount, 
    siblingCount = 1,
    currentPage,
    pageSize 
    }: Pagination) => {
    
    const paginationRange:any = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    console.log("lastPage: ", lastPage)
    return (
        <ul className="flex justify-center">
            <li className="" onClick={onPrevious} >
                <button disabled={`${currentPage === 1 ? "true" : "false"}` as any}>
                    <i 
                        className={`pagination-item fa-solid fa-angle-left arrow left ${currentPage === 1 ? "disabled" : ""}`} 
                    ></i>
                </button>
            </li>
            {paginationRange.map((pageNumber:any, index: number) => {
                if (pageNumber === DOTS) {
                    return <li key={index} className="pagination-item dots">&#8230;</li>;
                }

                return (
                    // selected: pageNumber === currentPage
                    <li
                        key={index}
                        className="pagination-item"
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li onClick={onNext}>
                <button disabled={`${currentPage === lastPage ? "true" : "false"}` as any}>
                    <i className={`pagination-item fa-solid fa-angle-right arrow right ${currentPage === lastPage ? " disabled" : ""}`}></i>
                </button>
            </li>
        </ul>
    );
};

export default Pagination;