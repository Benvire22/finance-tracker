import CategoryForm from '../../components/CategoryForm/CategoryForm';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  getCurrentCategory,
  selectCategories,
  selectCreateLoading,
  showCategoriesModal
} from '../../store/financeSlice';
import {deleteCategory, fetchCategories} from '../../store/financeThunks';
import {useEffect} from 'react';
import {Category} from '../../types';

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const onCreating = useAppSelector(selectCreateLoading);

  useEffect(() => {
    void dispatch(fetchCategories());
  }, [dispatch]);

  const onEdit = (category: Category) => {
    dispatch(showCategoriesModal());
    dispatch(getCurrentCategory(category));
  };

  const onDelete = async (id: string) => {
    await dispatch(deleteCategory(id));
    await dispatch(fetchCategories());
  };

  return (
    <>
      <div className="row justify-content-between">
        <h1 className="col-6">Categories</h1>
        <button className="btn btn-success fs-5 col-2" onClick={() => dispatch(showCategoriesModal())}>Add Category</button>
      </div>
      <div className="row justify-content-center my-5">
        {categories.map((category) => (
          <div className="border fs-4 justify-content-between align-items-center gap-4 p-4 col-8 mb-3 rounded d-flex" key={category.id}>
            <h4 className="m-0 fs-2 text-primary-emphasis">{category.name}</h4>
            <strong className={category.type === 'income' ? 'text-success' : 'text-danger'}>{category.type}</strong>
            <button className="btn btn-primary ms-auto px-3 fs-4" onClick={() => onEdit(category)}>Edit</button>
            <button className="btn btn-danger px-3 fs-4" onClick={() => onDelete(category.id)}>Delete</button>
          </div>
        ))}
      </div>

      <CategoryForm isLoading={onCreating}/>
    </>
  );
};

export default Categories;