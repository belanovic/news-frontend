import React from 'react';
import './style/layout/pagination.css';
import './style/typography/pagination.css';

export default function PaginationButton({sign, clickHandler, pageNum, setPageNum}){
    return (
        typeof sign !== 'number'? 
        <button onClick = {clickHandler}>{sign}</button> 
        : 
        <button className = 'currentBtn' onClick = {() => setPageNum({number: sign, isLast: false})}>{sign}</button>

    )
}