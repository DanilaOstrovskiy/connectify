import React, { useState } from "react";
import styles from "./Pagination.module.css";
import cn from "classnames";

type UsersPropsType = {
    currentPage: number;
    onPageChanged: (pageNumber: number) => void;
    totalItemsCount: number;
    pageSize: number;
    portionSize?: number;
};

export const Pagination = (props: UsersPropsType) => {
    const { currentPage, pageSize, totalItemsCount, portionSize = 10, onPageChanged } = props;

    const [portionNumber, setPortionNumber] = useState(Math.ceil(currentPage / (portionSize || 10)));

    const onClickPrevHandler = () => {
        setPortionNumber(portionNumber - 1);
    };

    const onClickNextHandler = () => {
        setPortionNumber(portionNumber + 1);
    };

    const onPageChangedHandler = (pageNumber: number) => {
        onPageChanged(pageNumber);
    };

    const pagesCount = Math.ceil(totalItemsCount / pageSize);
    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(pagesCount / portionSize);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={styles.pagination}>
            {portionNumber > 1 && (
                <button className={styles.button} onClick={onClickPrevHandler}>
                    PREV
                </button>
            )}
            {pages
                .filter((page) => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                .map((page) => {
                    return (
                        <span
                            key={page}
                            className={cn({ [styles.selectedPage]: currentPage === page }, styles.pageNumber)}
                            onClick={() => onPageChangedHandler(page)}
                        >
                            {page}
                        </span>
                    );
                })}
            {portionCount > portionNumber && (
                <button className={styles.button} onClick={onClickNextHandler}>
                    NEXT
                </button>
            )}
        </div>
    );
};
