import React from 'react';
import {Category} from '../../types';
import {useAppSelector} from '../../app/hooks';
import {selectDeleteLoading} from '../../store/financeSlice';
import Spinner from '../../components/Spinner/Spinner';

interface Props {
  category: Category;
  onDelete: VoidFunction;
  onEdit: VoidFunction;
}

const CategoryItems: React.FC<Props> = ({category, onEdit, onDelete}) => {
  const deleteLoading = useAppSelector(selectDeleteLoading);

  return (
    <>
      {deleteLoading && <Spinner />}
      <div className="border fs-4 justify-content-between align-items-center gap-4 p-4 col-8 mb-3 rounded d-flex"
           key={category.id}>
        <h4 className="m-0 fs-2 text-primary-emphasis">{category.name}</h4>
        <strong className={category.type === 'income' ? 'text-success' : 'text-danger'}>{category.type}</strong>
        <button className="btn btn-primary ms-auto px-3 fs-4" onClick={onEdit}>Edit</button>
        <button className="btn btn-danger px-3 fs-4" onClick={onDelete}>Delete</button>
      </div>
    </>
  );
};

export default CategoryItems;