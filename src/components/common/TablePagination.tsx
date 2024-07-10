import React, {Dispatch, SetStateAction} from "react";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

interface Props {
    totalItems: number;
    rowsPerPage: number;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
}

export const TablePagination = (props: Props) => {
    const countMin = (props.page - 1) * props.rowsPerPage + 1;
    const countMax = Math.min(props.page * props.rowsPerPage, props.totalItems);
    return (
        <div>
            Znaleziono {props.totalItems} pozycji. Przeglądasz {countMin} - {countMax}.<br/><br/>
            <button onClick={() => props.setPage(props.page - 1)} disabled={props.page === 1}><NavigateBeforeIcon/></button>
            <button onClick={() => props.setPage(props.page + 1)} disabled={countMax >= props.totalItems}><NavigateNextIcon/></button>
        </div>
    );
}