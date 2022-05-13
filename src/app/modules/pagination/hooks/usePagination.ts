import { useMemo } from 'react';

export const DOTS = '...';

const range = (start: number, end: number) => {
    let length = end - start + 1;
    console.log(Array.from({ length }, (_, idx) => idx + start));
    // tạo ra 1 mảng độ dài 5
    // idx initvalue = 0
    return Array.from({ length }, (_, idx) => idx + start);
};

interface usePagination {
    totalCount: number,
    pageSize: number,
    siblingCount: number,
    currentPage: number,
}

export const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage,
}: usePagination) => {
    const paginationRange = useMemo(() => {
        // tổng số trang
        const totalPageCount = Math.ceil(totalCount / pageSize);

        // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
        const totalPageNumbers = siblingCount + 5;

        /*
          If the number of pages is less than the page numbers we want to show in our
          paginationComponent, we return the range [1..totalPageCount]
        */
        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        // hiển thị trang bên trái
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        // hiển thị trang bên phảiphải
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPageCount
        );

        // hiển thị dots left khi leftSiblingIndex > 2;
        const shouldShowLeftDots = leftSiblingIndex > 2;
        // hiển thị dots right khi rightSiblingIndex < 98;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        // 1 2 3 4 5 ... 100
        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            // range(1,5)
            let leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, totalPageCount];
        }

        // 1 ... 96 97 98 99 100
        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            // range(96,100)
            let rightRange = range(
                totalPageCount - rightItemCount + 1,
                totalPageCount
            );
            return [firstPageIndex, DOTS, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }
    }, [totalCount, pageSize, siblingCount, currentPage]);

    return paginationRange;
};
